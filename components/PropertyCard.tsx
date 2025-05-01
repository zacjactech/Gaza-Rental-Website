"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Bed, Bath } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';

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
}

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative h-48">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{property.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{property.location}</p>
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">{property.bedrooms} {t.property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">{property.bathrooms} {t.property.bathrooms}</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="text-lg font-bold text-primary">
            {property.currency} {property.price.toLocaleString()} <span className="text-sm font-normal text-gray-600">{t.property.perMonth}</span>
          </div>
          <Link 
            href={`/properties/${property.id}`}
            className="block w-full text-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors duration-300"
          >
            {t.property.viewDetails}
          </Link>
        </div>
      </div>
    </div>
  );
}