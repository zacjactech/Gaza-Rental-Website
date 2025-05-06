import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Application from '@/models/Application';
import Property from '@/models/Property';
import { withDB } from '@/middleware/db';
import { authMiddleware } from '@/middleware/auth';

export const GET = withDB(authMiddleware(async (req: Request) => {
  try {
    const applications = await Application.find({
      $or: [
        { tenant: req.user._id },
        { property: { $in: await Property.find({ owner: req.user._id }).select('_id') } },
      ],
    })
      .populate('property', 'title location price')
      .populate('tenant', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}));

export const POST = withDB(authMiddleware(async (req: Request) => {
  try {
    const body = await req.json();
    const { propertyId, message } = body;

    const property = await Property.findById(propertyId);
    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    const application = new Application({
      property: propertyId,
      tenant: req.user._id,
      message,
      status: 'pending',
    });

    await application.save();

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      { error: 'Failed to create application' },
      { status: 500 }
    );
  }
})); 