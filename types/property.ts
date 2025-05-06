export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  location: string;
  coordinates?: { lat: number; lng: number };
  bedrooms: number;
  bathrooms: number;
  area?: number;
  areaUnit?: string;
  images: string[];
  amenities: string[];
  features?: string[];
  landlord: {
    name: string;
    phone: string;
    email: string;
    responseRate: number;
    responseTime: string;
    verified: boolean;
    avatar: string;
    rating?: number;
    reviews?: number;
  };
  reviews?: Array<{
    id: number;
    user: string;
    date: string;
    rating: number;
    comment: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface IProperty {
  _id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  location: string;
  images: string[];
  owner: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface PropertyFilters {
  minPrice?: number;
  maxPrice?: number;
  type?: string;
  bedrooms?: number;
  location?: string;
  period?: 'daily' | 'weekly' | 'monthly' | 'yearly';
} 