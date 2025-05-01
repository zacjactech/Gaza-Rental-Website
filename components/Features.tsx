"use client"

import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { Shield, CreditCard, Headphones } from 'lucide-react';

const Features = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const features = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: t.features.verified.title,
      description: t.features.verified.description
    },
    {
      icon: <CreditCard className="h-8 w-8 text-primary" />,
      title: t.features.secure.title,
      description: t.features.secure.description
    },
    {
      icon: <Headphones className="h-8 w-8 text-primary" />,
      title: t.features.support.title,
      description: t.features.support.description
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t.features.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 