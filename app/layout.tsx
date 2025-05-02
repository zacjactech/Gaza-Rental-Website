import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Toaster } from '@/components/ui/toaster';
import { PageTransition } from '@/components/PageTransition';
import dynamic from 'next/dynamic';

// Dynamically import the ScrollToTop component to reduce initial load
const ScrollToTop = dynamic(() => import('@/components/ScrollToTop'), {
  ssr: false,
});

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Ensures text is visible during font loading
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'GazaRenter - Find Your Home in Tanzania',
  description: 'Tanzania\'s premier house rental platform connecting landlords and tenants with verified listings and secure booking.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
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
              {children}
            </PageTransition>
            <ScrollToTop />
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}