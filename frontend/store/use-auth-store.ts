import { User } from '@/lib/types/responses';
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  setUser: (user: User | null) => void;
  setLoadingAuth: (isLoading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoadingAuth: true,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setLoadingAuth: (isLoadingAuth) => set({ isLoadingAuth }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
