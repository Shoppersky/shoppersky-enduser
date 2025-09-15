// // 'use client';

// // import { useParams } from 'next/navigation';
// // import { useEffect, useState } from 'react';
// // import axiosInstance from '../../lib/axiosInstance';
// // import { ProductCard } from '../../components/product-card';

// // export default function CategoryPage() {
// //   const { category } = useParams();
// //   const [products, setProducts] = useState([]);

// //   useEffect(() => {
// //     if (!category) return;
// //     axiosInstance
// //       .get(`/products/by-category/${category}`)
// //       .then((res) => setProducts(res.data))
// //       .catch(() => setProducts([]));
// //   }, [category]);

// //   return (
// //     <div className="p-10">
// //       <h1 className="text-2xl font-bold capitalize">{category}</h1>
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
// //         {products.map((product) => (
// //           <ProductCard
// //           key={product.product_id}
// //           product={{
// //             id: product.product_id,
// //             name: product.product_name,
// //             price: parseFloat(product.selling_price),
// //             image: product.image_url,
// //             category, // 🔥 This comes from useParams()
// //             slug: product.slug,
// //           }}
// //         />

// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
// 'use client';

// import { useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import axiosInstance from '../../lib/axiosInstance';
// import { ProductCard } from '../../components/product-card';
// import { slugify } from '../../lib/slugify';

// // Define Product interface to match ProductCard
// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   category: string;
//   productSlug: string;
// }

// // Define API response product interface
// interface ApiProduct {
//   product_id: string;
//   product_name: string;
//   selling_price: string;
//   image_url?: string;
//   slug?: string;
// }

// export default function CategoryPage() {
//   const { category } = useParams();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categoryName, setCategoryName] = useState<string>(
//     Array.isArray(category) ? category[0] : category || 'Unknown'
//   );
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     console.log('Category useParams:', { category });
//     if (!category) {
//       setError('No category specified');
//       setLoading(false);
//       return;
//     }

//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const categoryStr = Array.isArray(category) ? category[0] : category;
//         const res = await axiosInstance.get(
//           `products/by-category/${categoryStr}`
//         );
//         console.log('Category API Response:', res.data);
//         if (Array.isArray(res.data)) {
//           setProducts(
//             res.data.map((item: ApiProduct) => ({
//               id: item.product_id,
//               name: item.product_name,
//               price: parseFloat(item.selling_price) || 0,
//               image: item.image_url || '/placeholder.svg',
//               category: categoryStr,
//               productSlug: item.slug || slugify(item.product_name),
//             }))
//           );
//         } else {
//           setProducts([]);
//           setError('Unexpected API response format');
//         }
//         setCategoryName(categoryStr);
//       } catch (err: unknown) {
//         console.error('Error fetching products:', err);
//         const errorMessage =
//           err instanceof Error
//             ? err.message
//             : 'Failed to load products. Please try again.';
//         setError(errorMessage);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [category]);

//   if (loading) return <div className="p-10">Loading products...</div>;
//   if (error) return <div className="p-10 text-red-500">{error}</div>;

//   return (
//     <div className="p-10">
//       <h1 className="text-2xl font-bold capitalize">{categoryName}</h1>
//       {products.length === 0 ? (
//         <p className="mt-6">No products found in this category.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//           {products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// 'use client';

// import { useEffect, useState } from 'react';
// import { use } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import axiosInstance from '../../lib/axiosInstance';
// import slugify from 'slugify';
// import { useCart } from '../../components/cart-provider';
// import { Button } from '../../components/ui/button';
// import { Input } from '../../components/ui/input';

// // Interface for product data from API
// interface ApiProduct {
//   product_id: string;
//   product_name: string;
//   selling_price: string;
//   image_url: string;
// }

// // Interface for product data in component
// interface Product {
//   product_id: string;
//   product_name: string;
//   selling_price: number;
//   image_url: string;
//   slug: string;
// }

// // Interface for cart item (matches useCart expectations)
// interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   category: string;
//   productSlug: string;
//   quantity: number;
// }

// interface CategoryPageProps {
//   params: Promise<{ category: string }>;
// }

// export default function CategoryPage({ params }: CategoryPageProps) {
//   const unwrappedParams = use(params);
//   const { addToCart, cartItems } = useCart();
//   const FALLBACK_IMAGE = 'https://blr1.digitaloceanspaces.com/products/default.jpg';
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const response = await axiosInstance.get<ApiProduct[]>(
//           `products/by-category/${encodeURIComponent(unwrappedParams.category)}`
//         );

//         const productsWithSlugs = response.data.map((item: ApiProduct) => ({
//           product_id: item.product_id,
//           product_name: item.product_name,
//           selling_price: parseFloat(item.selling_price) || 0,
//           image_url: item.image_url || FALLBACK_IMAGE,
//           slug: slugify(item.product_name, { lower: true, strict: true }),
//         }));

//         setProducts(productsWithSlugs);
//         // Initialize quantities for each product based on cart
//         const initialQuantities = productsWithSlugs.reduce(
//           (acc, product) => ({
//             ...acc,
//             [product.product_id]: cartItems.find((item) => item.id === product.product_id)?.quantity || 1,
//           }),
//           {}
//         );
//         setQuantities(initialQuantities);
//       } catch (error: unknown) {
//         console.error('Error fetching products for category:', error);
//         const errorMessage =
//           error instanceof Error
//             ? error.message
//             : 'Failed to load products. Please try again.';
//         setError(errorMessage);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [unwrappedParams.category, cartItems]);

//   const handleQuantityChange = (productId: string, value: number) => {
//     if (value < 1) return; // Prevent negative or zero quantities
//     setQuantities((prev) => ({ ...prev, [productId]: value }));
//   };

//   const handleAddToCart = (product: Product) => {
//     const quantity = quantities[product.product_id] || 1;
//     addToCart({
//       id: product.product_id,
//       name: product.product_name,
//       price: product.selling_price,
//       image: product.image_url,
//       category: unwrappedParams.category,
//       productSlug: product.slug,
//       quantity,
//     });
//     // Reset quantity to 1 after adding to cart
//     setQuantities((prev) => ({ ...prev, [product.product_id]: 1 }));
//   };

//   if (loading) {
//     return <div className="container mx-auto px-4 py-8 text-center">Loading products...</div>;
//   }

//   if (error) {
//     return <div className="container mx-auto px-4 py-8 text-center text-red-500">{error}</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-serif text-gray-800 capitalize">
//           {unwrappedParams.category.replace(/-/g, ' ')}
//         </h2>
//         <div className="border-t border-gray-300 flex-grow ml-4"></div>
//       </div>

//       {products.length > 0 ? (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <div
//               key={product.product_id}
//               className="w-full bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
//             >
//               <div className="relative">
//                 <div className="w-[150px] h-[150px] mx-auto">
//                   <Image
//                     src={product.image_url}
//                     alt={product.product_name}
//                     width={150}
//                     height={150}
//                     className="w-full h-full object-cover rounded"
//                   />
//                 </div>
//               </div>
//               <Link
//                 href={`/${encodeURIComponent(unwrappedParams.category)}/${encodeURIComponent(product.slug)}`}
//                 className="text-sm font-medium text-gray-700 hover:underline block text-center mt-2 truncate"
//               >
//                 {product.product_name}
//               </Link>
//               <div className="text-center mt-1">
//                 <span className="text-red-600 font-bold">
//                   ₹{product.selling_price.toFixed(2)}
//                 </span>
//               </div>
//               <div className="mt-3 flex items-center justify-center gap-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() =>
//                     handleQuantityChange(product.product_id, quantities[product.product_id] - 1)
//                   }
//                   disabled={quantities[product.product_id] <= 1}
//                   className="h-8 w-8"
//                 >
//                   -
//                 </Button>
//                 <Input
//                   type="number"
//                   min="1"
//                   value={quantities[product.product_id]}
//                   onChange={(e) =>
//                     handleQuantityChange(product.product_id, parseInt(e.target.value) || 1)
//                   }
//                   className="w-16 text-center h-8"
//                 />
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() =>
//                     handleQuantityChange(product.product_id, quantities[product.product_id] + 1)
//                   }
//                   className="h-8 w-8"
//                 >
//                   +
//                 </Button>
//               </div>
//               <Button
//                 onClick={() => handleAddToCart(product)}
//                 className="mt-3 w-full bg-primary text-white hover:bg-primary/90"
//               >
//                 Add to Cart
//               </Button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center text-gray-600">
//           No products found in this category
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';
import axiosInstance from '../../lib/axiosInstance';
import slugify from 'slugify';
import { ProductCard } from '../../components/product-card';

// Interface for product data from API
interface ApiProduct {
  slug: any;
  thumbnail_image: string;
  stock: any;
  product_id: string;
  product_name: string;
  selling_price: string;
  image_url: string;
}

// Interface for product data in ProductCard
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  productSlug: string;
  displayName: string; // User-friendly name for display
}

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const unwrappedParams = use(params);
  const FALLBACK_IMAGE =
    '/images/placeholder.svg';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to format slugs for display (e.g., tea--coffee -> Tea Coffee)
  const formatDisplayName = (slug: string) => {
    return slug
      .replace(/--/g, ' ') // Replace double hyphens with space
      .replace(/-/g, ' ') // Replace single hyphens with space
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get<ApiProduct[]>(
          `products/category/${encodeURIComponent(unwrappedParams.category)}`
        );

        const productsWithSlugs = response.data.products.map((item: ApiProduct) => ({
          id: item.product_id,
          name: item.product_name,
          price: parseFloat(item.selling_price) || 0,
          image: item.thumbnail_image || FALLBACK_IMAGE,
          category: unwrappedParams.category,
          category_slug:item.category_slug,
          inStock: item.stock,
          productSlug: item.slug,
          displayName: formatDisplayName(unwrappedParams.category), // Use formatted category
        }));

        setProducts(productsWithSlugs);
      } catch (error: unknown) {
        console.error('Error fetching products for category:', error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Failed to load products. Please try again.';
        setError(errorMessage);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [unwrappedParams.category]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif text-gray-800 capitalize">
          {formatDisplayName(unwrappedParams.category)}
        </h2>
        <div className="border-t border-gray-300 flex-grow ml-4"></div>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">
          No products found in this category
        </div>
      )}
    </div>
  );
}
