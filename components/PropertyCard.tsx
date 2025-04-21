"use client"

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Bed, Bath } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PropertyProps {
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
}

interface PropertyCardProps {
  property: PropertyProps;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const { 
    id, 
    title, 
    price, 
    currency, 
    period, 
    bedrooms,
    bathrooms,
    location,
    distance,
    image 
  } = property;

  const formattedPrice = new Intl.NumberFormat().format(price);

  return (
    <div className="property-card bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg">
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          style={{ objectFit: 'cover' }}
          className="transition-all duration-300 hover:scale-105"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        
        <div className="flex items-center mb-3">
          <span className="text-xl font-bold text-primary">
            {currency} {formattedPrice}
          </span>
          <span className="text-gray-600 dark:text-gray-400 ml-1">/{period}</span>
        </div>
        
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Bed className="h-4 w-4 mr-1" />
            <span className="text-sm">{bedrooms}</span>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Bath className="h-4 w-4 mr-1" />
            <span className="text-sm">{bathrooms}</span>
          </div>
        </div>
        
        <div className="flex items-start mb-4">
          <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 mr-1 flex-shrink-0" />
          <div className="flex flex-col">
            <span className="text-sm text-gray-700 dark:text-gray-300">{location}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{distance}</span>
          </div>
        </div>
        
        <Button 
          className="w-full" 
          variant="default"
          asChild
        >
          <Link href={`/properties/${id}`}>
            Book Now
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PropertyCard;