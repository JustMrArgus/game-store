import type { Cart, CartItem } from "@/lib/types/responses";
import type { CreateCartItemRequest } from "@/lib/types/requests";
import { handleResponse } from "./utils/api-utils";
import { API_URL } from "./constants/constants";

export const getAllCarts = async (): Promise<Cart[]> => {
  const response = await fetch(`${API_URL}/carts`, {
    credentials: "include",
  });
  return handleResponse<Cart[]>(response);
};

export const getCart = async (cartId: number): Promise<Cart> => {
  const response = await fetch(`${API_URL}/carts/${cartId}`, {
    credentials: "include",
  });
  return handleResponse<Cart>(response);
};

export const deleteCart = async (cartId: number): Promise<Cart> => {
  const response = await fetch(`${API_URL}/carts/${cartId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return handleResponse<Cart>(response);
};

export const getCartItem = async (
  cartId: number,
  gameId: number,
): Promise<CartItem> => {
  const response = await fetch(`${API_URL}/carts/${cartId}/items/${gameId}`, {
    credentials: "include",
  });
  return handleResponse<CartItem>(response);
};

export const createCartItem = async (
  data: CreateCartItemRequest,
): Promise<CartItem> => {
  const response = await fetch(`${API_URL}/carts/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return handleResponse<CartItem>(response);
};

export const deleteCartItem = async (
  cartId: number,
  gameId: number,
): Promise<CartItem> => {
  const response = await fetch(`${API_URL}/carts/${cartId}/items/${gameId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return handleResponse<CartItem>(response);
};
