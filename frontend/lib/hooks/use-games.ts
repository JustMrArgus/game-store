import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllGames,
  getGame,
  createGame,
  patchGame,
  deleteGame,
} from "@/lib/api/api-games";

export const gameKeys = {
  all: ["games"] as const,
  detail: (id: number) => ["games", id] as const,
};

export const useGames = () => {
  return useQuery({
    queryKey: gameKeys.all,
    queryFn: getAllGames,
  });
};

export const useGame = (gameId: number) => {
  return useQuery({
    queryKey: gameKeys.detail(gameId),
    queryFn: () => getGame(gameId),
    enabled: !!gameId,
  });
};

export const useCreateGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gameKeys.all });
    },
  });
};

export const useUpdateGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ gameId, data }: { gameId: number; data: FormData }) =>
      patchGame(gameId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: gameKeys.all });
      queryClient.invalidateQueries({
        queryKey: gameKeys.detail(variables.gameId),
      });
    },
  });
};

export const useDeleteGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gameKeys.all });
    },
  });
};
