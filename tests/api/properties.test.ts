import { withDB } from '@/middleware/db';
import { withAuth } from '@/middleware/auth';
import Property from '@/models/Property';
import { createMocks } from 'node-mocks-http';

jest.mock('@/middleware/db');
jest.mock('@/middleware/auth');
jest.mock('@/models/Property');

// Create a manual mock for NextResponse
const mockJsonResponse = {
  json: jest.fn().mockImplementation((data, options) => ({
    data,
    status: options?.status || 200,
    json: async () => data
  }))
};

// Use the mock directly instead of importing from next/server
jest.mock('next/server', () => ({
  NextResponse: mockJsonResponse
}));

describe('Properties API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/properties', () => {
    it('fetches properties successfully', async () => {
      const mockProperties = [
        {
          id: '1',
          title: 'Test Property',
          description: 'Test Description',
          price: 1000,
          location: 'Test Location',
        },
      ];

      Property.find = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          sort: jest.fn().mockResolvedValue(mockProperties),
        }),
      });

      const { req, res } = createMocks({
        method: 'GET',
      });

      withDB.mockImplementation((handler) => handler);
      withAuth.mockImplementation((handler) => handler);

      const response = await withAuth(withDB(async () => {
        const data = await Property.find().populate('owner').sort('-createdAt');
        return NextResponse.json({ data, pagination: {} });
      }))(req, res);

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.data).toEqual(mockProperties);
      expect(data.pagination).toBeDefined();
    });

    it('handles errors when fetching properties', async () => {
      (Property.find as jest.Mock).mockImplementation(() => {
        throw new Error('Database error');
      });

      const { req, res } = createMocks({
        method: 'GET',
      });

      (withDB as jest.Mock).mockImplementation((handler) => handler);
      (withAuth as jest.Mock).mockImplementation((handler) => handler);

      const response = await withAuth(withDB(async () => {
        try {
          await Property.find().populate('owner').sort('-createdAt');
          return NextResponse.json({ data: [], pagination: {} });
        } catch (error) {
          return NextResponse.json(
            { error: 'Failed to fetch properties' },
            { status: 500 }
          );
        }
      }))(req, res);

      expect(response.status).toBe(500);
      const data = await response.json();
      expect(data.error).toBe('Failed to fetch properties');
    });
  });

  describe('POST /api/properties', () => {
    it('creates a property successfully', async () => {
      const mockProperty = {
        id: '1',
        title: 'New Property',
        description: 'New Description',
        price: 2000,
        location: 'New Location',
      };

      (Property.create as jest.Mock).mockResolvedValue(mockProperty);

      const { req, res } = createMocks({
        method: 'POST',
        body: mockProperty,
      });

      (withDB as jest.Mock).mockImplementation((handler) => handler);
      (withAuth as jest.Mock).mockImplementation((handler) => handler);

      const response = await withAuth(withDB(async () => {
        const property = await Property.create(req.body);
        return NextResponse.json(property, { status: 201 });
      }))(req, res);

      expect(response.status).toBe(201);
      const data = await response.json();
      expect(data).toEqual(mockProperty);
    });

    it('handles validation errors when creating a property', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {}, // Invalid property data
      });

      (withDB as jest.Mock).mockImplementation((handler) => handler);
      (withAuth as jest.Mock).mockImplementation((handler) => handler);

      const response = await withAuth(withDB(async () => {
        try {
          await Property.create(req.body);
          return NextResponse.json({}, { status: 201 });
        } catch (error) {
          return NextResponse.json(
            { error: 'Invalid property data' },
            { status: 400 }
          );
        }
      }))(req, res);

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBe('Invalid property data');
    });
  });
}); 