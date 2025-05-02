"use client"

import Link from 'next/link';
import { Map } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { Button } from '@/components/ui/button';

const MapCTA = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
              Explore Properties on the Map
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Find properties in your preferred location with our interactive map view. 
              Easily filter by price, amenities, and more.
            </p>
            <Button asChild>
              <Link href="/map-view" className="inline-flex items-center">
                <Map className="h-4 w-4 mr-2" />
                View Map
              </Link>
            </Button>
          </div>
          
          <div className="w-full md:w-1/2 h-64 md:h-80 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126915.03200000001!2d39.2083283!3d-6.7923542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4f0f9e6b0c8d%3A0x90a5a1e45a1b1b1b!2sDar%20es%20Salaam%2C%20Tanzania!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapCTA;