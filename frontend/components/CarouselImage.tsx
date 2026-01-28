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
  fallbackSrc = '/images/placeholder.png',
}: GameImageProps) => {
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
