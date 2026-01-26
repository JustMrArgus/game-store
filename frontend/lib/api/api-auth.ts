import type { AuthResponse } from "@/lib/types/responses";
import type { RegisterRequest, LoginRequest } from "@/lib/types/requests";
import { handleResponse } from "./utils/api-utils";
import { API_URL } from "./constants/constants";

export const register = async (
  data: RegisterRequest,
): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return handleResponse<AuthResponse>(response);
};

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return handleResponse<AuthResponse>(response);
};

export const logout = async (): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  return handleResponse<AuthResponse>(response);
};

export const refresh = async (): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });
  return handleResponse<AuthResponse>(response);
};
