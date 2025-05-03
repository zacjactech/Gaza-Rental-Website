"use client"

import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/Hero';
import PropertyCard from '@/components/PropertyCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import non-critical components
const MapCTA = dynamic(() => import('@/components/MapCTA'), {
  loading: () => <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse"></div>,
  ssr: true,
});

const TrustFactors = dynamic(() => import('@/components/TrustFactors'), {
  loading: () => <div className="h-60 bg-white dark:bg-gray-700 animate-pulse"></div>,
});

const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <div className="h-96 bg-gray-50 dark:bg-gray-900 animate-pulse"></div>,
});

const Features = dynamic(() => import('@/components/Features'), {
  loading: () => <div className="h-80 bg-white dark:bg-gray-800 animate-pulse"></div>,
});

const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: true,
});

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  const featuredProperties = [
    {
      id: 1,
      titleKey: 'modern_apartment',
      price: 250000,
      currency: 'TZS',
      periodKey: 'monthly',
      bedrooms: 2,
      bathrooms: 1,
      locationKey: 'mikocheni',
      distance: '5 km',
      image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      type: 'apartment',
      available: true,
      isVerified: true,
      amenities: ['parking', 'security', 'internet'],
      size: 85
    },
    {
      id: 2,
      titleKey: 'luxury_villa',
      price: 450000,
      currency: 'TZS',
      periodKey: 'monthly',
      bedrooms: 3,
      bathrooms: 2,
      locationKey: 'masaki',
      distance: '3 km',
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      type: 'villa',
      available: true,
      isNew: true,
      amenities: ['parking', 'pool', 'security', 'garden'],
      size: 200
    },
    {
      id: 3,
      titleKey: 'studio_apartment',
      price: 150000,
      currency: 'TZS',
      periodKey: 'monthly',
      bedrooms: 1,
      bathrooms: 1,
      locationKey: 'city_center',
      distance: '1 km',
      image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      type: 'studio',
      available: true,
      isVerified: true,
      amenities: ['furnished', 'internet', 'security'],
      size: 45
    },
    {
      id: 4,
      titleKey: 'modern_2br_apartment',
      price: 280000,
      currency: 'TZS',
      periodKey: 'monthly',
      bedrooms: 2,
      bathrooms: 1,
      locationKey: 'kinondoni',
      distance: '6 km',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      type: 'apartment',
      available: true,
      amenities: ['parking', 'security', 'aircon'],
      size: 90
    }
  ];

  const testimonials = [
    {
      id: 1,
      nameKey: 'john_doe',
      roleKey: 'john_doe',
      rating: 5,
      commentKey: 'john_doe',
      image: '/testimonials/john-doe.jpg',
      location: 'Dar es Salaam',
      date: '2024-02-15'
    },
    {
      id: 2,
      nameKey: 'mary_smith',
      roleKey: 'mary_smith',
      rating: 5,
      commentKey: 'mary_smith',
      image: '/testimonials/mary-smith.jpg',
      location: 'Arusha',
      date: '2024-02-10'
    },
    {
      id: 3,
      nameKey: 'james_wilson',
      roleKey: 'james_wilson',
      rating: 5,
      commentKey: 'james_wilson',
      image: '/testimonials/james-wilson.jpg',
      location: 'Mwanza',
      date: '2024-02-05'
    }
  ];

  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Features />
      
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t?.featured?.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              {t?.featured?.subtitle}
            </p>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProperties.map((property, index) => (
              <PropertyCard 
                key={property.id} 
                property={property}
                featured={index === 0}
              />
            ))}
          </div>

          <div className="text-center">
            <Link 
              href="/browse" 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4 text-base"
              prefetch={true}
            >
                {t?.browse?.title}
              <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
          </div>
        </div>
      </section>

      <MapCTA />
      
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t?.trust?.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              {t?.trust?.subtitle || 'We pride ourselves on maintaining the highest standards in the rental industry'}
            </p>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>
          <TrustFactors />
        </div>
      </section>

      <Testimonials testimonials={testimonials} />

      <Footer />
    </main>
  );
}