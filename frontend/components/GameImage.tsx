'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface GameImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
}

export const GameImage = ({
  src,
  alt,
  fallbackSrc = '/defaultGameImage.jpg',
}: GameImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={500}
      height={500}
      className="object-cover mt-0 rounded-xl"
      onError={() => setCurrentSrc(fallbackSrc)}
    />
  );
};
