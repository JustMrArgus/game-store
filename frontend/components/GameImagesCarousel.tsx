import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import CarouselImage from './CarouselImage';
import { API_URL } from '@/lib/api/constants/constants';

interface GameImagesCarouselProps {
  primaryImage: string;
  additionalImages: string[];
}

const GameImagesCarousel = ({
  primaryImage,
  additionalImages,
}: GameImagesCarouselProps) => {
  return (
    <Carousel
      className="w-full max-w-250 mb-10"
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 4000,
          stopOnInteraction: true,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem className="basis-full relative h-150 rounded-xl overflow-hidden">
          <div className="absolute inset-0 h-full w-full">
            <CarouselImage
              src={`${API_URL}${primaryImage}`}
              alt="Primary image of the game"
            />
          </div>
        </CarouselItem>
        {additionalImages.map((additionalImage, index) => (
          <CarouselItem
            key={`additional-${index}`}
            className="basis-full relative h-150 rounded-xl overflow-hidden"
          >
            <div className="absolute inset-0 h-full w-full">
              <CarouselImage
                src={`${API_URL}${additionalImage}`}
                alt="Additional image of the game"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="bg-[#353538] cursor-pointer border-none" />
      <CarouselNext className="bg-[#353538] cursor-pointer border-none" />
    </Carousel>
  );
};

export default GameImagesCarousel;
