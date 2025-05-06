"use client";

import Head from 'next/head';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  locale?: string;
}

export function SEO({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  locale,
}: SEOProps) {
  const { language } = useLanguage();
  const t = translations[language];

  const siteName = t?.seo?.siteName || 'Gaza Rental';
  const defaultTitle = t?.seo?.defaultTitle || 'Find Your Perfect Home in Gaza';
  const defaultDescription = t?.seo?.defaultDescription || 'Browse and rent properties in Gaza. Find apartments, houses, and commercial spaces for rent.';
  const defaultKeywords = ['rental', 'property', 'Gaza', 'apartment', 'house', 'real estate'];

  const seoTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = [...new Set([...defaultKeywords, ...keywords])].join(', ');
  const seoImage = image || '/images/og-image.jpg';
  const seoUrl = url || typeof window !== 'undefined' ? window.location.href : '';
  const seoLocale = locale || language;

  return (
    <Head>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={seoLocale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Canonical URL */}
      <link rel="canonical" href={seoUrl} />
    </Head>
  );
} 