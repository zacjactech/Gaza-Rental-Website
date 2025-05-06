"use client";

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Filter, MapPin, Search, X, List, Map } from "lucide-react";
import PropertyCard from '@/components/PropertyCard';
import Footer from '@/components/Footer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

// Dynamically import MapComponent to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/map/MapComponent'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  ),
});

export default function MapViewPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [mobileView, setMobileView] = useState<'map' | 'list'>('map');
  const [filters, setFilters] = useState({
    location: '',
    propertyType: 'all',
    bedrooms: 'any',
    bathrooms: 'any',
    amenities: [] as string[],
    minPrice: 0,
    maxPrice: 1000000
  });

  // Track window size for responsive design
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileView('map');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter handling functions
  const handleFilterChange = (field: string, value: string | number | number[]) => {
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

  const clearFilters = () => {
    setFilters({
      location: '',
      propertyType: 'all',
      bedrooms: 'any',
      bathrooms: 'any',
      amenities: [],
      minPrice: 0,
      maxPrice: 1000000
    });
  };

  // Mock property data with coordinates
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
      isVerified: true,
      amenities: ['parking', 'security', 'internet'],
      size: 85,
      coordinates: [-6.7735, 39.2695] as [number, number],
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
      amenities: ['parking', 'pool', 'security', 'garden'],
      size: 200,
      coordinates: [-6.7449, 39.2795] as [number, number],
    },
    {
      id: 3,
      titleKey: 'studio_apartment',
      price: 150000,
      currency: 'TZS',
      periodKey: 'monthly',
      bedrooms: 1,
      bathrooms: 1,
      locationKey: 'city_center',
      distance: '1 km',
      image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      type: 'studio',
      available: true,
      amenities: ['furnished', 'internet', 'security'],
      size: 45,
      coordinates: [-6.8123, 39.2911] as [number, number],
    },
  ], []);

  // Filter properties based on criteria
  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      if (filters.location && property.locationKey) {
        const locationName = property.locationKey.toLowerCase();
        if (!locationName.includes(filters.location.toLowerCase())) {
          return false;
        }
      }
      
      if (filters.propertyType && filters.propertyType !== 'all' && property.type !== filters.propertyType) {
        return false;
      }
      
      if (filters.bedrooms && filters.bedrooms !== 'any') {
        const numBedrooms = parseInt(filters.bedrooms as string);
        if (filters.bedrooms === '4+') {
          if (property.bedrooms < 4) return false;
        } else if (property.bedrooms < numBedrooms) {
          return false;
        }
      }
      
      if (filters.bathrooms && filters.bathrooms !== 'any') {
        const numBathrooms = parseInt(filters.bathrooms as string);
        if (filters.bathrooms === '3+') {
          if (property.bathrooms < 3) return false;
        } else if (property.bathrooms < numBathrooms) {
          return false;
        }
      }
      
      if (property.price < filters.minPrice || property.price > filters.maxPrice) {
        return false;
      }
      
      if (filters.amenities.length > 0 && !filters.amenities.every(amenity => property.amenities?.includes(amenity))) {
        return false;
      }
      
      return true;
    });
  }, [properties, filters]);

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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header with filters */}
      <div className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {t?.browse?.mapView?.title || "Map View"}
              </h1>
              
              {/* Mobile view toggle */}
              <div className="md:hidden flex gap-2">
                      <Button
                  variant={mobileView === 'map' ? 'default' : 'outline'} 
                        size="sm"
                  onClick={() => setMobileView('map')}
                  className="w-10 h-10 p-0"
                      >
                  <Map className="h-5 w-5" />
                      </Button>
              <Button 
                  variant={mobileView === 'list' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setMobileView('list')}
                  className="w-10 h-10 p-0"
                >
                  <List className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Filter button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="ml-2">
                    <Filter className="h-4 w-4 mr-2" />
                    {t?.browse?.search?.moreFilters || "Filters"}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>{t?.browse?.search?.filters?.title || "Filters"}</SheetTitle>
                  </SheetHeader>
                  
                  <div className="space-y-6 py-6">
                    {/* Location filter */}
                    <div className="space-y-4">
                      <Label className="text-sm font-medium">{t?.browse?.search?.location || "Location"}</Label>
              <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                          placeholder={t?.browse?.search?.locationPlaceholder || "Enter location..."}
                          className="pl-10"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                />
              </div>
            </div>

                    {/* Property type filter */}
                    <div className="space-y-4">
                      <Label className="text-sm font-medium">{t?.browse?.search?.propertyType || "Property Type"}</Label>
                      <Select 
                        value={filters.propertyType} 
                        onValueChange={(value) => handleFilterChange('propertyType', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t?.browse?.search?.propertyTypes?.all || "All Types"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{t?.browse?.search?.propertyTypes?.all || "All Types"}</SelectItem>
                          <SelectItem value="apartment">{t?.browse?.search?.propertyTypes?.apartment || "Apartment"}</SelectItem>
                          <SelectItem value="house">{t?.browse?.search?.propertyTypes?.house || "House"}</SelectItem>
                          <SelectItem value="villa">{t?.browse?.search?.propertyTypes?.villa || "Villa"}</SelectItem>
                          <SelectItem value="studio">{t?.browse?.search?.propertyTypes?.studio || "Studio"}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Bed/Bath filters */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <Label className="text-sm font-medium">{t?.browse?.search?.filters?.bedrooms || "Bedrooms"}</Label>
                        <Select
                          value={filters.bedrooms}
                          onValueChange={(value) => handleFilterChange('bedrooms', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any</SelectItem>
                            {[1, 2, 3, 4, '4+'].map((num) => (
                              <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-4">
                        <Label className="text-sm font-medium">{t?.browse?.search?.filters?.bathrooms || "Bathrooms"}</Label>
                        <Select
                          value={filters.bathrooms}
                          onValueChange={(value) => handleFilterChange('bathrooms', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any</SelectItem>
                            {[1, 2, '3+'].map((num) => (
                              <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
              </div>
            </div>

                    {/* Price range filter */}
            <div className="space-y-4">
                      <Label className="text-sm font-medium">Price Range (TZS)</Label>
                      <div className="pt-2">
                <Slider
                          defaultValue={[filters.minPrice, filters.maxPrice]}
                  max={1000000}
                          step={10000}
                          onValueChange={(value) => {
                            handleFilterChange('minPrice', value[0]);
                            handleFilterChange('maxPrice', value[1]);
                          }}
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                            {filters.minPrice.toLocaleString()} TZS
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                            {filters.maxPrice.toLocaleString()} TZS
                  </span>
                </div>
              </div>
            </div>

                    {/* Amenities filter */}
                    <div className="space-y-4">
                      <Label className="text-sm font-medium">{t?.browse?.search?.filters?.amenities || "Amenities"}</Label>
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
                            {t?.property?.amenities?.[amenity.id as keyof typeof t.property.amenities] || amenity.id}
                  </Button>
                ))}
              </div>
            </div>

                    {/* Action buttons */}
                    <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <SheetClose asChild>
                        <Button variant="outline" onClick={clearFilters}>
                          {t?.browse?.search?.filters?.clear || "Clear All"}
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button>
                          {t?.browse?.search?.searchButton || "Apply Filters"}
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Search input */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                className="pl-10 pr-24"
                placeholder={t?.browse?.search?.locationPlaceholder || "Enter location..."}
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              />
              <Button
                className="absolute right-0 top-0 h-full rounded-l-none"
                size="sm"
              >
                <Search className="h-4 w-4 mr-2" />
                {t?.browse?.search?.searchButton || "Search"}
              </Button>
            </div>

            {/* Active filters display */}
            {(filters.location || 
              filters.propertyType !== 'all' || 
              filters.bedrooms !== 'any' || 
              filters.bathrooms !== 'any' || 
              filters.amenities.length > 0 || 
              filters.minPrice > 0 || 
              filters.maxPrice < 1000000) && (
              <div className="flex flex-wrap gap-2 py-2">
                {filters.location && (
                  <Badge variant="secondary" className="flex gap-1 items-center">
                    <MapPin className="h-3 w-3" />
                    {filters.location}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer" 
                      onClick={() => handleFilterChange('location', '')}
                    />
                  </Badge>
                )}
                
                {filters.propertyType !== 'all' && (
                  <Badge variant="secondary" className="flex gap-1 items-center">
                    {t?.browse?.search?.propertyTypes?.[filters.propertyType as keyof typeof t.browse.search.propertyTypes] || filters.propertyType}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer" 
                      onClick={() => handleFilterChange('propertyType', 'all')}
                    />
                  </Badge>
                )}
                
                {/* Add more filter badges here */}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-xs h-7 px-2 text-gray-600 dark:text-gray-400"
                >
                  {t?.browse?.search?.filters?.clear || "Clear All"}
            </Button>
            </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 relative">
        {/* Map Section */}
        <div className={`
          flex-1 relative
          ${mobileView === 'list' ? 'hidden md:block' : ''}
        `}>
          <div className="h-[calc(100vh-170px)] md:h-[calc(100vh-140px)]">
              <MapComponent 
              properties={filteredProperties} 
              onPropertyClick={setSelectedProperty}
            />
          </div>
        </div>

        {/* Property List Section */}
        <div className={`
          bg-white dark:bg-gray-900 h-[calc(100vh-170px)] md:h-[calc(100vh-140px)] overflow-y-auto
          ${mobileView === 'map' ? 'hidden md:block' : ''}
          md:w-[350px] md:border-l md:border-gray-200 md:dark:border-gray-700
        `}>
          <div className="p-4 sticky top-0 bg-white dark:bg-gray-900 z-10 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">
                {filteredProperties.length} {t?.browse?.results?.properties || "Properties"}
              </h3>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <div key={property.id} className="p-4">
                  <PropertyCard property={property} />
              </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <p>{t?.browse?.search?.noResults || "No properties found matching your criteria"}</p>
            </div>
          )}
          </div>
        </div>
        
        {/* Selected Property Panel */}
        {selectedProperty && (
          <div className="absolute bottom-4 left-4 right-4 md:left-4 md:right-auto md:w-[350px] bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 p-4">
            <div className="flex justify-between mb-2">
              <h3 className="font-bold">{selectedProperty.titleKey}</h3>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setSelectedProperty(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <PropertyCard property={selectedProperty} />
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}