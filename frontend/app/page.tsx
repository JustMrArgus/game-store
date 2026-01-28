'use client';

import AllGamesButton from '@/components/AllGamesButton';
import GameCarousel from '@/components/GameCarousel';
import GamesList from '@/components/GamesList';

const Home = () => {
  return (
    <div className="px-55 mt-15 flex flex-col items-center">
      <GameCarousel limit={5} sortBy="buyCount" />
      <GamesList limit={18} sortBy="buyCount" gamesListMode="home" />
      <AllGamesButton />
    </div>
  );
};

export default Home;
