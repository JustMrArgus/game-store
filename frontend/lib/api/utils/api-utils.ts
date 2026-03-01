import { useAuthStore } from '@/store/use-auth-store';
import toast from 'react-hot-toast';
import { API_URL } from '../constants/constants';

const BASE_URL = API_URL;

let refreshTokenPromise: Promise<void> | null = null;

const refreshTokens = async (): Promise<void> => {
  const response = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Refresh failed');
};

export interface ApiFetchOptions extends RequestInit {
  skipRedirect?: boolean;
}

export const apiFetch = async <T>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<T | null> => {
  const isServer = typeof window === 'undefined';
  
  const { skipRedirect, ...fetchOptions } = options;

  const config: RequestInit = {
    ...fetchOptions,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
  };

  let response = await fetch(`${BASE_URL}${endpoint}`, config);

  const isAuthEndpoint = endpoint.startsWith('/auth');

  if (response.status === 401 && !isAuthEndpoint) {
    if (isServer) return null as T;

    try {
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokens().finally(() => {
          refreshTokenPromise = null;
        });
      }
      await refreshTokenPromise;
      
      response = await fetch(`${BASE_URL}${endpoint}`, config);
      if (response.status === 401) throw new Error('Still unauthorized');
      
    } catch (error) {
      useAuthStore.getState().logout();
      
      if (!skipRedirect) {
        toast.error('The session has expired. Please sign in again.');
        if (window.location.pathname !== '/auth/login') {
          window.location.href = '/auth/login';
        }
      }
      
      throw new Error('Session completely expired');
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message ?? 'An error occurred');
  }

  const text = await response.text();
  return text ? (JSON.parse(text) as T) : null;
};