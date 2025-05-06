import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function withAuth(handler: Function) {
  return async (request: Request, ...args: any[]) => {
    try {
      const token = cookies().get('token')?.value;

      if (!token) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }

      if (!process.env.JWT_SECRET) {
        return NextResponse.json(
          { error: 'Server configuration error' },
          { status: 500 }
        );
      }

      const decoded = verify(token, process.env.JWT_SECRET);
      request.headers.set('userId', (decoded as any).userId);
      request.headers.set('userRole', (decoded as any).role);

      return handler(request, ...args);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
  };
}

export function withRole(roles: string[]) {
  return (handler: Function) => {
    return async (request: Request, ...args: any[]) => {
      const userRole = request.headers.get('userRole');

      if (!userRole || !roles.includes(userRole)) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 403 }
        );
      }

      return handler(request, ...args);
    };
  };
} 