import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { withDB } from '@/middleware/db';
import { authMiddleware } from '@/middleware/auth';
import { hash } from 'bcryptjs';

export const GET = withDB(authMiddleware(async (req: Request) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
}));

export const PATCH = withDB(authMiddleware(async (req: Request) => {
  try {
    const body = await req.json();
    const { name, email, currentPassword, newPassword } = body;

    const user = await User.findById(req.user._id);

    if (currentPassword && newPassword) {
      const isPasswordValid = await user.comparePassword(currentPassword);
      if (!isPasswordValid) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 400 }
        );
      }
      user.password = await hash(newPassword, 10);
    }

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    const updatedUser = await User.findById(req.user._id).select('-password');
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    );
  }
})); 