import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  Game,
  GetGamesParams,
  GetGamesResponse,
} from "@/lib/types/responses";
import {
  getAllGames,
  getGame,
  createGame,
  patchGame,
  deleteGame,
} from "@/lib/api/api-games";

export const gameKeys = {
  all: (params?: GetGamesParams) => ["games", params] as const,
  detail: (id: number) => ["games", id] as const,
};

export const useGames = (params?: GetGamesParams) => {
  return useQuery<GetGamesResponse>({
    queryKey: gameKeys.all(params),
    queryFn: () => getAllGames(params),
  });
};

export const useGame = (gameId: number) => {
  return useQuery<Game>({
    queryKey: gameKeys.detail(gameId),
    queryFn: () => getGame(gameId),
    enabled: !!gameId,
  });
};

export const useCreateGame = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGame,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["games"] }),
  });
};

export const useUpdateGame = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ gameId, data }: { gameId: number; data: FormData }) =>
      patchGame(gameId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      queryClient.invalidateQueries({ queryKey: ["games", variables.gameId] });
    },
  });
};

export const useDeleteGame = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteGame,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["games"] }),
  });
};
