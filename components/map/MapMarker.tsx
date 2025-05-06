"use client";

import { Property } from '@/types/property';
import type L from 'leaflet';

export class MapMarker {
  private marker: L.Marker | null = null;
  
  constructor(property: Property, onClick?: (property: Property) => void) {
    // Initialize without Leaflet, the create method should be called after Leaflet is loaded
    this.create = async (L: typeof import('leaflet'), property: Property, onClick?: (property: Property) => void) => {
      const icon = L.divIcon({
        className: 'property-marker',
        html: `
          <div class="relative">
            <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
              ${property.price.toLocaleString().charAt(0)}
            </div>
            <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-primary"></div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      this.marker = L.marker(property.coordinates!, { icon });

      if (onClick) {
        this.marker.on('click', () => {
          onClick(property);
        });
      }
      
      return this.marker;
    };
  }

  create: (L: typeof import('leaflet'), property: Property, onClick?: (property: Property) => void) => Promise<L.Marker>;

  addTo(map: L.Map): this {
    if (this.marker) {
      this.marker.addTo(map);
    }
    return this;
  }
} 