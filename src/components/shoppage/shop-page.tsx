// 'use client';

// import { useState, useEffect } from 'react';
// import { Product } from '../../types/product';
// import { MobileFilters } from './mobile-filters';
// import { SortDropdown } from './sort-dropdown';
// import { FilterSidebar } from './filter-sidebar';
// import { ProductGrid } from './product-grid';
// import axiosInstance from '../../lib/axiosInstance';
// import { Button } from '../ui/button';
// import { Input } from '../ui/input';
// import { Filter, Grid, List, Search } from 'lucide-react';

// interface ApiCategory {
//   category_id: string;
//   category_name: string;
// }

// interface ApiProduct {
//   product_id: string;
//   identification: { product_name: string };
//   descriptions: { short_description: string };
//   pricing: { selling_price: string; original_price?: string };
//   images: { urls: string[] };
//   tags_and_relationships: { product_tags?: string[] };
//   slug: string;
//   cat_id: string;
//   timestamp: string;
//   in_stock?: boolean;
//   badge?: string;
//   badge_color?: string;
//   rating?: number;
//   reviews?: number;
// }

// interface ShopPageProps {
//   onAddToCart: (productId: string, quantity: number) => void;
//   onAddToWishlist: (productId: string) => void;
//   onProductClick: (productId: string) => void;
// }

// export function ShopPage({ onAddToCart, onAddToWishlist, onProductClick }: ShopPageProps) {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<string[]>([]);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
//   const [sortOption, setSortOption] = useState<string>('featured');
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [showFilters, setShowFilters] = useState(false);
//   const [inStockOnly, setInStockOnly] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
//   const [totalProducts, setTotalProducts] = useState(0);

//   // Debounce search query to avoid too many API calls
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearchQuery(searchQuery);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [searchQuery]);

//   // Fetch categories on component mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const categoriesResponse = await axiosInstance.get<{ data: ApiCategory[] }>('/categories/');
//         const categoryNames = categoriesResponse.data.data.map((cat) => cat.category_name);
//         setCategories(categoryNames);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch products with server-side filtering
//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // Build query parameters for server-side filtering
//       const params = new URLSearchParams();
      
//       // Add category filter
//       if (selectedCategories.length > 0) {
//         params.append('categories', selectedCategories.join(','));
//       }
      
//       // Add price range filter
//       if (priceRange[0] > 0) {
//         params.append('min_price', priceRange[0].toString());
//       }
      
//       if (priceRange[1] < 500) {
//         params.append('max_price', priceRange[1].toString());
//       }
      
//       // Add stock filter
//       if (inStockOnly) {
//         params.append('in_stock', 'true');
//       }
      
//       // Add search filter
//       if (debouncedSearchQuery.trim()) {
//         params.append('search', debouncedSearchQuery.trim());
//       }
      
//       // Add sort parameter
//       if (sortOption && sortOption !== 'featured') {
//         params.append('sort', sortOption);
//       }

//       const queryString = params.toString();
//       const endpoint = queryString ? `/products/?${queryString}` : '/products/';
      
//       console.log('Fetching products with server-side filters:', endpoint);
      
//       const productsResponse = await axiosInstance.get<any>(endpoint);
//       console.log('Server response:', productsResponse.data);
      
//       // Handle different response structures from your API
//       const productsData = productsResponse.data.products || productsResponse.data.data || productsResponse.data;
//       const total = productsResponse.data.total || productsData.length;
//       console.log(productsData)
//       // Map API response to Product interface
//       const mappedProducts: Product[] = productsData.map((item: ApiProduct) => ({
//         id: item.product_id,
//         name: item.identification.product_name,
//         description: item.descriptions?.short_description,
//         price: parseFloat(item.pricing?.selling_price),
//         originalPrice: item.pricing?.original_price ? parseFloat(item.pricing.original_price) : undefined,
//         image: item.images?.urls[0] || '/images/placeholder.svg',
//         category: item?.category_name || 'Uncategorized',
//         productSlug: item.slug,
//         timestamp: item.timestamp,
//         unit: 'unit',
//         rating: item.rating || 0,
//         reviews: item.reviews || 0,
//         inStock: item.in_stock !== undefined ? item.in_stock : true,
//         badge: item.badge,
//         badgeColor: item.badge_color,
//       }));
      
//       setProducts(mappedProducts);
//       setTotalProducts(total);
//     } catch (error: any) {
//       const errorMsg = error.response?.data?.message || 'Failed to load products. Please try again later.';
//       setError(errorMsg);
//       console.error('Error fetching products:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Trigger API call when any filter changes
//   useEffect(() => {
//     fetchProducts();
//   }, [selectedCategories, priceRange, sortOption, inStockOnly, debouncedSearchQuery]);



//   const handleCategoryChange = (category: string) => {
//     setSelectedCategories((prev) =>
//       prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
//     );
//   };

//   const handlePriceChange = (range: [number, number]) => {
//     setPriceRange(range);
//   };

//   const handleSortChange = (option: string) => {
//     setSortOption(option);
//   };

//   const clearFilters = () => {
//     setSelectedCategories([]);
//     setPriceRange([0, 500]);
//     setSortOption('featured');
//     setInStockOnly(false);
//     setSearchQuery('');
//     setDebouncedSearchQuery('');
//   };

//   return (
//     <div className="container mx-auto px-4 py-6 sm:py-8">
//       {/* Header */}
//       <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Shop All Products</h1>
//           <p className="text-gray-600 text-sm sm:text-base">
//             Showing {products.length} products
//             {totalProducts > products.length && ` of ${totalProducts} total`}
//           </p>
//         </div>
        
//         {/* Search Bar */}
//         <div className="relative w-full sm:w-80 mb-4 sm:mb-0">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//           <Input
//             type="text"
//             placeholder="Search products..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//           {searchQuery && (
//             <button
//               onClick={() => setSearchQuery('')}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//             >
//               ×
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Filter Tags */}
//       <div className="flex flex-wrap items-center gap-2 mb-4">
//         {searchQuery && (
//           <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
//             Search: "{searchQuery}"
//             <button onClick={() => setSearchQuery('')} className="ml-1 hover:text-blue-900">×</button>
//           </span>
//         )}
//         {selectedCategories.map((category) => (
//           <span key={category} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
//             {category}
//             <button 
//               onClick={() => handleCategoryChange(category)} 
//               className="ml-1 hover:text-green-900"
//             >
//               ×
//             </button>
//           </span>
//         ))}
//         {inStockOnly && (
//           <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
//             In Stock Only
//             <button onClick={() => setInStockOnly(false)} className="ml-1 hover:text-orange-900">×</button>
//           </span>
//         )}
//         {(priceRange[0] > 0 || priceRange[1] < 500) && (
//           <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
//             Price: ${priceRange[0]} - ${priceRange[1]}
//             <button onClick={() => setPriceRange([0, 500])} className="ml-1 hover:text-purple-900">×</button>
//           </span>
//         )}
//         {(searchQuery || selectedCategories.length > 0 || inStockOnly || priceRange[0] > 0 || priceRange[1] < 500) && (
//           <Button variant="outline" size="sm" onClick={clearFilters} className="text-red-600 border-red-300 hover:bg-red-50">
//             Clear All Filters
//           </Button>
//         )}
//       </div>

//       {/* Controls */}
//       <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
//         <div></div>
//         <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => setShowFilters(!showFilters)}
//             className="lg:hidden"
//           >
//             <Filter className="w-4 h-4 mr-2" />
//             Filters
//           </Button>
//           <div className="flex items-center gap-2">
//             <Button
//               variant={viewMode === 'grid' ? 'default' : 'outline'}
//               size="sm"
//               onClick={() => setViewMode('grid')}
//             >
//               <Grid className="w-4 h-4" />
//             </Button>
//             <Button
//               variant={viewMode === 'list' ? 'default' : 'outline'}
//               size="sm"
//               onClick={() => setViewMode('list')}
//             >
//               <List className="w-4 h-4" />
//             </Button>
//           </div>
//           <SortDropdown value={sortOption} onChange={handleSortChange} />
//         </div>
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading products...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : (
//         <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
//           {/* Filters Sidebar */}
//           <div
//             className={`w-full lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}
//           >
//             <FilterSidebar
//               categories={categories}
//               selectedCategories={selectedCategories}
//               priceRange={priceRange}
//               inStockOnly={inStockOnly}
//               onCategoryChange={handleCategoryChange}
//               onPriceChange={handlePriceChange}
//               onInStockChange={setInStockOnly}
//               onClearFilters={clearFilters}
//             />
//           </div>

//           {/* Products Grid */}
//           <div className="flex-1">
//             <ProductGrid
//               products={products}
//               viewMode={viewMode}
//               onAddToCart={onAddToCart}
//               onAddToWishlist={onAddToWishlist}
//               onProductClick={onProductClick}
//               clearFilters={clearFilters}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// 'use client';

// import { useState, useEffect } from 'react';
// import { Product } from '../../types/product';
// import { MobileFilters } from './mobile-filters';
// import { SortDropdown } from './sort-dropdown';
// import { FilterSidebar } from './filter-sidebar';
// import { ProductGrid } from './product-grid';
// import axiosInstance from '../../lib/axiosInstance';
// import { Button } from '../ui/button';
// import { Input } from '../ui/input';
// import { Filter, Grid, List, Search } from 'lucide-react';

// interface ApiCategory {
//   category_id: string;
//   category_name: string;
// }

// interface ApiProduct {
//   product_id: string;
//   vendor_id: string;
//   slug: string;
//   identification: { 
//     product_sku: string;
//     product_name: string;
//   } | null;
//   descriptions: { 
//     short_description?: string;
//   } | null;
//   pricing: { 
//     selling_price: string; 
//     original_price?: string;
//   } | null;
//   inventory: any | null;
//   physical_attributes: any | null;
//   images: { 
//     urls: string[];
//   } | null;
//   tags_and_relationships: { 
//     product_tags?: string[];
//   } | null;
//   status_flags: {
//     product_status: boolean;
//     featured_product: boolean;
//     published_product: boolean;
//   };
//   timestamp: string;
//   category_id: string;
//   category_name: string;
//   subcategory_id: string | null;
//   subcategory_name: string | null;
//   // Optional fields for compatibility
//   in_stock?: boolean;
//   badge?: string;
//   badge_color?: string;
//   rating?: number;
//   reviews?: number;
// }

// interface ShopPageProps {
//   onAddToCart: (productId: string, quantity: number) => void;
//   onAddToWishlist: (productId: string) => void;
//   onProductClick: (productId: string) => void;
// }

// export function ShopPage({ onAddToCart, onAddToWishlist, onProductClick }: ShopPageProps) {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [rawProducts, setRawProducts] = useState<Product[]>([]); // Original data
//   const [categories, setCategories] = useState<string[]>([]);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
//   const [sortOption, setSortOption] = useState<string>('featured');
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [showFilters, setShowFilters] = useState(false);
//   const [inStockOnly, setInStockOnly] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
//   const [totalProducts, setTotalProducts] = useState(0);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearchQuery(searchQuery);
//     }, 500);
//     return () => clearTimeout(timer);
//   }, [searchQuery]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axiosInstance.get<{ data: ApiCategory[] }>('/categories/');
//         const names = response.data.data.map((cat) => cat.category_name);
//         setCategories(names);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await axiosInstance.get('/products/');
//       console.log('API Response:', res.data); // Debug log
//       const data = res.data.products || res.data.data || res.data;
//       const total = res.data.total_count || res.data.total || data.length;
//       console.log('Extracted data:', data); // Debug log
//       console.log('Total count:', total); // Debug log

//       const mapped = data.map((item: ApiProduct) => ({
//         id: item.product_id,
//         name: item.identification?.product_name || 'Unnamed Product',
//         description: item.descriptions?.short_description || 'No description available',
//         price: item.pricing?.selling_price ? parseFloat(item.pricing.selling_price) : 0,
//         originalPrice: item.pricing?.original_price ? parseFloat(item.pricing.original_price) : undefined,
//         image: item.images?.urls?.[0] || '/images/placeholder.svg',
//         category: item.category_name || 'Uncategorized',
//         productSlug: item.slug,
//         timestamp: item.timestamp,
//         unit: 'unit',
//         rating: item.rating || 0,
//         reviews: item.reviews || 0,
//         inStock: item.in_stock !== undefined ? item.in_stock : item.status_flags?.product_status || true,
//         badge: item.badge,
//         badgeColor: item.badge_color,
//       }));

//       console.log('Mapped products:', mapped); // Debug log
//       setRawProducts(mapped);
//       setTotalProducts(total);
//     } catch (err: any) {
//       const msg = err.response?.data?.message || 'Failed to load products';
//       setError(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Apply client-side filtering
//   useEffect(() => {
//     let filtered = [...rawProducts];

//     if (debouncedSearchQuery.trim()) {
//       filtered = filtered.filter((p) =>
//         p.name.toLowerCase().includes(debouncedSearchQuery.trim().toLowerCase())
//       );
//     }

//   if (selectedCategories.length > 0) {
//   filtered = filtered.filter((p) => {
//     const productCategories = Array.isArray(p.category)
//       ? p.category
//       : [p.category];

//     return productCategories.some((cat) =>
//       selectedCategories.some(
//         (sel) => sel.toLowerCase() === cat.toLowerCase()
//       )
//     );
//   });
// }

// console.log(selectedCategories)
//     filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

//     if (inStockOnly) {
//       filtered = filtered.filter((p) => p.inStock);
//     }

//     if (sortOption === 'price_low_to_high') {
//       filtered.sort((a, b) => a.price - b.price);
//     } else if (sortOption === 'price_high_to_low') {
//       filtered.sort((a, b) => b.price - a.price);
//     } else if (sortOption === 'latest') {
//       filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
//     }

//     setProducts(filtered);
//   }, [rawProducts, debouncedSearchQuery, selectedCategories, priceRange, inStockOnly, sortOption]);

//   const handleCategoryChange = (cat: string) => {
//     setSelectedCategories((prev) =>
//       prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
//     );
//   };

//   const handlePriceChange = (range: [number, number]) => setPriceRange(range);
//   const handleSortChange = (opt: string) => setSortOption(opt);

//   const clearFilters = () => {
//     setSelectedCategories([]);
//     setPriceRange([0, 500]);
//     setSortOption('featured');
//     setInStockOnly(false);
//     setSearchQuery('');
//     setDebouncedSearchQuery('');
//   };

//   return (
//     <div className="container mx-auto px-4 py-6 sm:py-8">
//       <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Shop All Products</h1>
//           <p className="text-gray-600 text-sm sm:text-base">
//             Showing {products.length} products
//             {totalProducts > products.length && ` of ${totalProducts} total`}
//           </p>
//         </div>

//         <div className="relative w-full sm:w-80 mb-4 sm:mb-0">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//           <Input
//             type="text"
//             placeholder="Search products..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//           {searchQuery && (
//             <button
//               onClick={() => setSearchQuery('')}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//             >
//               ×
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="flex flex-wrap items-center gap-2 mb-4">
//         {searchQuery && (
//           <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
//             Search: "{searchQuery}"
//             <button onClick={() => setSearchQuery('')} className="ml-1 hover:text-blue-900">×</button>
//           </span>
//         )}
//         {selectedCategories.map((cat) => (
//           <span key={cat} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
//             {cat}
//             <button onClick={() => handleCategoryChange(cat)} className="ml-1 hover:text-green-900">×</button>
//           </span>
//         ))}
//         {inStockOnly && (
//           <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
//             In Stock Only
//             <button onClick={() => setInStockOnly(false)} className="ml-1 hover:text-orange-900">×</button>
//           </span>
//         )}
//         {(priceRange[0] > 0 || priceRange[1] < 500) && (
//           <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
//             Price: ${priceRange[0]} - ${priceRange[1]}
//             <button onClick={() => setPriceRange([0, 500])} className="ml-1 hover:text-purple-900">×</button>
//           </span>
//         )}
//         {(searchQuery || selectedCategories.length || inStockOnly || priceRange[0] > 0 || priceRange[1] < 500) && (
//           <Button variant="outline" size="sm" onClick={clearFilters} className="text-red-600 border-red-300 hover:bg-red-50">
//             Clear All Filters
//           </Button>
//         )}
//       </div>

//       <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
//         <div></div>
//         <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
//           <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
//             <Filter className="w-4 h-4 mr-2" />
//             Filters
//           </Button>
//           <div className="flex items-center gap-2">
//             <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('grid')}>
//               <Grid className="w-4 h-4" />
//             </Button>
//             <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('list')}>
//               <List className="w-4 h-4" />
//             </Button>
//           </div>
//           <SortDropdown value={sortOption} onChange={handleSortChange} />
//         </div>
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading products...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : (
//         <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
//           <div className={`w-full lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
//             <FilterSidebar
//               categories={categories}
//               selectedCategories={selectedCategories}
//               priceRange={priceRange}
//               inStockOnly={inStockOnly}
//               onCategoryChange={handleCategoryChange}
//               onPriceChange={handlePriceChange}
//               onInStockChange={setInStockOnly}
//               onClearFilters={clearFilters}
//             />
//           </div>
//           <div className="flex-1">
//             <ProductGrid
//               products={products}
//               viewMode={viewMode}
//               onAddToCart={onAddToCart}
//               onAddToWishlist={onAddToWishlist}
//               onProductClick={onProductClick}
//               clearFilters={clearFilters}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


 
// 'use client';
 
// import { useState, useEffect } from 'react';
// import { Product } from '../../types/product';
// import { MobileFilters } from './mobile-filters';
// import { SortDropdown } from './sort-dropdown';
// import { FilterSidebar } from './filter-sidebar';
// import { ProductGrid } from './product-grid';
// import axiosInstance from '../../lib/axiosInstance';
// import { Button } from '../ui/button';
// import { Filter, Grid, List } from 'lucide-react';
// import { useCart } from '../../components/cart-provider';
// import { useWishlist } from '../../components/wishlist-provider';
 
// interface ApiCategory {
//   category_id: string;
//   category_name: string;
// }
 
// interface ApiProduct {
//   product_id: string;
//   identification: { product_name: string };
//   descriptions: { short_description: string };
//   pricing: { selling_price: string; original_price?: string };
//   images: { urls: string[] };
//   tags_and_relationships: { product_tags?: string[] };
//   slug: string;
//   cat_id: string;
//   timestamp: string;
//   in_stock?: boolean;
//   badge?: string;
//   badge_color?: string;
//   rating?: number;
//   reviews?: number;
// }
 
// export default function ShopPage() {

//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<string[]>([]);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
//   const [sortOption, setSortOption] = useState<string>('featured');
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [showFilters, setShowFilters] = useState(false);
//   const [inStockOnly, setInStockOnly] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
  
 
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
 
//         const categoriesResponse = await axiosInstance.get<{ data: ApiCategory[] }>('/categories/');
//         const categoryMap: { [key: string]: string } = {};
//         const categoryNames = categoriesResponse.data.data.map((cat) => {
//           categoryMap[cat.category_id] = cat.category_name;
//           return cat.category_name;
//         });
//         setCategories(categoryNames);
 
//         const productsResponse = await axiosInstance.get<ApiProduct[]>('/products/');
//         const mappedProducts: Product[] = productsResponse.data.products.map((item) => ({
//           id: item.product_id,
//           name: item.identification.product_name,
//           description: item.descriptions?.short_description || '',
//           price: parseFloat(item.pricing?.selling_price || ''),
//           originalPrice: item.pricing?.original_price ? parseFloat(item.pricing?.original_price) : undefined,
//           image: item.images?.urls[0] || '/placeholder.svg',
//           category: item.category_name || 'Uncategorized',
//           productSlug: item.slug,
//           timestamp: item.timestamp,
//           unit: 'unit',
//           rating: item.rating || 0,
//           reviews: item.reviews || 0,
//           inStock: item.in_stock !== undefined ? item.in_stock : true,
//           badge: item.badge,
//           badgeColor: item.badge_color,
//         }));
//         setProducts(mappedProducts);
//         setFilteredProducts(mappedProducts);
//       } catch (error) {
//         const errorMsg = 'Failed to load data. Please try again later.';
//         setError(errorMsg);
//         console.error('Error details:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);
 

 

//     useEffect(() => {
//     let filtered = [...products];

  

//   if (selectedCategories.length > 0) {
//   filtered = filtered.filter((p) => {
//     const productCategories = Array.isArray(p.category)
//       ? p.category
//       : [p.category];

//     return productCategories.some((cat) =>
//       selectedCategories.some(
//         (sel) => sel.toLowerCase() === cat.toLowerCase()
//       )
//     );
//   });
// }

// console.log(selectedCategories)
//     filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

//     if (inStockOnly) {
//       filtered = filtered.filter((p) => p.inStock);
//     }

//     if (sortOption === 'price_low_to_high') {
//       filtered.sort((a, b) => a.price - b.price);
//     } else if (sortOption === 'price_high_to_low') {
//       filtered.sort((a, b) => b.price - a.price);
//     } else if (sortOption === 'latest') {
//       filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
//     }

//     setProducts(filtered);
//   }, [products,  selectedCategories, priceRange, inStockOnly, sortOption]);


//   const handleCategoryChange = (category: string) => {
//     setSelectedCategories((prev) =>
//       prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
//     );
//   };
 
//   const handlePriceChange = (range: [number, number]) => {
//     setPriceRange(range);
//   };
 
//   const handleSortChange = (option: string) => {
//     setSortOption(option);
//   };
 
//   const clearFilters = () => {
//     setSelectedCategories([]);
//     setPriceRange([0, 500]);
//     setSortOption('featured');
//     setInStockOnly(false);
//   };
 
//   return (
//     <div className="container mx-auto px-4 py-6 sm:py-8">
//       <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Shop All Products</h1>
//           <p className="text-gray-600 text-sm sm:text-base">
//             Showing {filteredProducts.length} of {products.length} products
//           </p>
//         </div>
//         <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => setShowFilters(!showFilters)}
//             className="lg:hidden"
//           >
//             <Filter className="w-4 h-4 mr-2" />
//             Filters
//           </Button>
//           <div className="flex items-center gap-2">
//             <Button
//               variant={viewMode === 'grid' ? 'default' : 'outline'}
//               size="sm"
//               onClick={() => setViewMode('grid')}
//             >
//               <Grid className="w-4 h-4" />
//             </Button>
//             <Button
//               variant={viewMode === 'list' ? 'default' : 'outline'}
//               size="sm"
//               onClick={() => setViewMode('list')}
//             >
//               <List className="w-4 h-4" />
//             </Button>
//           </div>
//           <SortDropdown value={sortOption} onChange={handleSortChange} />
//         </div>
//       </div>
 
//       {loading ? (
//         <p className="text-center text-gray-500">Loading products...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : (
//         <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
//           <div
//             className={`w-full lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}
//           >
//             <FilterSidebar
//               categories={categories}
//               selectedCategories={selectedCategories}
//               priceRange={priceRange}
//               inStockOnly={inStockOnly}
//               onCategoryChange={handleCategoryChange}
//               onPriceChange={handlePriceChange}
//               onInStockChange={setInStockOnly}
//               onClearFilters={clearFilters}
//             />
//           </div>
//           <div className="flex-1">
//             <ProductGrid
//               products={filteredProducts}
//               viewMode={viewMode}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
 

'use client';

import { useState, useEffect } from 'react';
import { Product } from '../../types/product';
import { MobileFilters } from './mobile-filters';
import { SortDropdown } from './sort-dropdown';
import { FilterSidebar } from './filter-sidebar';
import { ProductGrid } from './product-grid';
import axiosInstance from '../../lib/axiosInstance';
import { Button } from '../ui/button';
import { Filter, Grid, List } from 'lucide-react';
import { useCart } from '../../components/cart-provider';
import { useWishlist } from '../../components/wishlist-provider';

interface ApiCategory {
  category_id: string;
  category_name: string;
}

interface ApiProduct {
  product_id: string;
  identification: { product_name: string };
  descriptions: { short_description: string };
  pricing: { selling_price: string; original_price?: string };
  images: { urls: string[] };
  tags_and_relationships: { product_tags?: string[] };
  slug: string;
  cat_id: string;
  timestamp: string;
  in_stock?: boolean;
  badge?: string;
  badge_color?: string;
  rating?: number;
  reviews?: number;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortOption, setSortOption] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch categories
        const categoriesResponse = await axiosInstance.get<{ data: ApiCategory[] }>('/categories/');
        const categoryMap: { [key: string]: string } = {};
        const categoryNames = categoriesResponse.data.data.map((cat) => {
          categoryMap[cat.category_id] = cat.category_name;
          return cat.category_name;
        });
        setCategories(categoryNames);

        // Fetch products
        const productsResponse = await axiosInstance.get<{ products: ApiProduct[] }>('/products/');
        const mappedProducts: Product[] = productsResponse.data.products.map((item) => ({
          id: item.product_id,
          name: item.identification.product_name,
          description: item.descriptions?.short_description || '',
          price: parseFloat(item.pricing?.selling_price || '0'),
          originalPrice: item.pricing?.original_price
            ? parseFloat(item.pricing.original_price)
            : undefined,
          image: item.images?.urls[0] || '/placeholder.svg',
          category:item.category_name || 'Uncategorized',
          productSlug: item.slug,
          timestamp: item.timestamp,
          unit: 'unit',
          rating: item.rating || 0,
          reviews: item.reviews || 0,
          inStock: item.in_stock !== undefined ? item.in_stock : true,
          badge: item.badge,
          badgeColor: item.badge_color,
        }));
        setProducts(mappedProducts);
        setFilteredProducts(mappedProducts);
      } catch (error) {
        const errorMsg = 'Failed to load data. Please try again later.';
        setError(errorMsg);
        console.error('Error details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => {
        const productCategories = Array.isArray(p.category)
          ? p.category
          : [p.category];
        return productCategories.some((cat) =>
          selectedCategories.some((sel) => sel.toLowerCase() === cat.toLowerCase())
        );
      });
    }

    // Filter by price
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Filter by stock
    if (inStockOnly) {
      filtered = filtered.filter((p) => p.inStock);
    }

    // Sort
    if (sortOption === 'price_low_to_high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price_high_to_low') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'latest') {
      filtered.sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategories, priceRange, inStockOnly, sortOption]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handlePriceChange = (range: [number, number]) => {
    setPriceRange(range);
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 500]);
    setSortOption('featured');
    setInStockOnly(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Shop All Products</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
          <SortDropdown value={sortOption} onChange={handleSortChange} />
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <div
            className={`w-full lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}
          >
            <FilterSidebar
              categories={categories}
              selectedCategories={selectedCategories}
              priceRange={priceRange}
              inStockOnly={inStockOnly}
              onCategoryChange={handleCategoryChange}
              onPriceChange={handlePriceChange}
              onInStockChange={setInStockOnly}
              onClearFilters={clearFilters}
            />
          </div>
          <div className="flex-1">
            <ProductGrid products={filteredProducts} viewMode={viewMode} />
          </div>
        </div>
      )}
    </div>
  );
}
