"use client"

import { Shield, CreditCard, Headphones } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';

const TrustFactors = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const factors = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: t.trust.verified.title,
      description: t.trust.verified.description
    },
    {
      icon: <CreditCard className="h-8 w-8 text-primary" />,
      title: t.trust.secure.title,
      description: t.trust.secure.description
    },
    {
      icon: <Headphones className="h-8 w-8 text-primary" />,
      title: t.trust.support.title,
      description: t.trust.support.description
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {factors.map((factor, index) => (
        <div 
          key={index}
          className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="mb-4">
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