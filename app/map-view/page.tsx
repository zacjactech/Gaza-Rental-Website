"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Search, Filter, List, MapPin, X } from 'lucide-react';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { LatLngTuple } from 'leaflet';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
      </div>
    </div>
  )
});

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
  amenities: string[];
}

export default function MapViewPage() {
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations];
  const [showList, setShowList] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('location') || '');
  const [priceRange, setPriceRange] = useState('');
  const [properties] = useState<Property[]>([
  {
    id: 1,
      title: "Modern Apartment in City Center",
      price: 1200,
      currency: "USD",
      period: "month",
    bedrooms: 2,
    bathrooms: 1,
      location: "Gaza City",
      distance: "2.5 km from center",
      image: "/images/property1.jpg",
      coordinates: [31.5014, 34.4668],
      amenities: ["Parking", "Security", "Gym"]
  },
  {
    id: 2,
      title: "Luxury Villa with Pool",
      price: 2500,
      currency: "USD",
      period: "month",
      bedrooms: 4,
      bathrooms: 3,
      location: "Rimal",
      distance: "1.5 km from beach",
      image: "/images/property2.jpg",
      coordinates: [31.5114, 34.4568],
      amenities: ["Pool", "Garden", "Parking", "Security"]
  },
  {
    id: 3,
      title: "Studio Apartment",
      price: 800,
      currency: "USD",
      period: "month",
    bedrooms: 1,
    bathrooms: 1,
      location: "Shati",
      distance: "3 km from center",
      image: "/images/property3.jpg",
      coordinates: [31.5214, 34.4468],
      amenities: ["Security", "Parking"]
  },
  {
    id: 4,
    title: 'Family 4BR House in Oyster Bay',
    price: 750000,
    currency: 'TZS',
    period: 'month',
    bedrooms: 4,
    bathrooms: 3,
    location: 'Oyster Bay, Dar es Salaam',
    distance: '4 km to center',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      coordinates: [-6.755, 39.265] as LatLngTuple,
      amenities: ["Parking", "Security", "Garden", "Pool"]
    }
  ]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: searchParams.get('priceRange') || '',
    rooms: searchParams.get('rooms') || '',
    amenities: [] as string[]
  });

  const handleFilterChange = (key: keyof typeof filters, value: string | string[]) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const filteredProperties = properties.filter(property => {
    // Location search - check both location and title
    if (searchQuery) {
      const searchTerm = searchQuery.toLowerCase();
      const locationMatch = property.location.toLowerCase().includes(searchTerm);
      const titleMatch = property.title.toLowerCase().includes(searchTerm);
      if (!locationMatch && !titleMatch) return false;
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (max && (property.price < min || property.price > max)) return false;
      if (!max && property.price < min) return false;
    }

    // Rooms filter
    if (filters.rooms) {
      const requiredRooms = parseInt(filters.rooms);
      if (property.bedrooms < requiredRooms) return false;
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      if (!filters.amenities.every(amenity => property.amenities.includes(amenity))) {
        return false;
      }
    }

    return true;
  });

  const clearFilters = () => {
    setFilters({
      priceRange: '',
      rooms: '',
      amenities: []
    });
    setPriceRange('');
    setSearchQuery('');
  };

  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-primary/10 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Map View
          </h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative col-span-1 md:col-span-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Search area or neighborhood"
                />
              </div>
              
              <div className="col-span-1">
                <select 
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="">Price Range</option>
                  <option value="0-200000">Under 200,000 TZS</option>
                  <option value="200000-300000">200,000 - 300,000 TZS</option>
                  <option value="300000-500000">300,000 - 500,000 TZS</option>
                  <option value="500000-">Above 500,000 TZS</option>
                </select>
              </div>
              
              <div className="col-span-1">
                <Button 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => {
                    setSearchQuery('');
                    setPriceRange('');
                  }}
                >
                  <Search className="h-4 w-4" />
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 relative">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => setShowList(!showList)}
            className="flex items-center gap-1"
          >
            {showList ? <MapPin className="h-4 w-4" /> : <List className="h-4 w-4" />}
            {showList ? 'Show Map' : 'Show List'}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowFilters(true)}
            className="bg-white dark:bg-gray-800 flex items-center gap-1"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
        
        {/* Filter Drawer */}
        {showFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:items-center justify-center">
            <div className="bg-white dark:bg-gray-800 w-full md:w-[500px] h-[80vh] md:h-auto rounded-t-xl md:rounded-xl p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Rooms</label>
                  <select
                    value={filters.rooms}
                    onChange={(e) => handleFilterChange('rooms', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Amenities</label>
                  <select
                    value={filters.amenities.join(',')}
                    onChange={(e) => handleFilterChange('amenities', e.target.value.split(','))}
                    className="w-full px-3 py-2 border rounded-md"
                    multiple
                  >
                    <option value="">Any</option>
                    <option value="air-conditioning">Air Conditioning</option>
                    <option value="parking">Parking</option>
                    <option value="gym">Gym</option>
                    <option value="swimming-pool">Swimming Pool</option>
                  </select>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={clearFilters}
                  >
                    Clear All
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => setShowFilters(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 h-[calc(100vh-180px)] md:h-[calc(100vh-140px)] pb-8">
          {showList ? (
            <div className="overflow-auto p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </div>
          ) : (
            <MapComponent properties={filteredProperties} />
          )}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}