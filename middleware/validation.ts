import { NextResponse } from 'next/server';
import { z } from 'zod';

export function validateRequest(handler: Function, schema: z.ZodType<any>) {
  return async (req: Request) => {
    try {
      let data;

      // Parse request body based on content type
      const contentType = req.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        data = await req.json();
      } else if (contentType?.includes('application/x-www-form-urlencoded')) {
        const formData = await req.formData();
        data = Object.fromEntries(formData.entries());
      } else {
        data = {};
      }

      // Validate data against schema
      const validatedData = await schema.parseAsync(data);

      // Add validated data to request
      const validatedReq = new Request(req.url, {
        method: req.method,
        headers: req.headers,
        body: JSON.stringify(validatedData),
      });

      return handler(validatedReq);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            error: 'Validation failed',
            details: error.errors.map((err) => ({
              path: err.path.join('.'),
              message: err.message,
            })),
          },
          { status: 400 }
        );
      }

      console.error('Validation error:', error);
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }
  };
}

// Example schema for property validation
export const propertySchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  price: z.number().min(0),
  type: z.enum(['apartment', 'house', 'villa', 'land']),
  bedrooms: z.number().min(0).max(20),
  bathrooms: z.number().min(0).max(10),
  location: z.string().min(3).max(100),
  area: z.number().min(0).optional(),
  amenities: z.array(z.string()).optional(),
  images: z.array(z.string().url()).optional(),
  available: z.boolean().optional(),
  featured: z.boolean().optional(),
}); 