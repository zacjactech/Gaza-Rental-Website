import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Message from '@/models/Message';
import { withDB } from '@/middleware/db';
import { authMiddleware } from '@/middleware/auth';

export const GET = withDB(authMiddleware(async (req: Request) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id },
        { receiver: req.user._id },
      ],
    })
      .populate('sender', 'name email')
      .populate('receiver', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching user messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user messages' },
      { status: 500 }
    );
  }
})); 