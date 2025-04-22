"use client"

import Image from 'next/image';
import { Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';

interface TestimonialProps {
  testimonial: {
    id: number;
    name: string;
    role: string;
    rating: number;
    comment: string;
    image: string;
  };
}

const Testimonials = ({ testimonial }: TestimonialProps) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className="relative h-12 w-12 mr-4">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
        </div>
      </div>
      
      <div className="flex mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
        ))}
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 italic">
        "{testimonial.comment}"
      </p>
    </div>
  );
};

export default Testimonials;