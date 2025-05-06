"use client"

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="small-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect width="80" height="80" fill="url(#small-grid)" />
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl"
            >
              <span className="block text-primary">{t?.hero?.title1 || 'Find Your Perfect'}</span>
              <span className="block">{t?.hero?.title2 || 'Home in Gaza'}</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-6 max-w-lg mx-auto lg:mx-0 text-xl text-gray-600 dark:text-gray-300"
            >
              {t?.hero?.description || 'Browse thousands of verified rental listings and find your new home with ease. Experience a seamless renting journey with trusted landlords.'}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8 sm:flex sm:justify-center lg:justify-start gap-4"
            >
              <Button asChild size="lg" className="w-full sm:w-auto mb-4 sm:mb-0 transition-all hover:scale-105 shadow-md">
                <Link href="/browse">
                  <Search className="mr-2 h-4 w-4" />
                  {t?.hero?.browseButton || 'Browse Properties'}
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto border-2 transition-all hover:scale-105 shadow-md">
                <Link href="/map-view">
                  <MapPin className="mr-2 h-4 w-4" />
                  {t?.hero?.mapButton || 'View Map'}
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-12 grid grid-cols-3 gap-6 text-center lg:text-left"
            >
              <div>
                <p className="text-4xl font-bold text-primary">500+</p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t?.hero?.stats?.properties || 'Properties'}</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary">98%</p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t?.hero?.stats?.satisfaction || 'Customer Satisfaction'}</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary">24/7</p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t?.hero?.stats?.support || 'Support'}</p>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex-1 relative w-full max-w-lg lg:max-w-none rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="aspect-w-16 aspect-h-9 sm:aspect-w-4 sm:aspect-h-3">
              <img 
                src="https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="Gaza Rental Property"
                className="object-cover w-full h-full rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl">
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-[280px]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <p className="text-sm font-medium text-green-700 dark:text-green-400">Available Now</p>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">Luxury Apartment</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Al-Rimal, Gaza City</p>
                    <div className="flex items-center justify-between">
                      <p className="text-primary font-bold">$650/mo</p>
                      <div className="flex text-gray-600 text-sm space-x-2">
                        <span>2 bd</span>
                        <span>•</span>
                        <span>1 ba</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Wave SVG divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="text-white dark:text-gray-800 fill-current">
          <path d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,42.7C840,32,960,32,1080,42.7C1200,53,1320,75,1380,85.3L1440,96L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"></path>
        </svg>
      </div>
    </section>
  );
}