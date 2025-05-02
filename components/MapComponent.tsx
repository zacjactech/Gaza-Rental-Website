"use client";

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import type { LatLngTuple } from 'leaflet';
import { Button } from '@/components/ui/button';

// Add CSS with !important rules to override any conflicting styles
const mapStyles = `
  .leaflet-container {
    width: 100% !important;
    height: 100% !important;
    z-index: 1 !important;
  }
  
  .leaflet-div-icon {
    background: transparent !important;
    border: none !important;
  }
  
  .custom-marker {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }
  
  .custom-popup .leaflet-popup-content-wrapper {
    border-radius: 8px !important;
    box-shadow: 0 3px 14px rgba(0,0,0,0.2) !important;
  }
  
  .custom-popup .leaflet-popup-content {
    margin: 8px !important;
    min-width: 200px !important;
  }
`;

interface Property {
  id: number;
  titleKey?: string;
  title?: string;
  price: number;
  currency: string;
  periodKey?: string;
  period?: string;
  bedrooms: number;
  bathrooms: number;
  locationKey?: string;
  location?: string;
  distance: string;
  image: string;
  coordinates: LatLngTuple;
  type?: string;
  available?: boolean;
}

interface MapComponentProps {
  properties: Property[];
  onPropertySelect?: (property: Property) => void;
  onLoad?: () => void;
  onError?: (error: any) => void;
}

const MapComponent = ({ properties, onPropertySelect, onLoad, onError }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  
  // Track component mount status
  const isMountedRef = useRef(true);

  // Function to log for debugging
  const log = (message: string) => {
    console.log(`[MapComponent] ${message}`);
  };

  // Handle Leaflet script loading success
  const handleScriptLoad = () => {
    log('Leaflet script loaded successfully');
    setLeafletLoaded(true);
  };

  // Handle Leaflet script loading error
  const handleScriptError = () => {
    log('Failed to load Leaflet script');
    setHasError(true);
    setErrorMessage('Failed to load map library');
    if (onError) onError(new Error('Failed to load Leaflet script'));
  };

  // Initialize the map once Leaflet is loaded and container is ready
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current || hasError || isMapInitialized) {
      return;
    }

    // Set explicit dimensions on container to ensure it's visible
    if (mapRef.current) {
      mapRef.current.style.height = '500px';
      mapRef.current.style.width = '100%';
    }

    // Short delay to ensure the container is properly sized
    const initTimeout = setTimeout(() => {
      if (!isMountedRef.current || !mapRef.current) return;
      
      try {
        log("Initializing map...");
        
        // Ensure window and L are available
        if (typeof window === 'undefined' || !window.L) {
          throw new Error('Leaflet not available');
        }
        
        // Get L from the window object (already loaded via script)
        const L = window.L;
        
        // Fix Leaflet default icon issues
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        });

        // Check container dimensions to ensure it's visible
        const { width, height } = mapRef.current.getBoundingClientRect();
        log(`Container dimensions: ${width}px × ${height}px`);
        
        if (width < 50 || height < 50) {
          throw new Error('Map container has insufficient dimensions');
        }
        
        // Default center coordinates
        const defaultCenter: LatLngTuple = [-6.776, 39.178]; // Dar es Salaam, Tanzania
        
        // Initialize map with animations disabled
        const map = L.map(mapRef.current, {
          fadeAnimation: false,
          zoomAnimation: false,
          markerZoomAnimation: false,
          preferCanvas: true // Use canvas renderer for better performance
        }).setView(defaultCenter, 13);
        
        // Store map instance
        mapInstanceRef.current = map;
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Create custom marker icon
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `<div class="bg-primary text-white rounded-full p-1 flex items-center justify-center shadow-md" style="width: 36px; height: 36px;">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                 </div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 36],
          popupAnchor: [0, -36]
        });
        
        // Add map event listeners for debugging
        map.on('load', () => log('Map load event fired'));
        map.on('layeradd', () => log('Layer added to map'));

        // Add markers for each property
        if (properties.length > 0) {
        properties.forEach(property => {
          const { coordinates, title, titleKey, price, currency } = property;
          const propertyTitle = title || titleKey || 'Property';
          
            // Create marker
            const marker = L.marker(coordinates, { icon: customIcon }).addTo(map);
          
          // Create popup content
          const popupContent = `
            <div class="font-sans p-2">
              <h3 class="font-semibold text-sm">${propertyTitle}</h3>
              <p class="text-sm font-medium text-primary">${currency} ${price.toLocaleString()}/month</p>
              <button class="mt-2 text-xs bg-primary text-white px-2 py-1 rounded hover:bg-primary/90 w-full">View details</button>
            </div>
          `;
          
            // Add popup
          const popup = L.popup({
            closeButton: false,
            className: 'custom-popup'
          }).setContent(popupContent);
          
          marker.bindPopup(popup);
          
            // Handle marker click
          marker.on('click', () => {
              if (onPropertySelect && isMountedRef.current) {
              onPropertySelect(property);
            }
          });
        });

          // Fit map to all markers
          const bounds = L.latLngBounds(properties.map(p => p.coordinates));
          map.fitBounds(bounds, { padding: [50, 50] });
        }
        
        // Force a resize after a delay to ensure proper rendering
        setTimeout(() => {
          if (isMountedRef.current && mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize({ animate: false });
            
            log("Map initialized successfully");
            setIsMapInitialized(true);
            if (onLoad) onLoad();
          }
        }, 300);
        
        // Add resize handler to handle container size changes
        const handleResize = () => {
          if (mapInstanceRef.current && isMountedRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
        };
        
        window.addEventListener('resize', handleResize);
        
        // Cleanup function
        return () => {
          window.removeEventListener('resize', handleResize);
        };
        
      } catch (error) {
        console.error("Error initializing map:", error);
        if (isMountedRef.current) {
          setHasError(true);
          setErrorMessage(error instanceof Error ? error.message : 'Failed to initialize map');
          if (onError) onError(error);
        }
      }
    }, 200);
    
    return () => {
      clearTimeout(initTimeout);
    };
  }, [leafletLoaded, properties, onPropertySelect, onLoad, onError, hasError, isMapInitialized]);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      
      // Clean up the map instance if it exists
      if (mapInstanceRef.current) {
        log("Removing map instance...");
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Render fallback UI if there's an error
  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full min-h-[500px] bg-gray-100 dark:bg-gray-800 p-6 rounded-md">
        <div className="text-red-500 mb-4 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <p className="font-semibold">Failed to load map</p>
          {errorMessage && <p className="text-sm mt-1">{errorMessage}</p>}
        </div>
        <Button 
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Load Leaflet script directly for more reliability */}
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
        onError={handleScriptError}
      />
      
      <style jsx global>{mapStyles}</style>
      
      <div 
        ref={mapRef} 
        className="relative h-full w-full" 
        style={{ 
          minHeight: '500px', 
          height: '100%', 
          width: '100%',
          opacity: isMapInitialized ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          backgroundColor: '#f8f9fa'
        }} 
        data-map-status={isMapInitialized ? 'initialized' : 'loading'}
      />
      
      {!isMapInitialized && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading map...</p>
          </div>
        </div>
      )}
      
      {/* Add a global style for Leaflet CSS */}
      <style jsx global>{`
        @import 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      `}</style>
    </>
  );
};

export default MapComponent;

// Add type definitions for Leaflet global
declare global {
  interface Window {
    L: any;
  }
}