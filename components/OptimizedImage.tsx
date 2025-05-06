import { useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  quality = 75,
  sizes = '100vw',
  className,
  objectFit = 'cover',
  placeholder = 'empty',
  blurDataURL,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fallback image as data URL
  const fallbackImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23cccccc'/%3E%3Cpath d='M195,102.5v95m-95-95h190' stroke='%23ffffff' stroke-width='10'/%3E%3Ctext x='200' y='180' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%23ffffff'%3ENo Image Available%3C/text%3E%3C/svg%3E";

  const imageProps = {
    src: error ? fallbackImage : src,
    alt,
    width,
    height,
    fill,
    priority,
    quality,
    sizes,
    className: cn(
      'transition-opacity duration-300',
      isLoading ? 'opacity-0' : 'opacity-100',
      `object-${objectFit}`,
      className
    ),
    onLoad: () => setIsLoading(false),
    onError: () => setError(true),
    placeholder: placeholder,
    blurDataURL: blurDataURL || fallbackImage,
  };

  return (
    <div className="relative">
      {isLoading && (
        <Skeleton className={cn(
          'absolute inset-0',
          fill ? 'w-full h-full' : `w-[${width}px] h-[${height}px]`
        )} />
      )}
      <Image {...imageProps} />
    </div>
  );
} 