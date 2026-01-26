export type Role = "ADMIN" | "USER";

export interface User {
  id: number;
  email: string;
  name: string;
  role: Role;
}

export interface Game {
  id: number;
  keys: string[];
  quantity: number;
  title: string;
  genre: string;
  buyCount: number;
  description: string;
  trailer: string;
  primaryImage: string;
  additionalImages: string[];
  logo: string;
  price: number;
  developer: string;
  publisher: string;
  releaseDate: string;
  platforms: string[];
  minOS: string;
  minCPU: string;
  minMemory: string;
  minGPU: string;
  minStorage: string;
  recOS: string;
  recCPU: string;
  recMemory: string;
  recGPU: string;
  recStorage: string;
}

export interface CartItem {
  cartId: number;
  gameId: number;
  quantity: number;
  price: number;
  game?: Game;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
}

export interface AuthResponse {
  status: string;
}

export interface CheckoutResponse {
  url: string;
}

export interface VerifySessionResponse {
  status: string;
  session?: {
    id: string;
    payment_status: string;
  };
}

export interface GetGamesParams {
  page?: number;
  limit?: number;
  genre?: string;
  platforms?: string[];
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface GetGamesResponse {
  items: Game[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
