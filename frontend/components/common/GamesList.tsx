import { useGames } from "@/lib/hooks/use-games";

const GamesList = () => {
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
        {data?.map((game) => (
          <li key={game.id}>{game.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default GamesList;
