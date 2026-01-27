"use client";

import GamesList from "@/components/common/GamesList";
import { useGames } from "@/lib/hooks/use-games";

const Home = () => {
  return (
    <>
      <GamesList />
    </>
  );
};

export default Home;
