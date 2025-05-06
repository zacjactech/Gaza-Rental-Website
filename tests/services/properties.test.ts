import { fetchProperties, fetchProperty, createProperty, updateProperty, deleteProperty, searchProperties, filterProperties } from '@/services/properties';
import { Property } from '@/types/property';

// Mock fetch
global.fetch = jest.fn();

describe('Property Service', () => {
  const mockProperty: Property = {
    id: '1',
    title: 'Test Property',
    description: 'Test Description',
    price: 1000,
    currency: 'USD',
    period: 'monthly',
    location: 'Test Location',
    bedrooms: 2,
    bathrooms: 1,
    images: ['test.jpg'],
    amenities: ['wifi', 'parking'],
    landlord: {
      name: 'Test Owner',
      phone: '123-456-7890',
      email: 'test@example.com',
      responseRate: 95,
      responseTime: '1 hour',
      verified: true,
      avatar: 'avatar.jpg'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  describe('fetchProperties', () => {
    it('should fetch properties with pagination', async () => {
      const mockResponse = {
        data: [mockProperty],
        pagination: {
          total: 1,
          page: 1,
          limit: 10,
          pages: 1
        }
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await fetchProperties({ page: 1, limit: 10 });
      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('page=1&limit=10'));
    });

    it('should handle filters', async () => {
      const filters = {
        minPrice: 500,
        maxPrice: 2000,
        type: 'apartment',
        bedrooms: 2
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ data: [mockProperty], pagination: {} })
      });

      await fetchProperties(filters);
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('minPrice=500&maxPrice=2000&type=apartment&bedrooms=2'));
    });

    it('should throw error on failed request', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false
      });

      await expect(fetchProperties()).rejects.toThrow('Failed to fetch properties');
    });
  });

  describe('fetchProperty', () => {
    it('should fetch a single property', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProperty)
      });

      const result = await fetchProperty('1');
      expect(result).toEqual(mockProperty);
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/properties/1'));
    });
  });

  describe('createProperty', () => {
    it('should create a new property', async () => {
      const newProperty = {
        title: 'New Property',
        description: 'New Description',
        price: 1500,
        currency: 'USD',
        period: 'monthly' as 'monthly' | 'daily' | 'weekly' | 'yearly',
        location: 'New Location',
        bedrooms: 3,
        bathrooms: 2,
        images: ['new.jpg'],
        amenities: ['wifi', 'parking'],
        updatedAt: new Date().toISOString(),
        landlord: mockProperty.landlord
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ 
          ...newProperty, 
          id: '2', 
          createdAt: new Date().toISOString()
        })
      });

      const result = await createProperty(newProperty);
      expect(result).toMatchObject(newProperty);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/properties'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        })
      );
    });
  });

  describe('updateProperty', () => {
    it('should update an existing property', async () => {
      const updates = { price: 2000 };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ ...mockProperty, ...updates })
      });

      const result = await updateProperty('1', updates);
      expect(result.price).toBe(2000);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/properties/1'),
        expect.objectContaining({
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' }
        })
      );
    });
  });

  describe('deleteProperty', () => {
    it('should delete a property', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true
      });

      await deleteProperty('1');
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/properties/1'),
        expect.objectContaining({
          method: 'DELETE'
        })
      );
    });
  });

  describe('searchProperties', () => {
    it('should search properties', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([mockProperty])
      });

      const result = await searchProperties('test');
      expect(result).toEqual([mockProperty]);
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('search?q=test'));
    });
  });

  describe('filterProperties', () => {
    it('should filter properties', async () => {
      const filters = {
        minPrice: 500,
        maxPrice: 2000,
        type: 'apartment'
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([mockProperty])
      });

      const result = await filterProperties(filters);
      expect(result).toEqual([mockProperty]);
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('filter?minPrice=500&maxPrice=2000&type=apartment'));
    });
  });
}); 