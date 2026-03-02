'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/use-auth-store';
import { useMe } from '@/lib/hooks/use-users';
import toast, { Toaster } from 'react-hot-toast';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading, isError } = useMe();
  const setUser = useAuthStore((state) => state.setUser);
  const setLoadingAuth = useAuthStore((state) => state.setLoadingAuth);

  useEffect(() => {
    if (!isLoading) {
      if (user && !isError) setUser(user);
      else setUser(null);
      setLoadingAuth(false);
    }
  }, [user, isLoading, isError, setUser, setLoadingAuth]);

  useEffect(() => {
    const authError = sessionStorage.getItem('auth_error');

    if (authError) {
      toast.error(authError, { duration: 4000 });
      sessionStorage.removeItem('auth_error');
    }
  }, []);

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#353538',
            color: '#fff',
            borderRadius: '8px',
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      {children}
    </>
  );
};
