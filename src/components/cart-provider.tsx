// 'use client';



// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   quantity: number;
//   category: string;
// }

// interface CartItem extends Product {
//   quantity: number;
// }

// interface CartContextType {
//   cartItems: CartItem[];
//   cartCount: number;
//   cartTotal: number;
//   isCartOpen: boolean;
//   addToCart: (product: Product) => void;
//   removeFromCart: (productId: string) => void;
//   updateQuantity: (productId: string, quantity: number) => void;
//   clearCart: () => void;
//   toggleCart: () => void;
//   closeCart: () => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export function CartProvider({ children }: { children: ReactNode }) {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   // Load cart from localStorage on client side
//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       try {
//         setCartItems(JSON.parse(savedCart));
//       } catch (e) {
//         console.error('Failed to parse cart from localStorage:', e);
//       }
//     }
//   }, []);

//   // Save cart to localStorage when it changes
//   useEffect(() => {
//     if (cartItems.length > 0) {
//       localStorage.setItem('cart', JSON.stringify(cartItems));
//     }
//   }, [cartItems]);

//   const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//   const cartTotal = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   const addToCart = (product: Product) => {
//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find((item) => item.id === product.id);

//       if (existingItem) {
//         return prevItems.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + (product.quantity || 1) }
//             : item
//         );
//       } else {
//         return [...prevItems, { ...product, quantity: product.quantity || 1 }];
//       }
//     });

//     // Remove this line to prevent auto-opening the cart
//     // setIsCartOpen(true)
//   };

//   const removeFromCart = (productId: string) => {
//     setCartItems((prevItems) =>
//       prevItems.filter((item) => item.id !== productId)
//     );

//     // If cart becomes empty after removing, update localStorage
//     if (cartItems.length === 1) {
//       localStorage.removeItem('cart');
//     }
//   };

//   const updateQuantity = (productId: string, quantity: number) => {
//     if (quantity < 1) return;

//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === productId ? { ...item, quantity } : item
//       )
//     );
//   };

//   const clearCart = () => {
//     setCartItems([]);
//     localStorage.removeItem('cart');
//   };

//   const toggleCart = () => {
//     setIsCartOpen((prev) => !prev);
//   };

//   const closeCart = () => {
//     setIsCartOpen(false);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         cartCount,
//         cartTotal,
//         isCartOpen,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         toggleCart,
//         closeCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   const context = useContext(CartContext);
//   if (context === undefined) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// }

'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  productSlug: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log('Loaded cart from localStorage:', parsedCart);
        setCartItems(parsedCart);
      } catch (e) {
        console.error('Failed to parse cart from localStorage:', e);
      }
    }
  }, []);

  useEffect(() => {
    console.log('Saving cart to localStorage:', cartItems);
    if (cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cartItems]);

  const cartCount = cartItems.reduce((total, item) => {
    console.log('Calculating cartCount, item:', item);
    return total + item.quantity;
  }, 0);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const addToCart = (product: Product) => {
    console.log('Adding to cart:', product);
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        const newItems = prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
        console.log('Updated cartItems (existing):', newItems);
        return newItems;
      } else {
        const newItems = [
          ...prevItems,
          { ...product, quantity: product.quantity || 1 },
        ];
        console.log('Updated cartItems (new):', newItems);
        return newItems;
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    console.error('useCart must be used within a CartProvider');
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
