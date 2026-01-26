import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllCarts,
  getCart,
  deleteCart,
  getCartItem,
  createCartItem,
  deleteCartItem,
} from "@/lib/api/api-carts";
import type { CreateCartItemRequest } from "@/lib/types/requests";

export const cartKeys = {
  all: ["carts"] as const,
  detail: (id: number) => ["carts", id] as const,
  item: (cartId: number, gameId: number) =>
    ["carts", cartId, "items", gameId] as const,
};

export const useCarts = () => {
  return useQuery({
    queryKey: cartKeys.all,
    queryFn: getAllCarts,
  });
};

export const useCart = (cartId: number) => {
  return useQuery({
    queryKey: cartKeys.detail(cartId),
    queryFn: () => getCart(cartId),
    enabled: !!cartId,
  });
};

export const useDeleteCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });
};

export const useCartItem = (cartId: number, gameId: number) => {
  return useQuery({
    queryKey: cartKeys.item(cartId, gameId),
    queryFn: () => getCartItem(cartId, gameId),
    enabled: !!cartId && !!gameId,
  });
};

export const useCreateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCartItemRequest) => createCartItem(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
      queryClient.invalidateQueries({
        queryKey: cartKeys.detail(variables.cartId),
      });
    },
  });
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartId, gameId }: { cartId: number; gameId: number }) =>
      deleteCartItem(cartId, gameId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
      queryClient.invalidateQueries({
        queryKey: cartKeys.detail(variables.cartId),
      });
    },
  });
};
