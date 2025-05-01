"use client";

import { useState } from 'react';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Home, 
  Filter,
  SlidersHorizontal,
  X
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useLanguage } from '@/contexts/LanguageContext';

// Mock data for properties
  const properties = [
    {
      id: 1,
    title: 'Cozy 2 Bedroom Apartment in Mikocheni',
      price: 250000,
      currency: 'TZS',
      period: 'month',
      bedrooms: 2,
      bathrooms: 1,
    area: 85,
    areaUnit: 'sqm',
      location: 'Mikocheni, Dar es Salaam',
      image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 2,
    title: 'Modern 3 Bedroom House in Oyster Bay',
    price: 450000,
      currency: 'TZS',
      period: 'month',
      bedrooms: 3,
      bathrooms: 2,
    area: 150,
    areaUnit: 'sqm',
    location: 'Oyster Bay, Dar es Salaam',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 3,
    title: 'Luxury 4 Bedroom Villa in Masaki',
    price: 850000,
      currency: 'TZS',
      period: 'month',
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    areaUnit: 'sqm',
    location: 'Masaki, Dar es Salaam',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 4,
      title: 'Studio Apartment in City Center',
      price: 150000,
      currency: 'TZS',
      period: 'month',
      bedrooms: 1,
      bathrooms: 1,
    area: 45,
    areaUnit: 'sqm',
      location: 'City Center, Dar es Salaam',
      image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

export default function BrowsePage() {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedBedrooms, setSelectedBedrooms] = useState<number[]>([]);
  const { t } = useLanguage();

  const toggleBedroom = (bedroom: number) => {
    if (selectedBedrooms.includes(bedroom)) {
      setSelectedBedrooms(selectedBedrooms.filter(b => b !== bedroom));
    } else {
      setSelectedBedrooms([...selectedBedrooms, bedroom]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar */}
          <div className={`w-full md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('filters')}
                </h2>
                <button 
                  className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Location filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('location')}
                  </label>
                  <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder={t('enterLocation')}
                    />
                  </div>
                </div>

                {/* Price range filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('priceRange')}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={1000000}
                    step={50000}
                    className="mb-2"
                />
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>TZS {priceRange[0].toLocaleString()}</span>
                    <span>TZS {priceRange[1].toLocaleString()}</span>
                  </div>
              </div>
              
                {/* Bedrooms filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('bedrooms')}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((bedroom) => (
                      <button
                        key={bedroom}
                        onClick={() => toggleBedroom(bedroom)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedBedrooms.includes(bedroom)
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {bedroom}
                      </button>
                    ))}
                  </div>
              </div>
              
                <Button className="w-full">
                  {t('applyFilters')}
                </Button>
              </div>
            </div>
              </div>
              
          {/* Main content */}
          <div className="flex-1">
            {/* Search bar and filters toggle */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder={t('searchLocation')}
                    />
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                  <span className="md:hidden">{t('filters')}</span>
                  <SlidersHorizontal className="h-4 w-4 md:hidden" />
                </Button>
              </div>
            </div>
            
            {/* Properties grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Link 
                  key={property.id}
                  href={`/properties/${property.id}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="relative h-48">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {property.title}
                    </h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 text-gray-600 dark:text-gray-400 mr-1" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {property.bedrooms}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Bath className="h-4 w-4 text-gray-600 dark:text-gray-400 mr-1" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {property.bathrooms}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Home className="h-4 w-4 text-gray-600 dark:text-gray-400 mr-1" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {property.area} {t('sqm')}
                          </span>
                        </div>
                      </div>
                      <div className="text-lg font-semibold text-primary">
                        {property.currency} {property.price.toLocaleString()}
                        <span className="text-sm text-gray-600 dark:text-gray-400">/{t('month')}</span>
            </div>
          </div>
        </div>
                </Link>
              ))}
      </div>
          </div>
        </div>
        </div>
      </div>
  );
}