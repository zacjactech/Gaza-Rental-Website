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
  const [imageLoaded, setImageLoaded] = useState(false);

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
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg ${
        featured ? 'ring-2 ring-primary ring-offset-2' : ''
      }`}
    >
      <div className="relative h-40 sm:h-52">
        <Image
          src={!imageError ? property.image : placeholderImage}
          alt={propertyTitle}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          className={`object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onError={() => setImageError(true)}
          onLoad={() => setImageLoaded(true)}
          loading={featured ? "eager" : "lazy"}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute top-0 left-0 right-0 p-1.5 sm:p-2 flex flex-wrap justify-between">
          <div className="flex flex-wrap gap-1 sm:gap-1.5 max-w-[70%]">
            <Badge variant="default" className="bg-white/90 text-primary backdrop-blur-sm text-[9px] sm:text-xs py-0 sm:py-0.5 px-1 sm:px-1.5 h-auto">
              <Home className="w-2.5 h-2.5 mr-0.5 sm:w-3 sm:h-3 sm:mr-1 hidden sm:inline" />
              {propertyType}
            </Badge>
            {property.available ? (
              <Badge variant="success" className="backdrop-blur-sm text-[9px] sm:text-xs py-0 sm:py-0.5 px-1 sm:px-1.5 h-auto">
                {t?.property?.available}
              </Badge>
            ) : (
              <Badge variant="destructive" className="backdrop-blur-sm text-[9px] sm:text-xs py-0 sm:py-0.5 px-1 sm:px-1.5 h-auto">
                {t?.property?.unavailable}
              </Badge>
            )}
          </div>
          
          <div className="flex flex-wrap gap-1 sm:gap-1.5 justify-end items-start max-w-[30%]">
            {featured && (
              <Badge variant="default" className="bg-primary text-white backdrop-blur-sm text-[9px] sm:text-xs py-0 sm:py-0.5 px-1 sm:px-1.5 h-auto">
                <Star className="w-2.5 h-2.5 mr-0.5 sm:w-3 sm:h-3 sm:mr-1 hidden sm:inline" />
                {t?.property?.featured}
              </Badge>
            )}
            {property.isNew && (
              <Badge variant="default" className="bg-green-500 text-white backdrop-blur-sm text-[9px] sm:text-xs py-0 sm:py-0.5 px-1 sm:px-1.5 h-auto">
                {t?.property?.new}
              </Badge>
            )}
            {property.isVerified && (
              <Badge variant="default" className="bg-blue-500 text-white backdrop-blur-sm text-[9px] sm:text-xs py-0 sm:py-0.5 px-1 sm:px-1.5 h-auto">
                <Check className="w-2.5 h-2.5 mr-0.5 sm:w-3 sm:h-3 sm:mr-1 hidden sm:inline" />
                {t?.property?.verified}
              </Badge>
            )}
          </div>
        </div>

        <div className="absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 right-1.5 sm:right-2">
          <div className="flex flex-wrap items-center gap-1">
            <div className="text-sm sm:text-base font-bold text-white bg-black/50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md backdrop-blur-sm">
              {property.currency} {formatPrice(property.price)}
              <span className="text-[10px] sm:text-xs font-normal text-gray-200 ml-1">
                /{propertyPeriod}
              </span>
            </div>
            <div className="flex-1 min-w-0 flex items-center text-[10px] sm:text-xs text-gray-200 bg-black/50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md backdrop-blur-sm">
              <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1 flex-shrink-0" />
              <span className="truncate">{propertyLocation}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white line-clamp-1 mb-3 sm:mb-4">
          {propertyTitle}
        </h3>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <div className="p-1 sm:p-1.5 bg-primary/10 rounded-lg">
              <Bed className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            </div>
            <span className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
              {property.bedrooms} {t?.property?.bedrooms}
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <div className="p-1 sm:p-1.5 bg-primary/10 rounded-lg">
              <Bath className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            </div>
            <span className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
              {property.bathrooms} {t?.property?.bathrooms}
            </span>
          </div>
        </div>

        {property.amenities && property.amenities.length > 0 && (
          <div className="mb-3 sm:mb-4 h-[32px] sm:h-[40px] overflow-hidden">
            <div className="flex flex-wrap gap-1">
              {property.amenities.slice(0, 3).map((amenity) => (
                <Badge
                  key={amenity}
                  variant="secondary"
                  className="text-[9px] sm:text-xs whitespace-nowrap mb-0.5 py-0 px-1.5 h-auto"
                >
                  {t?.property?.amenities?.[amenity as keyof typeof t.property.amenities]}
                </Badge>
              ))}
              {property.amenities.length > 3 && (
                <Badge variant="outline" className="text-[9px] sm:text-xs whitespace-nowrap mb-0.5 py-0 px-1.5 h-auto">
                  +{property.amenities.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
          <div className="flex items-center">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" />
            {property.distance} {t?.property?.distance}
          </div>
          {property.size && (
            <div>
              {property.size} m²
            </div>
          )}
        </div>

        <Link 
          href={`/properties/${property.id}`}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs sm:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 sm:h-9 px-3 sm:px-4 py-1.5 sm:py-2 w-full"
          prefetch={true}
        >
          {t?.property?.viewDetails}
        </Link>
      </div>
    </div>
  );
}