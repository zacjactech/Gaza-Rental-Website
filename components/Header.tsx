"use client"

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, Home, LogIn } from 'lucide-react';
import { ModeToggle } from './ModeToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const pathname = usePathname();
  const router = useRouter();

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'sw' : 'en');
  }, [language, setLanguage]);

  const isActive = useCallback((path: string) => {
    return pathname === path ? 'text-primary font-medium' : 'text-gray-700 dark:text-gray-300';
  }, [pathname]);

  const navigateTo = useCallback((path: string) => {
    setIsMenuOpen(false);
    router.push(path);
  }, [router]);

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-14 md:h-16">
          <button 
            onClick={() => navigateTo('/')} 
            className="flex items-center space-x-2 outline-none focus:outline-none transition-transform duration-200 hover:scale-105"
          >
            <Home className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            <span className="font-bold text-base md:text-lg text-gray-900 dark:text-white">GazaRenter</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 md:space-x-8 text-sm">
            <button 
              onClick={() => navigateTo('/')}
              className={`${isActive('/')} hover:text-primary transition-all duration-200 hover:scale-105 py-1 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800`}
            >
              {t.nav.home}
            </button>
            <button 
              onClick={() => navigateTo('/browse')}
              className={`${isActive('/browse')} hover:text-primary transition-all duration-200 hover:scale-105 py-1 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800`}
            >
              {t.nav.browse}
            </button>
          </nav>

          <div className="hidden md:flex items-center space-x-3 md:space-x-4">
            <ModeToggle />
            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <Button 
                onClick={toggleLanguage}
                variant={language === 'en' ? 'default' : 'ghost'}
                size="sm"
                className="rounded-none text-xs py-1 h-8"
              >
                EN
              </Button>
              <Button 
                onClick={toggleLanguage}
                variant={language === 'sw' ? 'default' : 'ghost'}
                size="sm"
                className="rounded-none text-xs py-1 h-8"
              >
                SW
              </Button>
            </div>
            <Button asChild size="sm" className="h-8 text-xs">
              <Link href="/login" className="flex items-center">
                <LogIn className="h-3.5 w-3.5 mr-1" />
                <span>{t.nav.login}</span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <ModeToggle />
            <Button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              size="icon"
              className="text-gray-700 dark:text-gray-300 h-8 w-8 p-1"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 py-3 px-4 shadow-lg animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3">
            <button 
              onClick={() => navigateTo('/')}
              className={`${isActive('/')} hover:text-primary transition-colors text-sm text-left py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800`}
            >
              {t.nav.home}
            </button>
            <button 
              onClick={() => navigateTo('/browse')}
              className={`${isActive('/browse')} hover:text-primary transition-colors text-sm text-left py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800`}
            >
              {t.nav.browse}
            </button>
            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden w-fit mt-2">
              <Button 
                onClick={toggleLanguage}
                variant={language === 'en' ? 'default' : 'ghost'}
                size="sm"
                className="rounded-none text-xs py-1 h-8"
              >
                EN
              </Button>
              <Button 
                onClick={toggleLanguage}
                variant={language === 'sw' ? 'default' : 'ghost'}
                size="sm"
                className="rounded-none text-xs py-1 h-8"
              >
                SW
              </Button>
            </div>
            <Button 
              asChild 
              size="sm" 
              className="w-full justify-center text-xs mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href="/login" className="flex items-center">
                <LogIn className="h-3.5 w-3.5 mr-1" />
                <span>{t.nav.login}</span>
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;