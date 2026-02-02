import { Card, CardDescription, CardTitle } from './ui/card';
import { API_URL } from '@/lib/api/constants/constants';
import Link from 'next/link';
import CarouselImage from './CarouselImage';
import { Button } from './ui/button';

interface CarouselCardProps {
  id: number;
  primaryImage: string;
  title: string;
  price: number;
}

const CarouselCard = ({
  id,
  primaryImage,
  title,
  price,
}: CarouselCardProps) => {
  return (
    <Link href={`/games/${id}`} className="block w-full">
      <Card
        className="
          relative
          h-150
          w-full
          cursor-pointer
          border-none
          overflow-hidden
          text-white
        "
      >
        <div className="absolute inset-0 h-full w-full">
          <CarouselImage
            src={`${API_URL}${primaryImage}`}
            alt={title}
            fallbackSrc="/defaultGameImage.jpg"
          />
        </div>

        <div className="absolute inset-0 bg-black/0 z-10" />

        <div className="absolute bottom-0 z-20 p-6">
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-white text-lg my-3">
            {price > 0 ? `${price}$` : 'FREE'}
          </CardDescription>

          <Button
            variant="outline"
            size="lg"
            className="bg-[#353538] text-white hover:bg-[#ffffff59] border-none hover:text-white transition duration-100 cursor-pointer"
          >
            {price > 0 ? `BUY NOW` : 'GET FOR FREE'}
          </Button>
        </div>
      </Card>
    </Link>
  );
};

export default CarouselCard;
