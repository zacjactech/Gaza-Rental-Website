"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Bed, Bath, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';

interface PropertyCardProps {
  property: {
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
  };
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
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
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Bed className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.bedrooms} {t.featured.rooms}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Bath className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.bathrooms} {t.featured.bathrooms}</span>
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            {property.distance}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-primary font-semibold">
            {property.currency} {property.price.toLocaleString()} {t.featured.perMonth}
          </div>
          <Link 
            href={`/property/${property.id}`}
            className="text-sm text-primary hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;