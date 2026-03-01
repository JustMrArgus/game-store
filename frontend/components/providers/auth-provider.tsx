'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/use-auth-store';
import { useMe } from '@/lib/hooks/use-users';
import { Toaster } from 'react-hot-toast';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    isLoading,
    isError,
  } = useMe();

  const setUser = useAuthStore((state) => state.setUser);
  const setLoadingAuth = useAuthStore((state) => state.setLoadingAuth);

  useEffect(() => {
    if (!isLoading) {
      if (user && !isError) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoadingAuth(false);
    }
  }, [user, isLoading, isError, setUser, setLoadingAuth]);

  return (
    <>
      <Toaster position="top-right" />
      {children}
    </>
  );
};
