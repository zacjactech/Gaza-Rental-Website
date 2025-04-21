import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MapCTA = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-lg p-6 md:p-10">
          <div className="flex flex-col md:flex-row items-center mb-6 md:mb-0">
            <div className="bg-primary/10 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Prefer to browse on a Map?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">
                Explore rentals based on location and neighborhood
              </p>
            </div>
          </div>
          
          <Button 
            className="bg-primary hover:bg-primary/90 text-white"
            asChild
          >
            <Link href="/map-view">
              View Map
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MapCTA;