"use client";

import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Property {
  id: number;
  title: string;
  price: number;
  currency: string;
  period: string;
  bedrooms: number;
  bathrooms: number;
  location: string;
  distance: string;
  image: string;
  coordinates: LatLngTuple;
}

interface MapComponentProps {
  properties: Property[];
}

const MapComponent = ({ properties }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initMap = async () => {
      if (!mapRef.current) return;

      const L = (await import('leaflet')).default;

      // Initialize map if it doesn't exist
      if (!leafletMap.current) {
        // Default center coordinates for Dar es Salaam, Tanzania
        const darEsSalaam: LatLngTuple = [-6.776, 39.178];
        
        leafletMap.current = L.map(mapRef.current).setView(darEsSalaam, 13);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(leafletMap.current);
      }

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

      // Add markers for each property
      properties.forEach(property => {
        const { coordinates, title, price, currency } = property;
        
        const marker = L.marker(coordinates, { icon: customIcon })
          .addTo(leafletMap.current);
        
        // Create popup content
        const popupContent = `
          <div class="font-sans p-1">
            <h3 class="font-semibold text-sm">${title}</h3>
            <p class="text-sm font-medium text-primary">${currency} ${price.toLocaleString()}/month</p>
            <a href="/properties/${property.id}" class="text-xs text-blue-600 hover:underline">View details</a>
          </div>
        `;
        
        marker.bindPopup(popupContent);
      });
    };

    initMap();

    return () => {
      if (leafletMap.current) {
        // Clean up on unmount
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, [properties]);

  return (
    <div ref={mapRef} className="h-full w-full z-0" />
  );
};

export default MapComponent;