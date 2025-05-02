"use client";

import { useEffect, useRef, useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function MapFixPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();
  const t = translations[language];

  // Sample property data for the map markers - wrapped in useMemo to avoid recreation on every render
  const properties = useMemo(() => [
    {
      id: 1,
      title: 'Modern Apartment in Mikocheni',
      price: 250000,
      currency: 'TZS',
      bedrooms: 2,
      bathrooms: 1,
      location: 'Mikocheni, Dar es Salaam',
      distance: '5 km',
      image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      type: 'apartment',
      available: true,
      coordinates: [-6.7735, 39.2695] as [number, number],
    },
    {
      id: 2,
      title: 'Luxury Villa in Masaki',
      price: 450000,
      currency: 'TZS',
      bedrooms: 3,
      bathrooms: 2,
      location: 'Masaki, Dar es Salaam',
      distance: '3 km',
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      type: 'villa',
      available: true,
      coordinates: [-6.7449, 39.2795] as [number, number],
    },
    {
      id: 3,
      title: 'Cozy Studio in Upanga',
      price: 180000,
      currency: 'TZS',
      bedrooms: 1,
      bathrooms: 1,
      location: 'Upanga, Dar es Salaam',
      distance: '2 km',
      image: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      type: 'studio',
      available: true,
      coordinates: [-6.8122, 39.2892] as [number, number],
    },
  ], []);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

    let mapInstance: any = null;
    
    const initMap = async () => {
      try {
        console.log("Initializing property map...");
        
        // Load Leaflet
        const L = await import('leaflet');
        await import('leaflet/dist/leaflet.css');
        
        // Fix Leaflet icons
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        });
        
        // Ensure the container has dimensions
        if (mapRef.current) {
          mapRef.current.style.width = '100%';
          mapRef.current.style.height = '600px';
        }
        
        // Wait for DOM to settle
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (!mapRef.current) {
          throw new Error("Map container not available");
        }
        
        // Create map centered on Dar es Salaam
        console.log("Creating map instance...");
        const darEsSalaam = [-6.776, 39.178]; // Default center
        
        mapInstance = L.map(mapRef.current, {
          center: darEsSalaam,
          zoom: 12,
          zoomAnimation: false,
          fadeAnimation: false,
        });
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance);
        
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
        const markers = properties.map(property => {
          const marker = L.marker(property.coordinates, { icon: customIcon }).addTo(mapInstance);
          
          // Create popup content
          const popupContent = `
            <div class="p-2">
              <h3 class="font-semibold text-sm">${property.title}</h3>
              <p class="text-sm font-medium text-primary">${property.currency} ${property.price.toLocaleString()}/month</p>
              <p class="text-xs text-gray-500">${property.bedrooms} bed · ${property.bathrooms} bath</p>
              <button class="mt-2 text-xs bg-primary text-white px-2 py-1 rounded hover:bg-primary/90 w-full">View details</button>
            </div>
          `;
          
          const popup = L.popup({
            closeButton: false,
            className: 'custom-popup'
          }).setContent(popupContent);
          
          marker.bindPopup(popup);
          
          return marker;
        });
        
        // Fit map to property bounds if there are properties
        if (properties.length > 0) {
          const bounds = L.latLngBounds(properties.map(p => p.coordinates));
          mapInstance.fitBounds(bounds, { padding: [50, 50] });
        }
        
        // Make sure the map is properly sized and let the component know it's loaded
        setTimeout(() => {
          if (mapInstance) {
            console.log("Map ready - invalidating size");
            mapInstance.invalidateSize({ animate: false });
            setIsLoaded(true);
          }
        }, 500);
        
      } catch (err) {
        console.error("Error initializing property map:", err);
        setError(err instanceof Error ? err.message : "Failed to load map");
      }
    };

    // Initialize the map with a delay
    const timeout = setTimeout(() => {
      initMap();
    }, 1000);
    
    return () => {
      clearTimeout(timeout);
      
      if (mapInstance) {
        console.log("Cleaning up map...");
        mapInstance.remove();
      }
    };
  }, [properties]);

  // Add custom CSS for map components
  const mapStyles = `
    .leaflet-container {
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    
    .custom-marker {
      background: transparent;
      border: none;
    }
    
    .custom-popup .leaflet-popup-content-wrapper {
      border-radius: 8px;
      box-shadow: 0 3px 14px rgba(0,0,0,0.2);
    }
    
    .custom-popup .leaflet-popup-content {
      margin: 8px;
      min-width: 200px;
    }
  `;

  return (
    <main className="container mx-auto px-4 py-8">
      <style jsx global>{mapStyles}</style>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Property Map Solution</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          This is an optimized implementation of the property map with direct code integration.
          Use this page to check if the property map functionality works properly.
        </p>
        
        <div className="flex flex-wrap gap-4 mb-6">
          <Button asChild variant="secondary">
            <Link href="/map-view">
              Go to Original Map View
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/react-map">
              Go to React Map
            </Link>
          </Button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
          <p className="mb-2">Map Status: <span className={isLoaded ? "text-green-500 font-medium" : "text-amber-500 font-medium"}>
            {isLoaded ? "Map Loaded Successfully" : "Loading Property Map..."}
          </span></p>
          {error && <p className="text-red-500 text-sm mt-1">Error: {error}</p>}
        </div>
      </div>
      
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden" style={{ height: "600px" }}>
        <div ref={mapRef} className="absolute inset-0 z-10" />
        
        {!isLoaded && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading property map...</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-8 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Property Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map(property => (
            <div key={property.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src={property.image} 
                  alt={property.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">{property.title}</h3>
                <p className="text-primary font-medium mt-1">{property.currency} {property.price.toLocaleString()}/month</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {property.bedrooms} bedroom{property.bedrooms !== 1 ? 's' : ''} · {property.bathrooms} bathroom{property.bathrooms !== 1 ? 's' : ''}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{property.location}</p>
                <Button className="mt-3 w-full">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 