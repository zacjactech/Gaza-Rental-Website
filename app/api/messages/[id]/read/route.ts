import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import Message from '@/models/Message';

type MessageType = {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  createdAt: string;
  read: boolean;
};

export async function PUT(
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

    const decoded = verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: string };

    const message = await Message.findById(params.id);

    if (!message) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    if (message.recipientId !== decoded.userId) {
      return NextResponse.json(
        { error: 'You can only mark your own messages as read' },
        { status: 403 }
      );
    }

    if (message.read) {
      return NextResponse.json(
        { error: 'Message is already marked as read' },
        { status: 400 }
      );
    }

    message.read = true;
    await message.save();

    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 