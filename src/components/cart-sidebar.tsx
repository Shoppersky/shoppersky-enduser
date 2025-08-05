// 'use client';

// import { useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';

// import { Button } from '../components/ui/button';
// import { useCart } from './cart-provider';
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetFooter,
// } from '../components/ui/sheet';

// export function CartSidebar() {
//   const {
//     cartItems,
//     cartTotal,
//     isCartOpen,
//     closeCart,
//     removeFromCart,
//     updateQuantity,
//   } = useCart();

//   // Prevent scrolling when cart is open
//   useEffect(() => {
//     if (isCartOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//     }

//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, [isCartOpen]);

//   return (
//     <Sheet open={isCartOpen} onOpenChange={closeCart}>
//       <SheetContent className="flex w-full flex-col sm:max-w-lg">
//         <SheetHeader className="px-1">
//           <SheetTitle className="flex items-center">
//             <ShoppingBag className="mr-2 h-5 w-5" />
//             Your Cart
//           </SheetTitle>
//         </SheetHeader>

//         {cartItems.length === 0 ? (
//           <div className="flex h-full flex-col items-center justify-center space-y-4">
//             <ShoppingBag className="h-12 w-12 text-muted-foreground" />
//             <div className="text-center">
//               <h3 className="text-lg font-medium">Your cart is empty</h3>
//               <p className="text-sm text-muted-foreground">
//                 Looks like you haven`&apos;`t added anything to your cart yet.
//               </p>
//             </div>
//             <Button onClick={closeCart}>Continue Shopping</Button>
//           </div>
//         ) : (
//           <>
//             <div className="flex-1 overflow-y-auto py-6">
//               <ul className="divide-y">
//                 {cartItems.map((item) => (
//                   <li key={item.id} className="flex py-4">
//                     <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
//                       <Image
//                         src={item.image || 'images/placeholder.svg'}
//                         alt={item.name}
//                         width={100}
//                         height={100}
//                         className="h-full w-full object-cover"
//                       />
//                     </div>
//                     <div className="ml-4 flex flex-1 flex-col">
//                       <div className="flex justify-between text-base font-medium">
//                         <h3 className="line-clamp-2">
//                           <Link
//                             href={`/products/${item.id}`}
//                             onClick={closeCart}
//                           >
//                             {item.name}
//                           </Link>
//                         </h3>
//                         <p className="ml-4">
//                           ${(item.price * item.quantity).toFixed(2)}
//                         </p>
//                       </div>
//                       <p className="mt-1 text-sm text-muted-foreground">
//                         {item.category}
//                       </p>
//                       <div className="mt-auto flex items-center justify-between">
//                         <div className="flex items-center border rounded-md">
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-8 w-8 rounded-none"
//                             onClick={() =>
//                               updateQuantity(item.id, item.quantity - 1)
//                             }
//                             disabled={item.quantity <= 1}
//                           >
//                             <Minus className="h-3 w-3" />
//                             <span className="sr-only">Decrease quantity</span>
//                           </Button>
//                           <span className="w-8 text-center text-sm">
//                             {item.quantity}
//                           </span>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-8 w-8 rounded-none"
//                             onClick={() =>
//                               updateQuantity(item.id, item.quantity + 1)
//                             }
//                           >
//                             <Plus className="h-3 w-3" />
//                             <span className="sr-only">Increase quantity</span>
//                           </Button>
//                         </div>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => removeFromCart(item.id)}
//                           className="text-red-500 hover:text-red-700 hover:bg-red-50"
//                         >
//                           <Trash2 className="h-4 w-4 mr-1" />
//                           Remove
//                         </Button>
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="border-t">
//               <div className="py-4">
//                 <div className="flex justify-between text-base font-medium">
//                   <p>Subtotal</p>
//                   <p>${cartTotal.toFixed(2)}</p>
//                 </div>
//                 <p className="mt-0.5 text-sm text-muted-foreground">
//                   Shipping and taxes calculated at checkout.
//                 </p>
//               </div>

//               <SheetFooter className="flex-col gap-2 sm:flex-col">
//                 <Button size="lg" className="w-full" asChild>
//                   <Link href="/checkout">Checkout</Link>
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="lg"
//                   className="w-full"
//                   onClick={closeCart}
//                 >
//                   Continue Shopping
//                 </Button>
//               </SheetFooter>
//             </div>
//           </>
//         )}
//       </SheetContent>
//     </Sheet>
//   );
// }

// 'use client';

// import { useCart } from './cart-provider';
// import { Button } from './ui/button';
// import { X, Minus, Plus } from 'lucide-react';
// import Link from 'next/link';

// export function CartSidebar() {
//   const { cartItems, cartCount, cartTotal, isCartOpen, closeCart, removeFromCart, updateQuantity } = useCart();

//   if (!isCartOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
//       <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white p-6 shadow-lg">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Your Cart ({cartCount})</h2>
//           <Button variant="ghost" size="icon" onClick={closeCart}>
//             <X className="h-5 w-5" />
//           </Button>
//         </div>
//         {cartItems.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           <div className="space-y-4">
//             {cartItems.map((item) => (
//               <div key={item.id} className="flex items-center gap-4 border-b pb-4">
//                 <Link href={`/${item.category}/${item.productSlug}`}>
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                 </Link>
//                 <div className="flex-1">
//                   <Link href={`/${item.category}/${item.productSlug}`}>
//                     <h3 className="font-medium">{item.name}</h3>
//                   </Link>
//                   <p>AU${item.price.toFixed(2)} x {item.quantity}</p>
//                   <div className="flex items-center gap-2 mt-1">
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                       disabled={item.quantity <= 1}
//                     >
//                       <Minus className="h-4 w-4" />
//                     </Button>
//                     <span>{item.quantity}</span>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                     >
//                       <Plus className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => removeFromCart(item.id)}
//                       className="text-red-500"
//                     >
//                       Remove
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <div className="mt-4">
//               <p className="font-medium">Total: AU${cartTotal.toFixed(2)}</p>
//               <Button className="w-full mt-4">Proceed to Checkout</Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// 'use client';

// import { useCart } from './cart-provider';
// import { Button } from './ui/button';
// import { X, Minus, Plus } from 'lucide-react';
// import Link from 'next/link';
// import Image from 'next/image';

// export function CartSidebar() {
//   const {
//     cartItems,
//     cartCount,
//     cartTotal,
//     isCartOpen,
//     closeCart,
//     removeFromCart,
//     updateQuantity,
//   } = useCart();

//   if (!isCartOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
//       <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white p-6 shadow-lg">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Your Cart ({cartCount})</h2>
//           <Button variant="ghost" size="icon" onClick={closeCart}>
//             <X className="h-5 w-5" />
//           </Button>
//         </div>
//         {cartItems.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           <div className="space-y-4">
//             {cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex items-center gap-4 border-b pb-4"
//               >
//                 <Link href={`/${item.category}/${item.productSlug}`}>
//                   <Image
//                     src={item.image || 'imagesimages/placeholder.svg'}
//                     alt={item.name}
//                     width={80}
//                     height={80}
//                     className="object-cover rounded-lg"
//                   />
//                 </Link>
//                 <div className="flex-1">
//                   <Link href={`/${item.category}/${item.productSlug}`}>
//                     <h3 className="font-medium">{item.name}</h3>
//                   </Link>
//                   <p>
//                     AU${item.price.toFixed(2)} x {item.quantity}
//                   </p>
//                   <div className="flex items-center gap-2 mt-1">
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                       disabled={item.quantity <= 1}
//                     >
//                       <Minus className="h-4 w-4" />
//                     </Button>
//                     <span>{item.quantity}</span>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                     >
//                       <Plus className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => removeFromCart(item.id)}
//                       className="text-red-500"
//                     >
//                       Remove
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <div className="mt-4">
//               <p className="font-medium">Total: AU${cartTotal.toFixed(2)}</p>
//               <Link href="/cart">
//                 <Button className="w-full mt-4">Proceed to Checkout</Button>
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { useCart } from "./cart-provider";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  productSlug: string;
}

interface RecommendedProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
}

const recommendedProducts: RecommendedProduct[] = [
  {
    id: "rec1",
    name: "Organic Honey",
    price: 8.99,
    originalPrice: 12.99,
    image: "images/placeholder.svg?height=200&width=200&text=Organic+Honey",
    badge: "SAVE $4",
  },
  {
    id: "rec2",
    name: "Almond Butter",
    price: 9.99,
    originalPrice: 12.99,
    image: "images/placeholder.svg?height=200&width=200&text=Almond+Butter",
    badge: "SAVE $3",
  },
  {
    id: "rec3",
    name: "Greek Yogurt",
    price: 5.49,
    originalPrice: 6.99,
    image: "images/placeholder.svg?height=200&width=200&text=Greek+Yogurt",
    badge: "SAVE $1.50",
  },
  {
    id: "rec4",
    name: "Organic Granola",
    price: 7.99,
    originalPrice: 9.99,
    image: "images/placeholder.svg?height=200&width=200&text=Organic+Granola",
    badge: "SAVE $2",
  },
  {
    id: "rec5",
    name: "Fresh Berries",
    price: 6.99,
    originalPrice: 8.99,
    image: "images/placeholder.svg?height=200&width=200&text=Fresh+Berries",
    badge: "SAVE $2",
  },
];

export function CartSidebar() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
  } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [scrollProgress, setScrollProgress] = useState(15);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const freeShippingThreshold = 50;
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);
  const shippingProgress = Math.min((cartTotal / freeShippingThreshold) * 100, 100);
console.log(cartItems)
  const updateScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        const scrollPercentage = (scrollLeft / maxScroll) * 85;
        setScrollProgress(15 + scrollPercentage);
      } else {
        setScrollProgress(15);
      }
    }
  };

  useEffect(() => {
    updateScrollState();
  }, []);

  if (!isCartOpen) return null;

  const handleAddRecommended = (product: RecommendedProduct) => {
    updateQuantity(product.id, 1); // Add one item to the cart
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={closeCart} />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Your Cart ({cartCount})</h2>
          <Button variant="ghost" size="sm" onClick={closeCart}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Free Shipping Progress */}
        {amountForFreeShipping > 0 && (
          <div className="p-6 border-b">
            <p className="text-sm text-gray-600 mb-3">
              AU${amountForFreeShipping.toFixed(2)} away from free shipping
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6">
              <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500 text-center">Your cart is empty</p>
              <Button onClick={closeCart} className="mt-4 bg-green-600 hover:bg-green-700 text-white">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Link href={`/${item.category}/${item.productSlug}`}>
                      <Image
                        src={item.image || "images/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </Link>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Link href={`/${item.category}/${item.productSlug}`}>
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                        </Link>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">AU${item.price.toFixed(2)}</p>
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0"
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Recommended Products */}
              <div className="pt-6 border-t">
                <h3 className="font-medium text-gray-900 mb-4">You may also like</h3>
                <div
                  ref={scrollContainerRef}
                  className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
                  onScroll={updateScrollState}
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {recommendedProducts.map((product) => (
                    <div key={product.id} className="flex-shrink-0 w-32">
                      <div className="relative">
                        <div className="relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden mb-2">
                          <Image
                            src={product.image || "images/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-contain"
                          />
                          {product.badge && (
                            <Badge className="absolute top-2 left-2 bg-blue-100 hover:bg-blue-100 text-blue-700 text-xs px-2 py-1">
                              {product.badge}
                            </Badge>
                          )}
                        </div>
                        <h4 className="text-xs font-medium text-gray-900 mb-1 line-clamp-2">{product.name}</h4>
                        <div className="flex items-center gap-1 mb-2">
                          <span className="text-sm font-semibold">AU${product.price.toFixed(2)}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-gray-500 line-through">
                              AU${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          className="w-full text-xs py-1 h-7 text-green-600 hover:text-green-700 bg-gray-100 hover:bg-gray-200"
                          onClick={() => handleAddRecommended(product)}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Progress Indicator for Recommended Products */}
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div
                      className="bg-gray-600 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(scrollProgress, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t p-6 space-y-4">
            {/* Coupon Code */}
            <div className="flex gap-2">
              <Input
                placeholder="Coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" className="text-green-600 hover:text-green-700 border-gray-300 hover:bg-gray-200">
                Apply
              </Button>
            </div>

            {/* Checkout Button */}
            <Link href="/cart">
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-full text-lg font-medium"
              >
                Checkout | AU${cartTotal.toFixed(2)}
              </Button>
            </Link>

            <p className="text-xs text-gray-500 text-center">Shipping and taxes calculated at checkout</p>

            {/* Payment Methods */}
            <div className="flex justify-center gap-2 pt-2">
              <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                VISA
              </div>
              <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                MC
              </div>
              <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
                AMEX
              </div>
              <div className="w-8 h-5 bg-yellow-400 rounded text-white text-xs flex items-center justify-center font-bold">
                PP
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}