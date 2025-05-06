import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Property from '@/models/Property';
import { withDB } from '@/middleware/db';

export const GET = withDB(async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const query: any = {};

    // Handle filters
    if (searchParams.get('minPrice')) {
      query.price = { $gte: Number(searchParams.get('minPrice')) };
    }
    if (searchParams.get('maxPrice')) {
      query.price = { ...query.price, $lte: Number(searchParams.get('maxPrice')) };
    }
    if (searchParams.get('type')) {
      query.type = searchParams.get('type');
    }
    if (searchParams.get('bedrooms')) {
      query.bedrooms = Number(searchParams.get('bedrooms'));
    }
    if (searchParams.get('location')) {
      query.location = new RegExp(searchParams.get('location')!, 'i');
    }

    const properties = await Property.find(query)
      .populate('owner', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json(properties);
  } catch (error) {
    console.error('Error filtering properties:', error);
    return NextResponse.json(
      { error: 'Failed to filter properties' },
      { status: 500 }
    );
  }
}); 