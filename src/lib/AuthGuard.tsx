'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useStore from '@/lib/Zustand';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { refreshTokenIfNeeded } from './auth';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated, checkAuth } = useStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Public routes that do NOT require authentication
    const publicRoutes = [
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password',
    '/update-password',
    '/verify-email',
    '/verify-email-resend',
  ];

  const isPublicRoute = publicRoutes.includes(pathname);

  // Initialize auth only for protected routes
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (!isPublicRoute) {
          checkAuth();
          if (isAuthenticated) {
            await refreshTokenIfNeeded();
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsInitialized(true);
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [checkAuth, isAuthenticated, isPublicRoute]);

  // Handle redirects
  useEffect(() => {
    if (!isInitialized || isLoading) return;

    if (!isAuthenticated && !isPublicRoute) {
      router.push('/login');
      return;
    }

    // optional: redirect logged-in users away from public routes
    if (isAuthenticated && isPublicRoute) {
      router.push('/');
      return;
    }
  }, [isAuthenticated, isPublicRoute, pathname, router, isInitialized, isLoading]);

  // Show loading while auth status is being checked
  if (isLoading || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-white text-lg">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Always render children for public routes
  if (isPublicRoute) return <>{children}</>;

  // Only render children for protected routes if authenticated
  if (isAuthenticated) return <>{children}</>;

  // Fallback loading screen (should rarely appear)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-4 text-white text-lg">Redirecting to login...</p>
      </div>
    </div>
  );
};

export default AuthGuard;
