import Link from 'next/link';
import { Facebook, Twitter, Instagram, Home, Mail, Phone } from 'lucide-react';

const Footer = () => {
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
              Tanzania's premier house rental platform connecting landlords and tenants.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/browse" className="text-gray-400 hover:text-primary transition-colors">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link href="/map-view" className="text-gray-400 hover:text-primary transition-colors">
                  Map View
                </Link>
              </li>
              <li>
                <Link href="/landlords" className="text-gray-400 hover:text-primary transition-colors">
                  For Landlords
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Cities</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/browse?location=dar-es-salaam" className="text-gray-400 hover:text-primary transition-colors">
                  Dar es Salaam
                </Link>
              </li>
              <li>
                <Link href="/browse?location=arusha" className="text-gray-400 hover:text-primary transition-colors">
                  Arusha
                </Link>
              </li>
              <li>
                <Link href="/browse?location=mwanza" className="text-gray-400 hover:text-primary transition-colors">
                  Mwanza
                </Link>
              </li>
              <li>
                <Link href="/browse?location=dodoma" className="text-gray-400 hover:text-primary transition-colors">
                  Dodoma
                </Link>
              </li>
              <li>
                <Link href="/browse?location=zanzibar" className="text-gray-400 hover:text-primary transition-colors">
                  Zanzibar
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="text-gray-400">info@gazarenter.co.tz</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="text-gray-400">+255 755 123 456</span>
              </li>
              <li className="flex items-start">
                <Home className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="text-gray-400">Upanga, Dar es Salaam, Tanzania</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} GazaRenter. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link href="/terms" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;