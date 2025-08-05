// lib/Zustand.ts
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
  role: string;
  exp: number;
}

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  role: string | null;
  exp: number | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  checkAuth: () => void;
  validateEmail: (email: string) => { isValid: boolean; error?: string };
  validatePassword: (password: string) => { isValid: boolean; error?: string };
  validateName: (name: string) => { isValid: boolean; error?: string };
}

const useStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      userId: null,
      role: null,
      exp: null,
      token: null,
      login: (token: string) => {
        try {
          const decoded = jwt.decode(token) as JwtPayload | null;
          console.log('login - Decoded JWT:', decoded);
          if (decoded && decoded.user_id && decoded.exp) {
            set({
              isAuthenticated: true,
              userId: decoded.user_id,
              role: decoded.role || null,
              exp: decoded.exp,
              token,
            });
            if (typeof window !== 'undefined') {
              try {
                const state = {
                  isAuthenticated: true,
                  userId: decoded.user_id,
                  role: decoded.role || null,
                  exp: decoded.exp,
                  token,
                };
                localStorage.setItem('auth-storage', JSON.stringify({ state }));
                console.log(
                  'login - Saved to localStorage:',
                  localStorage.getItem('auth-storage')
                );
              } catch (error) {
                console.error('login - Error saving to localStorage:', error);
              }
            }
          } else {
            console.error('login - Invalid token: Missing userId or exp');
          }
        } catch (error) {
          console.error('login - Error decoding token:', error);
        }
      },
      logout: () => {
        set({
          isAuthenticated: false,
          userId: null,
          role: null,
          exp: null,
          token: null,
        });
        if (typeof window !== 'undefined') {
          try {
            localStorage.removeItem('auth-storage');
            console.log('logout - Cleared localStorage');
          } catch (error) {
            console.error('logout - Error removing from localStorage:', error);
          }
        }
      },
      checkAuth: () => {
        const { token, exp } = get();
        console.log('checkAuth - Current state:', { token, exp });
        if (token && exp) {
          const currentTime = Math.floor(Date.now() / 1000);
          if (exp > currentTime) {
            const decoded = jwt.decode(token) as JwtPayload | null;
            console.log('checkAuth - Decoded JWT:', decoded);
            if (decoded && decoded.user_id) {
              set({
                isAuthenticated: true,
                userId: decoded.user_id,
                role: decoded.role || null,
                exp: decoded.exp,
                token,
              });
              console.log('checkAuth - Auth restored:', decoded);
            } else {
              set({
                isAuthenticated: false,
                userId: null,
                role: null,
                exp: null,
                token: null,
              });
              if (typeof window !== 'undefined') {
                localStorage.removeItem('auth-storage');
                console.log(
                  'checkAuth - Cleared invalid token from localStorage'
                );
              }
            }
          } else {
            set({
              isAuthenticated: false,
              userId: null,
              role: null,
              exp: null,
              token: null,
            });
            if (typeof window !== 'undefined') {
              localStorage.removeItem('auth-storage');
              console.log(
                'checkAuth - Cleared expired token from localStorage'
              );
            }
          }
        } else {
          set({
            isAuthenticated: false,
            userId: null,
            role: null,
            exp: null,
            token: null,
          });
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth-storage');
            console.log('checkAuth - No token, cleared localStorage');
          }
        }
      },
      validateEmail: (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
          return { isValid: false, error: 'Email is required' };
        }
        if (!emailRegex.test(email)) {
          return { isValid: false, error: 'Invalid email format' };
        }
        return { isValid: true };
      },
      validatePassword: (password: string) => {
        if (!password) {
          return { isValid: false, error: 'Password is required' };
        }
        if (password.length < 8 || password.length > 12) {
          return {
            isValid: false,
            error: 'Password must be between 8 and 12 characters',
          };
        }
        if (
          !/[a-z]/.test(password) ||
          !/[A-Z]/.test(password) ||
          !/[0-9]/.test(password) ||
          !/[!@#$%^&*()-_=+[\]{}|;:,.<>?/~`]/.test(password)
        ) {
          return {
            isValid: false,
            error:
              'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
          };
        }
        return { isValid: true };
      },
      validateName: (name: string) => {
        if (!name) {
          return { isValid: false, error: 'Name is required' };
        }
        const nameRegex = /^[A-Za-z0-9\s!@#$%^&*(),.?":{}|<>_-]+$/;
        if (!nameRegex.test(name)) {
          return {
            isValid: false,
            error:
              'Name can only contain letters, digits, spaces, and specific special characters',
          };
        }
        return { isValid: true };
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          if (typeof window !== 'undefined') {
            const value = localStorage.getItem(name);
            console.log('storage - getItem:', name, value);
            return value;
          }
          return null;
        },
        setItem: (name, value) => {
          if (typeof window !== 'undefined') {
            try {
              localStorage.setItem(name, value);
              console.log('storage - setItem:', name, value);
            } catch (error) {
              console.error('storage - Error saving to localStorage:', error);
            }
          }
        },
        removeItem: (name) => {
          if (typeof window !== 'undefined') {
            try {
              localStorage.removeItem(name);
              console.log('storage - removeItem:', name);
            } catch (error) {
              console.error(
                'storage - Error removing from localStorage:',
                error
              );
            }
          }
        },
      })),
    }
  )
);

export default useStore;
