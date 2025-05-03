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
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
      return mod.default;
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

  // Add additional filter options
  const [activeFilters, setActiveFilters] = useState(0);
  const [showSearchPanel, setShowSearchPanel] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [sortBy, setSortBy] = useState("newest");

  // Price range formatting
  const formatPriceLabel = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };

  // Helper to count active filters
  useEffect(() => {
    let count = 0;
    if (filters.location) count++;
    if (filters.propertyType) count++;
    if (filters.bedrooms) count++;
    if (filters.bathrooms) count++;
    if (filters.amenities.length > 0) count += filters.amenities.length;
    setActiveFilters(count);
  }, [filters]);

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      location: '',
      propertyType: '',
      priceRange: '',
      bedrooms: '',
      bathrooms: '',
      amenities: [],
    });
    setPriceRange([0, 1000000]);
    setSortBy("newest");
  };

  // Toggle search panel visibility on mobile
  const toggleSearchPanel = () => {
    setShowSearchPanel(!showSearchPanel);
  };

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
    // Use "all" as the value for filtering rather than empty string
    const processedValue = field === 'propertyType' && value === 'all' ? 'all' : value;
    
    setFilters(prev => ({
      ...prev,
      [field]: processedValue
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
        {/* Search panel toggle button for mobile */}
        <div className="md:hidden fixed bottom-4 right-4 z-20">
          <Button 
            onClick={toggleSearchPanel} 
            className="rounded-full w-12 h-12 shadow-lg flex items-center justify-center"
          >
            {showSearchPanel ? <X className="h-5 w-5" /> : <Filter className="h-5 w-5" />}
              </Button>
                </div>

        {/* Search and filter panel */}
        <div className={`
          w-full md:w-[320px] lg:w-[350px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 
          ${showSearchPanel ? 'absolute inset-0 z-10 md:relative' : 'hidden md:block'}
        `}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10 flex justify-between items-center">
            <h2 className="text-base font-semibold">{t?.browse?.search?.title || 'Search Properties'}</h2>
            <div className="flex gap-2">
              {activeFilters > 0 && (
                      <Button
                  variant="outline" 
                        size="sm"
                  onClick={resetFilters}
                  className="text-xs h-8"
                      >
                  Clear ({activeFilters})
                      </Button>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowSearchPanel(false)} 
                className="md:hidden h-8 w-8"
              >
                <X className="h-4 w-4" />
                </Button>
              </div>
        </div>

          <div className="p-4 md:p-5 space-y-5 overflow-y-auto max-h-[calc(100vh-8rem)] scrollbar-thin">
            {/* Location search */}
            <div className="space-y-2">
              <Label>{t?.browse?.search?.location || 'Location'}</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  placeholder={t?.browse?.search?.locationPlaceholder || 'Enter area or city...'}
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Bathrooms */}
            <div className="space-y-2">
              <Label>{t?.browse?.search?.filters?.bathrooms || 'Bathrooms'}</Label>
              <div className="grid grid-cols-4 gap-2">
                {['Any', '1', '2', '3+'].map((num) => (
                  <Button
                    key={num}
                    variant={filters.bathrooms === num.toLowerCase() ? "default" : "outline"}
                    onClick={() => handleFilterChange('bathrooms', num === 'Any' ? '' : num.toLowerCase())}
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
              <Label>{t?.browse?.search?.filters?.priceRange || 'Price Range'}</Label>
              <div className="px-2">
                <Slider
                  defaultValue={[0, 1000000]}
                  min={0}
                  max={1000000}
                  step={50000}
                  value={priceRange}
                  onValueChange={(value: number[]) => setPriceRange(value)}
                  className="my-6"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {priceRange[0].toLocaleString()} TZS
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {priceRange[1].toLocaleString()} TZS
                  </span>
                </div>
              </div>
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <Label>{t?.browse?.search?.propertyType || 'Property Type'}</Label>
              <Select
                value={filters.propertyType}
                onValueChange={(value) => handleFilterChange('propertyType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t?.browse?.search?.propertyTypes?.all || 'All Types'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t?.browse?.search?.propertyTypes?.all || 'All Types'}</SelectItem>
                  <SelectItem value="apartment">{t?.browse?.search?.propertyTypes?.apartment || 'Apartment'}</SelectItem>
                  <SelectItem value="house">{t?.browse?.search?.propertyTypes?.house || 'House'}</SelectItem>
                  <SelectItem value="villa">{t?.browse?.search?.propertyTypes?.villa || 'Villa'}</SelectItem>
                  <SelectItem value="studio">{t?.browse?.search?.propertyTypes?.studio || 'Studio'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bedrooms */}
            <div className="space-y-2">
              <Label>{t?.browse?.search?.filters?.bedrooms || 'Bedrooms'}</Label>
              <div className="grid grid-cols-6 gap-2">
                {['Any', '1', '2', '3', '4', '5+'].map((num) => (
                  <Button
                    key={num}
                    variant={filters.bedrooms === num.toLowerCase() ? "default" : "outline"}
                    className="px-0"
                    onClick={() => handleFilterChange('bedrooms', num === 'Any' ? '' : num.toLowerCase())}
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-2">
              <Label>{t?.browse?.search?.filters?.amenities || 'Amenities'}</Label>
              <div className="grid grid-cols-2 gap-2">
                {amenityOptions.map((amenity) => (
                  <div
                    key={amenity.id}
                    className={`flex items-center space-x-2 p-2 rounded-md border cursor-pointer transition-colors ${
                      filters.amenities.includes(amenity.id)
                        ? 'bg-primary/10 border-primary/50'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => handleAmenityToggle(amenity.id)}
                  >
                    <span className="text-lg">{amenity.icon}</span>
                    <span className="text-sm">
                      {t?.property?.amenities?.[amenity.id as keyof typeof t.property.amenities] || 
                        amenity.id.charAt(0).toUpperCase() + amenity.id.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sort options */}
            <div className="space-y-2">
              <Label>{t?.browse?.results?.sortBy || 'Sort By'}</Label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="newest">{t?.browse?.results?.sortOptions?.newest || 'Newest First'}</option>
                <option value="priceAsc">{t?.browse?.results?.sortOptions?.priceAsc || 'Price (Low to High)'}</option>
                <option value="priceDesc">{t?.browse?.results?.sortOptions?.priceDesc || 'Price (High to Low)'}</option>
              </select>
            </div>

            {/* Apply filters button */}
            <div className="pt-4">
            <Button className="w-full">
                <Search className="mr-2 h-4 w-4" />
                {t?.browse?.search?.searchButton || 'Search Properties'}
            </Button>
            </div>
          </div>
        </div>

        {/* Map and results panel */}
        <div className="flex-1 flex flex-col min-h-[80vh] md:min-h-0">
          {/* Map container */}
        <div className="flex-1 relative h-[60vh] md:h-[calc(100vh-64px)]" style={{ overflow: 'hidden' }}>
          <ErrorBoundary>
            {/* Debug status display */}
            {mapStatus.state !== 'loaded' && (
              <MapStatus status={mapStatus.state} error={mapStatus.error} />
            )}
            
            <div 
              ref={mapContainerRef}
                className="h-full w-full absolute inset-0" 
              style={{ 
                  minHeight: "300px", 
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
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}