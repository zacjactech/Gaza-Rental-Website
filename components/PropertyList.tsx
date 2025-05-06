import { useEffect, useState } from 'react';
import { properties } from '@/lib/api';
import { Property } from '@/models/Property';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

export function PropertyList() {
  const [propertiesList, setPropertiesList] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchProperties() {
      try {
        const data = await properties.getAll();
        setPropertiesList(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch properties');
        toast({
          title: 'Error',
          description: 'Failed to fetch properties',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [toast]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-32 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {propertiesList.map((property) => (
        <Card key={property._id?.toString()} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>{property.title}</CardTitle>
            <CardDescription>{property.location}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold">${property.price}/month</p>
              <div className="flex gap-2">
                <Badge variant="secondary">{property.type}</Badge>
                <Badge variant="secondary">{property.bedrooms} beds</Badge>
                <Badge variant="secondary">{property.bathrooms} baths</Badge>
              </div>
              <p className="text-sm text-gray-500">{property.description}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => router.push(`/properties/${property._id?.toString()}`)}
            >
              View Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
} 