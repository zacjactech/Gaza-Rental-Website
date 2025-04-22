"use client";

import PropertyCard from '@/components/PropertyCard';
import Footer from '@/components/Footer';
import { Filter, MapPin, Search, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { useState } from 'react';

export default function BrowsePage() {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations];
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    priceRange: '',
    bedrooms: '',
    bathrooms: '',
    amenities: [] as string[]
  });
  const itemsPerPage = 8;

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
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
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
      image: 'https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
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
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
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
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 5,
      title: 'Studio Apartment in City Center',
      price: 150000,
      currency: 'TZS',
      period: 'month',
      bedrooms: 1,
      bathrooms: 1,
      location: 'City Center, Dar es Salaam',
      distance: '1 km to center',
      image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 6,
      title: 'Modern 2BR Apartment in Kinondoni',
      price: 280000,
      currency: 'TZS',
      period: 'month',
      bedrooms: 2,
      bathrooms: 1,
      location: 'Kinondoni, Dar es Salaam',
      distance: '6 km to center',
      image: 'https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 7,
      title: 'Luxury 3BR Apartment in Upanga',
      price: 600000,
      currency: 'TZS',
      period: 'month',
      bedrooms: 3,
      bathrooms: 2,
      location: 'Upanga, Dar es Salaam',
      distance: '2 km to center',
      image: 'https://images.pexels.com/photos/1571464/pexels-photo-1571464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 8,
      title: '1BR Apartment near University',
      price: 200000,
      currency: 'TZS',
      period: 'month',
      bedrooms: 1,
      bathrooms: 1,
      location: 'Ubungo, Dar es Salaam',
      distance: '8 km to center',
      image: 'https://images.pexels.com/photos/1571465/pexels-photo-1571465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 9,
      title: 'Penthouse Suite in City Center',
      price: 1200000,
      currency: 'TZS',
      period: 'month',
      bedrooms: 3,
      bathrooms: 2,
      location: 'City Center, Dar es Salaam',
      distance: '0.5 km to center',
      image: 'https://images.pexels.com/photos/1571466/pexels-photo-1571466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 10,
      title: 'Beachfront Villa in Msasani',
      price: 2000000,
      currency: 'TZS',
      period: 'month',
      bedrooms: 4,
      bathrooms: 3,
      location: 'Msasani, Dar es Salaam',
      distance: '7 km to center',
      image: 'https://images.pexels.com/photos/1571469/pexels-photo-1571469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 11,
      title: 'Cozy Studio in Oyster Bay',
      price: 180000,
      currency: 'TZS',
      period: 'month',
      bedrooms: 1,
      bathrooms: 1,
      location: 'Oyster Bay, Dar es Salaam',
      distance: '4 km to center',
      image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 12,
      title: 'Modern 2BR in Masaki',
      price: 450000,
      currency: 'TZS',
      period: 'month',
      bedrooms: 2,
      bathrooms: 2,
      location: 'Masaki, Dar es Salaam',
      distance: '3 km to center',
      image: 'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 13,
      title: 'Family Home in Mikocheni',
      price: 800000,
      currency: 'TZS',
      period: 'month',
      bedrooms: 4,
      bathrooms: 3,
      location: 'Mikocheni, Dar es Salaam',
      distance: '5 km to center',
      image: 'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 14,
      title: 'Luxury Apartment in Upanga',
      price: 550000,
      currency: 'TZS',
      period: 'month',
      bedrooms: 2,
      bathrooms: 2,
      location: 'Upanga, Dar es Salaam',
      distance: '2 km to center',
      image: 'https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 15,
      title: 'Studio in Kinondoni',
      price: 160000,
      currency: 'TZS',
      period: 'month',
      bedrooms: 1,
      bathrooms: 1,
      location: 'Kinondoni, Dar es Salaam',
      distance: '6 km to center',
      image: 'https://images.pexels.com/photos/1571473/pexels-photo-1571473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 16,
      title: '3BR Villa in Mbezi',
      price: 900000,
      currency: 'TZS',
      period: 'month',
      bedrooms: 3,
      bathrooms: 2,
      location: 'Mbezi, Dar es Salaam',
      distance: '10 km to center',
      image: 'https://images.pexels.com/photos/1571474/pexels-photo-1571474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  const totalPages = Math.ceil(properties.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleAmenityToggle = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      propertyType: '',
      priceRange: '',
      bedrooms: '',
      bathrooms: '',
      amenities: []
    });
    setCurrentPage(1);
  };

  // Sort and filter properties
  const filteredProperties = properties
    .filter(property => {
      if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (filters.propertyType && property.title.toLowerCase().indexOf(filters.propertyType.toLowerCase()) === -1) return false;
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (max && (property.price < min || property.price > max)) return false;
        if (!max && property.price < min) return false;
      }
      if (filters.bedrooms && property.bedrooms !== Number(filters.bedrooms)) return false;
      if (filters.bathrooms && property.bathrooms !== Number(filters.bathrooms)) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
        default:
          return b.id - a.id;
      }
    });

  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-primary/10 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {t.browse.title}
          </h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative col-span-1 md:col-span-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder={t.browse.search.location}
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                />
              </div>
              
              <div className="col-span-1">
                <select 
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={filters.propertyType}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                >
                  <option value="">{t.browse.search.propertyType}</option>
                  <option value="apartment">{t.browse.search.propertyTypes.apartment}</option>
                  <option value="house">{t.browse.search.propertyTypes.house}</option>
                  <option value="villa">{t.browse.search.propertyTypes.villa}</option>
                  <option value="studio">{t.browse.search.propertyTypes.studio}</option>
                </select>
              </div>
              
              <div className="col-span-1">
                <select 
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                >
                  <option value="">{t.browse.search.priceRange}</option>
                  <option value="0-200000">{t.browse.search.priceRanges.under200k}</option>
                  <option value="200000-300000">{t.browse.search.priceRanges.under300k}</option>
                  <option value="300000-500000">{t.browse.search.priceRanges.under500k}</option>
                  <option value="500000-1000000">Under 1M TZS</option>
                  <option value="1000000-">Above 1M TZS</option>
                </select>
              </div>
              
              <div className="col-span-1">
                <Button className="w-full flex items-center justify-center gap-2">
                  <Search className="h-4 w-4" />
                  {t.browse.search.searchButton}
                </Button>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                {t.browse.search.moreFilters}
              </Button>
              {Object.values(filters).some(value => 
                typeof value === 'string' ? value !== '' : 
                Array.isArray(value) ? value.length > 0 : false
              ) && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
                  onClick={clearFilters}
                >
                  <X className="h-4 w-4" />
                  Clear Filters
                </Button>
              )}
            </div>

            {showFilters && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bedrooms
                  </label>
                  <select
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    value={filters.bedrooms}
                    onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  >
                    <option value="">Any</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bathrooms
                  </label>
                  <select
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    value={filters.bathrooms}
                    onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                  >
                    <option value="">Any</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Amenities
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'parking', label: 'Parking' },
                      { id: 'pool', label: 'Swimming Pool' },
                      { id: 'gym', label: 'Gym' },
                      { id: 'security', label: 'Security' }
                    ].map((amenity) => (
                      <Button
                        key={amenity.id}
                        variant={filters.amenities.includes(amenity.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleAmenityToggle(amenity.id)}
                      >
                        {amenity.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            {t.browse.results.showing} <span className="font-semibold text-gray-900 dark:text-white">{filteredProperties.length}</span> {t.browse.results.properties}
          </p>
          
          <div className="flex items-center">
            <span className="text-gray-600 dark:text-gray-400 mr-2">{t.browse.results.sortBy}</span>
            <select 
              className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="newest">{t.browse.results.sortOptions.newest}</option>
              <option value="price-asc">{t.browse.results.sortOptions.priceAsc}</option>
              <option value="price-desc">{t.browse.results.sortOptions.priceDesc}</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No properties found matching your criteria
            </p>
          </div>
        )}
        
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center">
            <nav className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  onClick={() => handlePageChange(page)}
                  className="h-8 w-8"
                >
                  {page}
                </Button>
              ))}
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </nav>
          </div>
        )}
      </div>
      
      <Footer />
    </main>
  );
}