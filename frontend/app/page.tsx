'use client';

import AllGamesButton from '@/components/AllGamesButton';
import GameCarousel from '@/components/GameCarousel';
import GamesList from '@/components/GamesList';

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <GameCarousel limit={5} sortBy="buyCount" />
      <p className="text-white font-bold text-xl mb-8 self-start">
        Our most popular games
      </p>
      <GamesList limit={18} sortBy="buyCount" gamesListMode="home" />
      <AllGamesButton />
    </div>
  );
};

export default Home;
