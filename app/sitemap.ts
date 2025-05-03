import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gazarental.com';
  
  // Main routes
  const routes = [
    '',
    '/browse',
    '/about',
    '/contact',
    '/login',
    '/register',
    '/terms',
    '/privacy',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Example property routes (in a real app, you'd fetch these from your API/database)
  const propertyIds = [1, 2, 3, 4];
  const propertyRoutes = propertyIds.map(id => ({
    url: `${baseUrl}/properties/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...propertyRoutes];
} 