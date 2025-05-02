"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Filter, MapPin, Search, X } from "lucide-react";
import PropertyCard from '@/components/PropertyCard';
import Footer from '@/components/Footer';

// Add a component to display map loading status for debugging
const MapStatus = ({ status, error }: { status: string; error?: any }) => {
  return (
    <div className="absolute top-4 right-4 z-20 bg-white dark:bg-gray-800 rounded-md shadow-md p-2 text-sm">
      <p className="font-medium">Map Status: <span className={status === 'error' ? 'text-red-500' : 'text-green-500'}>{status}</span></p>
      {error && <p className="text-red-500 text-xs mt-1">{error.toString()}</p>}
    </div>
  );
};

// Dynamically import the MapComponent to avoid SSR issues with better error handling
const MapComponent = dynamic(() => 
  import('@/components/MapComponent')
    .then(mod => {
      console.log("MapComponent loaded successfully");
      const Component = mod.default;
      Component.displayName = 'MapComponent';
      return Component;
    })
    .catch(err => {
      console.error("Error loading MapComponent:", err);
      // Return a fallback component
      const FallbackComponent = () => (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-red-500 mb-4">Failed to load map component</div>
          <pre className="text-xs text-red-400 mb-4 max-w-md overflow-auto p-2 bg-gray-50 dark:bg-gray-900 rounded">
            {err.toString()}
          </pre>
          <Button 
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      );
      FallbackComponent.displayName = 'MapComponentFallback';
      return FallbackComponent;
    }), 
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading map...</p>
        </div>
      </div>
    ),
  }
);

// Add an error boundary component
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-6">
        <div className="text-red-500 mb-4 text-lg">Something went wrong loading the map</div>
        <Button 
          onClick={() => {
            setHasError(false);
            window.location.reload();
          }}
        >
          Reload page
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}

export default function MapViewPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [mapStatus, setMapStatus] = useState<{ state: string; error?: any }>({ state: 'loading' });
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    priceRange: '',
    bedrooms: '',
    bathrooms: '',
    amenities: [] as string[],
  });
  
  // Add ref for the map container
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Mock properties data with coordinates
  const properties = useMemo(() => [
    {
      id: 1,
      titleKey: 'modern_apartment',
      price: 250000,
      currency: 'TZS',
      periodKey: 'monthly',
      bedrooms: 2,
      bathrooms: 1,
      locationKey: 'mikocheni',
      distance: '5 km',
      image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      type: 'apartment',
      available: true,
      coordinates: [-6.7735, 39.2695] as [number, number], // Mikocheni coordinates
    },
    {
      id: 2,
      titleKey: 'luxury_villa',
      price: 450000,
      currency: 'TZS',
      periodKey: 'monthly',
      bedrooms: 3,
      bathrooms: 2,
      locationKey: 'masaki',
      distance: '3 km',
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      type: 'villa',
      available: true,
      coordinates: [-6.7449, 39.2795] as [number, number], // Masaki coordinates
    },
    // Add more properties with coordinates...
  ], []);

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAmenityToggle = (amenityId: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const amenityOptions = [
    { id: 'parking', icon: '🅿️' },
    { id: 'security', icon: '🔒' },
    { id: 'pool', icon: '🏊‍♂️' },
    { id: 'gym', icon: '💪' },
    { id: 'internet', icon: '📶' },
    { id: 'furnished', icon: '🛋️' },
    { id: 'aircon', icon: '❄️' },
    { id: 'garden', icon: '🌳' }
  ];

  // Add map status tracking
  const handleMapLoaded = () => {
    console.log("Map loaded successfully");
    setMapStatus({ state: 'loaded' });
  };

  const handleMapError = (error: any) => {
    console.error("Map error:", error);
    setMapStatus({ state: 'error', error });
  };
  
  // Ensure the map container has correct dimensions before map is initialized
  useEffect(() => {
    if (mapContainerRef.current) {
      // Set explicit dimensions with !important to ensure they apply
      mapContainerRef.current.style.cssText = `
        height: 100% !important;
        min-height: 500px !important;
        width: 100% !important;
        position: relative !important;
        background-color: #f8f9fa !important;
      `;
      
      // Log the container dimensions for debugging
      const { width, height } = mapContainerRef.current.getBoundingClientRect();
      console.log(`Map container size: ${width}px × ${height}px`);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content */}
      <div className="flex flex-col md:flex-row flex-1 relative">
        {/* Mobile filter button */}
        <div className="md:hidden p-4 border-b">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  {t?.browse?.search?.filters?.title}
                </div>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>{t?.browse?.search?.filters?.title}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="space-y-2">
                  <Label>{t?.browse?.search?.location}</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder={t?.browse?.search?.location}
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{t?.browse?.search?.propertyType}</Label>
                  <select
                    value={filters.propertyType}
                    onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="">{t?.browse?.search?.propertyTypes?.all}</option>
                    {Object.entries(t?.browse?.search?.propertyTypes || {}).map(([key, value]) => (
                      key !== 'all' && (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      )
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>{t?.browse?.search?.priceRange}</Label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="">{t?.browse?.search?.priceRanges?.all}</option>
                    {Object.entries(t?.browse?.search?.priceRanges || {}).map(([key, value]) => (
                      key !== 'all' && (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      )
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>{t?.browse?.search?.filters?.amenities}</Label>
                  <div className="flex flex-wrap gap-2">
                    {amenityOptions.map((amenity) => (
                      <Button
                        key={amenity.id}
                        variant={filters.amenities.includes(amenity.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleAmenityToggle(amenity.id)}
                        className="flex items-center gap-1.5"
                      >
                        <span>{amenity.icon}</span>
                        {t?.property?.amenities?.[amenity.id as keyof typeof t.property.amenities]}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button className="w-full">
                  <Search className="h-4 w-4 mr-2" />
                  {t?.browse?.search?.searchButton}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden md:block w-80 h-full overflow-y-auto border-r bg-white dark:bg-gray-800 p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {t?.browse?.search?.filters?.title}
          </h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>{t?.browse?.search?.location}</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  placeholder={t?.browse?.search?.location}
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t?.browse?.search?.propertyType}</Label>
              <select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">{t?.browse?.search?.propertyTypes?.all}</option>
                {Object.entries(t?.browse?.search?.propertyTypes || {}).map(([key, value]) => (
                  key !== 'all' && (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  )
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>{t?.browse?.search?.priceRange}</Label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">{t?.browse?.search?.priceRanges?.all}</option>
                {Object.entries(t?.browse?.search?.priceRanges || {}).map(([key, value]) => (
                  key !== 'all' && (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  )
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>{t?.browse?.search?.filters?.amenities}</Label>
              <div className="flex flex-wrap gap-2">
                {amenityOptions.map((amenity) => (
                  <Button
                    key={amenity.id}
                    variant={filters.amenities.includes(amenity.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleAmenityToggle(amenity.id)}
                    className="flex items-center gap-1.5"
                  >
                    <span>{amenity.icon}</span>
                    {t?.property?.amenities?.[amenity.id as keyof typeof t.property.amenities]}
                  </Button>
                ))}
              </div>
            </div>

            <Button className="w-full">
              <Search className="h-4 w-4 mr-2" />
              {t?.browse?.search?.searchButton}
            </Button>
          </div>
        </div>

        {/* Map section */}
        <div className="flex-1 relative h-[calc(100vh-64px)]" style={{ overflow: 'hidden' }}>
          <ErrorBoundary>
            {/* Debug status display */}
            {mapStatus.state !== 'loaded' && (
              <MapStatus status={mapStatus.state} error={mapStatus.error} />
            )}
            
            <div 
              ref={mapContainerRef}
              className="h-full w-full" 
              style={{ 
                minHeight: "500px", 
                height: "100%", 
                position: "relative",
                zIndex: 1
              }}
            >
              <MapComponent 
                properties={properties} 
                onPropertySelect={(property) => setSelectedProperty(property)}
                onLoad={handleMapLoaded}
                onError={handleMapError}
              />
            </div>
          </ErrorBoundary>
          
          {/* Property preview overlay */}
          {selectedProperty && (
            <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-10">
              <div className="relative">
                <button 
                  onClick={() => setSelectedProperty(null)}
                  className="absolute -right-2 -top-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 p-1 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 z-20"
                >
                  <X className="h-4 w-4" />
                </button>
                <PropertyCard property={selectedProperty} />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}