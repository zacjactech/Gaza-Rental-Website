"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';

const Hero = () => {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [rooms, setRooms] = useState('');
  const { language } = useLanguage();
  const t = translations[language];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build query parameters
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (priceRange) params.append('priceRange', priceRange);
    if (rooms) params.append('rooms', rooms);

    // Redirect to browse page with search parameters
    router.push(`/browse?${params.toString()}`);
  };

  return (
    <section className="relative h-[500px] w-full">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: "url('https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}
      >
        <div className="absolute inset-0 hero-search-gradient" />
      </div>
      
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 text-center">
          {t.hero.title}
        </h1>
        
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{t.hero.subtitle}</h2>
          
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                placeholder={t.hero.location}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <select
                className="block w-full pl-3 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="">{t.hero.priceRange}</option>
                <option value="0-200000">Under 200,000 TZS</option>
                <option value="200000-300000">200,000 - 300,000 TZS</option>
                <option value="300000-500000">300,000 - 500,000 TZS</option>
                <option value="500000-">Above 500,000 TZS</option>
              </select>
            </div>
            
            <div className="relative">
              <select
                className="block w-full pl-3 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
              >
                <option value="">{t.hero.rooms}</option>
                <option value="1">1 Room</option>
                <option value="2">2 Rooms</option>
                <option value="3">3 Rooms</option>
                <option value="4">4+ Rooms</option>
              </select>
            </div>
            
            <Button type="submit" className="w-full flex items-center justify-center gap-2">
              <Search className="h-4 w-4" />
              {t.hero.search}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;