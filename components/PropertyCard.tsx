"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Bed, Bath, MapPin, Clock, Star, Check, Home } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Property {
  id: number;
  titleKey: string;
  price: number;
  currency: string;
  periodKey: string;
  bedrooms: number;
  bathrooms: number;
  locationKey: string;
  distance: string;
  image: string;
  type: string;
  available: boolean;
  title?: string;
  location?: string;
  amenities?: string[];
  isNew?: boolean;
  isVerified?: boolean;
  size?: number;
}

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

export default function PropertyCard({ property, featured = false }: PropertyCardProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const [imageError, setImageError] = useState(false);

  // Simple placeholder image as data URL
  const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23cccccc'/%3E%3Cpath d='M195,102.5v95m-95-95h190' stroke='%23ffffff' stroke-width='10'/%3E%3Ctext x='200' y='180' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%23ffffff'%3ENo Image Available%3C/text%3E%3C/svg%3E";

  const formatPrice = (price: number) => {
    try {
      return new Intl.NumberFormat(language === 'en' ? 'en-US' : 'sw-TZ', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);
    } catch (error) {
      return price.toString();
    }
  };

  const propertyTitle = t?.property?.items?.[property.titleKey as keyof typeof t.property.items] || property.title || property.titleKey;
  const propertyLocation = t?.property?.items?.[property.locationKey as keyof typeof t.property.items] || property.location || property.locationKey;
  const propertyType = t?.browse?.search?.propertyTypes?.[property.type as keyof typeof t.browse.search.propertyTypes] || property.type;
  const propertyPeriod = t?.property?.periods?.[property.periodKey as keyof typeof t.property.periods] || 'month';

  return (
    <div 
      className={`group bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${
        featured ? 'ring-2 ring-primary ring-offset-2' : ''
      }`}
    >
      <div className="relative h-52">
        <Image
          src={!imageError ? property.image : placeholderImage}
          alt={propertyTitle}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImageError(true)}
          priority={featured}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute top-0 left-0 right-0 p-2 flex flex-wrap justify-between">
          <div className="flex flex-wrap gap-1.5 max-w-[70%] sm:max-w-[65%]">
            <Badge variant="default" className="bg-white/90 text-primary backdrop-blur-sm text-[10px] sm:text-xs">
              <Home className="w-3 h-3 mr-1 hidden sm:inline" />
              {propertyType}
            </Badge>
            {property.available ? (
              <Badge variant="success" className="backdrop-blur-sm text-[10px] sm:text-xs">
                {t?.property?.available}
              </Badge>
            ) : (
              <Badge variant="destructive" className="backdrop-blur-sm text-[10px] sm:text-xs">
                {t?.property?.unavailable}
              </Badge>
            )}
          </div>
          
          <div className="flex flex-wrap gap-1.5 justify-end items-start max-w-[30%] sm:max-w-[35%]">
            {featured && (
              <Badge variant="default" className="bg-primary text-white backdrop-blur-sm text-[10px] sm:text-xs">
                <Star className="w-3 h-3 mr-1 hidden sm:inline" />
                {t?.property?.featured}
              </Badge>
            )}
            {property.isNew && (
              <Badge variant="default" className="bg-green-500 text-white backdrop-blur-sm text-[10px] sm:text-xs">
                {t?.property?.new}
              </Badge>
            )}
            {property.isVerified && (
              <Badge variant="default" className="bg-blue-500 text-white backdrop-blur-sm text-[10px] sm:text-xs">
                <Check className="w-3 h-3 mr-1 hidden sm:inline" />
                {t?.property?.verified}
              </Badge>
            )}
          </div>
        </div>

        <div className="absolute bottom-2 left-2 right-2">
          <div className="flex flex-wrap items-center gap-1">
            <div className="text-base sm:text-lg font-bold text-white bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">
              {property.currency} {formatPrice(property.price)}
              <span className="text-xs sm:text-sm font-normal text-gray-200 ml-1">
                /{propertyPeriod}
              </span>
            </div>
            <div className="flex-1 min-w-0 flex items-center text-xs sm:text-sm text-gray-200 bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
              <span className="truncate">{propertyLocation}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 mb-4 h-6 sm:h-7">
          {propertyTitle}
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-1.5">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <Bed className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            </div>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {property.bedrooms} {t?.property?.bedrooms}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <Bath className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            </div>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {property.bathrooms} {t?.property?.bathrooms}
            </span>
          </div>
        </div>

        {property.amenities && property.amenities.length > 0 && (
          <div className="mb-4 h-[40px] overflow-hidden relative group-hover:h-auto group-hover:max-h-[80px] group-hover:overflow-y-auto transition-all duration-300">
            <div className="flex flex-wrap gap-1">
              {property.amenities.map((amenity) => (
                <Badge
                  key={amenity}
                  variant="secondary"
                  className="text-xs whitespace-nowrap mb-0.5"
                >
                  {t?.property?.amenities?.[amenity as keyof typeof t.property.amenities]}
                </Badge>
              ))}
            </div>
            {property.amenities.length > 3 && (
              <div className="absolute bottom-0 right-0 left-0 h-4 bg-gradient-to-t from-white dark:from-gray-800 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity duration-300"></div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {property.distance} {t?.property?.distance}
          </div>
          {property.size && (
            <div>
              {property.size} m²
            </div>
          )}
        </div>

        <Button 
          asChild
          className="w-full"
          aria-label={t?.property?.viewDetails}
        >
          <Link href={`/properties/${property.id}`}>
            {t?.property?.viewDetails}
          </Link>
        </Button>
      </div>
    </div>
  );
}