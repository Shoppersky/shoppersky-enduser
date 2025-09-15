// // lib/Zustand.ts
// 'use client';

// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';
// import jwt from 'jsonwebtoken';

// interface JwtPayload {
//   userId: string;
//   role: string;
//   exp: number;
// }

// interface AuthState {
//   isAuthenticated: boolean;
//   userId: string | null;
//   role: string | null;
//   exp: number | null;
//   token: string | null;
//   login: (token: string) => void;
//   logout: () => void;
//   checkAuth: () => void;
//   validateEmail: (email: string) => { isValid: boolean; error?: string };
//   validatePassword: (password: string) => { isValid: boolean; error?: string };
//   validateName: (name: string) => { isValid: boolean; error?: string };
// }

// const useStore = create<AuthState>()(
//   persist(
//     (set, get) => ({
//       isAuthenticated: false,
//       userId: null,
//       role: null,
//       exp: null,
//       token: null,
//       login: (token: string) => {
//         try {
//           const decoded = jwt.decode(token) as JwtPayload | null;
//           console.log('login - Decoded JWT:', decoded);
//           if (decoded && decoded.user_id && decoded.exp) {
//             set({
//               isAuthenticated: true,
//               userId: decoded.user_id,
//               role: decoded.role || null,
//               exp: decoded.exp,
//               token,
//             });
//             if (typeof window !== 'undefined') {
//               try {
//                 const state = {
//                   isAuthenticated: true,
//                   userId: decoded.user_id,
//                   role: decoded.role || null,
//                   exp: decoded.exp,
//                   token,
//                 };
//                 localStorage.setItem('auth-storage', JSON.stringify({ state }));
//                 console.log(
//                   'login - Saved to localStorage:',
//                   localStorage.getItem('auth-storage')
//                 );
//               } catch (error) {
//                 console.error('login - Error saving to localStorage:', error);
//               }
//             }
//           } else {
//             console.error('login - Invalid token: Missing userId or exp');
//           }
//         } catch (error) {
//           console.error('login - Error decoding token:', error);
//         }
//       },
//       logout: () => {
//         set({
//           isAuthenticated: false,
//           userId: null,
//           role: null,
//           exp: null,
//           token: null,
//         });
//         if (typeof window !== 'undefined') {
//           try {
//             localStorage.removeItem('auth-storage');
//             console.log('logout - Cleared localStorage');
//           } catch (error) {
//             console.error('logout - Error removing from localStorage:', error);
//           }
//         }
//       },
//       checkAuth: () => {
//         const { token, exp } = get();
//         console.log('checkAuth - Current state:', { token, exp });
//         if (token && exp) {
//           const currentTime = Math.floor(Date.now() / 1000);
//           if (exp > currentTime) {
//             const decoded = jwt.decode(token) as JwtPayload | null;
//             console.log('checkAuth - Decoded JWT:', decoded);
//             if (decoded && decoded.user_id) {
//               set({
//                 isAuthenticated: true,
//                 userId: decoded.user_id,
//                 role: decoded.role || null,
//                 exp: decoded.exp,
//                 token,
//               });
//               console.log('checkAuth - Auth restored:', decoded);
//             } else {
//               set({
//                 isAuthenticated: false,
//                 userId: null,
//                 role: null,
//                 exp: null,
//                 token: null,
//               });
//               if (typeof window !== 'undefined') {
//                 localStorage.removeItem('auth-storage');
//                 console.log(
//                   'checkAuth - Cleared invalid token from localStorage'
//                 );
//               }
//             }
//           } else {
//             set({
//               isAuthenticated: false,
//               userId: null,
//               role: null,
//               exp: null,
//               token: null,
//             });
//             if (typeof window !== 'undefined') {
//               localStorage.removeItem('auth-storage');
//               console.log(
//                 'checkAuth - Cleared expired token from localStorage'
//               );
//             }
//           }
//         } else {
//           set({
//             isAuthenticated: false,
//             userId: null,
//             role: null,
//             exp: null,
//             token: null,
//           });
//           if (typeof window !== 'undefined') {
//             localStorage.removeItem('auth-storage');
//             console.log('checkAuth - No token, cleared localStorage');
//           }
//         }
//       },
//       validateEmail: (email: string) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!email) {
//           return { isValid: false, error: 'Email is required' };
//         }
//         if (!emailRegex.test(email)) {
//           return { isValid: false, error: 'Invalid email format' };
//         }
//         return { isValid: true };
//       },
//       validatePassword: (password: string) => {
//         if (!password) {
//           return { isValid: false, error: 'Password is required' };
//         }
//         if (password.length < 8 || password.length > 12) {
//           return {
//             isValid: false,
//             error: 'Password must be between 8 and 12 characters',
//           };
//         }
//         if (
//           !/[a-z]/.test(password) ||
//           !/[A-Z]/.test(password) ||
//           !/[0-9]/.test(password) ||
//           !/[!@#$%^&*()-_=+[\]{}|;:,.<>?/~`]/.test(password)
//         ) {
//           return {
//             isValid: false,
//             error:
//               'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
//           };
//         }
//         return { isValid: true };
//       },
//       validateName: (name: string) => {
//         if (!name) {
//           return { isValid: false, error: 'Name is required' };
//         }
//         const nameRegex = /^[A-Za-z0-9\s!@#$%^&*(),.?":{}|<>_-]+$/;
//         if (!nameRegex.test(name)) {
//           return {
//             isValid: false,
//             error:
//               'Name can only contain letters, digits, spaces, and specific special characters',
//           };
//         }
//         return { isValid: true };
//       },
//     }),
//     {
//       name: 'auth-storage',
//       storage: createJSONStorage(() => ({
//         getItem: (name) => {
//           if (typeof window !== 'undefined') {
//             const value = localStorage.getItem(name);
//             console.log('storage - getItem:', name, value);
//             return value;
//           }
//           return null;
//         },
//         setItem: (name, value) => {
//           if (typeof window !== 'undefined') {
//             try {
//               localStorage.setItem(name, value);
//               console.log('storage - setItem:', name, value);
//             } catch (error) {
//               console.error('storage - Error saving to localStorage:', error);
//             }
//           }
//         },
//         removeItem: (name) => {
//           if (typeof window !== 'undefined') {
//             try {
//               localStorage.removeItem(name);
//               console.log('storage - removeItem:', name);
//             } catch (error) {
//               console.error(
//                 'storage - Error removing from localStorage:',
//                 error
//               );
//             }
//           }
//         },
//       })),
//     }
//   )
// );

// export default useStore;


// lib/Zustand.ts
'use client';

import { create } from 'zustand';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  user_id: string;
  role: string;
  exp: number;
}

interface ActiveAccount {
  userId: string;
  role: string | null;
  exp: number;
  token: string;
  lastActive: number;
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
  switchAccount: (token: string) => void;
  validateEmail: (email: string) => { isValid: boolean; error?: string };
  validatePassword: (password: string) => { isValid: boolean; error?: string };
  validateName: (name: string) => { isValid: boolean; error?: string };
}

/* ----------------- Utilities ----------------- */

// Unique tab id
const getTabId = (): string => {
  if (typeof window === 'undefined') return '';
  let tabId = sessionStorage.getItem('tabId');
  if (!tabId) {
    tabId = `tab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('tabId', tabId);
  }
  return tabId;
};

const getActiveAccounts = (): Record<string, ActiveAccount> => {
  if (typeof window === 'undefined') return {};
  const accounts = localStorage.getItem('activeAccounts');
  return accounts ? JSON.parse(accounts) : {};
};

const setActiveAccount = (tabId: string, account: ActiveAccount) => {
  if (typeof window === 'undefined') return;
  const accounts = getActiveAccounts();
  accounts[tabId] = { ...account, lastActive: Date.now() };
  localStorage.setItem('activeAccounts', JSON.stringify(accounts));
};

const removeActiveAccount = (tabId: string) => {
  if (typeof window === 'undefined') return;
  const accounts = getActiveAccounts();
  delete accounts[tabId];
  localStorage.setItem('activeAccounts', JSON.stringify(accounts));
};

/* ----------------- Zustand Store ----------------- */

const useStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  userId: null,
  role: null,
  exp: null,
  token: null,

  login: (token: string) => {
    try {
      const decoded = jwt.decode(token) as JwtPayload | null;
      if (decoded && decoded.user_id && decoded.exp) {
        const tabId = getTabId();

        set({
          isAuthenticated: true,
          userId: decoded.user_id,
          role: decoded.role || null,
          exp: decoded.exp,
          token,
        });

        const account: ActiveAccount = {
          userId: decoded.user_id,
          role: decoded.role || null,
          exp: decoded.exp,
          token,
          lastActive: Date.now(),
        };

        sessionStorage.setItem('currentAuth', JSON.stringify(account));
        localStorage.setItem(`auth_${tabId}`, JSON.stringify(account));
        setActiveAccount(tabId, account);
      } else {
        console.error('login - Invalid token');
      }
    } catch (err) {
      console.error('login - Error decoding token', err);
    }
  },

  switchAccount: (token: string) => {
    const tabId = getTabId();
    sessionStorage.removeItem('currentAuth');
    removeActiveAccount(tabId);

    get().login(token);
  },

  logout: () => {
    const tabId = getTabId();
    set({
      isAuthenticated: false,
      userId: null,
      role: null,
      exp: null,
      token: null,
    });
    sessionStorage.removeItem('currentAuth');
    localStorage.removeItem(`auth_${tabId}`);
    removeActiveAccount(tabId);
  },

  checkAuth: () => {
    if (typeof window === 'undefined') return;
    const tabId = getTabId();
    let authData = sessionStorage.getItem('currentAuth');

    if (!authData) {
      authData = localStorage.getItem(`auth_${tabId}`);
      if (authData) {
        sessionStorage.setItem('currentAuth', authData);
      }
    }

    if (authData) {
      try {
        const account = JSON.parse(authData) as ActiveAccount;
        if (account.exp * 1000 < Date.now()) {
          console.log('Token expired, logging out');
          get().logout();
          return;
        }

        set({
          isAuthenticated: true,
          userId: account.userId,
          role: account.role,
          exp: account.exp,
          token: account.token,
        });

        setActiveAccount(tabId, account);
      } catch (err) {
        console.error('checkAuth - Error parsing account', err);
        get().logout();
      }
    }
  },

  /* -------- Validators -------- */
  validateEmail: (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return { isValid: false, error: 'Email is required' };
    if (!regex.test(email)) return { isValid: false, error: 'Invalid email' };
    return { isValid: true };
  },
  validatePassword: (password: string) => {
    if (!password) return { isValid: false, error: 'Password is required' };
    if (password.length < 8 || password.length > 12) {
      return { isValid: false, error: 'Password must be 8–12 chars' };
    }
    if (
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[!@#$%^&*()_\-+=\[{\]};:,.<>/?~`]/.test(password)
    ) {
      return {
        isValid: false,
        error:
          'Password must include upper, lower, digit, and special character',
      };
    }
    return { isValid: true };
  },
  validateName: (name: string) => {
    if (!name) return { isValid: false, error: 'Name is required' };
    const regex = /^[A-Za-z0-9\s!@#$%^&*(),.?":{}|<>_-]+$/;
    if (!regex.test(name)) {
      return { isValid: false, error: 'Invalid characters in name' };
    }
    return { isValid: true };
  },
}));

/* ----------------- Cleanup Logic ----------------- */

if (typeof window !== 'undefined') {
  const cleanupInactiveTabs = () => {
    const accounts = getActiveAccounts();
    const cutoff = Date.now() - 24 * 60 * 60 * 1000; // 24h
    Object.keys(accounts).forEach((tabId) => {
      if (accounts[tabId].lastActive < cutoff) {
        localStorage.removeItem(`auth_${tabId}`);
        delete accounts[tabId];
      }
    });
    localStorage.setItem('activeAccounts', JSON.stringify(accounts));
  };

  cleanupInactiveTabs();

  window.addEventListener('beforeunload', () => {
    const tabId = getTabId();
    removeActiveAccount(tabId);
  });
}

useStore.getState().checkAuth();

export default useStore;

/* -------- Utilities to query accounts -------- */
export const getActiveAccountsList = () => {
  const accounts = getActiveAccounts();
  return Object.entries(accounts).map(([tabId, info]) => ({
    tabId,
    userId: info.userId,
    role: info.role,
    lastActive: info.lastActive,
  }));
};

export const switchToAccount = (userId: string) => {
  const accounts = getActiveAccounts();
  const target = Object.values(accounts).find((a) => a.userId === userId);
  if (target) {
    useStore.getState().switchAccount(target.token);
  }
};
