import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/dashboard/',
        '/private/',
        '/*.json$',
      ],
    },
    sitemap: 'https://gazarental.com/sitemap.xml',
  };
} 