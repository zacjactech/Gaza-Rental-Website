"use client";

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import type { Map, Marker, FeatureGroup } from 'leaflet';

interface MapComponentProps {
  properties: any[];
  onPropertyClick?: (property: any) => void;
  center?: [number, number];
  zoom?: number;
}

const MapComponent = ({ 
  properties, 
  onPropertyClick, 
  center = [-6.7924, 39.2083], // Default to Dar es Salaam
  zoom = 12 
}: MapComponentProps) => {
  const { language } = useLanguage();
  const t = translations[language];
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const markersRef = useRef<Marker[]>([]);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;
    
    let mapInstance: Map | null = null;

    const initMap = async () => {
      try {
        // Import Leaflet dynamically
        const L = await import('leaflet');
        await import('leaflet/dist/leaflet.css');
        
        // Create a custom icon using divIcon instead of external images
        const customIcon = L.divIcon({
          html: `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          `,
          className: 'custom-map-marker',
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30]
        });
        
        // Add custom CSS for the marker
        const style = document.createElement('style');
        style.textContent = `
          .custom-map-marker {
            color: #1e40af;
            filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
          }
          .custom-map-marker:hover {
            color: #2563eb;
            transform: scale(1.1);
            transition: all 0.2s ease;
          }
        `;
        document.head.appendChild(style);
        
        // Initialize map
        if (!mapInstance) {
          mapInstance = L.map(mapRef.current, {
            attributionControl: true,
            zoomControl: true,
            scrollWheelZoom: true
          }).setView(center, zoom);
          
          // Add tile layer
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
          }).addTo(mapInstance);
          
          setMap(mapInstance);
          console.log("Map initialized successfully");
        }
        
        // Add markers after map is initialized
        if (properties?.length && mapInstance) {
          properties.forEach(property => {
            if (property.coordinates) {
              const [lat, lng] = property.coordinates;
              
              const marker = L.marker([lat, lng], { icon: customIcon })
                .addTo(mapInstance)
                .bindPopup(`
                  <div class="p-2 text-center">
                    <h3 class="font-bold text-base">${property.titleKey || 'Property'}</h3>
                    <p class="text-sm font-medium">${property.price.toLocaleString()} ${property.currency}</p>
                    <p class="text-xs">${property.locationKey}</p>
                  </div>
                `);
                
              marker.on('click', () => {
                if (onPropertyClick) {
                  onPropertyClick(property);
                }
              });
              
              markersRef.current.push(marker);
            }
          });
          
          // Fit bounds to show all markers
          if (markersRef.current.length > 0) {
            const group = L.featureGroup(markersRef.current);
            mapInstance.fitBounds(group.getBounds().pad(0.1));
          }
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error("Map initialization error:", err);
        setError(t?.map?.error || 'Failed to load map');
        setIsLoading(false);
      }
    };

    initMap();

    // Clean up
    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [center, zoom, t?.map?.error, properties]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="text-center p-8">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg" 
        style={{ 
          height: '100%', 
          minHeight: '500px',
          position: 'relative',
          zIndex: 1 
        }}
      ></div>
    </div>
  );
};

export default MapComponent; 