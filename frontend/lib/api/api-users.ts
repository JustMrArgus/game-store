import type { User } from "@/lib/types/responses";
import type {
  UpdateUserRequest,
  CreateUserRequest,
} from "@/lib/types/requests";
import { handleResponse } from "./utils/api-utils";
import { API_URL } from "./constants/constants";

export const getAllUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users`, {
    credentials: "include",
  });
  return handleResponse<User[]>(response);
};

export const getUser = async (userId: number): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    credentials: "include",
  });
  return handleResponse<User>(response);
};

export const patchUser = async (
  userId: number,
  data: UpdateUserRequest,
): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return handleResponse<User>(response);
};

export const createUser = async (data: CreateUserRequest): Promise<User> => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return handleResponse<User>(response);
};

export const deleteUser = async (userId: number): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return handleResponse<User>(response);
};

export const getMe = async (): Promise<User> => {
  const response = await fetch(`${API_URL}/users/me`, {
    credentials: "include",
  });
  return handleResponse<User>(response);
};

export const patchMe = async (data: UpdateUserRequest): Promise<User> => {
  const response = await fetch(`${API_URL}/users/me`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return handleResponse<User>(response);
};
