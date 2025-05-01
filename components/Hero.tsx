"use client"

import { useState } from 'react';
import { MapPin, Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [rooms, setRooms] = useState('');
  const { t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log({ location, priceRange, rooms });
  };

  return (
    <section className="relative h-[500px] w-full">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: "url('https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}
      >
        <div className="absolute inset-0 hero-search-gradient" />
      </div>
      
      <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 text-center">
          {t('findHome')}
        </h1>
        
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{t('searchProperties')}</h2>
          
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                placeholder={t('location')}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400 font-medium">TZS</span>
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                placeholder={t('priceRange')}
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <select
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
              >
                <option value="">{t('rooms')}</option>
                <option value="1">1 {t('rooms')}</option>
                <option value="2">2 {t('rooms')}</option>
                <option value="3">3 {t('rooms')}</option>
                <option value="4+">4+ {t('rooms')}</option>
              </select>
            </div>
            
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
              <Search className="h-4 w-4 mr-2" />
              {t('search')}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;