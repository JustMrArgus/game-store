import type { User } from "@/lib/types/responses";
import type { UpdateUserRequest, CreateUserRequest } from "@/lib/types/requests";
import { apiFetch } from "./utils/api-utils";

export const getAllUsers = async (): Promise<User[]> => {
  return await apiFetch<User[]>("/users") as User[];
};

export const getUser = async (userId: number): Promise<User> => {
  return await apiFetch<User>(`/users/${userId}`) as User;
};

export const patchUser = async (userId: number, data: UpdateUserRequest): Promise<User> => {
  return await apiFetch<User>(`/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  }) as User;
};

export const createUser = async (data: CreateUserRequest): Promise<User> => {
  return await apiFetch<User>("/users", {
    method: "POST",
    body: JSON.stringify(data),
  }) as User;
};

export const deleteUser = async (userId: number): Promise<User> => {
  return await apiFetch<User>(`/users/${userId}`, {
    method: "DELETE",
  }) as User;
};

export const getMe = async (): Promise<User> => {
  return await apiFetch<User>("/users/me", { skipRedirect: true }) as User;
};

export const patchMe = async (data: UpdateUserRequest): Promise<User> => {
  return await apiFetch<User>("/users/me", {
    method: "PATCH",
    body: JSON.stringify(data),
  }) as User;
};