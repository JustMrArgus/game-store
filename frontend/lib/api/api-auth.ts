import type { AuthResponse } from "@/lib/types/responses";
import type { RegisterRequest, LoginRequest } from "@/lib/types/requests";
import { apiFetch } from "./utils/api-utils";

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  return await apiFetch<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  }) as AuthResponse;
};

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  return await apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  }) as AuthResponse;
};

export const logout = async (): Promise<AuthResponse> => {
  return await apiFetch<AuthResponse>("/auth/logout", {
    method: "POST",
  }) as AuthResponse;
};

export const refresh = async (): Promise<AuthResponse> => {
  return await apiFetch<AuthResponse>("/auth/refresh", {
    method: "POST",
  }) as AuthResponse;
};