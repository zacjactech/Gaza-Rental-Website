<<<<<<< HEAD
"use client";
=======
"use client"
>>>>>>> 3744c7e109ee10d9b14f8b3aced31e33a5746866

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Home, Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
<<<<<<< HEAD

const Footer = () => {
  const { t } = useLanguage();
=======
import { translations } from '@/translations';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];
>>>>>>> 3744c7e109ee10d9b14f8b3aced31e33a5746866

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Home className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">GazaRenter</span>
            </div>
            <p className="text-gray-400 mb-4">
              {t.footer.about.description}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/gazarenter" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
<<<<<<< HEAD
            <h3 className="font-semibold text-lg mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary transition-colors">
                  {t('home')}
=======
            <h3 className="font-semibold text-lg mb-4">{t.footer.quickLinks.title}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary transition-colors">
                  {t.footer.quickLinks.home}
>>>>>>> 3744c7e109ee10d9b14f8b3aced31e33a5746866
                </Link>
              </li>
              <li>
                <Link href="/browse" className="text-gray-400 hover:text-primary transition-colors">
<<<<<<< HEAD
                  {t('browse')}
=======
                  {t.footer.quickLinks.browse}
>>>>>>> 3744c7e109ee10d9b14f8b3aced31e33a5746866
                </Link>
              </li>
              <li>
                <Link href="/map-view" className="text-gray-400 hover:text-primary transition-colors">
<<<<<<< HEAD
                  {t('mapView')}
=======
                  {t.footer.quickLinks.mapView}
>>>>>>> 3744c7e109ee10d9b14f8b3aced31e33a5746866
                </Link>
              </li>
              <li>
                <Link href="/landlords" className="text-gray-400 hover:text-primary transition-colors">
<<<<<<< HEAD
                  {t('landlord')}
=======
                  {t.footer.quickLinks.landlords}
>>>>>>> 3744c7e109ee10d9b14f8b3aced31e33a5746866
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary transition-colors">
<<<<<<< HEAD
                  {t('about')}
=======
                  {t.footer.quickLinks.about}
>>>>>>> 3744c7e109ee10d9b14f8b3aced31e33a5746866
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
<<<<<<< HEAD
            <h3 className="font-semibold text-lg mb-4">{t('cities')}</h3>
=======
            <h3 className="font-semibold text-lg mb-4">{t.footer.cities.title}</h3>
>>>>>>> 3744c7e109ee10d9b14f8b3aced31e33a5746866
            <ul className="space-y-2">
              <li>
                <Link href="/browse?location=dar-es-salaam" className="text-gray-400 hover:text-primary transition-colors">
                  {t.footer.cities.darEsSalaam}
                </Link>
              </li>
              <li>
                <Link href="/browse?location=arusha" className="text-gray-400 hover:text-primary transition-colors">
                  {t.footer.cities.arusha}
                </Link>
              </li>
              <li>
                <Link href="/browse?location=mwanza" className="text-gray-400 hover:text-primary transition-colors">
                  {t.footer.cities.mwanza}
                </Link>
              </li>
              <li>
                <Link href="/browse?location=dodoma" className="text-gray-400 hover:text-primary transition-colors">
                  {t.footer.cities.dodoma}
                </Link>
              </li>
              <li>
                <Link href="/browse?location=zanzibar" className="text-gray-400 hover:text-primary transition-colors">
                  {t.footer.cities.zanzibar}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
<<<<<<< HEAD
            <h3 className="font-semibold text-lg mb-4">{t('contactUs')}</h3>
=======
            <h3 className="font-semibold text-lg mb-4">{t.footer.contact.title}</h3>
>>>>>>> 3744c7e109ee10d9b14f8b3aced31e33a5746866
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="text-gray-400">{t.footer.contact.email}</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-primary mr-2 mt-0.5" />
<<<<<<< HEAD
                <span className="text-gray-400">+255 0654051913 / +255 742162235</span>
              </li>
              <li className="flex items-start">
                <Home className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="text-gray-400">Dar es Salaam, Tanzania</span>
=======
                <span className="text-gray-400">{t.footer.contact.phone}</span>
              </li>
              <li className="flex items-start">
                <Home className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="text-gray-400">{t.footer.contact.address}</span>
>>>>>>> 3744c7e109ee10d9b14f8b3aced31e33a5746866
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
<<<<<<< HEAD
              &copy; {new Date().getFullYear()} GazaRenter. {t('allRightsReserved')}
            </p>
            <div className="flex space-x-4">
              <Link href="/terms" className="text-gray-400 hover:text-primary transition-colors text-sm">
                {t('termsOfService')}
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-primary transition-colors text-sm">
                {t('privacyPolicy')}
=======
              &copy; {new Date().getFullYear()} GazaRenter. {t.footer.copyright}
            </p>
            <div className="flex space-x-4">
              <Link href="/terms" className="text-gray-400 hover:text-primary transition-colors text-sm">
                {t.footer.terms}
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-primary transition-colors text-sm">
                {t.footer.privacy}
>>>>>>> 3744c7e109ee10d9b14f8b3aced31e33a5746866
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;