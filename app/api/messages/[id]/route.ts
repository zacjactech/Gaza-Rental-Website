import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Message from '@/models/Message';
import { withDB } from '@/middleware/db';
import { authMiddleware } from '@/middleware/auth';

export const GET = withDB(authMiddleware(async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const message = await Message.findById(params.id)
      .populate('sender', 'name email')
      .populate('receiver', 'name email');

    if (!message) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    if (message.sender.toString() !== req.user._id.toString() && 
        message.receiver.toString() !== req.user._id.toString()) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    return NextResponse.json(message);
  } catch (error) {
    console.error('Error fetching message:', error);
    return NextResponse.json(
      { error: 'Failed to fetch message' },
      { status: 500 }
    );
  }
}));

export const DELETE = withDB(authMiddleware(async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const message = await Message.findById(params.id);
    if (!message) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    if (message.sender.toString() !== req.user._id.toString() && 
        message.receiver.toString() !== req.user._id.toString()) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    await Message.findByIdAndDelete(params.id);

    return NextResponse.json(
      { message: 'Message deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    );
  }
})); 