"use client"

import { Shield, CreditCard, Users, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';

const TrustFactors = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const factors = [
    {
      icon: <Shield className="h-12 w-12 text-primary" />,
      title: t.features.verified.title,
      description: t.features.verified.description
    },
    {
      icon: <CreditCard className="h-12 w-12 text-primary" />,
      title: t.features.secure.title,
      description: t.features.secure.description
    },
    {
      icon: <Users className="h-12 w-12 text-primary" />,
      title: 'Verified Landlords',
      description: 'All landlords are verified to ensure a safe and reliable rental experience'
    },
    {
      icon: <Star className="h-12 w-12 text-primary" />,
      title: 'Quality Properties',
      description: 'We only list properties that meet our high quality standards'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {factors.map((factor, index) => (
        <div 
          key={index}
          className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center"
        >
          <div className="flex justify-center mb-4">
            {factor.icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {factor.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {factor.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TrustFactors;