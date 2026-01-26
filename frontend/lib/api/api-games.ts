import type { Game } from "@/lib/types/responses";
import { handleResponse } from "./utils/api-utils";
import { API_URL } from "./constants/constants";

export const getAllGames = async (): Promise<Game[]> => {
  const response = await fetch(`${API_URL}/games`);
  return handleResponse<Game[]>(response);
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
