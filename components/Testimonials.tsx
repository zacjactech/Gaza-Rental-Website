"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface TestimonialData {
  id: number;
  nameKey: string;
  roleKey: string;
  rating: number;
  commentKey: string;
  image: string;
  location?: string;
  date?: string;
}

interface TestimonialsProps {
  testimonials?: TestimonialData[];
}

const defaultTestimonials: TestimonialData[] = [
  {
    id: 1,
    nameKey: 'john_doe',
    roleKey: 'john_doe',
    rating: 5,
    commentKey: 'john_doe',
    image: '/testimonials/placeholder.svg',
    location: 'Dar es Salaam',
    date: '2024-02-15'
  },
  {
    id: 2,
    nameKey: 'mary_smith',
    roleKey: 'mary_smith',
    rating: 5,
    commentKey: 'mary_smith',
    image: '/testimonials/placeholder.svg',
    location: 'Arusha',
    date: '2024-02-10'
  },
  {
    id: 3,
    nameKey: 'james_wilson',
    roleKey: 'james_wilson',
    rating: 5,
    commentKey: 'james_wilson',
    image: '/testimonials/placeholder.svg',
    location: 'Mwanza',
    date: '2024-02-05'
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialData }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [imageError, setImageError] = useState(false);

  const getName = () => {
    return t?.testimonials?.items?.[testimonial.nameKey]?.name || testimonial.nameKey;
  };

  const getRole = () => {
    return t?.testimonials?.items?.[testimonial.roleKey]?.role || 'User';
  };

  const getComment = () => {
    return t?.testimonials?.items?.[testimonial.commentKey]?.comment || 'Great experience with GazaRenter!';
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'sw-TZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full relative">
      <div className="absolute top-6 right-6 text-primary/20 dark:text-primary/10">
        <Quote size={48} />
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-800">
          {!imageError ? (
            <Image
              src={testimonial.image}
              alt={getName()}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary text-xl font-semibold">
              {getName().charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
            {getName()}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {getRole()}
          </p>
          {testimonial.location && (
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-0.5">
              {testimonial.location}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-5 w-5 ${
              i < testimonial.rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 flex-grow relative z-10 text-lg leading-relaxed">
        &ldquo;{getComment()}&rdquo;
      </p>

      {testimonial.date && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            {formatDate(testimonial.date)}
          </p>
        </div>
      )}
    </div>
  );
};

const Testimonials = ({ testimonials = defaultTestimonials }: TestimonialsProps) => {
  const { language } = useLanguage();
  const t = translations[language];

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t?.testimonials?.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            {t?.testimonials?.subtitle}
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-8" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="font-medium"
            asChild
          >
            <Link href="/testimonials">
              {t?.testimonials?.viewAll}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;