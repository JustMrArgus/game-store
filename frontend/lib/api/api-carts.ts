import type { Cart, CartItem } from "@/lib/types/responses";
import type { CreateCartItemRequest } from "@/lib/types/requests";
import { apiFetch } from "./utils/api-utils";

export const getAllCarts = async (): Promise<Cart[]> => {
  return await apiFetch<Cart[]>("/carts") as Cart[];
};

export const getCart = async (cartId: number): Promise<Cart> => {
  return await apiFetch<Cart>(`/carts/${cartId}`) as Cart;
};

export const deleteCart = async (cartId: number): Promise<Cart> => {
  return await apiFetch<Cart>(`/carts/${cartId}`, {
    method: "DELETE",
  }) as Cart;
};

export const getCartItem = async (cartId: number, gameId: number): Promise<CartItem> => {
  return await apiFetch<CartItem>(`/carts/${cartId}/items/${gameId}`) as CartItem;
};

export const createCartItem = async (data: CreateCartItemRequest): Promise<CartItem> => {
  return await apiFetch<CartItem>("/carts/items", {
    method: "POST",
    body: JSON.stringify(data),
  }) as CartItem;
};

export const deleteCartItem = async (cartId: number, gameId: number): Promise<CartItem> => {
  return await apiFetch<CartItem>(`/carts/${cartId}/items/${gameId}`, {
    method: "DELETE",
  }) as CartItem;
};