import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Application from '@/models/Application';
import { withDB } from '@/middleware/db';
import { authMiddleware } from '@/middleware/auth';

export const GET = withDB(authMiddleware(async (req: Request) => {
  try {
    const applications = await Application.find({ tenant: req.user._id })
      .populate('property', 'title location price')
      .populate('tenant', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json(applications);
  } catch (error) {
    console.error('Error fetching user applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user applications' },
      { status: 500 }
    );
  }
})); 