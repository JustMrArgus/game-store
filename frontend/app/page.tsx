"use client";

import { useGames } from "@/lib/hooks/use-games";

const Home = () => {
  const { data, isLoading, isError } = useGames();

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1>Error...</h1>
      </div>
    );
  }

  return (
    <div>
      <ul>
        {data?.data?.map((game) => (
          <li key={game.id}>{game.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
