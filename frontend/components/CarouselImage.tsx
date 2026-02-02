'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CarouselImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
}

const CarouselImage = ({
  src,
  alt,
  fallbackSrc = '/defaultGameImage.jpg',
}: CarouselImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      className="object-cover"
      onError={() => setCurrentSrc(fallbackSrc)}
    />
  );
};

export default CarouselImage;
