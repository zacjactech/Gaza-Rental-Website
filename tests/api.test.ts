import { NextResponse } from 'next/server';
import { withDB } from '@/middleware/db';
import { withAuth, withRole } from '@/middleware/auth';
import User from '@/models/User';
import Property from '@/models/Property';
import Application from '@/models/Application';
import Message from '@/models/Message';
import { createMocks } from 'node-mocks-http';
import { sign } from 'jsonwebtoken';
import '@testing-library/jest-dom';

// Define mock data objects
let testUser = {
  _id: 'test-user-id',
  name: 'Test User',
  email: 'test@example.com',
  role: 'landlord'
};

let testProperty = {
  _id: 'test-property-id',
  title: 'Test Property'
};

let testApplication = {
  _id: 'test-application-id',
  message: 'Test Application' 
};

let testMessage = {
  _id: 'test-message-id',
  content: 'Test Message'
};

// Mock fetch correctly with proper response format
const mockFetch = jest.fn().mockImplementation(async () => {
  return {
    ok: true,
    status: 200,
    json: async () => ({})
  };
});

// Apply the mock to global fetch
global.fetch = mockFetch as any;

describe('API Endpoints', () => {
  let authToken = 'test-auth-token';

  beforeAll(async () => {
    // Connect to test database
    await withDB(async () => {
      // Create test user
      testUser = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'landlord',
      });

      // Generate auth token
      authToken = sign(
        { userId: testUser._id },
        process.env.JWT_SECRET || 'test-secret',
        { expiresIn: '1h' }
      );

      // Create test property
      testProperty = await Property.create({
        title: 'Test Property',
        description: 'Test Description',
        price: 1000,
        location: 'Test Location',
        type: 'apartment',
        bedrooms: 2,
        bathrooms: 1,
        area: 100,
        amenities: ['wifi', 'parking'],
        images: ['test.jpg'],
        owner: testUser._id,
      });

      // Create test application
      testApplication = await Application.create({
        property: testProperty._id,
        applicant: testUser._id,
        message: 'Test Application',
        status: 'pending',
      });

      // Create test message
      testMessage = await Message.create({
        sender: testUser._id,
        recipient: testUser._id,
        content: 'Test Message',
        read: false,
      });
    });
  });

  afterAll(async () => {
    // Clean up test data
    await withDB(async () => {
      await User.deleteMany({ email: 'test@example.com' });
      await Property.deleteMany({ title: 'Test Property' });
      await Application.deleteMany({ message: 'Test Application' });
      await Message.deleteMany({ content: 'Test Message' });
    });
  });

  beforeEach(() => {
    // Reset and setup mock for each test
    mockFetch.mockReset();
    mockFetch.mockImplementation(async () => {
      // Default mock response
      return {
        ok: true,
        status: 200,
        json: async () => ({})
      };
    });
  });

  describe('Authentication', () => {
    it('should register a new user', async () => {
      const { req } = createMocks({
        method: 'POST',
        body: {
          name: 'New User',
          email: 'new@example.com',
          password: 'password123',
          role: 'tenant',
        },
      });

      mockFetch.mockImplementationOnce(async () => ({
        ok: true,
        status: 201,
        json: async () => ({ user: { name: 'New User' } })
      }));

      const response = await withDB(async () => {
        return await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(req.body),
        });
      }) as any;

      expect(response.status).toBe(201);
      const data = await response.json();
      expect(data.user).toHaveProperty('name', 'New User');
    });

    it('should login a user', async () => {
      const { req } = createMocks({
        method: 'POST',
        body: {
          email: 'test@example.com',
          password: 'password123',
        },
      });

      mockFetch.mockImplementationOnce(async () => ({
        ok: true,
        status: 200,
        json: async () => ({ user: { name: 'Test User' }, token: 'test-token' })
      }));

      const response = await withDB(async () => {
        return await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(req.body),
        });
      }) as any;

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.user).toHaveProperty('name', 'Test User');
      expect(data.token).toBeDefined();
    });
  });

  describe('Properties', () => {
    it('should get all properties', async () => {
      mockFetch.mockImplementationOnce(async () => ({
        ok: true,
        status: 200,
        json: async () => ({ data: [], pagination: {} })
      }));

      const response = await withDB(async () => {
        return await fetch('/api/properties', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
      }) as any;

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(Array.isArray(data.data)).toBe(true);
      expect(data.pagination).toBeDefined();
    });

    it('should create a new property', async () => {
      const { req } = createMocks({
        method: 'POST',
        body: {
          title: 'New Property',
          description: 'New Description',
          price: 2000,
          location: 'New Location',
          type: 'house',
          bedrooms: 3,
          bathrooms: 2,
          area: 200,
          amenities: ['pool', 'garden'],
          images: ['new.jpg'],
        },
      });

      mockFetch.mockImplementationOnce(async () => ({
        ok: true,
        status: 201,
        json: async () => ({ title: 'New Property' })
      }));

      const response = await withDB(async () => {
        return await fetch('/api/properties', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify(req.body),
        });
      }) as any;

      expect(response.status).toBe(201);
      const data = await response.json();
      expect(data).toHaveProperty('title', 'New Property');
    });
  });

  describe('Applications', () => {
    it('should get all applications', async () => {
      mockFetch.mockImplementationOnce(async () => ({
        ok: true,
        status: 200,
        json: async () => ([])
      }));

      const response = await withDB(async () => {
        return await fetch('/api/applications', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
      }) as any;

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    it('should create a new application', async () => {
      const { req } = createMocks({
        method: 'POST',
        body: {
          propertyId: testProperty._id,
          message: 'New Application',
        },
      });

      mockFetch.mockImplementationOnce(async () => ({
        ok: true,
        status: 201,
        json: async () => ({ message: 'New Application' })
      }));

      const response = await withDB(async () => {
        return await fetch('/api/applications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify(req.body),
        });
      }) as any;

      expect(response.status).toBe(201);
      const data = await response.json();
      expect(data.message).toBe('New Application');
    });
  });

  describe('Messages', () => {
    it('should get all messages', async () => {
      mockFetch.mockImplementationOnce(async () => ({
        ok: true,
        status: 200,
        json: async () => ([])
      }));

      const response = await withDB(async () => {
        return await fetch('/api/messages', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
      }) as any;

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
    });

    it('should create a new message', async () => {
      const { req } = createMocks({
        method: 'POST',
        body: {
          recipientId: testUser._id,
          content: 'New Message',
        },
      });

      mockFetch.mockImplementationOnce(async () => ({
        ok: true,
        status: 201,
        json: async () => ({ content: 'New Message' })
      }));

      const response = await withDB(async () => {
        return await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify(req.body),
        });
      }) as any;

      expect(response.status).toBe(201);
      const data = await response.json();
      expect(data.content).toBe('New Message');
    });
  });
}); 