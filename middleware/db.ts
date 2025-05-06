import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

export async function withDB(handler: Function) {
  return async (request: Request, ...args: any[]) => {
    try {
      await connectDB();
      return handler(request, ...args);
    } catch (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Database connection error' },
        { status: 500 }
      );
    }
  };
} 