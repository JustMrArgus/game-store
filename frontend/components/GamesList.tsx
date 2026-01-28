'use client';

import { useGames } from '@/lib/hooks/use-games';

import GameCard from './GameCard';

interface GamesListProps {
  page?: number;
  limit?: number;
  genre?: string;
  minPrice?: number;
  maxPrice?: number;
  platforms?: string[];
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  gamesListMode: 'home' | 'search';
}

const GamesList = ({ gamesListMode, ...queryParams }: GamesListProps) => {
  const { data } = useGames(queryParams);
  const games = data.items;

  return (
    <div>
      <p className="text-white font-bold text-xl mb-8">
        Our most popular games &gt;
      </p>
      <div
        className={
          gamesListMode === 'home'
            ? 'grid grid-cols-6 gap-8'
            : 'grid grid-cols-5 gap-8'
        }
      >
        {games.map((game) => (
          <GameCard
            key={game.id}
            id={game.id}
            logo={game.logo}
            title={game.title}
            price={game.price}
          />
        ))}
      </div>
    </div>
  );
};

export default GamesList;
