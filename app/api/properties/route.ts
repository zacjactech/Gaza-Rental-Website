import { NextResponse } from 'next/server';

// Mock data for development
const mockProperties = [
  {
    id: 1,
    title: "Modern Apartment in Mikocheni",
    price: 250000,
    currency: "TZS",
    period: "monthly",
    bedrooms: 2,
    bathrooms: 1,
    location: "Mikocheni, Dar es Salaam",
    images: [
      "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg"
    ],
    description: "Beautiful modern apartment with great amenities",
    type: "apartment",
    available: true,
    amenities: ["parking", "security", "internet"],
    createdAt: "2024-02-20"
  },
  {
    id: 2,
    title: "Luxury Villa in Masaki",
    price: 450000,
    currency: "TZS",
    period: "monthly",
    bedrooms: 3,
    bathrooms: 2,
    location: "Masaki, Dar es Salaam",
    images: [
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
    ],
    description: "Luxurious villa with swimming pool and security",
    type: "villa",
    available: true,
    amenities: ["parking", "pool", "security", "garden"],
    createdAt: "2024-02-18"
  }
];

export async function GET(req: Request) {
  try {
    // Simple mock response
          return NextResponse.json({
      data: mockProperties,
            pagination: {
        total: mockProperties.length,
        page: 1,
        limit: 10,
        pages: 1,
            },
          });
        } catch (error) {
          console.error('Error fetching properties:', error);
          return NextResponse.json(
            { error: 'Failed to fetch properties' },
            { status: 500 }
          );
        }
}

export async function POST(req: Request) {
  try {
    // Mock response for property creation
          const body = await req.json();
    return NextResponse.json({
            ...body,
      id: mockProperties.length + 1,
      createdAt: new Date().toISOString()
    }, { status: 201 });
        } catch (error) {
          console.error('Error creating property:', error);
          return NextResponse.json(
            { error: 'Failed to create property' },
            { status: 500 }
          );
        }
} 