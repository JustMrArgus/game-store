export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
}

export interface UpdateUserRequest {
  email?: string;
  name?: string;
}

export interface CreateCartItemRequest {
  cartId: number;
  gameId: number;
  quantity?: number;
  price: number;
}
