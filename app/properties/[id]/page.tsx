"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Home, 
  Phone, 
  Mail, 
  Calendar, 
  CreditCard, 
  Star, 
  Heart, 
  Share2,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

// Mock data for a single property
const property = {
  id: 1,
  title: 'Cozy 2 Bedroom Apartment in Mikocheni',
  description: 'This beautiful apartment located in the heart of Mikocheni offers modern living spaces with high-quality finishes. The apartment features a spacious living room, a fully equipped kitchen, two comfortable bedrooms, and a modern bathroom. Enjoy amenities like 24/7 security, parking space, and a serene environment.',
  price: 250000,
  currency: 'TZS',
  period: 'month',
  bedrooms: 2,
  bathrooms: 1,
  area: 85,
  areaUnit: 'sqm',
  location: 'Mikocheni, Dar es Salaam',
  coordinates: { lat: -6.765, lng: 39.245 },
  features: [
    'Furnished',
    '24/7 Security',
    'Parking Space',
    'Water Supply',
    'Electricity Backup',
    'Air Conditioning',
    'Internet Connection'
  ],
  images: [
    'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  ],
  landlord: {
    name: 'John Doe',
    phone: '+255 0654051913',
    email: 'john.doe@example.com',
    responseRate: 95,
    responseTime: '2 hours',
    verified: true
  },
  reviews: [
    {
      id: 1,
      user: 'Mary N.',
      date: 'June 2023',
      rating: 5,
      comment: 'Beautiful apartment in a great location. The landlord was very responsive and helpful throughout the entire process.'
    },
    {
      id: 2,
      user: 'David M.',
      date: 'April 2023',
      rating: 4,
      comment: 'Nice place, convenient location. The only issue was occasional water shortage, but the landlord was quick to address it.'
    }
  ]
};

export default function PropertyDetail({ params }: { params: { id: string } }) {
  const [mainImage, setMainImage] = useState(property.images[0]);
  const [showContact, setShowContact] = useState(false);
  const { t } = useLanguage();
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index}
        className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };
  
  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link href="/browse" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>{t('back')}</span>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Left column - Property details */}
          <div className="w-full lg:w-2/3">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {property.title}
              </h1>
              <div className="flex items-start mb-2">
                <MapPin className="h-5 w-5 text-primary mr-1 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">
                  {property.location}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  {t('save')}
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  {t('share')}
                </Button>
              </div>
            </div>
            
            {/* Image gallery */}
            <div className="mb-8">
              <div className="relative h-72 md:h-96 w-full mb-4 overflow-hidden rounded-lg">
                <Image
                  src={mainImage}
                  alt={property.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {property.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`relative h-20 md:h-24 cursor-pointer rounded-md overflow-hidden ${image === mainImage ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setMainImage(image)}
                  >
                    <Image
                      src={image}
                      alt={`${property.title} - image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 25vw, 16vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Property details */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-6 mb-6 border-b border-gray-200 dark:border-gray-800 pb-6">
                <div className="flex items-center">
                  <Bed className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{t('bedrooms')}</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{property.bedrooms}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{t('bathrooms')}</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{property.bathrooms}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Home className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{t('area')}</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{property.area} {t('sqm')}</p>
                  </div>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('aboutProperty')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {property.description}
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t('features')}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 mb-6">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Reviews */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('reviews')}
              </h2>
              
              {property.reviews.map(review => (
                <div key={review.id} className="mb-4 p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white">{review.user}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                  </div>
                  <div className="flex mb-2">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {review.comment}
                  </p>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                {t('view')} {t('reviews')}
              </Button>
            </div>
          </div>
          
          {/* Right column - Booking and contact */}
          <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
              <div className="mb-4">
                <div className="flex items-baseline mb-2">
                  <span className="text-2xl font-bold text-primary">
                    {property.currency} {property.price.toLocaleString()}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 ml-1">/{t('month')}</span>
                </div>
                
                <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4 my-4">
                  <Tabs defaultValue="book">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="book">{t('bookNow')}</TabsTrigger>
                      <TabsTrigger value="contact">{t('contact')}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="book" className="pt-4">
                      <form className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t('moveInDate')}
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Calendar className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="date"
                              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t('duration')}
                          </label>
                          <select className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                            <option value="3">3 {t('month')}s</option>
                            <option value="6">6 {t('month')}s</option>
                            <option value="12" selected>12 {t('month')}s</option>
                            <option value="24">24 {t('month')}s</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t('paymentMethod')}
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <CreditCard className="h-5 w-5 text-gray-400" />
                            </div>
                            <select className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                              <option value="mpesa">M-Pesa</option>
                              <option value="tigopesa">Tigo Pesa</option>
                              <option value="airtel">Airtel Money</option>
                              <option value="bank">Bank Transfer</option>
                            </select>
                          </div>
                        </div>
                        
                        <Button className="w-full">{t('bookNow')}</Button>
                      </form>
                    </TabsContent>
                    <TabsContent value="contact" className="pt-4">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="bg-primary/10 p-2 rounded-full mr-3">
                            <Phone className="h-5 w-5 text-primary" />
                          </div>
                          {showContact ? (
                            <a href={`tel:${property.landlord.phone}`} className="text-gray-900 dark:text-white">
                              {property.landlord.phone}
                            </a>
                          ) : (
                            <Button
                              variant="link"
                              onClick={() => setShowContact(true)}
                              className="text-primary p-0 h-auto"
                            >
                              {t('showPhoneNumber')}
                            </Button>
                          )}
                        </div>
                        
                        <div className="flex items-center">
                          <div className="bg-primary/10 p-2 rounded-full mr-3">
                            <Mail className="h-5 w-5 text-primary" />
                          </div>
                          {showContact ? (
                            <a href={`mailto:${property.landlord.email}`} className="text-gray-900 dark:text-white">
                              {property.landlord.email}
                            </a>
                          ) : (
                            <Button
                              variant="link"
                              onClick={() => setShowContact(true)}
                              className="text-primary p-0 h-auto"
                            >
                              {t('showEmail')}
                            </Button>
                          )}
                        </div>
                        
                        <div className="pt-4">
                          <textarea
                            placeholder={t('writeMessage')}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 min-h-[120px]"
                          ></textarea>
                          <Button className="w-full mt-2">{t('sendMessage')}</Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt={property.landlord.name}
                      fill
                      sizes="40px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {property.landlord.name}
                      {property.landlord.verified && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                          {t('verified')}
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('respondsIn')} {property.landlord.responseTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}