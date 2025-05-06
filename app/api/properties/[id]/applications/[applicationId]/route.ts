import { NextResponse } from 'next/server';
import { z } from 'zod';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

const statusUpdateSchema = z.object({
  status: z.enum(['approved', 'rejected']),
  message: z.string().min(10).optional(),
});

type Application = {
  id: string;
  propertyId: string;
  tenantId: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
};

export async function PUT(
  request: Request,
  { params }: { params: { id: string; applicationId: string } }
) {
  try {
    const token = cookies().get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: string; role: string };

    if (decoded.role !== 'landlord' && decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Only landlords can update application status' },
        { status: 403 }
      );
    }

    // TODO: Replace with actual database query
    const property = { landlordId: "" };

    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    if (property.landlordId !== decoded.userId && decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'You can only update applications for your own properties' },
        { status: 403 }
      );
    }

    // TODO: Replace with actual database query
    const application: Application = {
      id: params.applicationId,
      propertyId: params.id,
      tenantId: "",
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    if (application.status !== 'pending') {
      return NextResponse.json(
        { error: 'Application status can only be updated when pending' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validatedData = statusUpdateSchema.parse(body);

    // TODO: Replace with actual database query
    const updatedApplication: Application = {
      ...application,
      status: validatedData.status,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(updatedApplication);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 