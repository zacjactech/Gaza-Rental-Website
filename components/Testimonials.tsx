import Image from 'next/image';
import { Star } from 'lucide-react';

interface TestimonialProps {
  id: number;
  name: string;
  role: string;
  rating: number;
  comment: string;
  image: string;
}

interface TestimonialsProps {
  testimonial: TestimonialProps;
}

const Testimonials = ({ testimonial }: TestimonialsProps) => {
  const { name, role, rating, comment, image } = testimonial;

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index}
        className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow hover-scale">
      <div className="flex flex-col items-center mb-4">
        <div className="relative h-16 w-16 rounded-full overflow-hidden mb-2">
          <Image
            src={image}
            alt={name}
            fill
            sizes="64px"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="text-center">
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {name}
          </h4>
          <p className="text-sm text-primary">
            {role}
          </p>
        </div>
      </div>
      
      <div className="flex justify-center mb-3">
        {renderStars(rating)}
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
        "{comment}"
      </p>
    </div>
  );
};

export default Testimonials;