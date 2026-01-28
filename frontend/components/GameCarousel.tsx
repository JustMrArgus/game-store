import { useGames } from '@/lib/hooks/use-games';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import CarouselCard from './CarouselCard';
import Autoplay from 'embla-carousel-autoplay';

interface CarouselProps {
  page?: number;
  limit?: number;
  genre?: string;
  minPrice?: number;
  maxPrice?: number;
  platforms?: string[];
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

const GameCarousel = (queryParams: CarouselProps) => {
  const { data } = useGames(queryParams);
  const games = data.items;

  return (
    <Carousel
      className="w-full mb-10"
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
    >
      <CarouselContent>
        {games.map((game) => (
          <CarouselItem key={`${game.id}-carousel`} className="basis-full">
            <CarouselCard
              id={game.id}
              primaryImage={game.primaryImage}
              title={game.title}
              price={game.price}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default GameCarousel;
