// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import {
//   Menu,
//   ShoppingBag,
//   User,
//   Search,
//   X,
//   Heart,
//   ChevronDown,
// } from 'lucide-react';

// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet';
// import { CartSidebar } from '../components/cart-sidebar';
// import { useCart } from '../components/cart-provider';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '../components/ui/dropdown-menu';
// import { Badge } from '../components/ui/badge';
// import Logo from './logo';
// import axiosInstance from '../lib/axiosInstance';

// interface Category {
//   category_id: string;
//   category_name: string;
//   slug: string;
//   subcategories: {
//     subcategory_id: string;
//     subcategory_name: string;
//     slug: string;
//   }[];
// }

// export function Header() {
//   const pathname = usePathname();
//   const { cartCount, toggleCart } = useCart();
//   const [showSearch, setShowSearch] = useState(false);
//   const [wishlistCount] = useState(3); // Replace with API if needed
//   const [categories, setCategories] = useState<Category[]>([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axiosInstance.get('get-menu-categories/');
//         setCategories(response.data.data); // assuming response.data.data is the array
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   return (
//     <header className="sticky top-0 z-40 w-full bg-background">
//       {/* Top */}
//       <div className="border-b">
//         <div className="px-4">
//           <div className="flex h-16 items-center justify-between">
//             {/* Mobile menu */}
//             <div className="lg:hidden">
//               <Sheet>
//                 <SheetTrigger asChild>
//                   <Button variant="ghost" size="icon" className="mr-2">
//                     <Menu className="h-5 w-5" />
//                     <span className="sr-only">Menu</span>
//                   </Button>
//                 </SheetTrigger>
//                 <SheetContent side="left" className="w-[300px] sm:w-[400px]">
//                   <div className="mt-6 mb-8">
//                     <Link href="/" className="flex items-center w-10">
//                       <Logo />
//                     </Link>
//                   </div>

//                   <Input
//                     type="search"
//                     placeholder="Search products..."
//                     className="mb-4 w-full"
//                   />

//                   <nav className="flex flex-col gap-1">
//                     {categories.map((cat) =>
//                       cat.subcategories.length > 0 ? (
//                         <DropdownMenu key={cat.category_id}>
//                           <DropdownMenuTrigger asChild>
//                             <Button
//                               variant="ghost"
//                               className={`h-12 px-4 rounded-none ${
//                                 pathname.startsWith(`/${cat.slug}`)
//                                   ? 'bg-primary/10 text-primary'
//                                   : ''
//                               }`}
//                             >
//                               {cat.category_name}
//                               <ChevronDown className="ml-1 h-4 w-4 opacity-50" />
//                             </Button>
//                           </DropdownMenuTrigger>

//                           <DropdownMenuContent className="w-56 z-50 bg-white border shadow-lg">
//                             {cat.subcategories.map((sub) => (
//                               <DropdownMenuItem key={sub.slug} asChild>
//                                 <Link
//                                   href={`/${cat.slug}/${sub.slug}`}
//                                   className={`w-full px-2 py-1.5 rounded-md block text-sm ${
//                                     pathname === `/${cat.slug}/${sub.slug}`
//                                       ? 'text-primary font-semibold'
//                                       : 'text-foreground hover:bg-muted'
//                                   }`}
//                                 >
//                                   {sub.subcategory_name}
//                                 </Link>
//                               </DropdownMenuItem>
//                             ))}
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       ) : (
//                         <Button
//                           key={cat.category_id}
//                           variant="ghost"
//                           className={`h-12 px-4 rounded-none ${
//                             pathname === `/${cat.slug}`
//                               ? 'bg-primary/10 text-primary'
//                               : ''
//                           }`}
//                           asChild
//                         >
//                           <Link href={`/${cat.slug}`}>{cat.category_name}</Link>
//                         </Button>
//                       )
//                     )}
//                   </nav>
//                 </SheetContent>
//               </Sheet>
//             </div>

//             {/* Logo */}
//             <Link href="/" className="flex items-center w-15">
//               <Logo />
//             </Link>

//             {/* Search - Desktop */}
//             <div className="hidden md:block flex-1 max-w-xl mx-8">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                   type="search"
//                   placeholder="Search..."
//                   className="pl-10 pr-10"
//                 />
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
//                 >
//                   Search
//                 </Button>
//               </div>
//             </div>

//             {/* User actions */}
//             <div className="flex items-center space-x-1">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="md:hidden"
//                 onClick={() => setShowSearch(!showSearch)}
//               >
//                 {showSearch ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
//                 <span className="sr-only">
//                   {showSearch ? 'Close search' : 'Search'}
//                 </span>
//               </Button>

//               <Button variant="ghost" size="icon" className="hidden sm:flex" asChild>
//                 <Link href="/account">
//                   <User className="h-5 w-5" />
//                   <span className="sr-only">Account</span>
//                 </Link>
//               </Button>

//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="hidden sm:flex relative"
//                 asChild
//               >
//                 <Link href="/wishlist">
//                   <Heart className="h-5 w-5" />
//                   {wishlistCount > 0 && (
//                     <Badge className="absolute -right-1 -top-1 h-5 w-5 p-0 flex items-center justify-center">
//                       {wishlistCount}
//                     </Badge>
//                   )}
//                   <span className="sr-only">Wishlist</span>
//                 </Link>
//               </Button>

//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={toggleCart}
//                 className="relative"
//               >
//                 <ShoppingBag className="h-5 w-5" />
//                 {cartCount > 0 && (
//                   <Badge className="absolute -right-1 -top-1 h-5 w-5 p-0 flex items-center justify-center">
//                     {cartCount}
//                   </Badge>
//                 )}
//                 <span className="sr-only">Cart</span>
//               </Button>
//             </div>
//           </div>

//           {/* Mobile search */}
//           {showSearch && (
//             <div className="pb-4 md:hidden">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                   type="search"
//                   placeholder="Search..."
//                   className="pl-10 pr-10"
//                   autoFocus
//                 />
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
//                 >
//                   Search
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Bottom nav for desktop */}
//       <div className="border-b bg-muted/40 hidden lg:block">
//         <div className="px-4">
//           <nav className="flex items-center h-12">
//             {categories.map((cat) =>
//               cat.subcategories.length > 0 ? (
//                 <DropdownMenu key={cat.category_id}>
//                   <DropdownMenuTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       className={`h-12 px-4 rounded-none ${
//                         pathname.startsWith(`/${cat.slug}`)
//                           ? 'bg-primary/10 text-primary'
//                           : ''
//                       }`}
//                     >
//                       {cat.category_name}
//                       <ChevronDown className="ml-1 h-4 w-4 opacity-50" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="start" className="w-56 z-50 bg-white border shadow-lg">
//                     {cat.subcategories.map((sub) => (
//                       <DropdownMenuItem key={sub.slug} asChild>
//                         <Link
//                           href={`/${cat.slug}/${sub.slug}`}
//                           className={`w-full px-2 py-1.5 rounded-md block text-sm ${
//                             pathname === `/${cat.slug}/${sub.slug}`
//                               ? 'text-primary font-semibold'
//                               : 'text-foreground hover:bg-muted'
//                           }`}
//                         >
//                           {sub.subcategory_name}
//                         </Link>
//                       </DropdownMenuItem>
//                     ))}
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               ) : (
//                 <Button
//                   key={cat.category_id}
//                   variant="ghost"
//                   className={`h-12 px-4 rounded-none ${
//                     pathname === `/${cat.slug}`
//                       ? 'bg-primary/10 text-primary'
//                       : ''
//                   }`}
//                   asChild
//                 >
//                   <Link href={`/${cat.slug}`}>{cat.category_name}</Link>
//                 </Button>
//               )
//             )}
//           </nav>
//         </div>
//       </div>

//       <CartSidebar />
//     </header>
//   );
// }

// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import {
//   Menu,
//   ShoppingBag,
//   User,
//   Search,
//   X,
//   Heart,
//   ChevronDown,
// } from 'lucide-react';
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
// import { CartSidebar } from './cart-sidebar';
// import { useCart } from './cart-provider';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from './ui/dropdown-menu';
// import { Badge } from './ui/badge';
// import Logo from './logo';
// import axiosInstance from '../lib/axiosInstance';

// interface Category {
//   category_id: string;
//   category_name: string;
//   slug: string;
//   subcategories: {
//     subcategory_id: string;
//     subcategory_name: string;
//     slug: string;
//   }[];
// }

// export function Header() {
//   const pathname = usePathname();
//   const { cartCount, toggleCart } = useCart();
//   const [showSearch, setShowSearch] = useState(false);
//   const [wishlistCount] = useState(3); // Replace with API if needed
//   const [categories, setCategories] = useState<Category[]>([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axiosInstance.get('get-menu-categories/');
//         setCategories(response.data.data);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   return (
//     <header className="sticky top-0 z-40 w-full bg-background">
//       <div className="border-b">
//         <div className="px-4">
//           <div className="flex h-16 items-center justify-between">
//             <div className="lg:hidden">
//               <Sheet>
//                 <SheetTrigger asChild>
//                   <Button variant="ghost" size="icon" className="mr-2">
//                     <Menu className="h-5 w-5" />
//                     <span className="sr-only">Menu</span>
//                   </Button>
//                 </SheetTrigger>
//                 <SheetContent side="left" className="w-[300px] sm:w-[400px]">
//                   <div className="mt-6 mb-8">
//                     <Link href="/" className="flex items-center w-10">
//                       <Logo />
//                     </Link>
//                   </div>
//                   <Input
//                     type="search"
//                     placeholder="Search products..."
//                     className="mb-4 w-full"
//                   />
//                   <nav className="flex flex-col gap-1">
//                     {categories.map((cat) =>
//                       cat.subcategories.length > 0 ? (
//                         <DropdownMenu key={cat.category_id}>
//                           <DropdownMenuTrigger asChild>
//                             <Button
//                               variant="ghost"
//                               className={`h-12 px-4 rounded-none ${
//                                 pathname === `/${cat.slug}` ||
//                                 pathname.startsWith(`/${cat.slug}/`)
//                                   ? 'bg-primary/10 text-primary'
//                                   : ''
//                               }`}
//                             >
//                               {cat.category_name}
//                               <ChevronDown className="ml-1 h-4 w-4 opacity-50" />
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent className="w-56 z-50 bg-white border shadow-lg">
//                             {cat.subcategories.map((sub) => (
//                               <DropdownMenuItem key={sub.slug} asChild>
//                                 <Link
//                                   href={`/${cat.slug}/${sub.slug}`}
//                                   className={`w-full px-2 py-1.5 rounded-md block text-sm ${
//                                     pathname === `/${cat.slug}/${sub.slug}`
//                                       ? 'text-primary font-semibold'
//                                       : 'text-foreground hover:bg-muted'
//                                   }`}
//                                 >
//                                   {sub.subcategory_name}
//                                 </Link>
//                               </DropdownMenuItem>
//                             ))}
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       ) : (
//                         <Button
//                           key={cat.category_id}
//                           variant="ghost"
//                           className={`h-12 px-4 rounded-none ${
//                             pathname === `/${cat.slug}`
//                               ? 'bg-primary/10 text-primary'
//                               : ''
//                           }`}
//                           asChild
//                         >
//                           <Link href={`/${cat.slug}`}>{cat.category_name}</Link>
//                         </Button>
//                       )
//                     )}
//                   </nav>
//                 </SheetContent>
//               </Sheet>
//             </div>

//             <Link href="/" className="flex items-center w-15">
//               <Logo />
//             </Link>

//             <div className="hidden md:block flex-1 max-w-xl mx-8">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                   type="search"
//                   placeholder="Search..."
//                   className="pl-10 pr-10"
//                 />
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
//                 >
//                   Search
//                 </Button>
//               </div>
//             </div>

//             <div className="flex items-center space-x-1">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="md:hidden"
//                 onClick={() => setShowSearch(!showSearch)}
//               >
//                 {showSearch ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
//                 <span className="sr-only">
//                   {showSearch ? 'Close search' : 'Search'}
//                 </span>
//               </Button>
//               <Button variant="ghost" size="icon" className="hidden sm:flex" asChild>
//                 <Link href="/account">
//                   <User className="h-5 w-5" />
//                   <span className="sr-only">Account</span>
//                 </Link>
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="hidden sm:flex relative"
//                 asChild
//               >
//                 <Link href="/wishlist">
//                   <Heart className="h-5 w-5" />
//                   {wishlistCount > 0 && (
//                     <Badge className="absolute -right-1 -top-1 h-5 w-5 p-0 flex items-center justify-center">
//                       {wishlistCount}
//                     </Badge>
//                   )}
//                   <span className="sr-only">Wishlist</span>
//                 </Link>
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={toggleCart}
//                 className="relative"
//               >
//                 {/* <ShoppingBag className="h-5 w-5" /> */}
//                 <ShoppingBag className="h-6 w-6" />
//           {cartCount > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//               {cartCount}
//             </span>
//           )}
//                 <span className="sr-only">Cart</span>
//               </Button>
//             </div>
//           </div>

//           {showSearch && (
//             <div className="pb-4 md:hidden">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                   type="search"
//                   placeholder="Search..."
//                   className="pl-10 pr-10"
//                   autoFocus
//                 />
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
//                 >
//                   Search
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="border-b bg-muted/40 hidden lg:block">
//         <div className="px-4">
//           <nav className="flex items-center h-12">
//             {categories.map((cat) =>
//               cat.subcategories.length > 0 ? (
//                 <DropdownMenu key={cat.category_id}>
//                   <DropdownMenuTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       className={`h-12 px-4 rounded-none ${
//                         pathname === `/${cat.slug}` ||
//                         pathname.startsWith(`/${cat.slug}/`)
//                           ? 'bg-primary/10 text-primary'
//                           : ''
//                       }`}
//                     >
//                       {cat.category_name}
//                       <ChevronDown className="ml-1 h-4 w-4 opacity-50" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="start" className="w-56 z-50 bg-white border shadow-lg">
//                     {cat.subcategories.map((sub) => (
//                       <DropdownMenuItem key={sub.slug} asChild>
//                         <Link
//                           href={`/${cat.slug}/${sub.slug}`}
//                           className={`w-full px-2 py-1.5 rounded-md block text-sm ${
//                             pathname === `/${cat.slug}/${sub.slug}`
//                               ? 'text-primary font-semibold'
//                               : 'text-foreground hover:bg-muted'
//                           }`}
//                         >
//                           {sub.subcategory_name}
//                         </Link>
//                       </DropdownMenuItem>
//                     ))}
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               ) : (
//                 <Button
//                   key={cat.category_id}
//                   variant="ghost"
//                   className={`h-12 px-4 rounded-none ${
//                     pathname === `/${cat.slug}`
//                       ? 'bg-primary/10 text-primary'
//                       : ''
//                   }`}
//                   asChild
//                 >
//                   <Link href={`/${cat.slug}`}>{cat.category_name}</Link>
//                 </Button>
//               )
//             )}
//           </nav>
//         </div>
//       </div>

//       <CartSidebar />
//     </header>
//   );
// }

// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import {
//   Menu,
//   ShoppingBag,
//   User,
//   Search,
//   X,
//   Heart,
//   ChevronDown,
// } from 'lucide-react';
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
// import { CartSidebar } from './cart-sidebar';
// import { useCart } from './cart-provider';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from './ui/dropdown-menu';
// import { Badge } from './ui/badge';
// import Image from 'next/image';
// import Logo from './logo';
// import axiosInstance from '../lib/axiosInstance';

// interface Category {
//   category_id: string;
//   category_name: string;
//   slug: string;
//   subcategories: {
//     subcategory_id: string;
//     subcategory_name: string;
//     slug: string;
//   }[];
// }

// interface SearchResult {
//   product_id: string;
//   product_name: string;
//   image_url: string;
//   selling_price: string;
//   slug: string;
//   category_slug: string;
// }

// export function Header() {
//   const pathname = usePathname();
//   const { cartCount, toggleCart } = useCart();
//   const [showSearch, setShowSearch] = useState(false);
//   const [wishlistCount] = useState(3); // Replace with API if needed
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
//   const [isSearchLoading, setIsSearchLoading] = useState(false);
//   const [showSearchDropdown, setShowSearchDropdown] = useState(false);
//   const searchRef = useRef<HTMLDivElement>(null);
//   const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axiosInstance.get('get-menu-categories/');
//         setCategories(response.data.data);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     const handleSearch = async () => {
//       if (searchQuery.length < 2) {
//         setSearchResults([]);
//         setShowSearchDropdown(false);
//         return;
//       }

//       setIsSearchLoading(true);
//       try {
//         const response = await axiosInstance.get(
//           `/products/search?query=${encodeURIComponent(searchQuery)}`
//         );
//         setSearchResults(response.data);
//         setShowSearchDropdown(true);
//       } catch (error) {
//         console.error('Error fetching search results:', error);
//         setSearchResults([]);
//         setShowSearchDropdown(false);
//       } finally {
//         setIsSearchLoading(false);
//       }
//     };

//     if (debounceTimeout.current) {
//       clearTimeout(debounceTimeout.current);
//     }
//     debounceTimeout.current = setTimeout(handleSearch, 300);

//     return () => {
//       if (debounceTimeout.current) {
//         clearTimeout(debounceTimeout.current);
//       }
//     };
//   }, [searchQuery]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         searchRef.current &&
//         !searchRef.current.contains(event.target as Node)
//       ) {
//         setShowSearchDropdown(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Optionally navigate to a search results page
//     setShowSearchDropdown(false);
//   };

//   return (
//     <header className="sticky top-0 z-40 w-full bg-background">
//       <div className="border-b">
//         <div className="px-4">
//           <div className="flex h-16 items-center justify-between">
//             <div className="lg:hidden">
//               <Sheet>
//                 <SheetTrigger asChild>
//                   <Button variant="ghost" size="icon" className="mr-2">
//                     <Menu className="h-5 w-5" />
//                     <span className="sr-only">Menu</span>
//                   </Button>
//                 </SheetTrigger>
//                 <SheetContent side="left" className="w-[300px] sm:w-[400px]">
//                   <div className="mt-6 mb-8">
//                     <Link href="/" className="flex items-center w-10">
//                       <Logo />
//                     </Link>
//                   </div>
//                   <div className="relative" ref={searchRef}>
//                     <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                     <Input
//                       type="search"
//                       placeholder="Search products..."
//                       className="mb-4 w-full pl-10 pr-10"
//                       value={searchQuery}
//                       onChange={handleSearchInputChange}
//                       onFocus={() =>
//                         searchQuery.length >= 2 && setShowSearchDropdown(true)
//                       }
//                     />
//                     {showSearchDropdown && (
//                       <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
//                         {isSearchLoading ? (
//                           <div className="p-4 text-center text-muted-foreground">
//                             Loading...
//                           </div>
//                         ) : searchResults.length === 0 ? (
//                           <div className="p-4 text-center text-muted-foreground">
//                             No products found
//                           </div>
//                         ) : (
//                           searchResults.map((product) => (
//                             <Link
//                               key={product.product_id}
//                               href={`/${product.category_slug}/${product.slug}`}
//                               className="flex items-center p-2 hover:bg-muted"
//                               onClick={() => {
//                                 setSearchQuery('');
//                                 setShowSearchDropdown(false);
//                               }}
//                             >
//                               <Image
//                                 src={product.image_url}
//                                 alt={product.product_name}
//                                 width={40}
//                                 height={40}
//                                 className="object-cover rounded mr-2"
//                               />
//                               <div>
//                                 <div className="font-medium">
//                                   {product.product_name}
//                                 </div>
//                                 <div className="text-sm text-muted-foreground">
//                                   AU${product.selling_price}
//                                 </div>
//                               </div>
//                             </Link>
//                           ))
//                         )}
//                       </div>
//                     )}
//                   </div>
//                   <nav className="flex flex-col gap-1">
//                     {categories.map((cat) =>
//                       cat.subcategories.length > 0 ? (
//                         <DropdownMenu key={cat.category_id}>
//                           <DropdownMenuTrigger asChild>
//                             <Button
//                               variant="ghost"
//                               className={`h-12 px-4 rounded-none ${
//                                 pathname === `/${cat.slug}` ||
//                                 pathname.startsWith(`/${cat.slug}/`)
//                                   ? 'bg-primary/10 text-primary'
//                                   : ''
//                               }`}
//                             >
//                               {cat.category_name}
//                               <ChevronDown className="ml-1 h-4 w-4 opacity-50" />
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent className="w-56 z-50 bg-white border shadow-lg">
//                             {cat.subcategories.map((sub) => (
//                               <DropdownMenuItem key={sub.slug} asChild>
//                                 <Link
//                                   href={`/${cat.slug}/${sub.slug}`}
//                                   className={`w-full px-2 py-1.5 rounded-md block text-sm ${
//                                     pathname === `/${cat.slug}/${sub.slug}`
//                                       ? 'text-primary font-semibold'
//                                       : 'text-foreground hover:bg-muted'
//                                   }`}
//                                 >
//                                   {sub.subcategory_name}
//                                 </Link>
//                               </DropdownMenuItem>
//                             ))}
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       ) : (
//                         <Button
//                           key={cat.category_id}
//                           variant="ghost"
//                           className={`h-12 px-4 rounded-none ${
//                             pathname === `/${cat.slug}`
//                               ? 'bg-primary/10 text-primary'
//                               : ''
//                           }`}
//                           asChild
//                         >
//                           <Link href={`/${cat.slug}`}>{cat.category_name}</Link>
//                         </Button>
//                       )
//                     )}
//                   </nav>
//                 </SheetContent>
//               </Sheet>
//             </div>

//             <Link href="/" className="flex items-center w-15">
//               <Logo />
//             </Link>

//             <div
//               className="hidden md:block flex-1 max-w-xl mx-8 relative"
//               ref={searchRef}
//             >
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                   type="search"
//                   placeholder="Search..."
//                   className="pl-10 pr-10"
//                   value={searchQuery}
//                   onChange={handleSearchInputChange}
//                   onFocus={() =>
//                     searchQuery.length >= 2 && setShowSearchDropdown(true)
//                   }
//                 />
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
//                   onClick={handleSearchSubmit}
//                 >
//                   Search
//                 </Button>
//               </div>
//               {showSearchDropdown && (
//                 <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
//                   {isSearchLoading ? (
//                     <div className="p-4 text-center text-muted-foreground">
//                       Loading...
//                     </div>
//                   ) : searchResults.length === 0 ? (
//                     <div className="p-4 text-center text-muted-foreground">
//                       No products found
//                     </div>
//                   ) : (
//                     searchResults.map((product) => (
//                       <Link
//                         key={product.product_id}
//                         href={`/${product.category_slug}/${product.slug}`}
//                         className="flex items-center p-2 hover:bg-muted"
//                         onClick={() => {
//                           setSearchQuery('');
//                           setShowSearchDropdown(false);
//                         }}
//                       >
//                         <Image
//                           src={product.image_url}
//                           alt={product.product_name}
//                           width={40}
//                           height={40}
//                           className="object-cover rounded mr-2"
//                         />
//                         <div>
//                           <div className="font-medium">
//                             {product.product_name}
//                           </div>
//                           <div className="text-sm text-muted-foreground">
//                             AU${product.selling_price}
//                           </div>
//                         </div>
//                       </Link>
//                     ))
//                   )}
//                 </div>
//               )}
//             </div>

//             <div className="flex items-center space-x-1">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="md:hidden"
//                 onClick={() => {
//                   setShowSearch(!showSearch);
//                   setSearchQuery('');
//                   setShowSearchDropdown(false);
//                 }}
//               >
//                 {showSearch ? (
//                   <X className="h-5 w-5" />
//                 ) : (
//                   <Search className="h-5 w-5" />
//                 )}
//                 <span className="sr-only">
//                   {showSearch ? 'Close search' : 'Search'}
//                 </span>
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="hidden sm:flex"
//                 asChild
//               >
//                 <Link href="/account">
//                   <User className="h-5 w-5" />
//                   <span className="sr-only">Account</span>
//                 </Link>
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="hidden sm:flex relative"
//                 asChild
//               >
//                 <Link href="/wishlist">
//                   <Heart className="h-5 w-5" />
//                   {wishlistCount > 0 && (
//                     <Badge className="absolute -right-1 -top-1 h-5 w-5 p-0 flex items-center justify-center">
//                       {wishlistCount}
//                     </Badge>
//                   )}
//                   <span className="sr-only">Wishlist</span>
//                 </Link>
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={toggleCart}
//                 className="relative"
//               >
//                 <ShoppingBag className="h-6 w-6" />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                     {cartCount}
//                   </span>
//                 )}
//                 <span className="sr-only">Cart</span>
//               </Button>
//             </div>
//           </div>

//           {showSearch && (
//             <div className="pb-4 md:hidden relative" ref={searchRef}>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                   type="search"
//                   placeholder="Search..."
//                   className="pl-10 pr-10"
//                   value={searchQuery}
//                   onChange={handleSearchInputChange}
//                   onFocus={() =>
//                     searchQuery.length >= 2 && setShowSearchDropdown(true)
//                   }
//                   autoFocus
//                 />
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
//                   onClick={handleSearchSubmit}
//                 >
//                   Search
//                 </Button>
//               </div>
//               {showSearchDropdown && (
//                 <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
//                   {isSearchLoading ? (
//                     <div className="p-4 text-center text-muted-foreground">
//                       Loading...
//                     </div>
//                   ) : searchResults.length === 0 ? (
//                     <div className="p-4 text-center text-muted-foreground">
//                       No products found
//                     </div>
//                   ) : (
//                     searchResults.map((product) => (
//                       <Link
//                         key={product.product_id}
//                         href={`/${product.category_slug}/${product.slug}`}
//                         className="flex items-center p-2 hover:bg-muted"
//                         onClick={() => {
//                           setSearchQuery('');
//                           setShowSearchDropdown(false);
//                           setShowSearch(false);
//                         }}
//                       >
//                         <Image
//                           src={product.image_url}
//                           alt={product.product_name}
//                           width={40}
//                           height={40}
//                           className="object-cover rounded mr-2"
//                         />
//                         <div>
//                           <div className="font-medium">
//                             {product.product_name}
//                           </div>
//                           <div className="text-sm text-muted-foreground">
//                             AU${product.selling_price}
//                           </div>
//                         </div>
//                       </Link>
//                     ))
//                   )}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="border-b bg-muted/40 hidden lg:block">
//         <div className="px-4">
//           <nav className="flex items-center h-12">
//             {categories.map((cat) =>
//               cat.subcategories.length > 0 ? (
//                 <DropdownMenu key={cat.category_id}>
//                   <DropdownMenuTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       className={`h-12 px-4 rounded-none ${
//                         pathname === `/${cat.slug}` ||
//                         pathname.startsWith(`/${cat.slug}/`)
//                           ? 'bg-primary/10 text-primary'
//                           : ''
//                       }`}
//                     >
//                       {cat.category_name}
//                       <ChevronDown className="ml-1 h-4 w-4 opacity-50" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent
//                     align="start"
//                     className="w-56 z-50 bg-white border shadow-lg"
//                   >
//                     {cat.subcategories.map((sub) => (
//                       <DropdownMenuItem key={sub.slug} asChild>
//                         <Link
//                           href={`/${cat.slug}/${sub.slug}`}
//                           className={`w-full px-2 py-1.5 rounded-md block text-sm ${
//                             pathname === `/${cat.slug}/${sub.slug}`
//                               ? 'text-primary font-semibold'
//                               : 'text-foreground hover:bg-muted'
//                           }`}
//                         >
//                           {sub.subcategory_name}
//                         </Link>
//                       </DropdownMenuItem>
//                     ))}
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               ) : (
//                 <Button
//                   key={cat.category_id}
//                   variant="ghost"
//                   className={`h-12 px-4 rounded-none ${
//                     pathname === `/${cat.slug}`
//                       ? 'bg-primary/10 text-primary'
//                       : ''
//                   }`}
//                   asChild
//                 >
//                   <Link href={`/${cat.slug}`}>{cat.category_name}</Link>
//                 </Button>
//               )
//             )}
//           </nav>
//         </div>
//       </div>

//       <CartSidebar />
//     </header>
//   );
// }

//without wishlist

// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import {
//   Menu,
//   ShoppingBag,
//   User,
//   Search,
//   X,
//   Heart,
//   ChevronDown,
// } from 'lucide-react';
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
// import { CartSidebar } from './cart-sidebar';
// import { useCart } from './cart-provider';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from './ui/dropdown-menu';
// import { Badge } from './ui/badge';
// import Image from 'next/image';
// import Logo from './logo';
// import axiosInstance from '../lib/axiosInstance';

// // Interface for subcategory data from get-menu-categories/ API
// interface ApiSubcategory {
//   subcategory_id: string;
//   subcategory_name: string;
//   slug: string;
// }

// // Interface for category data from get-menu-categories/ API
// interface ApiCategory {
//   category_id: string;
//   category_name: string;
//   slug: string;
//   subcategories?: ApiSubcategory[];
// }

// // Interface for the component's Category state
// interface Category {
//   category_id: string;
//   category_name: string;
//   slug: string;
//   subcategories: {
//     subcategory_id: string;
//     subcategory_name: string;
//     slug: string;
//   }[];
// }

// // Interface for search result data
// interface SearchResult {
//   product_id: string;
//   product_name: string;
//   image_url: string;
//   selling_price: string;
//   slug: string;
//   category_slug: string;
// }

// export function Header() {
//   const pathname = usePathname();
//   const { cartCount, toggleCart } = useCart();
//   const [showSearch, setShowSearch] = useState(false);
//   const [wishlistCount] = useState(3); // TODO: Replace with API call for dynamic wishlist count
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
//   const [isSearchLoading, setIsSearchLoading] = useState(false);
//   const [showSearchDropdown, setShowSearchDropdown] = useState(false);
//   const searchRef = useRef<HTMLDivElement>(null);
//   const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

//   // Fetch categories and subcategories with single API call
//   useEffect(() => {
//     const fetchCategoriesAndSubcategories = async () => {
//       try {
//         const response = await axiosInstance.get<{ data: ApiCategory[] }>(
//           'get-menu-categories/'
//         );
//         const data = response.data.data.map((cat) => ({
//           category_id: cat.category_id,
//           category_name: cat.category_name,
//           slug: cat.slug,
//           subcategories:
//             cat.subcategories?.map((sub) => ({
//               subcategory_id: sub.subcategory_id,
//               subcategory_name: sub.subcategory_name,
//               slug: sub.slug,
//             })) || [],
//         }));
//         setCategories(data);
//       } catch (error) {
//         console.error('Error fetching categories and subcategories:', error);
//         setCategories([]);
//         // TODO: Optionally notify user of error (e.g., with toast)
//       }
//     };

//     fetchCategoriesAndSubcategories();
//   }, []);

//   useEffect(() => {
//     const handleSearch = async () => {
//       if (searchQuery.length < 2) {
//         setSearchResults([]);
//         setShowSearchDropdown(false);
//         return;
//       }

//       setIsSearchLoading(true);
//       try {
//         const response = await axiosInstance.get<SearchResult[]>(
//           `/products/search?query=${encodeURIComponent(searchQuery)}`
//         );
//         setSearchResults(response.data);
//         setShowSearchDropdown(true);
//       } catch (error) {
//         console.error('Error fetching search results:', error);
//         setSearchResults([]);
//         setShowSearchDropdown(false);
//         // TODO: Optionally notify user of error (e.g., with toast)
//       } finally {
//         setIsSearchLoading(false);
//       }
//     };

//     if (debounceTimeout.current) {
//       clearTimeout(debounceTimeout.current);
//     }
//     debounceTimeout.current = setTimeout(handleSearch, 300);

//     return () => {
//       if (debounceTimeout.current) {
//         clearTimeout(debounceTimeout.current);
//       }
//     };
//   }, [searchQuery]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         searchRef.current &&
//         !searchRef.current.contains(event.target as Node)
//       ) {
//         setShowSearchDropdown(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setShowSearchDropdown(false);
//   };

//   // Handle menu item click to trigger API call
//   const handleMenuItemClick = async (slug: string) => {
//     try {
//       const encodedSlug = encodeURIComponent(slug);
//       const response = await axiosInstance.get(
//         `products/by-category/${encodedSlug}`
//       );
//       console.log(`Fetched products for ${slug}:`, response.data);
//       // TODO: Store response data in state or pass to another component
//     } catch (error) {
//       console.error(`Error fetching products for ${slug}:`, error);
//       // TODO: Optionally notify user of error (e.g., with toast)
//     }
//   };

//   // Decode pathname for comparison to handle encoded URLs
//   const decodedPathname = decodeURIComponent(pathname);

//   return (
//     <header className="sticky top-0 z-40 w-full bg-background">
//       <div className="border-b">
//         <div className="px-4">
//           <div className="flex h-16 items-center justify-between">
//             <div className="lg:hidden">
//               <Sheet>
//                 <SheetTrigger asChild>
//                   <Button variant="ghost" size="icon" className="mr-2">
//                     <Menu className="h-5 w-5" />
//                     <span className="sr-only">Menu</span>
//                   </Button>
//                 </SheetTrigger>
//                 <SheetContent side="left" className="w-[300px] sm:w-[400px]">
//                   <div className="mt-6 mb-8">
//                     <Link href="/" className="flex items-center w-10">
//                       <Logo />
//                     </Link>
//                   </div>
//                   <div className="relative" ref={searchRef}>
//                     <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                     <Input
//                       type="search"
//                       placeholder="Search products..."
//                       className="mb-4 w-full pl-10 pr-10"
//                       value={searchQuery}
//                       onChange={handleSearchInputChange}
//                       onFocus={() =>
//                         searchQuery.length >= 2 && setShowSearchDropdown(true)
//                       }
//                     />
//                     {showSearchDropdown && (
//                       <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
//                         {isSearchLoading ? (
//                           <div className="p-4 text-center text-muted-foreground">
//                             Loading...
//                           </div>
//                         ) : searchResults.length === 0 ? (
//                           <div className="p-4 text-center text-muted-foreground">
//                             No products found
//                           </div>
//                         ) : (
//                           searchResults.map((product) => (
//                             <Link
//                               key={product.product_id}
//                               href={`/${encodeURIComponent(product.category_slug)}/${encodeURIComponent(product.slug)}`}
//                               className="flex items-center p-2 hover:bg-muted"
//                               onClick={() => {
//                                 setSearchQuery('');
//                                 setShowSearchDropdown(false);
//                                 handleMenuItemClick(product.category_slug);
//                               }}
//                             >
//                               <Image
//                                 src={product.image_url}
//                                 alt={product.product_name}
//                                 width={40}
//                                 height={40}
//                                 className="object-cover rounded mr-2"
//                               />
//                               <div>
//                                 <div className="font-medium">
//                                   {product.product_name}
//                                 </div>
//                                 <div className="text-sm text-muted-foreground">
//                                   AU${product.selling_price}
//                                 </div>
//                               </div>
//                             </Link>
//                           ))
//                         )}
//                       </div>
//                     )}
//                   </div>
//                   <nav className="flex flex-col gap-1">
//                     {categories.map((cat) =>
//                       cat.subcategories.length > 0 ? (
//                         <DropdownMenu key={cat.category_id}>
//                           <DropdownMenuTrigger asChild>
//                             <Button
//                               variant="ghost"
//                               className={`h-12 px-4 rounded-none ${
//                                 decodedPathname === `/${cat.slug}` ||
//                                 decodedPathname.startsWith(`/${cat.slug}/`)
//                                   ? 'bg-primary/10 text-primary'
//                                   : ''
//                               }`}
//                             >
//                               {cat.category_name}
//                               <ChevronDown className="ml-1 h-4 w-4 opacity-50" />
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent className="w-56 z-50 bg-white border shadow-lg">
//                             {cat.subcategories.map((sub) => (
//                               <DropdownMenuItem key={sub.slug} asChild>
//                                 <Link
//                                   href={`/${encodeURIComponent(sub.slug)}`}
//                                   className={`w-full px-2 py-1.5 rounded-md block text-sm ${
//                                     decodedPathname === `/${sub.slug}`
//                                       ? 'text-primary font-semibold'
//                                       : 'text-foreground hover:bg-muted'
//                                   }`}
//                                   onClick={() => handleMenuItemClick(sub.slug)}
//                                 >
//                                   {sub.subcategory_name}
//                                 </Link>
//                               </DropdownMenuItem>
//                             ))}
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       ) : (
//                         <Button
//                           key={cat.category_id}
//                           variant="ghost"
//                           className={`h-12 px-4 rounded-none ${
//                             decodedPathname === `/${cat.slug}`
//                               ? 'bg-primary/10 text-primary'
//                               : ''
//                           }`}
//                           asChild
//                         >
//                           <Link
//                             href={`/${encodeURIComponent(cat.slug)}`}
//                             onClick={() => handleMenuItemClick(cat.slug)}
//                           >
//                             {cat.category_name}
//                           </Link>
//                         </Button>
//                       )
//                     )}
//                   </nav>
//                 </SheetContent>
//               </Sheet>
//             </div>

//             <Link href="/" className="flex items-center w-15">
//               <Logo />
//             </Link>

//             <div
//               className="hidden md:block flex-1 max-w-xl mx-8 relative"
//               ref={searchRef}
//             >
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                   type="search"
//                   placeholder="Search..."
//                   className="pl-10 pr-10"
//                   value={searchQuery}
//                   onChange={handleSearchInputChange}
//                   onFocus={() =>
//                     searchQuery.length >= 2 && setShowSearchDropdown(true)
//                   }
//                 />
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
//                   onClick={handleSearchSubmit}
//                 >
//                   Search
//                 </Button>
//               </div>
//               {showSearchDropdown && (
//                 <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
//                   {isSearchLoading ? (
//                     <div className="p-4 text-center text-muted-foreground">
//                       Loading...
//                     </div>
//                   ) : searchResults.length === 0 ? (
//                     <div className="p-4 text-center text-muted-foreground">
//                       No products found
//                     </div>
//                   ) : (
//                     searchResults.map((product) => (
//                       <Link
//                         key={product.product_id}
//                         href={`/${encodeURIComponent(product.category_slug)}/${encodeURIComponent(product.slug)}`}
//                         className="flex items-center p-2 hover:bg-muted"
//                         onClick={() => {
//                           setSearchQuery('');
//                           setShowSearchDropdown(false);
//                           handleMenuItemClick(product.category_slug);
//                         }}
//                       >
//                         <Image
//                           src={product.image_url}
//                           alt={product.product_name}
//                           width={40}
//                           height={40}
//                           className="object-cover rounded mr-2"
//                         />
//                         <div>
//                           <div className="font-medium">
//                             {product.product_name}
//                           </div>
//                           <div className="text-sm text-muted-foreground">
//                             AU${product.selling_price}
//                           </div>
//                         </div>
//                       </Link>
//                     ))
//                   )}
//                 </div>
//               )}
//             </div>

//             <div className="flex items-center space-x-1">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="md:hidden"
//                 onClick={() => {
//                   setShowSearch(!showSearch);
//                   setSearchQuery('');
//                   setShowSearchDropdown(false);
//                 }}
//               >
//                 {showSearch ? (
//                   <X className="h-5 w-5" />
//                 ) : (
//                   <Search className="h-5 w-5" />
//                 )}
//                 <span className="sr-only">
//                   {showSearch ? 'Close search' : 'Search'}
//                 </span>
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="hidden sm:flex"
//                 asChild
//               >
//                 <Link href="/account">
//                   <User className="h-5 w-5" />
//                   <span className="sr-only">Account</span>
//                 </Link>
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="hidden sm:flex relative"
//                 asChild
//               >
//                 <Link href="/wishlist">
//                   <Heart className="h-5 w-5" />
//                   {wishlistCount > 0 && (
//                     <Badge className="absolute -right-1 -top-1 h-5 w-5 p-0 flex items-center justify-center">
//                       {wishlistCount}
//                     </Badge>
//                   )}
//                   <span className="sr-only">Wishlist</span>
//                 </Link>
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={toggleCart}
//                 className="relative"
//               >
//                 <ShoppingBag className="h-6 w-6" />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                     {cartCount}
//                   </span>
//                 )}
//                 <span className="sr-only">Cart</span>
//               </Button>
//             </div>
//           </div>

//           {showSearch && (
//             <div className="pb-4 md:hidden relative" ref={searchRef}>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                   type="search"
//                   placeholder="Search..."
//                   className="pl-10 pr-10"
//                   value={searchQuery}
//                   onChange={handleSearchInputChange}
//                   onFocus={() =>
//                     searchQuery.length >= 2 && setShowSearchDropdown(true)
//                   }
//                   autoFocus
//                 />
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
//                   onClick={handleSearchSubmit}
//                 >
//                   Search
//                 </Button>
//               </div>
//               {showSearchDropdown && (
//                 <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
//                   {isSearchLoading ? (
//                     <div className="p-4 text-center text-muted-foreground">
//                       Loading...
//                     </div>
//                   ) : searchResults.length === 0 ? (
//                     <div className="p-4 text-center text-muted-foreground">
//                       No products found
//                     </div>
//                   ) : (
//                     searchResults.map((product) => (
//                       <Link
//                         key={product.product_id}
//                         href={`/${encodeURIComponent(product.category_slug)}/${encodeURIComponent(product.slug)}`}
//                         className="flex items-center p-2 hover:bg-muted"
//                         onClick={() => {
//                           setSearchQuery('');
//                           setShowSearchDropdown(false);
//                           setShowSearch(false);
//                           handleMenuItemClick(product.category_slug);
//                         }}
//                       >
//                         <Image
//                           src={product.image_url}
//                           alt={product.product_name}
//                           width={40}
//                           height={40}
//                           className="object-cover rounded mr-2"
//                         />
//                         <div>
//                           <div className="font-medium">
//                             {product.product_name}
//                           </div>
//                           <div className="text-sm text-muted-foreground">
//                             AU${product.selling_price}
//                           </div>
//                         </div>
//                       </Link>
//                     ))
//                   )}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="border-b bg-muted/40 hidden lg:block">
//         <div className="px-4">
//           <nav className="flex items-center h-12">
//             {categories.map((cat) =>
//               cat.subcategories.length > 0 ? (
//                 <DropdownMenu key={cat.category_id}>
//                   <DropdownMenuTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       className={`h-12 px-4 rounded-none ${
//                         decodedPathname === `/${cat.slug}` ||
//                         decodedPathname.startsWith(`/${cat.slug}/`)
//                           ? 'bg-primary/10 text-primary'
//                           : ''
//                       }`}
//                     >
//                       {cat.category_name}
//                       <ChevronDown className="ml-1 h-4 w-4 opacity-50" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent
//                     align="start"
//                     className="w-56 z-50 bg-white border shadow-lg"
//                   >
//                     {cat.subcategories.map((sub) => (
//                       <DropdownMenuItem key={sub.slug} asChild>
//                         <Link
//                           href={`/${encodeURIComponent(sub.slug)}`}
//                           className={`w-full px-2 py-1.5 rounded-md block text-sm ${
//                             decodedPathname === `/${sub.slug}`
//                               ? 'text-primary font-semibold'
//                               : 'text-foreground hover:bg-muted'
//                           }`}
//                           onClick={() => handleMenuItemClick(sub.slug)}
//                         >
//                           {sub.subcategory_name}
//                         </Link>
//                       </DropdownMenuItem>
//                     ))}
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               ) : (
//                 <Button
//                   key={cat.category_id}
//                   variant="ghost"
//                   className={`h-12 px-4 rounded-none ${
//                     decodedPathname === `/${cat.slug}`
//                       ? 'bg-primary/10 text-primary'
//                       : ''
//                   }`}
//                   asChild
//                 >
//                   <Link
//                     href={`/${encodeURIComponent(cat.slug)}`}
//                     onClick={() => handleMenuItemClick(cat.slug)}
//                   >
//                     {cat.category_name}
//                   </Link>
//                 </Button>
//               )
//             )}
//           </nav>
//         </div>
//       </div>

//       <CartSidebar />
//     </header>
//   );
// }

// wishlist count
// components/Header.tsx
// Header.tsx


// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import {
//   Menu,
//   ShoppingBag,
//   User,
//   Search,
//   X,
//   Heart,
//   ChevronDown,
// } from 'lucide-react';
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import { Sheet, SheetTrigger, SheetContent } from './ui/sheet';
// import { CartSidebar } from './cart-sidebar';
// import { useCart } from './cart-provider';
// import { useWishlist } from './wishlist-provider';
// import { useAuth } from './auth-provider';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from './ui/dropdown-menu';
// import { Badge } from './ui/badge';
// import Image from 'next/image';
// import Logo from './logo';
// import axiosInstance from '../lib/axiosInstance';

// interface ApiSubcategory {
//   subcategory_id: string;
//   subcategory_name: string;
//   slug: string;
// }

// interface ApiCategory {
//   category_id: string;
//   category_name: string;
//   slug: string;
//   subcategories?: ApiSubcategory[];
// }

// interface Category {
//   category_id: string;
//   category_name: string;
//   slug: string;
//   subcategories: {
//     subcategory_id: string;
//     subcategory_name: string;
//     slug: string;
//   }[];
// }

// interface SearchResult {
//   product_id: string;
//   product_name: string;
//   image_url: string;
//   selling_price: string;
//   slug: string;
//   category_slug: string;
// }

// export function Header() {
//   const pathname = usePathname();
//   const { cartCount, toggleCart } = useCart();
//   const { wishlistCount } = useWishlist();
//   const { isLoggedIn, userId, token, checkAuth } = useAuth();
//   const [showSearch, setShowSearch] = useState(false);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
//   const [isSearchLoading, setIsSearchLoading] = useState(false);
//   const [showSearchDropout, setShowSearchDropout] = useState(false);
//   const [userName, setUserName] = useState<string>('User');
//   const searchRef = useRef<HTMLDivElement>(null);
//   const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

//   console.log(
//     'Header - isLoggedIn:',
//     isLoggedIn,
//     'userId:',
//     userId,
//     'token:',
//     token
//   );

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       if (!isLoggedIn || !userId || !token) {
//         console.log('Not authenticated or missing userId/token');
//         setUserName('User');
//         return;
//       }

//       try {
//         const response = await axiosInstance.get(`user-profile/${userId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         console.log('User profile response:', response.data);
//         setUserName(response.data.user_fullname || 'User');
//       } catch (error) {
//         console.error('Error fetching user profile:', error);
//         setUserName('User');
//       }
//     };

//     fetchUserProfile();
//   }, [isLoggedIn, userId, token]);

//   useEffect(() => {
//     const fetchCategoriesAndSubcategories = async () => {
//       try {
//         const response = await axiosInstance.get<{ data: ApiCategory[] }>(
//           'get-menu-categories/'
//         );
//         const data = response.data.data.map((cat) => ({
//           category_id: cat.category_id,
//           category_name: cat.category_name,
//           slug: cat.slug,
//           subcategories:
//             cat.subcategories?.map((sub) => ({
//               subcategory_id: sub.subcategory_id,
//               subcategory_name: sub.subcategory_name,
//               slug: sub.slug,
//             })) || [],
//         }));
//         setCategories(data);
//       } catch (error) {
//         console.error('Error fetching categories and subcategories:', error);
//         setCategories([]);
//       }
//     };

//     fetchCategoriesAndSubcategories();
//   }, []);

//   useEffect(() => {
//     const handleSearch = async () => {
//       if (searchQuery.length < 2) {
//         setSearchResults([]);
//         setShowSearchDropout(false);
//         return;
//       }

//       setIsSearchLoading(true);
//       try {
//         const response = await axiosInstance.get<SearchResult[]>(
//           `/products/search?query=${encodeURIComponent(searchQuery)}`
//         );
//         setSearchResults(response.data);
//         setShowSearchDropout(true);
//       } catch (error) {
//         console.error('Error fetching search results:', error);
//         setSearchResults([]);
//         setShowSearchDropout(false);
//       } finally {
//         setIsSearchLoading(false);
//       }
//     };

//     if (debounceTimeout.current) {
//       clearTimeout(debounceTimeout.current);
//     }
//     debounceTimeout.current = setTimeout(handleSearch, 300);

//     return () => {
//       if (debounceTimeout.current) {
//         clearTimeout(debounceTimeout.current);
//       }
//     };
//   }, [searchQuery]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         searchRef.current &&
//         !searchRef.current.contains(event.target as Node)
//       ) {
//         setShowSearchDropout(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     checkAuth();
//   }, [pathname, checkAuth]);

//   const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setShowSearchDropout(false);
//   };

//   const handleMenuItemClick = async (slug: string) => {
//     try {
//       const encodedSlug = encodeURIComponent(slug);
//       const response = await axiosInstance.get(
//         `products/by-category/${encodedSlug}`
//       );
//       console.log(`Fetched products for ${slug}:`, response.data);
//     } catch (error) {
//       console.error(`Error fetching products for ${slug}:`, error);
//     }
//   };

//   const decodedPathname = decodeURIComponent(pathname);

//   return (
//     <header className="sticky top-0 z-40 w-full bg-background">
//       {/* top bar */}
//       <div className="bg-green-600 text-white py-2">
//         <div className="mx-auto px-4">
//           <div className="flex justify-between items-center text-sm">
//             <div>🚚 Free delivery on orders over €50</div>
//             <div className="hidden md:flex gap-4">
//               <span>📞 +44 (0) 7721 528268</span>
//               <span>📧 desismart.pnsl@gmail.com</span>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="border-b">
//         <div className="px-4">
//           <div className="flex h-16 items-center justify-between">
//             <div className="lg:hidden">
//               <Sheet>
//                 <SheetTrigger asChild>
//                   <Button variant="ghost" size="icon" className="mr-2">
//                     <Menu className="h-5 w-5" />
//                     <span className="sr-only">Menu</span>
//                   </Button>
//                 </SheetTrigger>
//                 <SheetContent side="left" className="w-[300px] sm:w-[400px]">
//                   <div className="mt-6 mb-8">
//                     <Link href="/" className="flex items-center w-10">
//                       <Logo />
//                     </Link>
//                   </div>
//                   <div className="relative" ref={searchRef}>
//                     <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                     <Input
//                       type="search"
//                       placeholder="Search products..."
//                       className="mb-4 w-full pl-10 pr-10"
//                       value={searchQuery}
//                       onChange={handleSearchInputChange}
//                       onFocus={() =>
//                         searchQuery.length >= 2 && setShowSearchDropout(true)
//                       }
//                     />
//                     {showSearchDropout && (
//                       <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
//                         {isSearchLoading ? (
//                           <div className="p-4 text-center text-muted-foreground">
//                             Loading...
//                           </div>
//                         ) : searchResults.length === 0 ? (
//                           <div className="p-4 text-center text-muted-foreground">
//                             No products found
//                           </div>
//                         ) : (
//                           searchResults.map((product) => (
//                             <Link
//                               key={product.product_id}
//                               href={`/${encodeURIComponent(product.category_slug)}/${encodeURIComponent(product.slug)}`}
//                               className="flex items-center p-2 hover:bg-muted"
//                               onClick={() => {
//                                 setSearchQuery('');
//                                 setShowSearchDropout(false);
//                                 handleMenuItemClick(product.category_slug);
//                               }}
//                             >
//                               <Image
//                                 src={product.image_url}
//                                 alt={product.product_name}
//                                 width={40}
//                                 height={40}
//                                 className="object-cover rounded mr-2"
//                               />
//                               <div>
//                                 <div className="font-medium">
//                                   {product.product_name}
//                                 </div>
//                                 <div className="text-sm text-muted-foreground">
//                                   AU${product.selling_price}
//                                 </div>
//                               </div>
//                             </Link>
//                           ))
//                         )}
//                       </div>
//                     )}
//                   </div>
//                   <nav className="flex flex-col gap-1">
//                     {categories.map((cat) =>
//                       cat.subcategories.length > 0 ? (
//                         <DropdownMenu key={cat.category_id}>
//                           <DropdownMenuTrigger asChild>
//                             <Button
//                               variant="ghost"
//                               className={`h-12 px-4 rounded-none ${
//                                 decodedPathname === `/${cat.slug}` ||
//                                 decodedPathname.startsWith(`/${cat.slug}/`)
//                                   ? 'bg-primary/10 text-primary'
//                                   : ''
//                               }`}
//                             >
//                               {cat.category_name}
//                               <ChevronDown className="ml-1 h-4 w-4 opacity-50" />
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent className="w-56 z-50 bg-white border shadow-lg">
//                             {cat.subcategories.map((sub) => (
//                               <DropdownMenuItem key={sub.slug} asChild>
//                                 <Link
//                                   href={`/${encodeURIComponent(sub.slug)}`}
//                                   className={`w-full px-2 py-1.5 rounded-md block text-sm ${
//                                     decodedPathname === `/${sub.slug}`
//                                       ? 'text-primary font-semibold'
//                                       : 'text-foreground hover:bg-muted'
//                                   }`}
//                                   onClick={() => handleMenuItemClick(sub.slug)}
//                                 >
//                                   {sub.subcategory_name}
//                                 </Link>
//                               </DropdownMenuItem>
//                             ))}
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       ) : (
//                         <Button
//                           key={cat.category_id}
//                           variant="ghost"
//                           className={`h-12 px-4 rounded-none ${
//                             decodedPathname === `/${cat.slug}`
//                               ? 'bg-primary/10 text-primary'
//                               : ''
//                           }`}
//                           asChild
//                         >
//                           <Link
//                             href={`/${encodeURIComponent(cat.slug)}`}
//                             onClick={() => handleMenuItemClick(cat.slug)}
//                           >
//                             {cat.category_name}
//                           </Link>
//                         </Button>
//                       )
//                     )}
//                     <Button
//                       variant="ghost"
//                       className={`h-12 px-4 rounded-none flex items-center space-x-2 ${
//                         decodedPathname === (isLoggedIn ? '/account' : '/login')
//                           ? 'bg-primary/10 text-primary'
//                           : ''
//                       }`}
//                       asChild
//                     >
//                       <Link href={isLoggedIn ? '/account' : '/login'}>
//                         <User className="h-5 w-5" />
//                         {isLoggedIn && (
//                           <span className="text-sm font-medium text-muted-foreground truncate max-w-[150px]">
//                             Hi, {userName}
//                           </span>
//                         )}
//                         <span className="sr-only">
//                           {isLoggedIn ? 'Account' : 'Login'}
//                         </span>
//                       </Link>
//                     </Button>
//                   </nav>
//                 </SheetContent>
//               </Sheet>
//             </div>

//             <Link href="/" className="flex items-center w-15">
//               <Logo />
//             </Link>

//             <div
//               className="hidden md:block flex-1 max-w-xl mx-8 relative"
//               ref={searchRef}
//             >
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                   type="search"
//                   placeholder="Search..."
//                   className="pl-10 pr-10"
//                   value={searchQuery}
//                   onChange={handleSearchInputChange}
//                   onFocus={() =>
//                     searchQuery.length >= 2 && setShowSearchDropout(true)
//                   }
//                 />
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
//                   onClick={handleSearchSubmit}
//                 >
//                   Search
//                 </Button>
//               </div>
//               {showSearchDropout && (
//                 <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
//                   {isSearchLoading ? (
//                     <div className="p-4 text-center text-muted-foreground">
//                       Loading...
//                     </div>
//                   ) : searchResults.length === 0 ? (
//                     <div className="p-4 text-center text-muted-foreground">
//                       No products found
//                     </div>
//                   ) : (
//                     searchResults.map((product) => (
//                       <Link
//                         key={product.product_id}
//                         href={`/${encodeURIComponent(product.category_slug)}/${encodeURIComponent(product.slug)}`}
//                         className="flex items-center p-2 hover:bg-muted"
//                         onClick={() => {
//                           setSearchQuery('');
//                           setShowSearchDropout(false);
//                           handleMenuItemClick(product.category_slug);
//                         }}
//                       >
//                         <Image
//                           src={product.image_url}
//                           alt={product.product_name}
//                           width={40}
//                           height={40}
//                           className="object-cover rounded mr-2"
//                         />
//                         <div>
//                           <div className="font-medium">
//                             {product.product_name}
//                           </div>
//                           <div className="text-sm text-muted-foreground">
//                             AU${product.selling_price}
//                           </div>
//                         </div>
//                       </Link>
//                     ))
//                   )}
//                 </div>
//               )}
//             </div>

//             <div className="flex items-center space-x-1">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="md:hidden"
//                 onClick={() => {
//                   setShowSearch(!showSearch);
//                   setSearchQuery('');
//                   setShowSearchDropout(false);
//                 }}
//               >
//                 {showSearch ? (
//                   <X className="h-5 w-5" />
//                 ) : (
//                   <Search className="h-5 w-5" />
//                 )}
//                 <span className="sr-only">
//                   {showSearch ? 'Close search' : 'Search'}
//                 </span>
//               </Button>
//               <Button
//                 variant="ghost"
//                 className="hidden sm:flex items-center space-x-2"
//                 asChild
//               >
//                 <Link href={isLoggedIn ? '/account' : '/login'}>
//                   <User className="h-5 w-5" />
//                   {isLoggedIn && (
//                     <span className="text-sm font-medium text-muted-foreground truncate max-w-[100px]">
//                       Hi, {userName}
//                     </span>
//                   )}
//                   <span className="sr-only">
//                     {isLoggedIn ? 'Account' : 'Login'}
//                   </span>
//                 </Link>
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="hidden sm:flex relative"
//                 asChild
//               >
//                 <Link href="/wishlist">
//                   <Heart className="h-5 w-5" />
//                   {wishlistCount > 0 && (
//                     <Badge className="absolute -right-1 -top-1 h-5 w-5 p-0 flex items-center justify-center">
//                       {wishlistCount}
//                     </Badge>
//                   )}
//                   <span className="sr-only">Wishlist</span>
//                 </Link>
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={toggleCart}
//                 className="relative"
//               >
//                 <ShoppingBag className="h-6 w-6" />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                     {cartCount}
//                   </span>
//                 )}
//                 <span className="sr-only">Cart</span>
//               </Button>
//             </div>
//           </div>

//           {showSearch && (
//             <div className="pb-4 md:hidden relative" ref={searchRef}>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                   type="search"
//                   placeholder="Search..."
//                   className="pl-10 pr-10"
//                   value={searchQuery}
//                   onChange={handleSearchInputChange}
//                   onFocus={() =>
//                     searchQuery.length >= 2 && setShowSearchDropout(true)
//                   }
//                   autoFocus
//                 />
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
//                   onClick={handleSearchSubmit}
//                 >
//                   Search
//                 </Button>
//               </div>
//               {showSearchDropout && (
//                 <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
//                   {isSearchLoading ? (
//                     <div className="p-4 text-center text-muted-foreground">
//                       Loading...
//                     </div>
//                   ) : searchResults.length === 0 ? (
//                     <div className="p-4 text-center text-muted-foreground">
//                       No products found
//                     </div>
//                   ) : (
//                     searchResults.map((product) => (
//                       <Link
//                         key={product.product_id}
//                         href={`/${encodeURIComponent(product.category_slug)}/${encodeURIComponent(product.slug)}`}
//                         className="flex items-center p-2 hover:bg-muted"
//                         onClick={() => {
//                           setSearchQuery('');
//                           setShowSearchDropout(false);
//                           setShowSearch(false);
//                           handleMenuItemClick(product.category_slug);
//                         }}
//                       >
//                         <Image
//                           src={product.image_url}
//                           alt={product.product_name}
//                           width={40}
//                           height={40}
//                           className="object-cover rounded mr-2"
//                         />
//                         <div>
//                           <div className="font-medium">
//                             {product.product_name}
//                           </div>
//                           <div className="text-sm text-muted-foreground">
//                             AU${product.selling_price}
//                           </div>
//                         </div>
//                       </Link>
//                     ))
//                   )}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="border-b bg-muted/40 hidden lg:block">
//         <div className="px-4">
//           <nav className="flex items-center h-12">
//             {categories.map((cat) =>
//               cat.subcategories.length > 0 ? (
//                 <DropdownMenu key={cat.category_id}>
//                   <DropdownMenuTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       className={`h-12 px-4 rounded-none ${
//                         decodedPathname === `/${cat.slug}` ||
//                         decodedPathname.startsWith(`/${cat.slug}/`)
//                           ? 'text-gray-700 hover:text-green-600 font-medium transition-colors'
//                           : ''
//                       }`}
//                     >
//                       {cat.category_name}
//                       <ChevronDown className="ml-1 h-4 w-4 opacity-50" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent
//                     align="start"
//                     className="w-56 z-50 bg-white border shadow-lg"
//                   >
//                     {cat.subcategories.map((sub) => (
//                       <DropdownMenuItem key={sub.slug} asChild>
//                         <Link
//                           href={`/${encodeURIComponent(sub.slug)}`}
//                           className={`w-full px-2 py-1.5 rounded-md block text-sm ${
//                             decodedPathname === `/${sub.slug}`
//                               ? 'text-gray-700 hover:text-green-600 font-medium transition-colors'
//                               : 'text-foreground hover:bg-muted'
//                           }`}
//                           onClick={() => handleMenuItemClick(sub.slug)}
//                         >
//                           {sub.subcategory_name}
//                         </Link>
//                       </DropdownMenuItem>
//                     ))}
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               ) : (
//                 <Button
//                   key={cat.category_id}
//                   variant="ghost"
//                   className={`h-12 px-4 rounded-none ${
//                     decodedPathname === `/${cat.slug}`
//                       ? 'bg-primary/10 text-primary'
//                       : ''
//                   }`}
//                   asChild
//                 >
//                   <Link
//                     href={`/${encodeURIComponent(cat.slug)}`}
//                     onClick={() => handleMenuItemClick(cat.slug)}
//                   >
//                     {cat.category_name}
//                   </Link>
//                 </Button>
//               )
//             )}
//           </nav>
//         </div>
//       </div>

//       <CartSidebar />
//     </header>
//   );
// }


'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  ShoppingBag,
  User,
  Search,
  X,
  Heart,
  ChevronDown,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sheet, SheetTrigger, SheetContent } from './ui/sheet';
import { CartSidebar } from './cart-sidebar';
import { useCart } from './cart-provider';
import { useWishlist } from './wishlist-provider';
import { useAuth } from './auth-provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import Image from 'next/image';
import Logo from './logo';
import axiosInstance from '../lib/axiosInstance';

interface ApiSubcategory {
  subcategory_id: string;
  subcategory_name: string;
  slug: string;
}

interface ApiCategory {
  category_id: string;
  category_name: string;
  slug: string;
  subcategories?: ApiSubcategory[];
}

interface Category {
  category_id: string;
  category_name: string;
  slug: string;
  subcategories: {
    subcategory_id: string;
    subcategory_name: string;
    slug: string;
  }[];
}

interface SearchResult {
  product_id: string;
  product_name: string;
  image_url: string;
  selling_price: string;
  slug: string;
  category_slug: string;
}

export function Header() {
  const pathname = usePathname();
  const { cartCount, toggleCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { isLoggedIn, userId, token, checkAuth } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [showSearchDropout, setShowSearchDropout] = useState(false);
  const [userName, setUserName] = useState<string>('User');
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  console.log(
    'Header - isLoggedIn:',
    isLoggedIn,
    'userId:',
    userId,
    'token:',
    token
  );

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!isLoggedIn || !userId || !token) {
        console.log('Not authenticated or missing userId/token');
        setUserName('User');
        return;
      }

      try {
        const response = await axiosInstance.get(`user-profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('User profile response:', response.data);
        setUserName(response.data.user_fullname || 'User');
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setUserName('User');
      }
    };

    fetchUserProfile();
  }, [isLoggedIn, userId, token]);

  useEffect(() => {
    const fetchCategoriesAndSubcategories = async () => {
      try {
        const response = await axiosInstance.get<{ data: ApiCategory[] }>(
          '/categories/menu-categories/'
        );
        const data = response.data.data.map((cat) => ({
          category_id: cat.category_id,
          category_name: cat.category_name,
          slug: cat.category_slug,
          subcategories:
            cat.subcategories?.map((sub) => ({
              subcategory_id: sub.subcategory_id,
              subcategory_name: sub.subcategory_name,
              slug: sub.subcategory_slug,
            })) || [],
        }));
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories and subcategories:', error);
        setCategories([]);
      }
    };

    fetchCategoriesAndSubcategories();
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        setShowSearchDropout(false);
        return;
      }

      setIsSearchLoading(true);
      try {
        const response = await axiosInstance.get<SearchResult[]>(
          `/products/search?query=${encodeURIComponent(searchQuery)}`
        );
        setSearchResults(response.data);
        setShowSearchDropout(true);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults([]);
        setShowSearchDropout(false);
      } finally {
        setIsSearchLoading(false);
      }
    };

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(handleSearch, 300);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchDropout(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    checkAuth();
  }, [pathname, checkAuth]);

  

  const handleMenuItemClick = async (slug: string) => {
    try {
      const encodedSlug = encodeURIComponent(slug);
      const response = await axiosInstance.get(
        `products/category/${encodedSlug}`
      );
      console.log(`Fetched products for ${slug}:`, response.data);
    } catch (error) {
      console.error(`Error fetching products for ${slug}:`, error);
    }
  };

  const decodedPathname = decodeURIComponent(pathname);

  return (
    <header className="sticky top-0 z-40 w-full bg-background">
      {/* top bar */}

  

      <div className="border-b bg-muted/40 hidden lg:block">
        <div className="px-4">
          <nav className="flex items-center h-12">
            {categories.map((cat) =>
              cat.subcategories.length > 0 ? (
                <DropdownMenu key={cat.category_id}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`h-12 px-4 rounded-none text-gray-700 hover:text-green-600 font-medium transition-colors ${
                        decodedPathname === `/${cat.slug}` ||
                        decodedPathname.startsWith(`/${cat.slug}/`)
                          ? 'bg-primary/10 text-primary'
                          : ''
                      }`}
                    >
                      {cat.category_name}
                      <ChevronDown className="ml-1 h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-56 z-50 bg-white border shadow-lg"
                  >
                    {cat.subcategories.map((sub) => (
                      <DropdownMenuItem key={sub.slug} asChild>
                        <Link
                          href={`/${encodeURIComponent(sub.slug)}`}
                          className={`w-full px-2 py-1.5 rounded-md block text-sm text-gray-700 hover:text-green-600 font-medium transition-colors ${
                            decodedPathname === `/${sub.slug}`
                              ? 'text-primary font-semibold'
                              : 'text-foreground hover:bg-muted'
                          }`}
                          onClick={() => handleMenuItemClick(sub.slug)}
                        >
                          {sub.subcategory_name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  key={cat.category_id}
                  variant="ghost"
                  className={`h-12 px-4 rounded-none text-gray-700 hover:text-green-600 font-medium transition-colors ${
                    decodedPathname === `/${cat.slug}`
                      ? 'bg-primary/10 text-primary'
                      : ''
                  }`}
                  asChild
                >
                  <Link
                    href={`/${encodeURIComponent(cat.slug)}`}
                    onClick={() => handleMenuItemClick(cat.slug)}
                  >
                    {cat.category_name}
                  </Link>
                </Button>
              )
            )}
          </nav>
        </div>
      </div>

      <CartSidebar />
    </header>
  );
}



