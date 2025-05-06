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

// Add the authMiddleware function that's being imported by API routes
export function authMiddleware(handler: Function) {
  return async (request: Request, ...args: any[]) => {
    try {
      // Get the authorization header
      const authHeader = request.headers.get('Authorization');
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }
      
      const token = authHeader.split(' ')[1];
      
      if (!process.env.JWT_SECRET) {
        return NextResponse.json(
          { error: 'Server configuration error' },
          { status: 500 }
        );
      }
      
      const decoded = verify(token, process.env.JWT_SECRET);
      
      // Add user data to the request object
      const requestWithUser = new Request(request);
      // @ts-ignore - Adding user property to request
      requestWithUser.user = decoded;
      
      return handler(requestWithUser, ...args);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
  };
} 