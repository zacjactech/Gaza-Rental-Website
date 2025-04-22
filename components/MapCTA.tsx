"use client"

import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';

const MapCTA = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.mapCTA.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            {t.mapCTA.subtitle}
          </p>
          <Link 
            href="/map-view" 
            className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            {t.mapCTA.button}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MapCTA;