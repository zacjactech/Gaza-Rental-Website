import { setupServer } from 'msw/node';
import { rest } from 'msw';

// Mock data
const mockProperties = [
  {
    id: '1',
    title: 'Modern Apartment',
    description: 'Beautiful modern apartment in the city center',
    price: 1000,
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    location: 'City Center',
    available: true,
  },
  // Add more mock properties as needed
];

const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'owner',
  },
  // Add more mock users as needed
];

// Mock handlers
export const handlers = [
  // Properties
  rest.get('/api/properties', (req, res, ctx) => {
    const page = Number(req.url.searchParams.get('page')) || 1;
    const limit = Number(req.url.searchParams.get('limit')) || 10;
    const start = (page - 1) * limit;
    const end = start + limit;

    return res(
      ctx.status(200),
      ctx.json({
        data: mockProperties.slice(start, end),
        pagination: {
          total: mockProperties.length,
          page,
          limit,
          pages: Math.ceil(mockProperties.length / limit),
        },
      })
    );
  }),

  rest.post('/api/properties', async (req, res, ctx) => {
    const property = await req.json();
    const newProperty = {
      id: String(mockProperties.length + 1),
      ...property,
      createdAt: new Date().toISOString(),
    };
    mockProperties.push(newProperty);
    return res(ctx.status(201), ctx.json(newProperty));
  }),

  // Users
  rest.get('/api/users/profile', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockUsers[0]));
  }),

  // Auth
  rest.post('/api/auth/login', async (req, res, ctx) => {
    const { email, password } = await req.json();
    if (email === 'john@example.com' && password === 'password') {
      return res(
        ctx.status(200),
        ctx.json({
          user: mockUsers[0],
          token: 'mock-jwt-token',
        })
      );
    }
    return res(
      ctx.status(401),
      ctx.json({ error: 'Invalid credentials' })
    );
  }),
];

export const server = setupServer(...handlers); 