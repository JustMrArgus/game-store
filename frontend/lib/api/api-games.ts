import type { Game, GetGamesParams, GetGamesResponse } from "@/lib/types/responses";
import { apiFetch } from "./utils/api-utils";

export const getAllGames = async (params?: GetGamesParams): Promise<GetGamesResponse> => {
  const query = new URLSearchParams();

  if (params?.page) query.append("page", params.page.toString());
  if (params?.limit) query.append("limit", params.limit.toString());
  if (params?.genre) query.append("genre", params.genre);
  if (params?.platforms?.length) query.append("platforms", params.platforms.join(","));
  if (params?.sortBy) query.append("sortBy", params.sortBy);
  if (params?.sortOrder) query.append("sortOrder", params.sortOrder);
  if (params?.minPrice !== undefined) query.append("minPrice", params.minPrice.toString());
  if (params?.maxPrice !== undefined) query.append("maxPrice", params.maxPrice.toString());
  if (params?.search) query.append("search", params.search);

  return await apiFetch<GetGamesResponse>(`/games?${query.toString()}`, {skipRedirect: true}) as GetGamesResponse;
};

export const getGame = async (gameId: number): Promise<Game> => {
  return await apiFetch<Game>(`/games/${gameId}`, {skipRedirect: true}) as Game;
};

export const patchGame = async (gameId: number, data: FormData): Promise<Game> => {
  return await apiFetch<Game>(`/games/${gameId}`, {
    method: "PATCH",
    body: data,
    skipRedirect: true,
  }) as Game;
};

export const createGame = async (data: FormData): Promise<Game> => {
  return await apiFetch<Game>("/games", {
    method: "POST",
    body: data,
  }) as Game;
};

export const deleteGame = async (gameId: number): Promise<Game> => {
  return await apiFetch<Game>(`/games/${gameId}`, {
    method: "DELETE",
  }) as Game;
};