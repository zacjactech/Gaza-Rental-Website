"use client"

import { useState } from 'react';
import Image from 'next/image';
import { Star, Quote, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface Testimonial {
  id: number;
  nameKey: string;
  roleKey: string;
  rating: number;
  commentKey: string;
  image: string;
  location?: string;
  date?: string;
}

export default function TestimonialsPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: t.common.success,
        description: t.testimonialPage.form.success,
      });
      
      setFormData({
        name: '',
        email: '',
        rating: 5,
        comment: ''
      });
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  const testimonials: Testimonial[] = [
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
    },
    {
      id: 4,
      nameKey: 'sarah_johnson',
      roleKey: 'sarah_johnson',
      rating: 4,
      commentKey: 'sarah_johnson',
      image: '/testimonials/placeholder.svg',
      location: 'Dodoma',
      date: '2024-01-25'
    },
    {
      id: 5,
      nameKey: 'david_brown',
      roleKey: 'david_brown',
      rating: 5,
      commentKey: 'david_brown',
      image: '/testimonials/placeholder.svg',
      location: 'Zanzibar',
      date: '2024-01-15'
    },
    {
      id: 6,
      nameKey: 'jessica_lee',
      roleKey: 'jessica_lee',
      rating: 4,
      commentKey: 'jessica_lee',
      image: '/testimonials/placeholder.svg',
      location: 'Morogoro',
      date: '2024-01-10'
    }
  ];
  
  return (
    <main className="min-h-screen py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.testimonialPage.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.testimonialPage.subtitle}
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-6" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial) => {
            const name = t?.testimonials?.items?.[testimonial.nameKey]?.name || testimonial.nameKey;
            const role = t?.testimonials?.items?.[testimonial.roleKey]?.role || testimonial.roleKey;
            const comment = t?.testimonials?.items?.[testimonial.commentKey]?.comment || testimonial.commentKey;
            
            return (
              <div 
                key={testimonial.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-transform hover:scale-[1.02]"
              >
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200">
                    <Image
                      src={testimonial.image}
                      alt={name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                
                <div className="mb-4 relative">
                  <Quote className="absolute top-0 left-0 w-8 h-8 text-primary/20 -translate-x-2 -translate-y-2" />
                  <p className="text-gray-700 dark:text-gray-300 relative z-10 pt-2">{comment}</p>
                </div>
                
                <div className="text-sm text-gray-500 dark:text-gray-400 flex justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <span>{testimonial.location}</span>
                  <span>{new Date(testimonial.date || '').toLocaleDateString()}</span>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {t.testimonialPage.reviewTitle}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t.testimonialPage.reviewSubtitle}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.testimonialPage.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.testimonialPage.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.testimonialPage.form.rating}
              </label>
              <select
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
              >
                <option value="5">★★★★★ (5/5)</option>
                <option value="4">★★★★☆ (4/5)</option>
                <option value="3">★★★☆☆ (3/5)</option>
                <option value="2">★★☆☆☆ (2/5)</option>
                <option value="1">★☆☆☆☆ (1/5)</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.testimonialPage.form.comment}
              </label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
              />
            </div>
            
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-8"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t.common.loading}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {t.testimonialPage.form.submit}
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
} 