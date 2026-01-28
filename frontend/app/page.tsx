'use client';

import GamesList from '@/components/GamesList';

const Home = () => {
  return (
    <div className="px-55 mt-15">
      <GamesList limit={18} sortBy="buyCount" gamesListMode="home" />
    </div>
  );
};

export default Home;
