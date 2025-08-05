// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { ShoppingCart, Plus, Minus } from 'lucide-react';

// import { Button } from '../components/ui/button';
// import { useCart } from '../components/cart-provider';

// interface Product {
//   product_id: any;
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   category: string;
// }

// interface ProductCardProps {
//   product: Product;
// }

// export function ProductCard({ product }: ProductCardProps) {
//   const { addToCart } = useCart();
//   const [isAdding, setIsAdding] = useState(false);
//   const [quantity, setQuantity] = useState(1);

//   const handleAddToCart = () => {
//     setIsAdding(true);
//     addToCart({
//       ...product,
//       quantity,
//     });

//     // Visual feedback
//     setTimeout(() => {
//       setIsAdding(false);
//       // Reset quantity after adding to cart
//       setQuantity(1);
//     }, 500);
//   };

//   const incrementQuantity = () => {
//     setQuantity((prev) => prev + 1);
//   };

//   const decrementQuantity = () => {
//     setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
//   };

//   return (
//     <div className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md">
//       <Link href={`/products/${product.id}`} className="block overflow-hidden">
//         <Image
//           src={product.image || '/placeholder.svg'}
//           alt={product.name}
//           width={300}
//           height={300}
//           className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
//         />
//       </Link>
//       <div className="p-4">
//         <div className="mb-2 text-sm text-muted-foreground">
//           {product.category}
//         </div>

//         <Link href={`/${product.category}/${product.product_id}`}>

//           <h3 className="mb-2 line-clamp-1 text-lg font-medium transition-colors group-hover:text-primary">
//             {product.name}
//           </h3>
//         </Link>
//         <div className="flex items-center justify-between">
//           <span className="font-semibold">₹{product.price.toFixed(2)}</span>
//         </div>
//         <div className="mt-3 flex items-center gap-2">
//           <div className="flex items-center border rounded-md">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-8 w-8 rounded-none"
//               onClick={decrementQuantity}
//               disabled={quantity <= 1}
//             >
//               <Minus className="h-3 w-3" />
//               <span className="sr-only">Decrease quantity</span>
//             </Button>
//             <span className="w-8 text-center text-sm">{quantity}</span>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-8 w-8 rounded-none"
//               onClick={incrementQuantity}
//             >
//               <Plus className="h-3 w-3" />
//               <span className="sr-only">Increase quantity</span>
//             </Button>
//           </div>
//           <Button
//             size="sm"
//             onClick={handleAddToCart}
//             disabled={isAdding}
//             className={`flex-1 ${isAdding ? 'bg-green-600' : ''}`}
//           >
//             <ShoppingCart className="mr-2 h-4 w-4" />
//             {isAdding ? 'Added' : 'Add'}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { ShoppingCart, Plus, Minus } from 'lucide-react';
// import { Button } from './ui/button';
// import { useCart } from './cart-provider';

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   category: string;
//   slug: string;
// }

// interface ProductCardProps {
//   product: Product;
// }

// export function ProductCard({ product }: ProductCardProps) {
//   const { addToCart } = useCart();
//   const [isAdding, setIsAdding] = useState(false);
//   const [quantity, setQuantity] = useState(1);

//   const handleAddToCart = () => {
//     setIsAdding(true);
//     addToCart({
//       ...product,
//       quantity,
//     });

//     setTimeout(() => {
//       setIsAdding(false);
//       setQuantity(1);
//     }, 500);
//   };

//   const incrementQuantity = () => {
//     setQuantity((prev) => prev + 1);
//   };

//   const decrementQuantity = () => {
//     setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
//   };

//   return (
//     <div className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md">
//       <Link href={`/${product.category}/${product.slug}`} className="block overflow-hidden">
//         <Image
//           src={product.image || '/placeholder.svg'}
//           alt={product.name}
//           width={300}
//           height={300}
//           className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
//         />
//       </Link>
//       <div className="p-4">
//         <div className="mb-2 text-sm text-muted-foreground">
//           {product.category}
//         </div>
//         <Link href={`/${product.category}/${product.slug}`}>
//           <h3 className="mb-2 line-clamp-1 text-lg font-medium transition-colors group-hover:text-primary">
//             {product.name}
//           </h3>
//         </Link>
//         <div className="flex items-center justify-between">
//           <span className="font-semibold">AU${product.price.toFixed(2)}</span>
//         </div>
//         <div className="mt-3 flex items-center gap-2">
//           <div className="flex items-center border rounded-md">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-8 w-8 rounded-none"
//               onClick={decrementQuantity}
//               disabled={quantity <= 1}
//             >
//               <Minus className="h-3 w-3" />
//               <span className="sr-only">Decrease quantity</span>
//             </Button>
//             <span className="w-8 text-center text-sm">{quantity}</span>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-8 w-8 rounded-none"
//               onClick={incrementQuantity}
//             >
//               <Plus className="h-3 w-3" />
//               <span className="sr-only">Increase quantity</span>
//             </Button>
//           </div>
//           <Button
//             size="sm"
//             onClick={handleAddToCart}
//             disabled={isAdding}
//             className={`flex-1 ${isAdding ? 'bg-green-600' : ''}`}
//           >
//             <ShoppingCart className="mr-2 h-4 w-4" />
//             {isAdding ? 'Added' : 'Add'}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

//without add to wishlist

// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { ShoppingCart, Plus, Minus } from 'lucide-react';
// import { Button } from './ui/button';
// import { useCart } from './cart-provider';

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   category: string;
//   productSlug: string; // Change from slug to productSlug
// }

// interface ProductCardProps {
//   product: Product;
// }

// export function ProductCard({ product }: ProductCardProps) {
//   const { addToCart } = useCart();
//   const [isAdding, setIsAdding] = useState(false);
//   const [quantity, setQuantity] = useState(1);

//   console.log('ProductCard product:', product);
//   console.log(
//     'ProductCard link:',
//     `/${product.category}/${product.productSlug}`
//   );

//   const handleAddToCart = () => {
//     setIsAdding(true);
//     addToCart({
//       ...product,
//       quantity,
//     });
//     setTimeout(() => {
//       setIsAdding(false);
//       setQuantity(1);
//     }, 500);
//   };

//   const incrementQuantity = () => {
//     setQuantity((prev) => prev + 1);
//   };

//   const decrementQuantity = () => {
//     setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
//   };

//   return (
//     <div className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md">
//       <Link
//         href={`/${product.category}/${product.productSlug}`}
//         className="block overflow-hidden"
//       >
//         <Image
//           src={product.image || '/placeholder.svg'}
//           alt={product.name}
//           width={300}
//           height={300}
//           className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
//         />
//       </Link>
//       <div className="p-4">
//         <div className="mb-2 text-sm text-muted-foreground">
//           {product.category}
//         </div>
//         <Link href={`/${product.category}/${product.productSlug}`}>
//           <h3 className="mb-2 line-clamp-1 text-lg font-medium transition-colors group-hover:text-primary">
//             {product.name}
//           </h3>
//         </Link>
//         <div className="flex items-center justify-between">
//           <span className="font-semibold">AU${product.price.toFixed(2)}</span>
//         </div>
//         <div className="mt-3 flex items-center gap-2">
//           <div className="flex items-center border rounded-md">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-8 w-8 rounded-none"
//               onClick={decrementQuantity}
//               disabled={quantity <= 1}
//             >
//               <Minus className="h-3 w-3" />
//               <span className="sr-only">Decrease quantity</span>
//             </Button>
//             <span className="w-8 text-center text-sm">{quantity}</span>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-8 w-8 rounded-none"
//               onClick={incrementQuantity}
//             >
//               <Plus className="h-3 w-3" />
//               <span className="sr-only">Increase quantity</span>
//             </Button>
//           </div>
//           <Button
//             size="sm"
//             onClick={handleAddToCart}
//             disabled={isAdding}
//             className={`flex-1 ${isAdding ? 'bg-green-600' : ''}`}
//           >
//             <ShoppingCart className="mr-2 h-4 w-4" />
//             {isAdding ? 'Added' : 'Add'}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// add to wishlist
// "use client"

// import type React from "react"

// import { useState } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { ShoppingCart, Plus, Minus, Heart } from "lucide-react"
// import { Button } from "./ui/button"
// import { useCart } from "./cart-provider"

// interface Product {
//   id: string
//   name: string
//   price: number
//   image: string
//   category: string
//   productSlug: string
// }

// interface ProductCardProps {
//   product: Product
// }

// export function ProductCard({ product }: ProductCardProps) {
//   const { addToCart } = useCart()
//   const [isAdding, setIsAdding] = useState(false)
//   const [quantity, setQuantity] = useState(1)
//   const [isInWishlist, setIsInWishlist] = useState(false)

//   console.log("ProductCard product:", product)
//   console.log("ProductCard link:", `/${product.category}/${product.productSlug}`)

//   const handleAddToCart = () => {
//     setIsAdding(true)
//     addToCart({
//       ...product,
//       quantity,
//     })
//     setTimeout(() => {
//       setIsAdding(false)
//       setQuantity(1)
//     }, 500)
//   }

//   const incrementQuantity = () => {
//     setQuantity((prev) => prev + 1)
//   }

//   const decrementQuantity = () => {
//     setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
//   }

//   const toggleWishlist = (e: React.MouseEvent) => {
//     e.preventDefault() // Prevent navigation when clicking the heart
//     setIsInWishlist(!isInWishlist)
//   }

//   return (
//     <div className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md">
//       {/* Wishlist heart icon */}
//       <button
//         onClick={toggleWishlist}
//         className="absolute right-2 top-2 z-10 rounded-full bg-white/80 p-1.5 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 hover:bg-white"
//         aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
//       >
//         <Heart className={`h-4 w-4 ${isInWishlist ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
//       </button>

//       <Link href={`/${product.category}/${product.productSlug}`} className="block overflow-hidden">
//         <Image
//           src={product.image || "/placeholder.svg"}
//           alt={product.name}
//           width={300}
//           height={300}
//           className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
//         />
//       </Link>
//       <div className="p-4">
//         <div className="mb-2 text-sm text-muted-foreground">{product.category}</div>
//         <Link href={`/${product.category}/${product.productSlug}`}>
//           <h3 className="mb-2 line-clamp-1 text-lg font-medium transition-colors group-hover:text-primary">
//             {product.name}
//           </h3>
//         </Link>
//         <div className="flex items-center justify-between">
//           <span className="font-semibold">AU${product.price.toFixed(2)}</span>
//         </div>
//         <div className="mt-3 flex items-center gap-2">
//           <div className="flex items-center border rounded-md">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-8 w-8 rounded-none"
//               onClick={decrementQuantity}
//               disabled={quantity <= 1}
//             >
//               <Minus className="h-3 w-3" />
//               <span className="sr-only">Decrease quantity</span>
//             </Button>
//             <span className="w-8 text-center text-sm">{quantity}</span>
//             <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none" onClick={incrementQuantity}>
//               <Plus className="h-3 w-3" />
//               <span className="sr-only">Increase quantity</span>
//             </Button>
//           </div>
//           <Button
//             size="sm"
//             onClick={handleAddToCart}
//             disabled={isAdding}
//             className={`flex-1 ${isAdding ? "bg-green-600" : ""}`}
//           >
//             <ShoppingCart className="mr-2 h-4 w-4" />
//             {isAdding ? "Added" : "Add"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }

// components/ProductCard.tsx
// 'use client';

// import type React from 'react';
// import { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { ShoppingCart, Plus, Minus, Heart } from 'lucide-react';
// import { Button } from './ui/button';
// import { useCart } from './cart-provider';
// import { useWishlist } from './wishlist-provider';

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   category: string;
//   productSlug: string;
// }

// interface ProductCardProps {
//   product: Product;
// }

// export function ProductCard({ product }: ProductCardProps) {
//   const { addToCart } = useCart();
//   const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
//   const [isAdding, setIsAdding] = useState(false);
//   const [quantity, setQuantity] = useState(1);

//   console.log('ProductCard product:', product);
//   console.log(
//     'ProductCard link:',
//     `/${product.category.toLowerCase()}/${product.productSlug}`
//   );

//   const handleAddToCart = () => {
//     setIsAdding(true);
//     addToCart({
//       ...product,
//       quantity,
//     });
//     setTimeout(() => {
//       setIsAdding(false);
//       setQuantity(1);
//     }, 500);
//   };

//   const incrementQuantity = () => {
//     setQuantity((prev) => prev + 1);
//   };

//   const decrementQuantity = () => {
//     setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
//   };

//   const toggleWishlist = (e: React.MouseEvent) => {
//     e.preventDefault();
//     if (isInWishlist(product.id)) {
//       removeFromWishlist(product.id);
//     } else {
//       addToWishlist(product);
//     }
//   };

//   return (
//     <div className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md">
//       <button
//         onClick={toggleWishlist}
//         className="absolute right-2 top-2 z-10 rounded-full bg-white/80 p-1.5 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 hover:bg-white"
//         aria-label={
//           isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'
//         }
//       >
//         <Heart
//           className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
//         />
//       </button>

//       <Link
//         href={`/${product.category.toLowerCase()}/${product.productSlug}`}
//         className="block overflow-hidden"
//       >
//         <Image
//           src={product.image || '/placeholder.svg'}
//           alt={product.name}
//           width={300}
//           height={300}
//           className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
//         />
//       </Link>
//       <div className="p-4">
//         <div className="mb-2 text-sm text-muted-foreground">
//           {product.category}
//         </div>
//         <Link
//           href={`/${product.category.toLowerCase()}/${product.productSlug}`}
//         >
//           <h3 className="mb-2 line-clamp-1 text-lg font-medium transition-colors group-hover:text-primary">
//             {product.name}
//           </h3>
//         </Link>
//         <div className="flex items-center justify-between">
//           <span className="font-semibold">AU${product.price.toFixed(2)}</span>
//         </div>
//         <div className="mt-3 flex items-center gap-2">
//           <div className="flex items-center border rounded-md">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-8 w-8 rounded-none"
//               onClick={decrementQuantity}
//               disabled={quantity <= 1}
//             >
//               <Minus className="h-3 w-3" />
//               <span className="sr-only">Decrease quantity</span>
//             </Button>
//             <span className="w-8 text-center text-sm">{quantity}</span>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-8 w-8 rounded-none"
//               onClick={incrementQuantity}
//             >
//               <Plus className="h-3 w-3" />
//               <span className="sr-only">Increase quantity</span>
//             </Button>
//           </div>
//           <Button
//             size="sm"
//             onClick={handleAddToCart}
//             disabled={isAdding}
//             className={`flex-1 ${isAdding ? 'bg-green-600' : ''}`}
//           >
//             <ShoppingCart className="mr-2 h-4 w-4" />
//             {isAdding ? 'Added' : 'Add'}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Plus, Minus, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useCart } from "./cart-provider";
import { useWishlist } from "./wishlist-provider";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  productSlug: string;
  discount?: string;
  originalPrice?: number;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      ...product,
      quantity,
    });
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 500);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl w-[280px] h-[450px] mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative w-full h-[280px] bg-gray-50">
        <Link href={`/${product.category.toLowerCase()}/${product.productSlug}`}>
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            sizes="280px"
          />
        </Link>

        {/* Discount Badge */}
        {product.discount && (
          <Badge className="absolute top-3 left-3 bg-blue-100 hover:bg-blue-100 text-blue-700 text-sm px-3 py-1">
            {product.discount || `${discountPercentage}% OFF`}
          </Badge>
        )}

        {/* Wishlist Button */}
        <Button
          size="sm"
          variant="secondary"
          className="absolute top-3 right-3 w-8 h-8 p-0 rounded-full bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={toggleWishlist}
          aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
          />
        </Button>

        {/* Hover Overlay */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm transition-all duration-300 ease-in-out ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
          style={{ height: "40%" }}
        >
          <div className="p-3 h-full flex flex-col justify-center">
            {/* Quantity Selector */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-7 h-7 p-0 hover:bg-gray-100"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <span className="w-7 text-center text-sm font-medium">{quantity}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-7 h-7 p-0 hover:bg-gray-100"
                  onClick={incrementQuantity}
                >
                  <Plus className="h-3 w-3" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`w-full rounded-full font-medium py-2 text-sm text-white ${
                isAdding ? "bg-green-100 hover:bg-green-100" : "bg-green-600 hover:bg-green-800"
              }`}
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              {isAdding ? "Added" : "Add to Bag"}
            </Button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2 text-sm text-gray-600">{product.category}</div>
        <Link href={`/${product.category.toLowerCase()}/${product.productSlug}`}>
          <h3 className="mb-2 line-clamp-1 text-base font-medium transition-colors group-hover:text-[#1B4B33]">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-lg text-gray-900">AU${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              AU${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}