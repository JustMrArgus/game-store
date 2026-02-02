'use client';

import { GameImage } from '@/components/GameImage';
import GameImagesCarousel from '@/components/GameImagesCarousel';
import SystemRequirements from '@/components/SystemRequirements';
import { Button } from '@/components/ui/button';
import { API_URL } from '@/lib/api/constants/constants';
import { useGame } from '@/lib/hooks/use-games';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const GamePage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: game } = useGame(+id);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-5">{game.title}</h1>

      <div className="flex mb-5 gap-10">
        <div className="flex flex-col gap-3">
          <div>
            <GameImagesCarousel
              primaryImage={game.primaryImage}
              additionalImages={game.additionalImages}
            />
          </div>
          <div className="flex flex-col gap-5">
            <p>{game.description}</p>
            <p className="text-[#a2a2a3]">
              Genre:{' '}
              <Link href={`/games?genre=${encodeURIComponent(game.genre)}`}>
                <Button
                  variant="outline"
                  className="bg-[#353538] text-white hover:bg-[#ffffff59] border-none hover:text-white transition duration-100 cursor-pointer py-1 px-2"
                >
                  {game.genre}
                </Button>
              </Link>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="w-100">
            <GameImage
              src={`${API_URL}${game.logo}`}
              alt="Logo image of the game"
            />
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-xl font-bold">
              {game.price <= 0 ? 'FREE' : `${game.price}$`}
            </p>
            <div className="flex items-center gap-3">
              <Button
                className="grow py-7 bg-[#26bbff] border-0 text-black rounded-xl cursor-pointer transition duration-100"
                variant="outline"
              >
                Buy Now
              </Button>
              <Button
                variant="outline"
                className="bg-[#353538] text-white hover:bg-[#ffffff59] border-none hover:text-white transition duration-100 cursor-pointer py-7"
              >
                <ShoppingCart />
              </Button>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-[#a2a2a3]">Developer</p>
                <p>{game.developer}</p>
              </div>
              <hr className="mb-2 border-[#a2a2a3]" />
              <div className="flex justify-between mb-2">
                <p className="text-[#a2a2a3]">Publisher</p>
                <p>{game.publisher}</p>
              </div>
              <hr className="mb-2 border-[#a2a2a3]" />
              <div className="flex justify-between mb-2">
                <p className="text-[#a2a2a3]">Release Date</p>
                <p>{game.releaseDate}</p>
              </div>
              <hr className="mb-2 border-[#a2a2a3]" />
            </div>
          </div>
        </div>
      </div>

      <SystemRequirements game={game} />
    </div>
  );
};

export default GamePage;
