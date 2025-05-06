import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="text-9xl font-bold text-gray-200 dark:text-gray-800 mb-4">404</div>
      <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. The page may have been moved, deleted, or may never have existed.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild variant="default">
          <Link href="/">
            <Home className="w-4 h-4 mr-2" />
            Return Home
          </Link>
        </Button>
        
        <Button asChild variant="outline">
          <Link href="/browse">
            <Search className="w-4 h-4 mr-2" />
            Browse Properties
          </Link>
        </Button>
      </div>
    </div>
  );
} 