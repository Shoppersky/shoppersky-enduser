



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
//   ChevronRight,
//   ChevronLeft,
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

// interface IndustrySubcategory {
//   subcategory_id: string;
//   subcategory_name: string;
//   subcategory_slug: string;
// }

// interface IndustryCategory {
//   category_id: string;
//   category_name: string;
//   category_slug: string;
//   subcategories: IndustrySubcategory[];
// }

// interface Industry {
//   industry_id: string;
//   industry_name: string;
//   industry_slug: string;
//   categories: IndustryCategory[];
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
//   const [industries, setIndustries] = useState<Industry[]>([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
//   const [isSearchLoading, setIsSearchLoading] = useState(false);
//   const [showSearchDropout, setShowSearchDropout] = useState(false);
//   const [userName, setUserName] = useState<string>('User');
//   const searchRef = useRef<HTMLDivElement>(null);
//   const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
//   const carouselRef = useRef<HTMLDivElement>(null);
//   const megaMenuRef = useRef<HTMLDivElement>(null);

//   // Mega menu hover and selection states
//   const [showMega, setShowMega] = useState(false);
//   const [hoverIndustryId, setHoverIndustryId] = useState<string | null>(null);
//   const [hoverCategoryId, setHoverCategoryId] = useState<string | null>(null);
//   const [selectedIndustryId, setSelectedIndustryId] = useState<string | null>(null);
//   const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
//   const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(null);



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
//     const fetchIndustries = async () => {
//       try {
//         const res = await axiosInstance.get<{ data: Industry[] }>(
//           '/industries/industries/full'
//         );
//         setIndustries(res.data.data || []);
//       } catch (error) {
//         console.error('Error fetching industries full menu:', error);
//         setIndustries([]);
//       }
//     };

//     fetchIndustries();
//   }, []);

//   useEffect(() => {
//     const fetchCategoriesAndSubcategories = async () => {
//       try {
//         const response = await axiosInstance.get<{ data: ApiCategory[] }>(
//           '/categories/menu-categories'
//         );
//         const data = response.data.data.map((cat) => ({
//           category_id: cat.category_id,
//           category_name: cat.category_name,
//           slug: (cat as any).category_slug ?? (cat as any).slug,
//           subcategories:
//             cat.subcategories?.map((sub) => ({
//               subcategory_id: sub.subcategory_id,
//               subcategory_name: sub.subcategory_name,
//               slug: (sub as any).subcategory_slug ?? (sub as any).slug,
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

//   const handleMenuItemClick = async (slug: string) => {
//     try {
//       const encodedSlug = encodeURIComponent(slug);
//       const response = await axiosInstance.get(
//         `products/category/${encodedSlug}`
//       );
//       console.log(`Fetched products for ${slug}:`, response.data);
//     } catch (error) {
//       console.error(`Error fetching products for ${slug}:`, error);
//     }
//   };

//   const scrollCarousel = (direction: 'left' | 'right') => {
//     if (carouselRef.current) {
//       const scrollAmount = 200;
//       carouselRef.current.scrollBy({
//         left: direction === 'left' ? -scrollAmount : scrollAmount,
//         behavior: 'smooth',
//       });
//     }
//   };

//   const handleMouseEnterIndustry = (industryId: string) => {
//     if (!selectedIndustryId) {
//       setShowMega(true);
//       setHoverIndustryId(industryId);
//       setHoverCategoryId(null);
//     }
//   };

//   const handleMouseEnterCategory = (categoryId: string) => {
//     if (!selectedCategoryId) {
//       setHoverCategoryId(categoryId);
//     }
//   };

//   const handleMouseLeaveMegaMenu = (event: React.MouseEvent) => {
//     if (megaMenuRef.current && carouselRef.current && !selectedIndustryId) {
//       const relatedTarget = event.relatedTarget as Node;
//       const isLeavingToCarousel = carouselRef.current.contains(relatedTarget);
//       const isLeavingToMegaMenu = megaMenuRef.current.contains(relatedTarget);
//       if (!isLeavingToCarousel && !isLeavingToMegaMenu) {
//         setShowMega(false);
//         setHoverIndustryId(null);
//         setHoverCategoryId(null);
//       }
//     }
//   };

//   const handleSelectIndustry = (industryId: string) => {
//     setSelectedIndustryId(industryId);
//     setSelectedCategoryId(null); // Clear category and subcategory on new industry selection
//     setSelectedSubcategoryId(null);
//     setShowMega(true);
//     setHoverIndustryId(industryId);
//     setHoverCategoryId(null);
//   };

//   const handleSelectCategory = (categoryId: string) => {
//     setSelectedCategoryId(categoryId);
//     setSelectedSubcategoryId(null); // Clear subcategory on new category selection
//     setHoverCategoryId(categoryId);
//   };

//   const handleSelectSubcategory = (subcategoryId: string) => {
//     setSelectedSubcategoryId(subcategoryId);
//   };

//   const handleDeselectAll = () => {
//     setSelectedIndustryId(null);
//     setSelectedCategoryId(null);
//     setSelectedSubcategoryId(null);
//     setShowMega(false);
//     setHoverIndustryId(null);
//     setHoverCategoryId(null);
//   };

//   const decodedPathname = decodeURIComponent(pathname);

//   return (
//     <header className="w-full bg-background hidden md:block relative">
//       <div className="border-b bg-muted/40 hidden md:block">
//         <div className="mx-auto w-full max-w-screen-2xl px-4 lg:px-8">
//           <nav className="flex items-center h-12">
//             <div
//               className="relative flex items-center w-full"
//               ref={megaMenuRef}
//               onMouseLeave={handleMouseLeaveMegaMenu}
//             >
//               <Button
//                 variant="ghost"
//                 className="p-2"
//                 onClick={() => scrollCarousel('left')}
//                 disabled={!industries.length}
//               >
//                 <ChevronLeft className="h-5 w-5" />
//               </Button>
//               <div
//                 ref={carouselRef}
//                 className="flex overflow-x-auto scroll-smooth hide-scrollbar space-x-2"
//               >
//                 {industries.map((ind) => (
//                   <div
//                     key={ind.industry_id}
//                     className="relative flex-shrink-0"
                    
//                   >
//                     <Button
//                       variant="ghost"
//                       className={`h-12 px-4 rounded-none font-medium transition-colors whitespace-nowrap ${
//                         selectedIndustryId === ind.industry_id
//                           ? 'bg-green-100 text-green-600'
//                           : 'text-gray-700 hover:text-green-600'
//                       }`}
//                       onClick={() => handleSelectIndustry(ind.industry_id)}
//                     >
//                       {ind.industry_name}
//                       <ChevronDown className="ml-1 h-4 w-4 opacity-50" />
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//               <Button
//                 variant="ghost"
//                 className="p-2"
//                 onClick={() => scrollCarousel('right')}
//                 disabled={!industries.length}
//               >
//                 <ChevronRight className="h-5 w-5" />
//               </Button>
//             </div>
//           </nav>
//         </div>
//       </div>
//       {showMega && (selectedIndustryId || hoverIndustryId) && (
//         <div
//           className="absolute left-1/3  z-50  bg-white border shadow-xl"
//           style={{ transform: 'translateX(0)' }}
//         >
//           {industries
//             .filter((ind) => ind.industry_id === (selectedIndustryId || hoverIndustryId))
//             .map((ind) => (
//               <div key={ind.industry_id} className="flex mx-auto w-fit px-4 lg:px-8">
//                 <div className="w-fit max-h-[420px] overflow-y-auto border-r">
//                   <div className="flex justify-between items-center px-4 py-2 mb-1">
//                     <span className="text-sm font-semibold">{ind.industry_name}</span>
//                     {(selectedIndustryId || selectedCategoryId || selectedSubcategoryId) && (
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={handleDeselectAll}
//                       >
//                         <X className="h-4 w-4" />
//                       </Button>
//                     )}
//                   </div>
//                   {ind.categories?.length ? (
//                     ind.categories.map((cat) => (
//                       <div
//                         key={cat.category_id}
//                         onMouseEnter={() => handleMouseEnterCategory(cat.category_id)}
//                       >
//                         <Link
//                           href={`/${encodeURIComponent(cat.category_slug)}`}
//                           className={`block px-4 py-3 text-sm hover:bg-muted ${
//                             selectedCategoryId === cat.category_id
//                               ? 'bg-green-100 text-green-600'
//                               : hoverCategoryId === cat.category_id
//                               ? 'bg-muted'
//                               : ''
//                           }`}
//                           onClick={(e) => {
//                         // Prevent navigation until confirmed
                        
                          
//                             handleDeselectAll(); 
//                               handleSelectCategory(cat.category_id);
//                           }}
//                         >
//                           {cat.category_name}
//                         </Link>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="text-sm text-muted-foreground px-4 py-3">
//                       No categories
//                     </div>
//                   )}
//                 </div>
//                 <div className=" p-4">
//                   {ind.categories?.map((cat) => (
//                     <div
//                       key={cat.category_id}
//                       className={`${
//                         (selectedCategoryId || hoverCategoryId) === cat.category_id ? 'block' : 'hidden'
//                       }`}
//                     >
//                       <div className="flex flex-col  gap-2">
//                         {cat.subcategories?.length ? (
//                           cat.subcategories.map((sub) => (
//                             <Link
//                               key={sub.subcategory_id}
//                               href={`/${encodeURIComponent(sub.subcategory_slug)}`}
//                               className={`text-sm px-2 py-2 rounded hover:bg-muted ${
//                                 selectedSubcategoryId === sub.subcategory_id
//                                   ? 'bg-green-100 text-green-600'
//                                   : decodedPathname === `/${sub.subcategory_slug}`
//                                   ? 'text-primary font-semibold'
//                                   : 'text-foreground'
//                               }`}
//                               onClick={(e) => {
//                              // Prevent navigation until confirmed
//                              handleDeselectAll(); 
//                                 handleSelectSubcategory(sub.subcategory_id);
//                               }}
//                             >
//                               {sub.subcategory_name}
//                             </Link>
//                           ))
//                         ) : (
//                           <div className="text-sm text-muted-foreground">
//                             No subcategories
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                   {!(selectedCategoryId || hoverCategoryId) && (
//                     <div className="text-sm text-muted-foreground">
//                       Hover or select a category to see subcategories
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//         </div>
//       )}
//     </header>
//   );
// }


'use client';
 
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from './cart-provider';
import { useWishlist } from './wishlist-provider';
import { useAuth } from './auth-provider';
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
 
interface IndustrySubcategory {
  subcategory_id: string;
  subcategory_name: string;
  subcategory_slug: string;
}
 
interface IndustryCategory {
  category_id: string;
  category_name: string;
  category_slug: string;
  subcategories: IndustrySubcategory[];
}
 
interface Industry {
  industry_id: string;
  industry_name: string;
  industry_slug: string;
  categories: IndustryCategory[];
}
 
export function Header() {
  const pathname = usePathname();
  const { cartCount, toggleCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { isLoggedIn, userId, token, checkAuth } = useAuth();
 
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [userName, setUserName] = useState<string>('User');
  const carouselRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
 
  // Mega menu states
  const [showMega, setShowMega] = useState(false);
  const [hoverIndustryId, setHoverIndustryId] = useState<string | null>(null);
  const [hoverCategoryId, setHoverCategoryId] = useState<string | null>(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(null);
  const [megaPosition, setMegaPosition] = useState<{ left: number; top: number } | null>(null);
 
  const decodedPathname = decodeURIComponent(pathname);
 
  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!isLoggedIn || !userId || !token) {
        setUserName('User');
        return;
      }
      try {
        const response = await axiosInstance.get(`user-profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserName(response.data.user_fullname || 'User');
      } catch {
        setUserName('User');
      }
    };
    fetchUserProfile();
  }, [isLoggedIn, userId, token]);
 
  // Fetch industries
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const res = await axiosInstance.get<{ data: Industry[] }>('/industries/industries/full');
        setIndustries(res.data.data || []);
      } catch {
        setIndustries([]);
      }
    };
    fetchIndustries();
  }, []);
 
  useEffect(() => {
    checkAuth();
  }, [pathname, checkAuth]);
 
  // Carousel scroll
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 200;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };
 
  const handleDeselectAll = () => {
    setHoverIndustryId(null);
    setHoverCategoryId(null);
    setSelectedSubcategoryId(null);
    setShowMega(false);
    setMegaPosition(null);
  };
 
  const handleSelectSubcategory = (subcategoryId: string) => {
    setSelectedSubcategoryId(subcategoryId);
    handleDeselectAll(); // optional: close menu
  };
 
  return (
    <header className="w-full bg-background relative">
      {/* Top navigation row */}
      {/* <div className="border-b bg-muted/40" ref={headerRef}>
        <div className="mx-auto w-1xl max-w-screen-2xl px-2 sm:px-4 lg:px-4">
          <nav className="flex items-center h-12">
            <div className="relative flex items-center w-full">
             
              <Button
                variant="ghost"
                className="p-2 hidden sm:flex"
                onClick={() => scrollCarousel('left')}
                disabled={!industries.length}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
 
             
              <Button
                variant="ghost"
                className="p-2 hidden sm:flex"
                onClick={() => scrollCarousel('right')}
                disabled={!industries.length}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </nav>
        </div>
      </div> */}
 
      {/* Main navigation row with fixed arrows*/}
      {/* <div className="border-b bg-muted/40" ref={headerRef}>
  <div className="mx-auto w-1xl max-w-screen-2xl px-2 sm:px-4 lg:px-4 relative">
    <nav className="hidden sm:flex items-center h-12">
      <div className="relative flex items-center w-full">
       
        <Button
          variant="ghost"
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 hidden sm:flex z-10 bg-background/80 backdrop-blur-sm shadow-sm"
          onClick={() => scrollCarousel('left')}
          disabled={!industries.length}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
 
       
        <div className="flex-1 px-2 sm:px-16">
         
        </div>
 
       
        <Button
          variant="ghost"
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hidden sm:flex z-10 bg-background/80 backdrop-blur-sm shadow-sm"
          onClick={() => scrollCarousel('right')}
          disabled={!industries.length}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  </div>
</div> */}
<div className="border-b bg-muted/40" ref={headerRef}>
  <div className="mx-auto w-1xl max-w-screen-2xl px-2 sm:px-4 lg:px-4 relative">
    <div >
      {/* Left Arrow - Fixed to left corner (hidden on mobile) */}
        <Button
          variant="ghost"
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 hidden sm:flex z-10 bg-background/80 backdrop-blur-sm shadow-sm"
          onClick={() => scrollCarousel('left')}
          disabled={!industries.length}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
    </div>
   <nav className="hidden sm:flex items-center h-12 bg-gray-100 px-8">
  <div className="container  h-full flex items-center">
     <div className="relative w-full" onMouseLeave={handleDeselectAll}>
                <div
                  ref={carouselRef}
                  className="
                    flex overflow-x-auto scroll-smooth hide-scrollbar space-x-1 sm:space-x-2 md:space-x-3
                    w-full
                  "
                >
     {industries.map((ind) => (
        <div key={ind.industry_id} className="flex-shrink-0 relative">
          {/* Industry Button */}
          <Button
            variant="ghost"
            className={`
              h-10 px-2 text-xs font-medium whitespace-nowrap
              sm:h-11 sm:px-3 sm:text-sm
              md:h-12 md:px-4 md:text-base
              ${hoverIndustryId === ind.industry_id
                ? 'bg-green-100 text-green-600'
                : 'text-gray-700 hover:text-green-600'}
            `}
            onMouseEnter={(e) => {
              setHoverIndustryId(ind.industry_id);
              setHoverCategoryId(null);
              setShowMega(true);

              const buttonRect = e.currentTarget.getBoundingClientRect();
              const containerRect = e.currentTarget.offsetParent?.getBoundingClientRect();
              if (containerRect) {
                setMegaPosition({
                  left: buttonRect.left - containerRect.left,
                  top: buttonRect.height,
                });
              }
            }}
          >
            {ind.industry_name}
            <ChevronDown className="ml-1 h-3 w-3 sm:h-4 sm:w-4 opacity-50" />
          </Button>

          {/* Mega menu */}
          {hoverIndustryId === ind.industry_id && showMega && (
            <div
              className="absolute bg-white shadow-lg p-4 z-50 flex gap-6"
              style={{ left: megaPosition.left, top: megaPosition.top }}
              onMouseLeave={() => setShowMega(false)}
            >
              {/* Categories */}
              <div className="flex flex-col gap-2">
             {ind.categories?.map((cat) => (
  <div key={cat.category_id} className="cursor-pointer relative">
    {/* Category Link */}
    <Link
      href={`/category/${cat.category_slug}`}
      className="font-medium hover:text-green-600 block"
      onMouseEnter={() => setHoverCategoryId(cat.category_id)}
      onClick={() => setShowMega(false)} // close mega menu
    >
      {cat.category_name}
    </Link>

    {/* Subcategories */}
    {hoverCategoryId === cat.category_id && cat.subcategories && (
      <div className="ml-4 mt-1 flex flex-col gap-1">
        {cat.subcategories.map((sub) => (
          <Link
            key={sub.subcategory_id}
            href={`/category/${sub.subcategory_slug}`}
            className="text-sm hover:text-green-600 block"
            onClick={() => setShowMega(false)}
          >
            {sub.subcategory_name}
          </Link>
        ))}
      </div>
    )}
  </div>
))}

              </div>
            </div>
          )}
        </div>
      ))}
                </div>
 
                {/* Mega menu */}
                {showMega && hoverIndustryId && megaPosition && (
                  <div
                    className={`
                      absolute bg-white border shadow-xl flex flex-col sm:flex-row
                      w-full md:w-[600px] z-50
                    `}
                    style={{
                      top: megaPosition.top,
                      left: typeof window !== 'undefined' && window.innerWidth >= 1024
                        ? megaPosition.left
                        : 0, // Full width on tablet/mobile
                    }}
                  >
                    {industries
                      .filter((ind) => ind.industry_id === hoverIndustryId)
                      .map((ind) => (
                        <div key={ind.industry_id} className="flex w-full">
                          {/* Categories (Left panel) */}
                    <div className="flex flex-col w-full sm:w-60 border-r bg-gray-50">
  {ind.categories?.length ? (
    ind.categories.map((cat) => (
      <Link
        key={cat.category_id}
        href={`/${cat.category_slug}`}
        className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 flex justify-between items-center ${
          hoverCategoryId === cat.category_id ? 'bg-white font-medium' : ''
        }`}
        onMouseEnter={() => setHoverCategoryId(cat.category_id)}
        onClick={() => setShowMega(false)} // close menu on click
      >
        {cat.category_name}
        <ChevronRight className="inline ml-2 h-4 w-4 opacity-50" />
      </Link>
    ))
  ) : (
    <div className="px-4 py-2 text-sm text-muted-foreground">No categories</div>
  )}
</div>
 
                          {/* Subcategories (Right panel) */}
                          <div className="flex-1 flex flex-col p-3 sm:p-4">
                            {ind.categories
                              ?.filter((cat) => cat.category_id === hoverCategoryId)
                              .map((cat) =>
                                cat.subcategories?.length ? (
                                  <div
                                    key={cat.category_id}
                                    className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-2"
                                  >
                                    {cat.subcategories.map((sub) => (
                                      <Link
                                        key={sub.subcategory_id}
                                        href={`/${encodeURIComponent(sub.subcategory_slug)}`}
                                        className="px-2 py-1 text-sm rounded hover:bg-gray-100"
                                   
                                      >
                                        {sub.subcategory_name}
                                      </Link>
                                    ))}
                                  </div>
                                ) : (
                                  <div
                                    key={cat.category_id}
                                    className="text-sm text-muted-foreground"
                                  >
                                    No subcategories
                                  </div>
                                )
                              )}
                            {!hoverCategoryId && (
                              <div className="text-sm text-muted-foreground">
                                Hover a category to see subcategories
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
 
  </div>
</nav>
 
    <div>
        {/* Right Arrow - Fixed to right corner (hidden on mobile) */}
        <Button
          variant="ghost"
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hidden sm:flex z-10 bg-background/80 backdrop-blur-sm shadow-sm"
          onClick={() => scrollCarousel('right')}
          disabled={!industries.length}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
    </div>
  </div>
</div>
 
 
 
 
    </header>
  );
}
 
 