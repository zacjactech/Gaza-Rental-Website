"use client"

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Menu, X, Home, LogIn, Building, Users, Phone } from 'lucide-react';
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

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'sw' : 'en');
  }, [language, setLanguage]);

  const isActive = useCallback((path: string) => {
    return pathname === path ? 'text-primary font-medium' : 'text-gray-700 dark:text-gray-300';
  }, [pathname]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300">
      <div className="container">
        <div className="flex justify-between items-center h-14 md:h-16">
          <Link 
            href="/"
            className="flex items-center space-x-2 outline-none focus:outline-none transition-transform duration-200 hover:scale-105"
          >
            <Home className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            <span className="font-bold text-base md:text-lg text-gray-900 dark:text-white">GazaRenter</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 md:space-x-8 text-sm">
            <Link 
              href="/"
              className={`${isActive('/')} hover:text-primary transition-all duration-200 hover:scale-105 py-1 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800`}
              prefetch={true}
            >
              {t.nav.home}
            </Link>
            <Link 
              href="/browse"
              className={`${isActive('/browse')} hover:text-primary transition-all duration-200 hover:scale-105 py-1 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800`}
              prefetch={true}
            >
              {t.nav.browse}
            </Link>
            <Link 
              href="/about"
              className={`${isActive('/about')} hover:text-primary transition-all duration-200 hover:scale-105 py-1 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800`}
              prefetch={true}
            >
              {t.footer.quickLinks.about}
            </Link>
            <Link 
              href="/contact"
              className={`${isActive('/contact')} hover:text-primary transition-all duration-200 hover:scale-105 py-1 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800`}
              prefetch={true}
            >
              <Phone className="h-3.5 w-3.5 inline mr-1" />
              {t.nav.contact}
            </Link>
            <Link 
              href="/dashboard/landlord"
              className={`${isActive('/dashboard/landlord')} hover:text-primary transition-all duration-200 hover:scale-105 py-1 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800`}
              prefetch={true}
            >
              <Building className="h-3.5 w-3.5 inline mr-1" />
              {t.footer.quickLinks.landlords}
            </Link>
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
              <Link href="/login" prefetch={true}>
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
            <Link 
              href="/"
              className={`${isActive('/')} hover:text-primary transition-colors text-sm text-left py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800`}
              onClick={closeMenu}
              prefetch={true}
            >
              {t.nav.home}
            </Link>
            <Link 
              href="/browse"
              className={`${isActive('/browse')} hover:text-primary transition-colors text-sm text-left py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800`}
              onClick={closeMenu}
              prefetch={true}
            >
              {t.nav.browse}
            </Link>
            <Link 
              href="/about"
              className={`${isActive('/about')} hover:text-primary transition-colors text-sm text-left py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800`}
              onClick={closeMenu}
              prefetch={true}
            >
              {t.footer.quickLinks.about}
            </Link>
            <Link 
              href="/contact"
              className={`${isActive('/contact')} hover:text-primary transition-colors text-sm text-left py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800`}
              onClick={closeMenu}
              prefetch={true}
            >
              <Phone className="h-3.5 w-3.5 inline mr-1" />
              {t.nav.contact}
            </Link>
            <Link 
              href="/dashboard/landlord"
              className={`${isActive('/dashboard/landlord')} hover:text-primary transition-colors text-sm text-left py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800`}
              onClick={closeMenu}
              prefetch={true}
            >
              <Building className="h-3.5 w-3.5 inline mr-1" />
              {t.footer.quickLinks.landlords}
            </Link>
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
            <Link 
              href="/login" 
              className="flex w-full items-center justify-center mt-2 bg-primary hover:bg-primary/90 text-white py-2 rounded-md text-xs"
              onClick={closeMenu}
              prefetch={true}
            >
                <LogIn className="h-3.5 w-3.5 mr-1" />
                <span>{t.nav.login}</span>
              </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;