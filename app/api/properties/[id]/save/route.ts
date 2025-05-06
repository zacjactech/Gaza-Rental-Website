import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Property from '@/models/Property';
import User from '@/models/User';
import { withDB } from '@/middleware/db';
import { authMiddleware } from '@/middleware/auth';

export const POST = withDB(
  authMiddleware(
    async (req: Request, { params }: { params: { id: string } }) => {
      try {
        const property = await Property.findById(params.id);
        if (!property) {
          return NextResponse.json(
            { error: 'Property not found' },
            { status: 404 }
          );
        }

        const user = await User.findById(req.user._id);
        if (!user) {
          return NextResponse.json(
            { error: 'User not found' },
            { status: 404 }
          );
        }

        // Check if property is already saved
        if (user.savedProperties.includes(params.id)) {
          return NextResponse.json(
            { error: 'Property already saved' },
            { status: 400 }
          );
        }

        // Add property to user's saved properties
        user.savedProperties.push(params.id);
        await user.save();

        return NextResponse.json({ message: 'Property saved successfully' });
      } catch (error) {
        console.error('Error saving property:', error);
        return NextResponse.json(
          { error: 'Failed to save property' },
          { status: 500 }
        );
      }
    }
  )
); 