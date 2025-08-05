// // components/wishlist-provider.tsx
// 'use client';

// import { createContext, useContext, useState, useEffect } from 'react';

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   category: string;
//   productSlug: string;
// }

// interface WishlistContextType {
//   wishlist: Product[];
//   wishlistCount: number;
//   addToWishlist: (product: Product) => void;
//   removeFromWishlist: (productId: string) => void;
//   isInWishlist: (productId: string) => boolean;
// }

// const WishlistContext = createContext<WishlistContextType | undefined>(
//   undefined
// );

// export function WishlistProvider({ children }: { children: React.ReactNode }) {
//   const [wishlist, setWishlist] = useState<Product[]>([]);

//   // Load wishlist from localStorage on mount (optional, for persistence)
//   useEffect(() => {
//     const savedWishlist = localStorage.getItem('wishlist');
//     if (savedWishlist) {
//       setWishlist(JSON.parse(savedWishlist));
//     }
//   }, []);

//   // Save wishlist to localStorage on change
//   useEffect(() => {
//     localStorage.setItem('wishlist', JSON.stringify(wishlist));
//   }, [wishlist]);

//   const addToWishlist = (product: Product) => {
//     setWishlist((prev) => {
//       if (!prev.find((item) => item.id === product.id)) {
//         return [...prev, product];
//       }
//       return prev;
//     });
//   };

//   const removeFromWishlist = (productId: string) => {
//     setWishlist((prev) => prev.filter((item) => item.id !== productId));
//   };

//   const isInWishlist = (productId: string) => {
//     return wishlist.some((item) => item.id === productId);
//   };

//   return (
//     <WishlistContext.Provider
//       value={{
//         wishlist,
//         wishlistCount: wishlist.length,
//         addToWishlist,
//         removeFromWishlist,
//         isInWishlist,
//       }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// }

// export function useWishlist() {
//   const context = useContext(WishlistContext);
//   if (!context) {
//     throw new Error('useWishlist must be used within a WishlistProvider');
//   }
//   return context;
// }


// components/wishlist-provider.tsx
'use client';
import { createContext, useContext, useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  productSlug: string;
  description?: string;
}

interface WishlistContextType {
  wishlist: Product[];
  wishlistCount: number;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Load wishlist from memory on mount (localStorage removed for Claude.ai compatibility)
  useEffect(() => {
    // Initialize with empty array - no localStorage in Claude.ai environment
    setWishlist([]);
  }, []);

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (!prev.find((item) => item.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
