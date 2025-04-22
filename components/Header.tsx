"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Home, LogIn } from 'lucide-react';
import { ModeToggle } from './ModeToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'sw' : 'en');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl text-gray-900 dark:text-white">GazaRenter</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors duration-200"
            >
              {t.nav.home}
            </Link>
            <Link 
              href="/browse" 
              className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors duration-200"
            >
              {t.nav.browse}
            </Link>
            <Link 
              href="/map-view" 
              className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors duration-200"
            >
              {t.nav.mapView}
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />
            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <button 
                onClick={toggleLanguage}
                className={`px-3 py-1.5 text-sm font-medium ${language === 'en' ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              >
                EN
              </button>
              <button 
                onClick={toggleLanguage}
                className={`px-3 py-1.5 text-sm font-medium ${language === 'sw' ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              >
                SW
              </button>
            </div>
            <Link 
              href="/login" 
              className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              <LogIn className="h-4 w-4" />
              <span>{t.nav.login}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ModeToggle />
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 py-4 px-6 shadow-lg">
          <nav className="flex flex-col space-y-4">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav.home}
            </Link>
            <Link 
              href="/browse" 
              className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav.browse}
            </Link>
            <Link 
              href="/map-view" 
              className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav.mapView}
            </Link>
            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden w-fit">
              <button 
                onClick={() => {
                  toggleLanguage();
                  setIsMenuOpen(false);
                }}
                className={`px-3 py-1.5 text-sm font-medium ${language === 'en' ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              >
                EN
              </button>
              <button 
                onClick={() => {
                  toggleLanguage();
                  setIsMenuOpen(false);
                }}
                className={`px-3 py-1.5 text-sm font-medium ${language === 'sw' ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              >
                SW
              </button>
            </div>
            <Link 
              href="/login" 
              className="flex items-center justify-center space-x-1 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <LogIn className="h-4 w-4" />
              <span>{t.nav.login}</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;