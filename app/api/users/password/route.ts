import { NextResponse } from 'next/server';
import { z } from 'zod';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { hash } from 'bcryptjs';

const passwordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

type User = {
  id: string;
  password: string;
};

export async function PUT(request: Request) {
  try {
    const token = cookies().get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const decoded = verify(token, process.env.JWT_SECRET) as { userId: string };

    const body = await request.json();
    const validatedData = passwordSchema.parse(body);

    // TODO: Replace with actual database query
    const user: User | null = null;

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (user.id !== decoded.userId) {
      return NextResponse.json(
        { error: 'You can only change your own password' },
        { status: 403 }
      );
    }

    // TODO: Replace with actual password verification
    const isPasswordValid = false;

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(validatedData.newPassword, 10);

    // TODO: Replace with actual database query
    const updatedUser = {
      ...user,
      password: hashedPassword,
    };

    return NextResponse.json({ success: true });
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