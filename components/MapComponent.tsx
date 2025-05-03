"use client";

import { useEffect, useRef, useState, useCallback, memo } from 'react';
import Script from 'next/script';
import type { LatLngTuple } from 'leaflet';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertTriangle } from 'lucide-react';

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

// Throttle function to improve performance
const throttle = (fn: Function, delay: number) => {
  let lastCall = 0;
  return (...args: any[]) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  };
};

const MapComponent = memo(({ properties, onPropertySelect, onLoad, onError }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [initAttempts, setInitAttempts] = useState(0);
  
  // Track component mount status
  const isMountedRef = useRef(true);

  // Function to log for debugging - only in development
  const log = useCallback((message: string) => {
    if (process.env.NODE_ENV === 'development') {
    console.log(`[MapComponent] ${message}`);
    }
  }, []);

  // Handle Leaflet script loading success
  const handleScriptLoad = useCallback(() => {
    log('Leaflet script loaded successfully');
    setLeafletLoaded(true);
  }, [log]);

  // Handle Leaflet script loading error
  const handleScriptError = useCallback(() => {
    log('Failed to load Leaflet script');
    setHasError(true);
    setErrorMessage('Failed to load map library');
    if (onError) onError(new Error('Failed to load Leaflet script'));
  }, [log, onError]);

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
        
        // Direct script import approach
        const L = window.L || require('leaflet');
        
        if (!L) {
          throw new Error('Leaflet not available');
        }
        
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
        
        // Initialize map with performance options
        const map = L.map(mapRef.current, {
          fadeAnimation: false,
          zoomAnimation: false,
          markerZoomAnimation: false,
          preferCanvas: true, // Use canvas renderer for better performance
          attributionControl: false,
          zoomControl: false,
          renderer: L.canvas() // Force canvas renderer
        }).setView(defaultCenter, 13);
        
        // Add zoom control at bottom right for better UX
        L.control.zoom({
          position: 'bottomright'
        }).addTo(map);
        
        // Store map instance
        mapInstanceRef.current = map;
        
        // Add tile layer with minimal attribution
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OSM',
          maxZoom: 18,
          minZoom: 3,
          updateWhenIdle: true,
          updateWhenZooming: false,
          keepBuffer: 2
        }).addTo(map);
        
        // Create custom marker icon - predefine once
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `<div class="bg-primary text-white rounded-full p-1 flex items-center justify-center shadow-md" style="width: 36px; height: 36px;">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                 </div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 36],
          popupAnchor: [0, -36]
        });
        
        // Add markers for each property - in batches for better performance
        if (properties.length > 0) {
          const addMarkersInBatches = (props: Property[], batchSize: number, delay: number) => {
            const markers: any[] = [];
            const addBatch = (startIdx: number) => {
              const endIdx = Math.min(startIdx + batchSize, props.length);
              
              for (let i = startIdx; i < endIdx; i++) {
                const property = props[i];
          const { coordinates, title, titleKey, price, currency } = property;
          const propertyTitle = title || titleKey || 'Property';
          
            // Create marker
            const marker = L.marker(coordinates, { icon: customIcon }).addTo(map);
                markers.push(marker);
          
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
              }
              
              // Process next batch if needed
              if (endIdx < props.length && isMountedRef.current) {
                setTimeout(() => addBatch(endIdx), delay);
              }
            };
            
            // Start adding markers in batches
            addBatch(0);
            
            return markers;
          };
          
          // Add markers in batches of 10 with 10ms delay between batches
          markersRef.current = addMarkersInBatches(properties, 10, 10);
          
          // Set bounds to show all properties when there are multiple
          if (properties.length > 1) {
            const bounds = L.latLngBounds(properties.map(p => p.coordinates));
            map.fitBounds(bounds, { padding: [50, 50] });
          }
        }
        
        // Add map resize handler for better mobile experience
        const handleResize = throttle(() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
        }, 100);
        
        window.addEventListener('resize', handleResize);
        
        // Map is ready
        setIsMapInitialized(true);
        log('Map initialized successfully');
        
        // Notify parent component
        if (onLoad) onLoad();
        
      } catch (err) {
        log(`Map initialization error: ${err}`);
          setHasError(true);
        
        // Try to provide useful error messages depending on the type of error
        const error = err as Error;
        setErrorMessage(error.message || 'Failed to initialize map');
        
          if (onError) onError(error);
        
        // Retry initialization a few times
        if (initAttempts < 3) {
          setInitAttempts(prev => prev + 1);
          setLeafletLoaded(false); // Reset to try again
          setTimeout(() => {
            setLeafletLoaded(true);
          }, 1000);
        }
      }
    }, 300);
    
    return () => {
      clearTimeout(initTimeout);
    };
  }, [leafletLoaded, hasError, isMapInitialized, properties, onPropertySelect, onLoad, onError, log, initAttempts]);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      
      // Clean up map instance
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      
      // Clean up markers
      markersRef.current = [];
    };
  }, []);

  // Force reload the map
  const handleReload = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
    markersRef.current = [];
    setIsMapInitialized(false);
    setHasError(false);
    setErrorMessage('');
    setLeafletLoaded(false);
    setTimeout(() => {
      setLeafletLoaded(true);
    }, 100);
  };

  // Render the map container and loading states
  return (
    <div className="relative min-h-[500px] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
      {/* Leaflet Script (direct CDN approach for better reliability) */}
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        onLoad={handleScriptLoad}
        onError={handleScriptError}
        strategy="beforeInteractive"
      />
      <style>{mapStyles}</style>
      
      {!isMapInitialized && !hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Loading map...</p>
        </div>
      )}
      
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
          <AlertTriangle className="h-10 w-10 text-yellow-500 mb-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Map Loading Error</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">{errorMessage}</p>
          <Button onClick={handleReload} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reload Map
          </Button>
        </div>
      )}
      
      <div 
        ref={mapRef} 
        className={`w-full h-full rounded-xl ${isMapInitialized ? 'opacity-100' : 'opacity-0'}`}
        style={{ transition: 'opacity 0.3s ease-in-out' }}
      ></div>
    </div>
  );
});

MapComponent.displayName = 'MapComponent';

export default MapComponent;

// Add TypeScript interface for Window with Leaflet
declare global {
  interface Window {
    L: any;
  }
}