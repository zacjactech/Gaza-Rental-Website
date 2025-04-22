"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Search, Filter, List, MapPin, X } from 'lucide-react';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';

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

// Mock properties data
const properties = [
  {
    id: 1,
    title: 'Cozy 2BR Apartment in Mikocheni',
    price: 250000,
    currency: 'TZS',
    period: 'month',
    bedrooms: 2,
    bathrooms: 1,
    location: 'Mikocheni, Dar es Salaam',
    distance: '5 km to center',
    image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    coordinates: { lat: -6.765, lng: 39.245 }
  },
  {
    id: 2,
    title: 'Modern 3BR Villa in Masaki',
    price: 500000,
    currency: 'TZS',
    period: 'month',
    bedrooms: 3,
    bathrooms: 2,
    location: 'Masaki, Dar es Salaam',
    distance: '3 km to center',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    coordinates: { lat: -6.775, lng: 39.275 }
  },
  {
    id: 3,
    title: 'Spacious 1BR Apartment in Mbezi',
    price: 180000,
    currency: 'TZS',
    period: 'month',
    bedrooms: 1,
    bathrooms: 1,
    location: 'Mbezi, Dar es Salaam',
    distance: '10 km to center',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    coordinates: { lat: -6.735, lng: 39.225 }
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
    coordinates: { lat: -6.755, lng: 39.265 }
  }
];

export default function MapViewPage() {
  const [showList, setShowList] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    bedrooms: '',
    bathrooms: '',
    propertyType: '',
    minPrice: '',
    maxPrice: ''
  });

  // Filter properties based on search query and filters
  useEffect(() => {
    let filtered = [...properties];
    
    // Filter by search query (location or title)
    if (searchQuery) {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by price range
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(property => {
        if (max) {
          return property.price >= min && property.price <= max;
        } else {
          return property.price >= min;
        }
      });
    }

    // Apply additional filters
    if (filters.bedrooms) {
      filtered = filtered.filter(property => property.bedrooms === parseInt(filters.bedrooms));
    }
    if (filters.bathrooms) {
      filtered = filtered.filter(property => property.bathrooms === parseInt(filters.bathrooms));
    }
    if (filters.minPrice) {
      filtered = filtered.filter(property => property.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(property => property.price <= parseInt(filters.maxPrice));
    }
    
    setFilteredProperties(filtered);
  }, [searchQuery, priceRange, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      bedrooms: '',
      bathrooms: '',
      propertyType: '',
      minPrice: '',
      maxPrice: ''
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
                  <label className="block text-sm font-medium mb-2">Bedrooms</label>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
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
                  <label className="block text-sm font-medium mb-2">Bathrooms</label>
                  <select
                    value={filters.bathrooms}
                    onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price Range</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="w-1/2 px-3 py-2 border rounded-md"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="w-1/2 px-3 py-2 border rounded-md"
                    />
                  </div>
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
        
        <div className="grid grid-cols-1 h-[calc(100vh-240px)] md:h-[calc(100vh-200px)] pb-16">
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