// import { Product } from '../../types/product';
// import { ProductCard } from '../product-card';

// interface ProductGridProps {
//   products: Product[];
// }

// export function ProductGrid({ products }: ProductGridProps) {
//   if (products.length === 0) {
//     return (
//       <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
//         <h3 className="mb-2 text-lg font-medium">No products found</h3>
//         <p className="text-sm text-muted-foreground">
//           Try changing your filters or search criteria
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
//       {products.map((product) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </div>
//   );
// }

// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import { Product } from '../../types/product';
// import { Button } from '../ui/button';
// import { Badge } from '../ui/badge';
// import { Star, ShoppingCart, Heart, Plus, Minus } from 'lucide-react';
// import Link from 'next/link';

// interface ProductGridProps {
//   products: Product[];
//   viewMode: 'grid' | 'list';
//   onAddToCart: (productId: string, quantity: number) => void;
//   onAddToWishlist: (productId: string) => void;
//   onProductClick: (productId: string) => void;
//   clearFilters: () => void;
// }

// export function ProductGrid({
//   products,
//   viewMode,
//   onAddToCart,
//   onAddToWishlist,
//   onProductClick,
//   clearFilters,
// }: ProductGridProps) {
//   const ProductCard = ({ product }: { product: Product }) => {
//     const [quantity, setQuantity] = useState(1);
//     const [isHovered, setIsHovered] = useState(false);

//     const discountPercentage = product.originalPrice
//       ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
//       : 0;

//     if (viewMode === 'list') {
//       return (
//         <div className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
//           <div
//             className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
//             onClick={() => onProductClick(product.id)}
//           >
//             <Image src={product.image} alt={product.name} fill className="object-cover" />
//             {product.badge && (
//               <Badge
//                 className={`absolute top-1 left-1 text-xs px-1 py-0.5 ${
//                   product.badgeColor === 'red'
//                     ? 'bg-red-100 text-red-700'
//                     : product.badgeColor === 'green'
//                       ? 'bg-green-100 text-green-700'
//                       : 'bg-blue-100 text-blue-700'
//                 }`}
//               >
//                 {product.badge}
//               </Badge>
//             )}
//           </div>
//           <div className="flex-1">
//             <div className="flex justify-between items-start mb-2">
//               <div>
//                 <div className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</div>
//                 <h3
//                   className="font-semibold text-gray-900 cursor-pointer hover:text-green-600 transition-colors"
//                   onClick={() => onProductClick(product.id)}
//                 >
//                   {product.name}
//                 </h3>
//               </div>
//               <Button variant="ghost" size="sm" onClick={() => onAddToWishlist(product.id)}>
//                 <Heart className="w-4 h-4" />
//               </Button>
//             </div>
//             <div className="flex items-center gap-1 mb-2">
//               {Array(5)
//                 .fill(0)
//                 .map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`w-3 h-3 ${
//                       i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
//                     }`}
//                   />
//                 ))}
//               <span className="text-xs text-gray-600 ml-1">({product.reviews})</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="flex items-center gap-2">
//                   <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
//                   {product.originalPrice && (
//                     <span className="text-sm text-gray-500 line-through">
//                       ${product.originalPrice.toFixed(2)}
//                     </span>
//                   )}
//                   <span className="text-xs text-gray-500">{product.unit}</span>
//                 </div>
//                 {discountPercentage > 0 && (
//                   <div className="text-xs text-green-600 font-medium">Save {discountPercentage}%</div>
//                 )}
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="flex items-center border rounded-lg">
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     className="w-8 h-8 p-0"
//                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                   >
//                     <Minus className="w-3 h-3" />
//                   </Button>
//                   <span className="w-8 text-center text-sm">{quantity}</span>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     className="w-8 h-8 p-0"
//                     onClick={() => setQuantity(quantity + 1)}
//                   >
//                     <Plus className="w-3 h-3" />
//                   </Button>
//                 </div>
//                 <Button
//                   onClick={() => onAddToCart(product.id, quantity)}
//                   disabled={!product.inStock}
//                   className="bg-green-600 hover:bg-green-700"
//                 >
//                   <ShoppingCart className="w-4 h-4 mr-2" />
//                   Add
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div
//         className="relative bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg group border border-gray-100"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <div
//           className="relative aspect-square overflow-hidden bg-gray-50 cursor-pointer"
//           onClick={() => onProductClick(product.id)}
//         >
//           <Image src={product.image} alt={product.name} fill className="object-cover" />
//           {product.badge && (
//             <Badge
//               className={`absolute top-3 left-3 text-xs px-2 py-1 ${
//                 product.badgeColor === 'red'
//                   ? 'bg-red-100 text-red-700'
//                   : product.badgeColor === 'green'
//                     ? 'bg-green-100 text-green-700'
//                     : 'bg-blue-100 text-blue-700'
//               }`}
//             >
//               {product.badge}
//             </Badge>
//           )}
//           <Button
//             variant="ghost"
//             size="sm"
//             className="absolute top-3 right-3 w-8 h-8 p-0 rounded-full bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//             onClick={() => onAddToWishlist(product.id)}
//           >
//             <Heart className="w-4 h-4" />
//           </Button>
//           <div
//             className={`absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm transition-all duration-300 ease-in-out ${
//               isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
//             }`}
//             style={{ height: '50%' }}
//           >
//             <div className="p-4 h-full flex flex-col justify-center">
//               <div className="flex items-center justify-between mb-4">
//                 <span className="text-sm font-medium">Quantity:</span>
//                 <div className="flex items-center border rounded-lg">
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     className="w-8 h-8 p-0"
//                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                   >
//                     <Minus className="w-3 h-3" />
//                   </Button>
//                   <span className="w-8 text-center text-sm">{quantity}</span>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     className="w-8 h-8 p-0"
//                     onClick={() => setQuantity(quantity + 1)}
//                   >
//                     <Plus className="w-3 h-3" />
//                   </Button>
//                 </div>
//               </div>
//               <Button
//                 onClick={() => onAddToCart(product.id, quantity)}
//                 disabled={!product.inStock}
//                 className="w-full bg-green-600 hover:bg-green-700 text-white"
//               >
//                 <ShoppingCart className="w-4 h-4 mr-2" />
//                 {product.inStock ? 'Add to Cart' : 'Out of Stock'}
//               </Button>
//             </div>
//           </div>
//         </div>
//         <div className="p-4">
//           <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.category}</div>
//           <h3
//             className="font-semibold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-green-600 transition-colors"
//             onClick={() => onProductClick(product.id)}
//           >
//             {product.name}
//           </h3>
//           <div className="flex items-center gap-1 mb-2">
//             {Array(5)
//               .fill(0)
//               .map((_, i) => (
//                 <Star
//                   key={i}
//                   className={`w-3 h-3 ${
//                     i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
//                   }`}
//                 />
//               ))}
//             <span className="text-xs text-gray-600 ml-1">({product.reviews})</span>
//           </div>
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
//               {product.originalPrice && (
//                 <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
//               )}
//             </div>
//             <span className="text-xs text-gray-500">{product.unit}</span>
//           </div>
//           {discountPercentage > 0 && (
//             <div className="text-xs text-green-600 font-medium">Save {discountPercentage}%</div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   if (products.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
//         <Button onClick={clearFilters} className="mt-4">
//           Clear Filters
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={
//         viewMode === 'grid'
//           ? 'grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
//           : 'space-y-4'
//       }
//     >
//    {products.map((product) => (
//   <Link key={product.id} href={`/${product.category}/${product.productSlug}`} className="no-underline">
//     <ProductCard product={product} />
//   </Link>
// ))}

//     </div>
//   );
// }

 
// 'use client';
 
// import { Product } from '../../types/product';
// import { ProductCard } from '../product-card';
 
 
// interface ProductGridProps {
//   products: Product[];
//   viewMode: 'grid' | 'list';
// }
 
// export function ProductGrid({ products, viewMode }: ProductGridProps) {
//   if (products.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
//       </div>
//     );
//   }
 
//   return (
//     <div
//       className={
//         viewMode === 'grid'
//           ? 'grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
//           : 'space-y-4'
//       }
//     >
//       {products.map((product) => (
//         <div
//           key={product.id}
//           className={viewMode === 'list' ? 'w-full' : 'w-full max-w-[280px] mx-auto'}
//         >
//           <ProductCard product={product} />
//         </div>
//       ))}
//     </div>
//   );
// }
 

'use client';
 
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../../types/product';

import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Star, ShoppingCart, Heart, Plus, Minus } from 'lucide-react';
import { useCart } from '../cart-provider';
import { useWishlist } from '../wishlist-provider';
import { ProductCard } from '../product-card'; 
interface ProductGridProps {
  products: Product[];
  viewMode: 'grid' | 'list';
  clearFilters?: () => void;
}
 
export function ProductGrid({ products, viewMode, clearFilters }: ProductGridProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
 
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        {clearFilters && (
          <Button onClick={clearFilters} className="mt-4">
            Clear Filters
          </Button>
        )}
      </div>
    );
  }
 
  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {products.map((product) => {
          const [quantity, setQuantity] = useState(1);
          const discountPercentage = product.originalPrice
            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
            : 0;
 
          return (
            <div
              key={product.id}
              className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <Link href={`/${product.category.toLowerCase()}/${product.productSlug}`}>
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                </Link>
                {product.badge && (
                  <Badge
                    className={`absolute top-1 left-1 text-xs px-1 py-0.5 ${
                      product.badgeColor === 'red'
                        ? 'bg-red-100 text-red-700'
                        : product.badgeColor === 'green'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {product.badge}
                  </Badge>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      {product.category}
                    </div>
                    <Link href={`/${product.category.toLowerCase()}/${product.productSlug}`}>
                      <h3 className="font-semibold text-gray-900 cursor-pointer hover:text-green-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      isInWishlist(product.id)
                        ? removeFromWishlist(product.id)
                        : addToWishlist(product)
                    }
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''
                      }`}
                    />
                  </Button>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating || 0)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  <span className="text-xs text-gray-600 ml-1">({product.reviews || 0})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">AU${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          AU${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">{product.unit || 'unit'}</span>
                    </div>
                    {discountPercentage > 0 && (
                      <div className="text-xs text-green-600 font-medium">
                        Save {discountPercentage}%
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border rounded-lg">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 p-0"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 p-0"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <Button
                      onClick={() =>
                        addToCart({ ...product, quantity })
                      }
                      disabled={product.inStock === false}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
 
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <div key={product.id} className="w-full">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
 