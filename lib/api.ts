import { Property } from '@/models/Property';

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:4000/api';

// Helper function to detect server/client environment
const isServer = typeof window === 'undefined';

// Function to safely get cookies in both environments
async function getAuthCookie() {
  if (isServer) {
    // Only import on server side
    const { cookies } = await import('next/headers');
    return cookies().get('token')?.value;
  } else {
    // Browser cookie access
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
    return tokenCookie ? tokenCookie.split('=')[1] : undefined;
  }
}

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = await getAuthCookie();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
}

export const auth = {
  login: async (email: string, password: string) => {
    return fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (data: {
    name: string;
    email: string;
    password: string;
    role: 'landlord' | 'tenant';
  }) => {
    return fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  logout: async () => {
    return fetchAPI('/auth/logout', {
      method: 'POST',
    });
  },
};

export const properties = {
  async getAll(): Promise<Property[]> {
    const response = await fetch(`${API_URL}/api/properties`);
    if (!response.ok) {
      throw new Error('Failed to fetch properties');
    }
    return response.json();
  },

  async getById(id: string): Promise<Property> {
    const response = await fetch(`${API_URL}/api/properties/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch property');
    }
    return response.json();
  },

  async create(property: Omit<Property, '_id'>): Promise<Property> {
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
  },

  async update(id: string, property: Partial<Property>): Promise<Property> {
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
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/api/properties/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete property');
    }
  },

  async search(query: string): Promise<Property[]> {
    const response = await fetch(`${API_URL}/api/properties/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to search properties');
    }
    return response.json();
  },

  async filter(filters: {
    minPrice?: number;
    maxPrice?: number;
    type?: string;
    bedrooms?: number;
    location?: string;
  }): Promise<Property[]> {
    const queryParams = new URLSearchParams();
    if (filters.minPrice) queryParams.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice.toString());
    if (filters.type) queryParams.append('type', filters.type);
    if (filters.bedrooms) queryParams.append('bedrooms', filters.bedrooms.toString());
    if (filters.location) queryParams.append('location', filters.location);

    const response = await fetch(`${API_URL}/api/properties/filter?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to filter properties');
    }
    return response.json();
  },
};

export const applications = {
  getAll: async () => {
    return fetchAPI('/applications');
  },

  getById: async (id: string) => {
    return fetchAPI(`/applications/${id}`);
  },

  create: async (data: { propertyId: string; message: string }) => {
    return fetchAPI('/applications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: { status: 'pending' | 'approved' | 'rejected' }) => {
    return fetchAPI(`/applications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return fetchAPI(`/applications/${id}`, {
      method: 'DELETE',
    });
  },
};

export const messages = {
  getAll: async () => {
    return fetchAPI('/messages');
  },

  getById: async (id: string) => {
    return fetchAPI(`/messages/${id}`);
  },

  create: async (data: { receiverId: string; content: string }) => {
    return fetchAPI('/messages', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return fetchAPI(`/messages/${id}`, {
      method: 'DELETE',
    });
  },
};

export const users = {
  getProfile: async () => {
    return fetchAPI('/users/profile');
  },

  updateProfile: async (data: {
    name?: string;
    email?: string;
    currentPassword?: string;
    newPassword?: string;
  }) => {
    return fetchAPI('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
}; 