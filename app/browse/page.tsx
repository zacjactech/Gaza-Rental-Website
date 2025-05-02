"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyCard from '@/components/PropertyCard';
import Footer from '@/components/Footer';
import { Filter, MapPin, Search, SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function BrowsePage() {
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const t = translations[language];
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    bedrooms: searchParams.get('bedrooms') || 'any',
    bathrooms: searchParams.get('bathrooms') || 'any',
    propertyType: searchParams.get('type') || 'all',
    priceRange: searchParams.get('price') || '',
    amenities: [] as string[],
    minPrice: 0,
    maxPrice: 1000000
  });

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
      bedrooms: 'any',
      bathrooms: 'any',
      propertyType: 'all',
      priceRange: '',
      amenities: [],
      minPrice: 0,
      maxPrice: 1000000
    });
    setSortBy('newest');
  };

  // Mock properties data
  const properties = [
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
      createdAt: '2024-02-20'
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
      distance: '3 km to center',
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      type: 'villa',
      available: true
    },
    {
      id: 3,
      titleKey: 'luxury_4_bedroom_villa',
      price: 850000,
      currency: 'TZS',
      periodKey: 'monthly',
      bedrooms: 1,
      bathrooms: 1,
      locationKey: 'mbezi',
      distance: '10 km to center',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      type: 'villa',
      available: true
    },
    {
      id: 4,
      titleKey: 'family_4br_house',
      price: 750000,
      currency: 'TZS',
      periodKey: 'monthly',
      bedrooms: 4,
      bathrooms: 3,
      locationKey: 'oyster_bay',
      distance: '4 km to center',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      type: 'house',
      available: true
    },
    {
      id: 5,
      titleKey: 'studio_apartment',
      price: 150000,
      currency: 'TZS',
      periodKey: 'monthly',
      bedrooms: 1,
      bathrooms: 1,
      locationKey: 'city_center',
      distance: '1 km to center',
      image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      type: 'studio',
      available: true
    },
    {
      id: 6,
      titleKey: 'modern_2br_apartment',
      price: 280000,
      currency: 'TZS',
      periodKey: 'monthly',
      bedrooms: 2,
      bathrooms: 1,
      locationKey: 'kinondoni',
      distance: '6 km to center',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      type: 'apartment',
      available: true
    },
    {
      id: 7,
      titleKey: 'luxury_3br_apartment',
      price: 600000,
      currency: 'TZS',
      periodKey: 'monthly',
      bedrooms: 3,
      bathrooms: 2,
      locationKey: 'upanga',
      distance: '2 km to center',
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      type: 'apartment',
      available: true
    },
    {
      id: 8,
      titleKey: '1br_apartment',
      price: 200000,
      currency: 'TZS',
      periodKey: 'monthly',
      bedrooms: 1,
      bathrooms: 1,
      locationKey: 'ubungo',
      distance: '8 km to center',
      image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      type: 'apartment',
      available: true
    }
  ];

  // Sort properties
  const sortedProperties = [...properties].sort((a, b) => {
    switch (sortBy) {
      case 'priceAsc':
        return a.price - b.price;
      case 'priceDesc':
        return b.price - a.price;
      case 'newest':
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return b.id - a.id;
      default:
        return 0;
    }
  });

  // Filter properties
  const filteredProperties = sortedProperties.filter(property => {
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
      const numBedrooms = parseInt(filters.bedrooms);
      if (filters.bedrooms === '4+') {
        if (property.bedrooms < 4) return false;
      } else if (property.bedrooms < numBedrooms) {
        return false;
      }
    }
    if (filters.bathrooms && filters.bathrooms !== 'any') {
      const numBathrooms = parseInt(filters.bathrooms);
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
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="sticky top-0 z-20 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t?.browse?.title}
              </h1>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredProperties.length} {t?.browse?.results?.properties}
                </p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <ArrowUpDown className="h-4 w-4" />
                      {t?.browse?.results?.sortOptions?.[sortBy as keyof typeof t.browse.results.sortOptions] as string}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {Object.entries(t?.browse?.results?.sortOptions || {}).map(([key, value]) => (
                      <DropdownMenuItem
                        key={key}
                        onClick={() => setSortBy(key)}
                      >
                        {value as string}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative col-span-1 md:col-span-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  className="pl-10"
                  placeholder={t?.browse?.search?.location}
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                />
              </div>
              
              <Select
                value={filters.propertyType}
                onValueChange={(value) => handleFilterChange('propertyType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t?.browse?.search?.propertyTypes?.all} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t?.browse?.search?.propertyTypes?.all}</SelectItem>
                  {Object.entries(t?.browse?.search?.propertyTypes || {}).map(([key, value]) => (
                    key !== 'all' && (
                      <SelectItem key={key} value={key}>
                        {value as string}
                      </SelectItem>
                    )
                  ))}
                </SelectContent>
              </Select>
              
              <div className="col-span-1">
                <Button 
                  variant="outline" 
                  size="default" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? <X className="h-4 w-4" /> : <SlidersHorizontal className="h-4 w-4" />}
                  {showFilters ? t?.browse?.search?.hideFilters : t?.browse?.search?.moreFilters}
                </Button>
              </div>
              
              <div className="col-span-1">
                <Button 
                  className="w-full flex items-center justify-center gap-2"
                  size="default"
                >
                  <Search className="h-4 w-4" />
                  {t?.browse?.search?.searchButton}
                </Button>
              </div>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 mt-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">
                      {t?.browse?.search?.filters?.bedrooms}
                    </Label>
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

                  <div>
                    <Label className="text-sm font-medium">
                      {t?.browse?.search?.filters?.bathrooms}
                    </Label>
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

                <div className="space-y-4">
                  <Label className="text-sm font-medium">
                    Price Range (TZS)
                  </Label>
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

                <div>
                  <Label className="text-sm font-medium">
                    {t?.browse?.search?.filters?.amenities}
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {amenityOptions.map((amenity) => (
                      <Button
                        key={amenity.id}
                        variant={filters.amenities.includes(amenity.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleAmenityToggle(amenity.id)}
                        className="flex items-center gap-1.5"
                      >
                        <span>{amenity.icon}</span>
                        {t?.property?.amenities?.[amenity.id as keyof typeof t.property.amenities] as string}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {(filters.location !== '' || 
              filters.bedrooms !== 'any' || 
              filters.bathrooms !== 'any' || 
              filters.propertyType !== 'all' || 
              filters.amenities.length > 0 || 
              filters.minPrice > 0 || 
              filters.maxPrice < 1000000 || 
              sortBy !== 'newest') && (
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-gray-600 dark:text-gray-400"
                >
                  {t?.browse?.search?.filters?.clear}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t?.browse?.search?.noResults}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}