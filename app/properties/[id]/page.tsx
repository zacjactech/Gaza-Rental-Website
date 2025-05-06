"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Star, 
  Heart, 
  Share2,
  ArrowLeft,
  Check,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { properties } from '@/lib/api';
import { Property, PropertyFormData } from '@/types/property';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import Footer from '@/components/Footer';

export default function PropertyPage({ params }: { params: { id: string } }) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<PropertyFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    async function fetchProperty() {
      try {
        const data = await properties.getById(params.id);
        setProperty(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch property');
        toast({
          title: 'Error',
          description: 'Failed to fetch property details',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }

    fetchProperty();
  }, [params.id, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/properties/${params.id}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      toast({
        title: t?.property?.application?.successTitle || "Success!",
        description: t?.property?.application?.successMessage || "Your application has been submitted successfully.",
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      toast({
        title: t?.property?.application?.errorTitle || "Error",
        description: t?.property?.application?.errorMessage || "Failed to submit application. Please try again.",
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProperty = async () => {
    try {
      const response = await fetch(`/api/properties/${params.id}/save`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to save property');
      }

      toast({
        title: t?.property?.savedTitle || "Saved",
        description: t?.property?.savedDescription || "Property has been saved to your list",
      });
    } catch (error) {
      toast({
        title: t?.property?.errorTitle || "Error",
        description: t?.property?.errorDescription || "Failed to save property. Please try again.",
        variant: 'destructive',
      });
    }
  };

  const handleShareProperty = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: t?.property?.shareTitle || "Share",
        description: t?.property?.shareDescription || "Link copied to clipboard",
      });
    } catch (error) {
      toast({
        title: t?.property?.errorTitle || "Error",
        description: t?.property?.errorDescription || "Failed to copy link. Please try again.",
        variant: 'destructive',
      });
    }
  };

  const formatPrice = (price: number) => {
    if (!property?.currency) return '';
    return new Intl.NumberFormat(language === 'en' ? 'en-US' : 'sw-TZ', {
      style: 'currency',
      currency: property.currency,
    }).format(price);
  };

  const renderStars = (rating: number = 0) => {
    return (
      <div className="flex">
        {Array(5).fill(0).map((_, index) => (
      <Star 
        key={index}
        className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-4 w-1/2 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-64 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p className="text-red-500 mb-4">{error || 'Property not found'}</p>
        <Button
          variant="outline"
          onClick={() => router.push('/properties')}
        >
          Back to Properties
        </Button>
      </div>
    );
  }
  
  return (
    <main className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link href="/properties" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>{t?.common?.backToListings || 'Back to listings'}</span>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
                <Image
                  src={property.images[selectedImage]}
                  alt={property.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative h-20 rounded-lg overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image}
                      alt={`${property.title} - Image ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Property Details */}
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                  <div>
                  <h1 className="text-3xl font-bold">{property.title}</h1>
                  <p className="text-muted-foreground flex items-center mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {formatPrice(property.price)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t?.property?.period?.[property.period] || 'per month'}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-2" />
                  <span>{property.bedrooms} {t?.property?.bedrooms || 'Bedrooms'}</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-2" />
                  <span>{property.bathrooms} {t?.property?.bathrooms || 'Bathrooms'}</span>
                </div>
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                <h2>{t?.property?.description || 'Description'}</h2>
                <p>{property.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">
                  {t?.property?.amenities || 'Amenities'}
              </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-primary" />
                      <span>{amenity}</span>
                  </div>
                ))}
                </div>
              </div>
              </div>
            </div>
            
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Landlord Info */}
            <Card>
              <CardHeader>
                <CardTitle>{t?.property?.landlord || 'Landlord'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={property.landlord.avatar}
                      alt={property.landlord.name}
                      fill
                      sizes="(max-width: 640px) 80px, 120px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{property.landlord.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      <span>{renderStars(property.landlord.rating)}</span>
                      <span className="mx-1">•</span>
                      <span>{property.landlord.responseRate}% {t?.property?.responseRate || 'response rate'}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Button className="w-full" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {t?.property?.contact || 'Contact Landlord'}
              </Button>
                </div>
              </CardContent>
            </Card>

            {/* Application Form */}
            <Card>
              <CardHeader>
                <CardTitle>{t?.property?.apply || 'Apply for this Property'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                    <Label htmlFor="name">
                      {t?.property?.form?.name || 'Full Name'}
                    </Label>
                    <Input
                      id="name"
                      name="name"
                              required
                      value={formData.name}
                      onChange={handleInputChange}
                            />
                        </div>
                        
                        <div>
                    <Label htmlFor="email">
                      {t?.property?.form?.email || 'Email'}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                        </div>
                        
                        <div>
                    <Label htmlFor="phone">
                      {t?.property?.form?.phone || 'Phone Number'}
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                            required
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                </div>
                
                      <div>
                    <Label htmlFor="message">
                      {t?.property?.form?.message || 'Message'}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t?.property?.form?.messagePlaceholder || 'Tell the landlord about yourself and why you\'re interested in this property...'}
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        {t?.property?.form?.submitting || 'Submitting...'}
                      </div>
                    ) : (
                      t?.property?.form?.submit || 'Submit Application'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={handleSaveProperty}>
                <Heart className="h-4 w-4 mr-2" />
                {t?.property?.save || 'Save'}
              </Button>
              <Button variant="outline" className="flex-1" onClick={handleShareProperty}>
                <Share2 className="h-4 w-4 mr-2" />
                {t?.property?.share || 'Share'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}