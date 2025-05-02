"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';

export default function PrivacyPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const sections = [
    {
      title: t?.privacy?.sections?.information?.title || 'Information We Collect',
      content: t?.privacy?.sections?.information?.content || 'We collect information that you provide directly to us when you register for an account, create or modify your profile, set preferences, sign-up for or make purchases through the Services. This may include your name, email address, phone number, billing information, profile picture, and preferences. We also collect information about your use of our services, such as your search history, properties you view, and interactions with landlords or tenants.'
    },
    {
      title: t?.privacy?.sections?.usage?.title || 'How We Use Your Information',
      content: t?.privacy?.sections?.usage?.content || 'We use the information we collect to provide, maintain, and improve our services, including to process transactions, send you related information, and provide customer support. We may also use the information to communicate with you about products, services, offers, and events, and provide other information we think may be of interest to you.'
    },
    {
      title: t?.privacy?.sections?.sharing?.title || 'Information Sharing',
      content: t?.privacy?.sections?.sharing?.content || 'We may share your information with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf. We may also share your information when we believe in good faith that disclosure is necessary to protect our rights, protect your safety or the safety of others, or investigate fraud.'
    },
    {
      title: t?.privacy?.sections?.cookies?.title || 'Cookies and Tracking Technologies',
      content: t?.privacy?.sections?.cookies?.content || 'We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier. You can set your browser to refuse all cookies or to indicate when a cookie is being sent.'
    },
    {
      title: t?.privacy?.sections?.security?.title || 'Data Security',
      content: t?.privacy?.sections?.security?.content || 'We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.'
    },
    {
      title: t?.privacy?.sections?.rights?.title || 'Your Rights',
      content: t?.privacy?.sections?.rights?.content || 'You have certain rights regarding your personal information, including the right to access, correct, or delete the personal information that we collect. You can also object to the processing of your personal information, ask us to restrict processing of your personal information, or request portability of your personal information.'
    },
    {
      title: t?.privacy?.sections?.changes?.title || 'Changes to Privacy Policy',
      content: t?.privacy?.sections?.changes?.content || 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.'
    },
    {
      title: t?.privacy?.sections?.children?.title || 'Children\'s Privacy',
      content: t?.privacy?.sections?.children?.content || 'Our Service does not address anyone under the age of 18. We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us.'
    }
  ];

  return (
    <main className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>{t?.common?.backToHome || 'Back to Home'}</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {t?.privacy?.title || 'Privacy Policy'}
          </h1>
          
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            {t?.privacy?.lastUpdated || 'Last Updated'}: {new Date('2024-06-01').toLocaleDateString()}
          </p>
          
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            {t?.privacy?.intro || 'At GazaRenter, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.'}
          </p>
          
          <div className="space-y-8">
            {sections.map((section, index) => (
              <section key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {index + 1}. {section.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {section.content}
                </p>
              </section>
            ))}
          </div>
          
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t?.privacy?.contact?.title || 'Contact Us'}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t?.privacy?.contact?.content || 'If you have any questions about this Privacy Policy, please contact us at'}{' '}
              <a href="mailto:privacy@gazarenter.com" className="text-primary hover:underline">
                privacy@gazarenter.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
} 