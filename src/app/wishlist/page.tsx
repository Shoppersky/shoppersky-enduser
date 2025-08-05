// 'use client';

// import Link from 'next/link';
// import { Heart } from 'lucide-react';

// import { Button } from '../../components/ui/button';

// export default function WishlistPage() {
//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-2xl mx-auto px-4">
//         <h1 className="text-3xl font-semibold text-center text-[#1B4B33] mb-12">
//           Wishlist
//         </h1>
//         <div className="bg-white rounded-lg shadow-sm p-12 text-center">
//           <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#40B86D]/10 mb-6">
//             <Heart className="w-8 h-8 text-[#40B86D]" />
//           </div>
//           <h2 className="text-xl font-medium mb-2">
//             Your wishlist is currently empty
//           </h2>
//           <p className="text-gray-500 mb-6">
//             Click the <Heart className="w-4 h-4 inline-block mx-1" /> icons to
//             add products
//           </p>
//           <Link href="/shop">
//             <Button className="bg-[#1B4B33] hover:bg-[#153D29]">
//               Return To Shop
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// app/wishlist/page.tsx
// app/wishlist/page.tsx
// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Heart, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
// import { Button } from '../../components/ui/button';
// import { useWishlist } from '../../components/wishlist-provider';
// import { useCart } from '../../components/cart-provider';
// import { motion } from 'framer-motion';
// import { Product } from '../../types/product';

// export default function WishlistPage() {
//   const { wishlist, removeFromWishlist } = useWishlist();
//   const { addToCart } = useCart();
//   const [addingToCart, setAddingToCart] = useState<string | null>(null);

//   const handleAddToCart = (product: Product) => {
//     setAddingToCart(product.id);
//     addToCart({
//       ...product,
//       quantity: 1,
//     });

//     setTimeout(() => {
//       setAddingToCart(null);
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
//       <div className="max-w-5xl mx-auto px-4 sm:px-6">
//         <div className="flex items-center justify-between mb-8">
//           <Link
//             href="/"
//             className="inline-flex items-center text-[#1B4B33] hover:text-[#40B86D] transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             <span className="text-sm font-medium">Back to Shop</span>
//           </Link>
//           <h1 className="text-3xl font-bold text-[#1B4B33]">My Wishlist</h1>
//           <div className="w-24"></div> {/* Spacer for alignment */}
//         </div>

//         {wishlist.length === 0 ? (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-100"
//           >
//             <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#40B86D]/10 mb-6">
//               <Heart className="w-10 h-10 text-[#40B86D]" />
//             </div>
//             <h2 className="text-2xl font-semibold mb-3 text-gray-800">
//               Your wishlist is currently empty
//             </h2>
//             <p className="text-gray-500 mb-8 max-w-md mx-auto">
//               Save your favorite items by clicking the{' '}
//               <Heart className="w-4 h-4 inline-block mx-1 text-red-500" /> icon
//               on products you love. They&apos;ll be waiting for you here!
//             </p>
//             <Link href="/products">
//               <Button
//                 size="lg"
//                 className="bg-[#1B4B33] hover:bg-[#153D29] transition-colors px-8 py-6 h-auto text-base"
//               >
//                 Explore Products
//               </Button>
//             </Link>
//           </motion.div>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.4 }}
//           >
//             <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
//               <div className="p-6 border-b border-gray-100">
//                 <p className="text-gray-500">
//                   <span className="font-medium text-[#1B4B33]">
//                     {wishlist.length}
//                   </span>{' '}
//                   {wishlist.length === 1 ? 'item' : 'items'} in your wishlist
//                 </p>
//               </div>

//               <div className="divide-y divide-gray-100">
//                 {wishlist.map((product) => (
//                   <motion.div
//                     key={product.id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0, height: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="flex items-center p-6 hover:bg-gray-50 transition-colors"
//                   >
//                     <Link
//                       href={`/${encodeURIComponent(product.category.toLowerCase())}/${encodeURIComponent(product.productSlug)}`}
//                       className="flex-shrink-0 relative group"
//                     >
//                       <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-gray-100">
//                         <Image
//                           src={product.image || '/placeholder.svg'}
//                           alt={product.name}
//                           width={112}
//                           height={112}
//                           className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
//                         />
//                       </div>
//                     </Link>

//                     <div className="flex-1 ml-6">
//                       <Link
//                         href={`/${encodeURIComponent(product.category.toLowerCase())}/${encodeURIComponent(product.productSlug)}`}
//                       >
//                         <h3 className="text-lg font-medium text-gray-800 hover:text-[#1B4B33] transition-colors">
//                           {product.name}
//                         </h3>
//                       </Link>
//                       <div className="mt-1 flex items-center">
//                         <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
//                           {product.category}
//                         </span>
//                       </div>
//                       <div className="mt-3 flex items-center">
//                         <span className="text-xl font-semibold text-[#1B4B33]">
//                           AU${product.price.toFixed(2)}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="flex flex-col sm:flex-row gap-2 ml-4">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => handleAddToCart(product)}
//                         disabled={addingToCart === product.id}
//                         className={`whitespace-nowrap ${
//                           addingToCart === product.id
//                             ? 'bg-green-50 text-green-600 border-green-200'
//                             : 'hover:bg-[#1B4B33] hover:text-white hover:border-[#1B4B33]'
//                         }`}
//                       >
//                         {addingToCart === product.id ? (
//                           <>Added</>
//                         ) : (
//                           <>
//                             <ShoppingCart className="w-4 h-4 mr-1" />
//                             Add to Cart
//                           </>
//                         )}
//                       </Button>

//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => removeFromWishlist(product.id)}
//                         className="text-gray-400 hover:text-red-500 hover:bg-red-50"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                         <span className="sr-only">Remove from wishlist</span>
//                       </Button>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>

//               <div className="p-6 bg-gray-50 border-t border-gray-100">
//                 <div className="flex justify-between items-center">
//                   <p className="text-sm text-gray-500">
//                     Items in your wishlist are not reserved and may sell out.
//                   </p>
//                   <Link href="/shop">
//                     <Button className="bg-[#1B4B33] hover:bg-[#153D29]">
//                       Continue Shopping
//                     </Button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }



'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useWishlist } from '../../components/wishlist-provider';
import { useCart } from '../../components/cart-provider';
import { motion } from 'framer-motion';
import { Product } from '../../types/product';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  const handleAddToCart = (product: Product) => {
    setAddingToCart(product.id);
    addToCart({
      ...product,
      quantity: 1,
    });

    setTimeout(() => {
      setAddingToCart(null);
    }, 1000);
  };

  const handleAddAllToCart = () => {
    wishlist.forEach((product) => {
      addToCart({
        ...product,
        quantity: 1,
      });
    });
  };

  const getTotalPrice = () => {
    return wishlist.reduce((acc, item) => acc + item.price, 0);
  };

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your wishlist is empty.</h2>
        <Link href="/products">
          <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">My Wishlist</h1>
            <h2 className="font-semibold text-2xl">{wishlist.length} Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Actions</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Category</h3>
          </div>

          {wishlist.map((item: Product) => (
            <div key={item.id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
              <div className="flex w-2/5">
                <Link
                  href={`/${encodeURIComponent(item.category.toLowerCase())}/${encodeURIComponent(item.productSlug)}`}
                  className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0"
                >
                  <Image
                    className="object-cover object-center h-full w-full"
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={96}
                    height={96}
                  />
                </Link>
                <div className="flex flex-col ml-4 flex-grow">
                  <Link
                    href={`/${encodeURIComponent(item.category.toLowerCase())}/${encodeURIComponent(item.productSlug)}`}
                  >
                    <h3 className="font-semibold text-gray-900 cursor-pointer hover:text-green-600 transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-gray-500 text-sm mt-1">{item.description || 'No description available'}</p>
                  <button
                    type="button"
                    className="font-semibold hover:text-red-500 text-gray-500 text-xs mt-2 text-left"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="flex justify-center w-1/5">
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={addingToCart === item.id}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    addingToCart === item.id
                      ? 'bg-green-100 text-green-600 border border-green-200'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {addingToCart === item.id ? (
                    'Added!'
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 inline mr-1" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>

              <span className="text-center w-1/5 font-semibold text-sm">AU${item.price.toFixed(2)}</span>
              <div className="text-center w-1/5">
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
            </div>
          ))}

          <Link href="/products">
            <button className="flex font-semibold text-green-600 text-sm mt-10 hover:text-green-700 transition-colors">
              <svg className="fill-current mr-2 text-green-600 w-4" viewBox="0 0 448 512">
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </button>
          </Link>
        </div>

        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">Summary</h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Items {wishlist.length}</span>
            <span className="font-semibold text-sm">
              AU${getTotalPrice().toFixed(2)}
            </span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
            <select className="block p-2 text-gray-600 w-full text-sm border border-gray-300 rounded">
              <option>Standard shipping - AU$10.00</option>
            </select>
          </div>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>AU${(getTotalPrice() + 10).toFixed(2)}</span>
            </div>
            <button
              className="bg-green-500 font-semibold hover:bg-green-600 py-3 text-sm text-white uppercase w-full rounded transition-colors"
              onClick={handleAddAllToCart}
            >
              Add all to cart
            </button>
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-500 text-center">
              Items in your wishlist are not reserved and may sell out.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
