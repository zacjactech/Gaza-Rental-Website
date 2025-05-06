import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Application from '@/models/Application';
import Property from '@/models/Property';
import { withDB } from '@/middleware/db';
import { authMiddleware } from '@/middleware/auth';

export const GET = withDB(authMiddleware(async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const application = await Application.findById(params.id)
      .populate('property', 'title location price')
      .populate('tenant', 'name email');

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    const property = await Property.findById(application.property);
    if (application.tenant.toString() !== req.user._id.toString() && 
        property.owner.toString() !== req.user._id.toString()) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    return NextResponse.json(application);
  } catch (error) {
    console.error('Error fetching application:', error);
    return NextResponse.json(
      { error: 'Failed to fetch application' },
      { status: 500 }
    );
  }
}));

export const PATCH = withDB(authMiddleware(async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const application = await Application.findById(params.id);
    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    const property = await Property.findById(application.property);
    if (property.owner.toString() !== req.user._id.toString()) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const updatedApplication = await Application.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    )
      .populate('property', 'title location price')
      .populate('tenant', 'name email');

    return NextResponse.json(updatedApplication);
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    );
  }
}));

export const DELETE = withDB(authMiddleware(async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const application = await Application.findById(params.id);
    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    if (application.tenant.toString() !== req.user._id.toString()) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    await Application.findByIdAndDelete(params.id);

    return NextResponse.json(
      { message: 'Application deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting application:', error);
    return NextResponse.json(
      { error: 'Failed to delete application' },
      { status: 500 }
    );
  }
})); 