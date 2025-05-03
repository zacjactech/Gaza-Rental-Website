import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Toaster } from '@/components/ui/toaster';
import { PageTransition } from '@/components/PageTransition';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import the ScrollToTop component to reduce initial load
const ScrollToTop = dynamic(() => import('@/components/ScrollToTop'), {
  ssr: false,
  loading: () => null,
});

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Ensures text is visible during font loading
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  viewportFit: 'cover',
  userScalable: true,
};

export const metadata: Metadata = {
  title: 'GazaRenter - Find Your Home in Tanzania',
  description: 'Tanzania\'s premier house rental platform connecting landlords and tenants with verified listings and secure booking.',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <LanguageProvider>
            <Header />
            <PageTransition>
              <Suspense fallback={<div className="container py-8">Loading...</div>}>
              {children}
              </Suspense>
            </PageTransition>
            <ScrollToTop />
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}