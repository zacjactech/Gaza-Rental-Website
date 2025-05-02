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
import { translations } from '@/translations';

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
  const { language } = useLanguage();
  const t = translations[language];
  const [isSaved, setIsSaved] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingDuration, setBookingDuration] = useState('12');
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [message, setMessage] = useState('');
  
  // Helper function to safely get translation strings
  const getTranslation = (path: string, fallback: string): string => {
    const parts = path.split('.');
    let result: any = t;
    
    for (const part of parts) {
      if (result && typeof result === 'object' && part in result) {
        result = result[part];
      } else {
        return fallback;
      }
    }
    
    return typeof result === 'string' ? result : fallback;
  };
  
  const handleSaveProperty = () => {
    setIsSaved(!isSaved);
    // Show toast notification
    const action = isSaved ? 'removed from' : 'added to';
    alert(`Property ${action} your saved list.`);
  };
  
  const handleShareProperty = () => {
    // Implement sharing functionality
    // For now, copy to clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Link copied to clipboard!');
    });
  };
  
  const handleBookProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate) {
      alert('Please select a move-in date');
      return;
    }
    alert(`Booking request submitted for ${bookingDate} with ${bookingDuration} months duration.`);
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      alert('Please enter a message');
      return;
    }
    alert('Message sent to landlord.');
    setMessage('');
  };
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index}
        className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };
  
  return (
    <main className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link href="/browse" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>{getTranslation('common.backToListings', 'Back to listings')}</span>
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`flex items-center gap-1 ${isSaved ? 'bg-primary/10' : ''}`}
                  onClick={handleSaveProperty}
                >
                  <Heart className={`h-4 w-4 ${isSaved ? 'fill-primary text-primary' : ''}`} />
                  {isSaved ? (getTranslation('property.saved', 'Saved')) : (getTranslation('property.save', 'Save'))}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={handleShareProperty}
                >
                  <Share2 className="h-4 w-4" />
                  {getTranslation('property.share', 'Share')}
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
                    <p className="text-sm text-gray-500 dark:text-gray-500">{getTranslation('property.bedrooms', 'Bedrooms')}</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{property.bedrooms}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{getTranslation('property.bathrooms', 'Bathrooms')}</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{property.bathrooms}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Home className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{getTranslation('property.area', 'Area')}</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{property.area} {getTranslation('property.sqm', 'sqm')}</p>
                  </div>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {getTranslation('property.aboutProperty', 'About This Property')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {property.description}
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {getTranslation('property.features', 'Features')}
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
                {getTranslation('property.reviews', 'Reviews')}
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
                {getTranslation('property.viewAllReviews', 'View all reviews')}
              </Button>
            </div>
          </div>
          
          {/* Right column - Booking and contact */}
          <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-24 border border-gray-100 dark:border-gray-700">
              <div className="mb-4">
                <div className="flex items-baseline mb-2">
                  <span className="text-2xl font-bold text-primary">
                    {property.currency} {property.price.toLocaleString()}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 ml-1">/{property.period}</span>
                </div>
                
                <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4 my-4">
                  <Tabs defaultValue="book">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="book">{getTranslation('property.bookNow', 'Book Now')}</TabsTrigger>
                      <TabsTrigger value="contact">{getTranslation('property.contact', 'Contact')}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="book" className="pt-4">
                      <form className="space-y-4" onSubmit={handleBookProperty}>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {getTranslation('property.moveInDate', 'Move-in Date')}
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Calendar className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="date"
                              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                              value={bookingDate}
                              onChange={(e) => setBookingDate(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {getTranslation('property.duration', 'Duration')}
                          </label>
                          <select 
                            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            value={bookingDuration}
                            onChange={(e) => setBookingDuration(e.target.value)}
                          >
                            <option value="3">3 {getTranslation('property.months', 'months')}</option>
                            <option value="6">6 {getTranslation('property.months', 'months')}</option>
                            <option value="12">12 {getTranslation('property.months', 'months')}</option>
                            <option value="24">24 {getTranslation('property.months', 'months')}</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {getTranslation('property.paymentMethod', 'Payment Method')}
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <CreditCard className="h-5 w-5 text-gray-400" />
                            </div>
                            <select 
                              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                              value={paymentMethod}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                              <option value="mpesa">M-Pesa</option>
                              <option value="tigopesa">Tigo Pesa</option>
                              <option value="airtel">Airtel Money</option>
                              <option value="bank">Bank Transfer</option>
                            </select>
                          </div>
                        </div>
                        
                        <Button type="submit" className="w-full">{getTranslation('property.bookNow', 'Book Now')}</Button>
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
                              {getTranslation('property.showPhoneNumber', 'Show phone number')}
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
                              {getTranslation('property.showEmail', 'Show email')}
                            </Button>
                          )}
                        </div>
                        
                        <form onSubmit={handleSendMessage} className="pt-4">
                          <textarea
                            placeholder={getTranslation('property.writeMessage', 'Write your message...')}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 min-h-[120px]"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                          ></textarea>
                          <Button type="submit" className="w-full mt-2">{getTranslation('property.sendMessage', 'Send Message')}</Button>
                        </form>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3 text-primary font-bold">
                        {property.landlord.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{property.landlord.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {property.landlord.verified && (
                            <span className="text-green-500 flex items-center">
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              {getTranslation('property.verified', 'Verified')}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setShowContact(!showContact)}
                    >
                      {showContact ? (getTranslation('property.hideContact', 'Hide')) : (getTranslation('property.showContact', 'Show contact'))}
                    </Button>
                  </div>
                  
                  {showContact && (
                    <div className="space-y-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-500 mr-2" />
                        <a href={`tel:${property.landlord.phone}`} className="text-primary hover:underline">
                          {property.landlord.phone}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-500 mr-2" />
                        <a href={`mailto:${property.landlord.email}`} className="text-primary hover:underline">
                          {property.landlord.email}
                        </a>
                      </div>
                    </div>
                  )}
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