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
          primaryImage={game.primaryImage}
          title={game.title}
          price={game.price}
        />
      ))}
    </div>
  );
};

export default GamesList;
