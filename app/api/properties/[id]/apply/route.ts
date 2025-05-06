import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Property from '@/models/Property';
import Application from '@/models/Application';
import { withDB } from '@/middleware/db';
import { authMiddleware } from '@/middleware/auth';
import { validateRequest } from '@/middleware/validation';
import { applicationSchema } from '@/schemas/application';

export const POST = withDB(
  authMiddleware(
    validateRequest(
      async (req: Request, { params }: { params: { id: string } }) => {
        try {
          const property = await Property.findById(params.id);
          if (!property) {
            return NextResponse.json(
              { error: 'Property not found' },
              { status: 404 }
            );
          }

          const body = await req.json();
          const application = new Application({
            ...body,
            property: params.id,
            applicant: req.user._id,
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
      },
      applicationSchema
    )
  )
); 