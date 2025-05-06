import { Property } from '@/types/property';

interface FetchPropertiesOptions {
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  type?: string;
  bedrooms?: number;
  bathrooms?: number;
  location?: string;
  search?: string;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProperties(options: FetchPropertiesOptions = {}): Promise<PaginatedResponse<Property>> {
  const params = new URLSearchParams();
  
  if (options.page) params.append('page', options.page.toString());
  if (options.limit) params.append('limit', options.limit.toString());
  if (options.minPrice) params.append('minPrice', options.minPrice.toString());
  if (options.maxPrice) params.append('maxPrice', options.maxPrice.toString());
  if (options.type) params.append('type', options.type);
  if (options.bedrooms) params.append('bedrooms', options.bedrooms.toString());
  if (options.bathrooms) params.append('bathrooms', options.bathrooms.toString());
  if (options.location) params.append('location', options.location);
  if (options.search) params.append('search', options.search);

  const response = await fetch(`${API_URL}/api/properties?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch properties');
  }

  return response.json();
}

export async function fetchProperty(id: string): Promise<Property> {
  const response = await fetch(`${API_URL}/api/properties/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch property');
  }

  return response.json();
}

export async function createProperty(property: Omit<Property, 'id' | 'createdAt' | 'owner'>): Promise<Property> {
  const response = await fetch(`${API_URL}/api/properties`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(property),
  });

  if (!response.ok) {
    throw new Error('Failed to create property');
  }

  return response.json();
}

export async function updateProperty(id: string, property: Partial<Property>): Promise<Property> {
  const response = await fetch(`${API_URL}/api/properties/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(property),
  });

  if (!response.ok) {
    throw new Error('Failed to update property');
  }

  return response.json();
}

export async function deleteProperty(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/api/properties/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete property');
  }
}

export async function searchProperties(query: string): Promise<Property[]> {
  const response = await fetch(`${API_URL}/api/properties/search?q=${encodeURIComponent(query)}`);
  
  if (!response.ok) {
    throw new Error('Failed to search properties');
  }

  return response.json();
}

export async function filterProperties(filters: Omit<FetchPropertiesOptions, 'page' | 'limit'>): Promise<Property[]> {
  const params = new URLSearchParams();
  
  if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
  if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
  if (filters.type) params.append('type', filters.type);
  if (filters.bedrooms) params.append('bedrooms', filters.bedrooms.toString());
  if (filters.bathrooms) params.append('bathrooms', filters.bathrooms.toString());
  if (filters.location) params.append('location', filters.location);

  const response = await fetch(`${API_URL}/api/properties/filter?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to filter properties');
  }

  return response.json();
} 