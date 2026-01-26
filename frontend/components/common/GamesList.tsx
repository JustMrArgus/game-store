import { useGames } from "@/lib/hooks/use-games";
import { ClipLoader } from "react-spinners";

const GamesList = () => {
  const { data, isLoading, isError } = useGames();

  if (isLoading) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <ClipLoader color="#FFFFFF" size={80} />
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
