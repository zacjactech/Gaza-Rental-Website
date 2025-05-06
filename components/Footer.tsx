"use client";

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { ModeToggle } from '@/components/ModeToggle';
import { Instagram, Twitter, Facebook, MapPin, Mail, Phone, Heart } from 'lucide-react';
import { useCallback, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const { language, setLanguage } = useLanguage();
  const [currentYear, setCurrentYear] = useState("2024");
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
    setIsMounted(true);
  }, []);
  
  // Safely access translations
  const getTranslation = useCallback((path: string, fallback: string): string => {
    try {
      const t = translations[language] || {};
      const keys = path.split('.');
      let result: any = t;
      
      for (const key of keys) {
        if (result && typeof result === 'object' && key in result) {
          result = result[key];
        } else {
          return fallback;
        }
      }
      
      return typeof result === 'string' ? result : fallback;
    } catch (error) {
      return fallback;
    }
  }, [language]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 ml:grid-cols-3 lg:grid-cols-4 gap-8 xs:gap-6 md:gap-8 lg:gap-10">
          {/* Company Info */}
          {isMounted ? (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="space-y-4 md:pr-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Gaza Rental
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xs">
                {getTranslation('footer.companyDescription', "Your trusted platform for finding the perfect rental property in Gaza. We connect landlords and tenants with ease and security.")}
              </p>
              
              <div className="flex items-center space-x-1">
                <button 
                  onClick={() => setLanguage('en')} 
                  className={`px-2 py-1 text-sm rounded-md transition-colors ${language === 'en' ? 'bg-primary text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
                >
                  English
                </button>
                <button 
                  onClick={() => setLanguage('sw')} 
                  className={`px-2 py-1 text-sm rounded-md transition-colors ${language === 'sw' ? 'bg-primary text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
                >
                  Swahili
                </button>
                <div className="ml-2">
                  <ModeToggle />
                </div>
              </div>
              
              <div className="flex space-x-4 pt-2">
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4 md:pr-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Gaza Rental
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xs">
                {getTranslation('footer.companyDescription', "Your trusted platform for finding the perfect rental property in Gaza. We connect landlords and tenants with ease and security.")}
              </p>
              
              <div className="flex items-center space-x-1">
                <button 
                  onClick={() => setLanguage('en')} 
                  className={`px-2 py-1 text-sm rounded-md transition-colors ${language === 'en' ? 'bg-primary text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
                >
                  English
                </button>
                <button 
                  onClick={() => setLanguage('sw')} 
                  className={`px-2 py-1 text-sm rounded-md transition-colors ${language === 'sw' ? 'bg-primary text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}
                >
                  Swahili
                </button>
                <div className="ml-2">
                  <ModeToggle />
                </div>
              </div>
              
              <div className="flex space-x-4 pt-2">
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
            </div>
          )}
          
          {/* Quick Links */}
          {isMounted ? (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="space-y-4 xs:max-w-[200px] ml:max-w-none"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {getTranslation('footer.quickLinks', "Quick Links")}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">
                    {getTranslation('nav.home', "Home")}
                  </Link>
                </li>
                <li>
                  <Link href="/browse" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">
                    {getTranslation('nav.browse', "Browse Properties")}
                  </Link>
                </li>
                <li>
                  <Link href="/map-view" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">
                    {getTranslation('nav.mapView', "Map View")}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">
                    {getTranslation('nav.about', "About Us")}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">
                    {getTranslation('nav.contact', "Contact")}
                  </Link>
                </li>
              </ul>
            </motion.div>
          ) : (
            <div className="space-y-4 xs:max-w-[200px] ml:max-w-none">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {getTranslation('footer.quickLinks', "Quick Links")}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">
                    {getTranslation('nav.home', "Home")}
                  </Link>
                </li>
                <li>
                  <Link href="/browse" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">
                    {getTranslation('nav.browse', "Browse Properties")}
                  </Link>
                </li>
                <li>
                  <Link href="/map-view" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">
                    {getTranslation('nav.mapView', "Map View")}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">
                    {getTranslation('nav.about', "About Us")}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">
                    {getTranslation('nav.contact', "Contact")}
                  </Link>
                </li>
              </ul>
            </div>
          )}
          
          {/* Support */}
          {isMounted ? (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="space-y-4 xs:max-w-[200px] ml:max-w-none"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {getTranslation('footer.support', "Support")}
              </h3>
            <ul className="space-y-2">
              <li>
                  <Link href="/login" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">
                    {getTranslation('nav.login', "Login")}
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">
                    {getTranslation('nav.register', "Register")}
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">
                    {getTranslation('footer.terms', "Terms & Conditions")}
                </Link>
              </li>
              <li>
                  <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">
                    {getTranslation('footer.privacy', "Privacy Policy")}
                  </Link>
                </li>
              </ul>
            </motion.div>
          ) : (
            <div className="space-y-4 xs:max-w-[200px] ml:max-w-none">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {getTranslation('footer.support', "Support")}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/login" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">
                    {getTranslation('nav.login', "Login")}
                </Link>
              </li>
              <li>
                  <Link href="/register" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">
                    {getTranslation('nav.register', "Register")}
                </Link>
              </li>
              <li>
                  <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">
                    {getTranslation('footer.terms', "Terms & Conditions")}
                </Link>
              </li>
              <li>
                  <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">
                    {getTranslation('footer.privacy', "Privacy Policy")}
                </Link>
              </li>
            </ul>
          </div>
          )}
          
          {/* Contact */}
          {isMounted ? (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="space-y-4 col-span-1 xs:col-span-2 ml:col-span-1"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {getTranslation('footer.contactUs', "Contact Us")}
              </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 mr-2" />
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    123 Example Street, Dar es Salaam, Tanzania
                  </span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-2" />
                  <a href="mailto:info@gazarental.com" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">
                    info@gazarental.com
                  </a>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-2" />
                  <a href="tel:+255123456789" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">
                    +255 123 456 789
                  </a>
              </li>
              </ul>
            </motion.div>
          ) : (
            <div className="space-y-4 col-span-1 xs:col-span-2 ml:col-span-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {getTranslation('footer.contactUs', "Contact Us")}
              </h3>
              <ul className="space-y-3">
              <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 mr-2" />
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    123 Example Street, Dar es Salaam, Tanzania
                  </span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-2" />
                  <a href="mailto:info@gazarental.com" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">
                    info@gazarental.com
                  </a>
              </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-2" />
                  <a href="tel:+255123456789" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">
                    +255 123 456 789
                  </a>
              </li>
            </ul>
          </div>
          )}
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 ml:mt-10 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0 text-center md:text-left">
              © {currentYear} Gaza Rental. {getTranslation('footer.allRightsReserved', "All rights reserved.")}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              {getTranslation('footer.madeWith', "Made with")} <Heart className="h-4 w-4 text-primary mx-1 inline" /> {getTranslation('footer.inGaza', "in Gaza")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}