"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Bed, Bath, MapPin, Star, Ruler, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

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

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer",
        featured ? "ring-2 ring-primary shadow-xl dark:shadow-primary/20" : "shadow-lg hover:shadow-xl",
        isHovered ? "transform-gpu scale-[1.02]" : ""
      )}
    >
      <Link href={`/properties/${property.id}`} className="block h-full w-full transition-colors">
        <div className={cn(
          "absolute inset-0 opacity-0 bg-primary/5 transition-opacity",
          isHovered ? "opacity-100" : ""
        )} />
        
        {/* Image Section */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={!imageError ? property.image : placeholderImage}
            alt={propertyTitle}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={cn(
              "object-cover transition-all duration-700",
              imageLoaded ? "opacity-100" : "opacity-0",
              isHovered ? "scale-110" : "scale-100"
            )}
            onError={() => setImageError(true)}
            onLoad={() => setImageLoaded(true)}
            loading={featured ? "eager" : "lazy"}
            priority={featured}
          />
          
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700 animate-pulse" />
          )}
          
          {/* Heart Button */}
          <button 
            onClick={toggleFavorite}
            className={cn(
              "absolute top-3 right-3 p-2.5 rounded-full z-10 backdrop-blur-sm transition-all duration-300 transform",
              isFavorited 
                ? "bg-red-500 text-white rotate-0 scale-100" 
                : "bg-black/30 text-white hover:bg-black/50 opacity-80 group-hover:opacity-100",
              isHovered && !isFavorited ? "rotate-12 scale-110" : ""
            )}
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={cn("w-5 h-5", isFavorited ? "fill-current" : "")} />
          </button>
          
          {/* Property Status Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {featured && (
              <Badge variant="default" className="bg-primary text-white shadow-lg">
                <Star className="w-3.5 h-3.5 mr-1 fill-current" />
                {t?.property?.featured || "Featured"}
              </Badge>
            )}
            
            {property.isNew && (
              <Badge variant="default" className="bg-green-500 text-white shadow-lg">
                {t?.property?.new || "New"}
              </Badge>
            )}
            
            {property.isVerified && (
              <Badge variant="default" className="bg-blue-500 text-white shadow-lg">
                {t?.property?.verified || "Verified"}
              </Badge>
            )}
          </div>
          
          {/* Property Type */}
          <div className="absolute bottom-3 left-3 z-10">
            <Badge variant="outline" className="bg-black/60 text-white border-none shadow-lg backdrop-blur-sm">
              {propertyType}
            </Badge>
            
            <Badge 
              variant={property.available ? "default" : "destructive"} 
              className={cn(
                "shadow-lg ml-2",
                property.available ? "bg-emerald-500 text-white" : ""
              )}
            >
              {property.available ? t?.property?.available || "Available" : t?.property?.unavailable || "Not Available"}
            </Badge>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-5">
          {/* Price - Moved to top with larger font */}
          <div className="mb-2 text-xl font-bold text-primary">
            {property.currency} {formatPrice(property.price)}
            <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-1">
              /{propertyPeriod}
            </span>
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 mb-2 group-hover:text-primary transition-colors">
            {propertyTitle}
          </h3>
          
          {/* Location */}
          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="truncate text-sm">{propertyLocation}</span>
          </div>
          
          {/* Features - Redesigned with horizontal layout */}
          <div className="flex justify-between mb-4 px-2 py-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
            <div className="flex items-center">
              <Bed className="w-4 h-4 text-primary mr-1.5" />
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {property.bedrooms}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t?.property?.bedrooms || "Beds"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Bath className="w-4 h-4 text-primary mr-1.5" />
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {property.bathrooms}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t?.property?.bathrooms || "Baths"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Ruler className="w-4 h-4 text-primary mr-1.5" />
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {property.size || "--"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  m²
                </p>
              </div>
            </div>
          </div>
          
          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {property.amenities.slice(0, 3).map((amenity) => (
                <Badge
                  key={amenity}
                  variant="secondary"
                  className="text-xs py-1 px-2 h-auto bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {t?.property?.amenities?.[amenity as keyof typeof t.property.amenities] || amenity}
                </Badge>
              ))}
              {property.amenities.length > 3 && (
                <Badge 
                  variant="outline" 
                  className="text-xs whitespace-nowrap py-1 px-2 h-auto"
                >
                  +{property.amenities.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}