import { NextResponse } from 'next/server';
import { z } from 'zod';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

const applicationSchema = z.object({
  message: z.string().min(10),
  moveInDate: z.string().datetime(),
  duration: z.number().int().positive(),
  durationUnit: z.enum(['months', 'years']),
  additionalInfo: z.string().optional(),
});

type Application = z.infer<typeof applicationSchema> & {
  id: string;
  propertyId: string;
  tenantId: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
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

    // TODO: Replace with actual database query
    const property: { landlordId: string } | null = null;

    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    if (property.landlordId !== decoded.userId && decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'You can only view applications for your own properties' },
        { status: 403 }
      );
    }

    // TODO: Replace with actual database query
    const applications: Application[] = [];

    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
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

    if (decoded.role !== 'tenant') {
      return NextResponse.json(
        { error: 'Only tenants can submit applications' },
        { status: 403 }
      );
    }

    // TODO: Replace with actual database query
    const property: { id: string } | null = null;

    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const validatedData = applicationSchema.parse(body);

    // TODO: Replace with actual database query
    const application: Application = {
      id: '1',
      ...validatedData,
      propertyId: property.id,
      tenantId: decoded.userId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(application, { status: 201 });
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