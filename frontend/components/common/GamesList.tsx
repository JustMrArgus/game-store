"use client";

import { useGames } from "@/lib/hooks/use-games";

const GamesList = () => {
  const { data } = useGames();

  return (
    <div>
      <ul>
        {data?.items?.map((game) => (
          <li key={game.id}>{game.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default GamesList;
