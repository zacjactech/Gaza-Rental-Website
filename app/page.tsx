import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/Hero';
import PropertyCard from '@/components/PropertyCard';
import MapCTA from '@/components/MapCTA';
import TrustFactors from '@/components/TrustFactors';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function Home() {
  const featuredProperties = [
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
      id: 3,
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
      id: 4,
      title: 'Cozy 2BR Apartment in Mikocheni',
      price: 250000,
      currency: 'TZS',
      period: 'month',
      bedrooms: 2,
      bathrooms: 1,
      location: 'Mikocheni, Dar es Salaam',
      distance: '5 km to center',
      image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Mary N.',
      role: 'Tenant',
      rating: 5,
      comment: 'Found my perfect apartment in just 3 days. The booking process was so easy!',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 2,
      name: 'Mary N.',
      role: 'Tenant',
      rating: 5,
      comment: 'Amazing platform for finding good houses in Dar es Salaam. Highly recommended!',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 3,
      name: 'Mary N.',
      role: 'Tenant',
      rating: 5,
      comment: 'The map feature helped me find a place close to my workplace. Very convenient!',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 4,
      name: 'Mary N.',
      role: 'Tenant',
      rating: 5,
      comment: 'Payment was secure and the landlord was verified. Great experience overall!',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-center text-gray-800">Featured Rentals</h2>
          <p className="text-center text-gray-600 mb-10">Find homes that match your lifestyle</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <MapCTA />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-center text-gray-800">Why Trust GazaRenter?</h2>
          <TrustFactors />
        </div>
      </section>

      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-center text-gray-800">What Our Users Say</h2>
          <p className="text-center text-gray-600 mb-10">Real stories from real tenants and landlords</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map(testimonial => (
              <Testimonials key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}