'use client';

import { createContext, useContext, ReactNode } from 'react';
import useStore from '../lib/Zustand'; // ✅ Import your Zustand store correctly

// Type for the context, matches your Zustand state
interface AuthContextType {
  isLoggedIn: boolean;
  userId: string | null;
  token: string | null;
  role: string | null;
  exp: number | null;
  login: (token: string) => void;
  logout: () => void;
  checkAuth: () => void;
  validateEmail: (email: string) => { isValid: boolean; error?: string };
  validatePassword: (password: string) => { isValid: boolean; error?: string };
  validateName: (name: string) => { isValid: boolean; error?: string };
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // ✅ Use the Zustand hook directly
  const isLoggedIn = useStore((state) => state.isAuthenticated);
  const userId = useStore((state) => state.userId);
  const token = useStore((state) => state.token);
  const role = useStore((state) => state.role);
  const exp = useStore((state) => state.exp);
  const login = useStore((state) => state.login);
  const logout = useStore((state) => state.logout);
  const checkAuth = useStore((state) => state.checkAuth);
  const validateEmail = useStore((state) => state.validateEmail);
  const validatePassword = useStore((state) => state.validatePassword);
  const validateName = useStore((state) => state.validateName);

  const authContext: AuthContextType = {
    isLoggedIn,
    userId,
    token,
    role,
    exp,
    login,
    logout,
    checkAuth,
    validateEmail,
    validatePassword,
    validateName,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
