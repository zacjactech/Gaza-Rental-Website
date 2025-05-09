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
    <section className="py-12 sm:py-16 md:py-20 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-16">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Explore Properties on the Map
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg max-w-md mx-auto md:mx-0">
              Find properties in your preferred location with our interactive map view. 
              Easily filter by price, amenities, and more.
            </p>
            <Button asChild size="lg" className="px-6 w-full sm:w-auto">
              <Link href="/map-view" className="inline-flex items-center justify-center">
                <Map className="h-5 w-5 mr-2" />
                View Map
              </Link>
            </Button>
          </div>
          
          <div className="w-full md:w-1/2 h-64 sm:h-72 md:h-80 lg:h-96 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-md mt-8 md:mt-0">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126915.03200000001!2d39.2083283!3d-6.7923542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4f0f9e6b0c8d%3A0x90a5a1e45a1b1b1b!2sDar%20es%20Salaam%2C%20Tanzania!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="Property Map"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapCTA;