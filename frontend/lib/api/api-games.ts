import type {
  Game,
  GetGamesParams,
  GetGamesResponse,
} from "@/lib/types/responses";
import { handleResponse } from "./utils/api-utils";
import { API_URL } from "./constants/constants";

export const getAllGames = async (
  params?: GetGamesParams,
): Promise<GetGamesResponse> => {
  const query = new URLSearchParams();

  if (params?.page) query.append("page", params.page.toString());
  if (params?.limit) query.append("limit", params.limit.toString());
  if (params?.genre) query.append("genre", params.genre);
  if (params?.platforms?.length)
    query.append("platforms", params.platforms.join(","));
  if (params?.sortBy) query.append("sortBy", params.sortBy);
  if (params?.sortOrder) query.append("sortOrder", params.sortOrder);
  if (params?.minPrice !== undefined)
    query.append("minPrice", params.minPrice.toString());
  if (params?.maxPrice !== undefined)
    query.append("maxPrice", params.maxPrice.toString());
  if (params?.search) query.append("search", params.search);

  const response = await fetch(`${API_URL}/games?${query.toString()}`);
  return handleResponse<GetGamesResponse>(response);
};

export const getGame = async (gameId: number): Promise<Game> => {
  const response = await fetch(`${API_URL}/games/${gameId}`);
  return handleResponse<Game>(response);
};

export const patchGame = async (
  gameId: number,
  data: FormData,
): Promise<Game> => {
  const response = await fetch(`${API_URL}/games/${gameId}`, {
    method: "PATCH",
    body: data,
    credentials: "include",
  });
  return handleResponse<Game>(response);
};

export const createGame = async (data: FormData): Promise<Game> => {
  const response = await fetch(`${API_URL}/games`, {
    method: "POST",
    body: data,
    credentials: "include",
  });
  return handleResponse<Game>(response);
};

export const deleteGame = async (gameId: number): Promise<Game> => {
  const response = await fetch(`${API_URL}/games/${gameId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return handleResponse<Game>(response);
};
