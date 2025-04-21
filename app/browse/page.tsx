import PropertyCard from '@/components/PropertyCard';
import Footer from '@/components/Footer';
import { Filter, MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BrowsePage() {
  // Mock properties data
  const properties = [
    {
      id: 1,
      title: 'Cozy 2BR Apartment in Mikocheni',
      price: 250000,
      currency: 'TZS',
      period: 'month',
      bedrooms: 2,
      bathrooms: 1,
      location: 'Mikocheni, Dar es Salaam',
      distance: '5 km to center',
      image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 2,
      title: 'Modern 3BR Villa in Masaki',
      price: 500000,
      currency: 'TZS',
      period: 'month',
      bedrooms: 3,
      bathrooms: 2,
      location: 'Masaki, Dar es Salaam',
      distance: '3 km to center',
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 3,
      title: 'Spacious 1BR Apartment in Mbezi',
      price: 180000,
      currency: 'TZS',
      period: 'month',
      bedrooms: 1,
      bathrooms: 1,
      location: 'Mbezi, Dar es Salaam',
      distance: '10 km to center',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 4,
      title: 'Family 4BR House in Oyster Bay',
      price: 750000,
      currency: 'TZS',
      period: 'month',
      bedrooms: 4,
      bathrooms: 3,
      location: 'Oyster Bay, Dar es Salaam',
      distance: '4 km to center',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 5,
      title: 'Studio Apartment in City Center',
      price: 150000,
      currency: 'TZS',
      period: 'month',
      bedrooms: 1,
      bathrooms: 1,
      location: 'City Center, Dar es Salaam',
      distance: '1 km to center',
      image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 6,
      title: 'Modern 2BR Apartment in Kinondoni',
      price: 280000,
      currency: 'TZS',
      period: 'month',
      bedrooms: 2,
      bathrooms: 1,
      location: 'Kinondoni, Dar es Salaam',
      distance: '6 km to center',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 7,
      title: 'Luxury 3BR Apartment in Upanga',
      price: 600000,
      currency: 'TZS',
      period: 'month',
      bedrooms: 3,
      bathrooms: 2,
      location: 'Upanga, Dar es Salaam',
      distance: '2 km to center',
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 8,
      title: '1BR Apartment near University',
      price: 200000,
      currency: 'TZS',
      period: 'month',
      bedrooms: 1,
      bathrooms: 1,
      location: 'Ubungo, Dar es Salaam',
      distance: '8 km to center',
      image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-primary/10 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Browse Properties
          </h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative col-span-1 md:col-span-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Location, neighborhood, or address"
                />
              </div>
              
              <div className="col-span-1">
                <select className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option value="">Property Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                  <option value="studio">Studio</option>
                </select>
              </div>
              
              <div className="col-span-1">
                <select className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option value="">Price Range</option>
                  <option value="0-200000">Under 200,000 TZS</option>
                  <option value="200000-300000">200,000 - 300,000 TZS</option>
                  <option value="300000-500000">300,000 - 500,000 TZS</option>
                  <option value="500000+">Above 500,000 TZS</option>
                </select>
              </div>
              
              <div className="col-span-1">
                <Button className="w-full flex items-center justify-center gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>
            
            <div className="mt-4 flex items-center">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{properties.length}</span> properties
          </p>
          
          <div className="flex items-center">
            <span className="text-gray-600 dark:text-gray-400 mr-2">Sort by:</span>
            <select className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              <option value="newest">Newest</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        <div className="mt-10 flex justify-center">
          <nav className="flex items-center gap-1">
            <Button variant="outline" size="icon" disabled>
              &lt;
            </Button>
            <Button variant="default" size="icon">1</Button>
            <Button variant="outline" size="icon">2</Button>
            <Button variant="outline" size="icon">3</Button>
            <Button variant="outline" size="icon">
              &gt;
            </Button>
          </nav>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}