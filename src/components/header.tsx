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

// // Industries full menu types
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

//   // Mega menu hover states
//   const [showMega, setShowMega] = useState(false);
//   const [hoverIndustryId, setHoverIndustryId] = useState<string | null>(null);
//   const [hoverCategoryId, setHoverCategoryId] = useState<string | null>(null);

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

//   const decodedPathname = decodeURIComponent(pathname);

//   return (
//     <header className="w-full bg-background hidden md:block">

//       <div className="border-b bg-muted/40 hidden md:block">
//         <div className="mx-auto w-full max-w-screen-2xl px-4 lg:px-8">
//           <nav className="flex items-center h-12 overflow-visible">

//             <div
//               className="relative flex items-center gap-2 "
//               onMouseEnter={() => setShowMega(true)}
//               onMouseLeave={() => { setShowMega(false); setHoverIndustryId(null); setHoverCategoryId(null); }}
//             >
//               {industries.map((ind) => (
//                 <div
//                   key={ind.industry_id}
//                   className="relative"
//                   onMouseEnter={() => { setShowMega(true); setHoverIndustryId(ind.industry_id); setHoverCategoryId(null); }}
//                   onMouseLeave={() => { setShowMega(false); setHoverIndustryId(null); setHoverCategoryId(null); }}
//                 >
//                   <Button
//                     variant="ghost"
//                     className="h-12 px-4 rounded-none text-gray-700 hover:text-green-600 font-medium transition-colors whitespace-nowrap"
//                   >
//                     {ind.industry_name}
//                     <ChevronDown className="ml-1 h-4 w-4 opacity-50" />
//                   </Button>

//                   {showMega && hoverIndustryId === ind.industry_id && (
//                     <div className="absolute left-0 top-full z-50 mt-0 w-[800px] bg-white border shadow-xl">
//                       <div className="flex">

//                         <div className="w-1/2 max-h-[420px] overflow-y-auto border-r">
//                           {ind.categories?.length ? (
//                             ind.categories.map((cat) => (
//                               <div key={cat.category_id} onMouseEnter={() => setHoverCategoryId(cat.category_id)}>
//                                 <Link
//                                   href={`/${encodeURIComponent(cat.category_slug)}`}
//                                   className={`block px-4 py-3 text-sm hover:bg-muted ${hoverCategoryId === cat.category_id ? 'bg-muted' : ''}`}
//                                   onClick={() => handleMenuItemClick(cat.category_slug)}
//                                 >
//                                   {cat.category_name}
//                                 </Link>
//                               </div>
//                             ))
//                           ) : (
//                             <div className="text-sm text-muted-foreground px-4 py-3">No categories</div>
//                           )}
//                         </div>

//                         <div className="w-1/2 p-4">
//                           {ind.categories?.map((cat) => (
//                             <div key={cat.category_id} className={`${hoverCategoryId === cat.category_id ? 'block' : 'hidden'}`}>
//                               <div className="flex flex-col gap-1grid grid-cols-2 gap-2">
//                                 {cat.subcategories?.length ? (
//                                   cat.subcategories.map((sub) => (
//                                     <Link
//                                       key={sub.subcategory_id}
//                                       href={`/${encodeURIComponent(sub.subcategory_slug)}`}
//                                       className={`text-sm px-2 py-2 rounded hover:bg-muted ${decodedPathname === `/${sub.subcategory_slug}` ? 'text-primary font-semibold' : 'text-foreground'}`}
//                                       onClick={() => handleMenuItemClick(sub.subcategory_slug)}
//                                     >
//                                       {sub.subcategory_name}
//                                     </Link>
//                                   ))
//                                 ) : (
//                                   <div className="text-sm text-muted-foreground">No subcategories</div>
//                                 )}
//                               </div>
//                             </div>
//                           ))}

//                           {!hoverCategoryId && (
//                             <div className="text-sm text-muted-foreground">Hover a category to see subcategories</div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </nav>
//         </div>
//       </div>



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
  ChevronRight,
  ChevronLeft,
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
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [showSearchDropout, setShowSearchDropout] = useState(false);
  const [userName, setUserName] = useState<string>('User');
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  // Mega menu hover and selection states
  const [showMega, setShowMega] = useState(false);
  const [hoverIndustryId, setHoverIndustryId] = useState<string | null>(null);
  const [hoverCategoryId, setHoverCategoryId] = useState<string | null>(null);
  const [selectedIndustryId, setSelectedIndustryId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(null);

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
    const fetchIndustries = async () => {
      try {
        const res = await axiosInstance.get<{ data: Industry[] }>(
          '/industries/industries/full'
        );
        setIndustries(res.data.data || []);
      } catch (error) {
        console.error('Error fetching industries full menu:', error);
        setIndustries([]);
      }
    };

    fetchIndustries();
  }, []);

  useEffect(() => {
    const fetchCategoriesAndSubcategories = async () => {
      try {
        const response = await axiosInstance.get<{ data: ApiCategory[] }>(
          '/categories/menu-categories'
        );
        const data = response.data.data.map((cat) => ({
          category_id: cat.category_id,
          category_name: cat.category_name,
          slug: (cat as any).category_slug ?? (cat as any).slug,
          subcategories:
            cat.subcategories?.map((sub) => ({
              subcategory_id: sub.subcategory_id,
              subcategory_name: sub.subcategory_name,
              slug: (sub as any).subcategory_slug ?? (sub as any).slug,
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

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 200;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleMouseEnterIndustry = (industryId: string) => {
    if (!selectedIndustryId) {
      setShowMega(true);
      setHoverIndustryId(industryId);
      setHoverCategoryId(null);
    }
  };

  const handleMouseEnterCategory = (categoryId: string) => {
    if (!selectedCategoryId) {
      setHoverCategoryId(categoryId);
    }
  };

  const handleMouseLeaveMegaMenu = (event: React.MouseEvent) => {
    if (megaMenuRef.current && carouselRef.current && !selectedIndustryId) {
      const relatedTarget = event.relatedTarget as Node;
      const isLeavingToCarousel = carouselRef.current.contains(relatedTarget);
      const isLeavingToMegaMenu = megaMenuRef.current.contains(relatedTarget);
      if (!isLeavingToCarousel && !isLeavingToMegaMenu) {
        setShowMega(false);
        setHoverIndustryId(null);
        setHoverCategoryId(null);
      }
    }
  };

  const handleSelectIndustry = (industryId: string) => {
    setSelectedIndustryId(industryId);
    setSelectedCategoryId(null); // Clear category and subcategory on new industry selection
    setSelectedSubcategoryId(null);
    setShowMega(true);
    setHoverIndustryId(industryId);
    setHoverCategoryId(null);
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedSubcategoryId(null); // Clear subcategory on new category selection
    setHoverCategoryId(categoryId);
  };

  const handleSelectSubcategory = (subcategoryId: string) => {
    setSelectedSubcategoryId(subcategoryId);
  };

  const handleDeselectAll = () => {
    setSelectedIndustryId(null);
    setSelectedCategoryId(null);
    setSelectedSubcategoryId(null);
    setShowMega(false);
    setHoverIndustryId(null);
    setHoverCategoryId(null);
  };

  const decodedPathname = decodeURIComponent(pathname);

  return (
    <header className="w-full bg-background hidden md:block relative">
      <div className="border-b bg-muted/40 hidden md:block">
        <div className="mx-auto w-full max-w-screen-2xl px-4 lg:px-8">
          <nav className="flex items-center h-12">
            <div
              className="relative flex items-center w-full"
              ref={megaMenuRef}
              onMouseLeave={handleMouseLeaveMegaMenu}
            >
              <Button
                variant="ghost"
                className="p-2"
                onClick={() => scrollCarousel('left')}
                disabled={!industries.length}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div
                ref={carouselRef}
                className="flex overflow-x-auto scroll-smooth hide-scrollbar space-x-2"
              >
                {industries.map((ind) => (
                  <div
                    key={ind.industry_id}
                    className="relative flex-shrink-0"
                    
                  >
                    <Button
                      variant="ghost"
                      className={`h-12 px-4 rounded-none font-medium transition-colors whitespace-nowrap ${
                        selectedIndustryId === ind.industry_id
                          ? 'bg-green-100 text-green-600'
                          : 'text-gray-700 hover:text-green-600'
                      }`}
                      onClick={() => handleSelectIndustry(ind.industry_id)}
                    >
                      {ind.industry_name}
                      <ChevronDown className="ml-1 h-4 w-4 opacity-50" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                className="p-2"
                onClick={() => scrollCarousel('right')}
                disabled={!industries.length}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </nav>
        </div>
      </div>
      {showMega && (selectedIndustryId || hoverIndustryId) && (
        <div
          className="absolute left-1/3  z-50  bg-white border shadow-xl"
          style={{ transform: 'translateX(0)' }}
        >
          {industries
            .filter((ind) => ind.industry_id === (selectedIndustryId || hoverIndustryId))
            .map((ind) => (
              <div key={ind.industry_id} className="flex mx-auto max-w-screen-2xl px-4 lg:px-8">
                <div className="w-1/2 max-h-[420px] overflow-y-auto border-r">
                  <div className="flex justify-between items-center px-4 py-2">
                    <span className="text-sm font-semibold">{ind.industry_name}</span>
                    {(selectedIndustryId || selectedCategoryId || selectedSubcategoryId) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDeselectAll}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  {ind.categories?.length ? (
                    ind.categories.map((cat) => (
                      <div
                        key={cat.category_id}
                        onMouseEnter={() => handleMouseEnterCategory(cat.category_id)}
                      >
                        <Link
                          href={`/${encodeURIComponent(cat.category_slug)}`}
                          className={`block px-4 py-3 text-sm hover:bg-muted ${
                            selectedCategoryId === cat.category_id
                              ? 'bg-green-100 text-green-600'
                              : hoverCategoryId === cat.category_id
                              ? 'bg-muted'
                              : ''
                          }`}
                          onClick={(e) => {
                        // Prevent navigation until confirmed
                        
                            handleSelectCategory(cat.category_id);
                            handleDeselectAll(); 
                          }}
                        >
                          {cat.category_name}
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground px-4 py-3">
                      No categories
                    </div>
                  )}
                </div>
                <div className=" p-4">
                  {ind.categories?.map((cat) => (
                    <div
                      key={cat.category_id}
                      className={`${
                        (selectedCategoryId || hoverCategoryId) === cat.category_id ? 'block' : 'hidden'
                      }`}
                    >
                      <div className="flex flex-col  gap-2">
                        {cat.subcategories?.length ? (
                          cat.subcategories.map((sub) => (
                            <Link
                              key={sub.subcategory_id}
                              href={`/${encodeURIComponent(sub.subcategory_slug)}`}
                              className={`text-sm px-2 py-2 rounded hover:bg-muted ${
                                selectedSubcategoryId === sub.subcategory_id
                                  ? 'bg-green-100 text-green-600'
                                  : decodedPathname === `/${sub.subcategory_slug}`
                                  ? 'text-primary font-semibold'
                                  : 'text-foreground'
                              }`}
                              onClick={(e) => {
                             // Prevent navigation until confirmed
                             handleDeselectAll(); 
                                handleSelectSubcategory(sub.subcategory_id);
                              }}
                            >
                              {sub.subcategory_name}
                            </Link>
                          ))
                        ) : (
                          <div className="text-sm text-muted-foreground">
                            No subcategories
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {!(selectedCategoryId || hoverCategoryId) && (
                    <div className="text-sm text-muted-foreground">
                      Hover or select a category to see subcategories
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </header>
  );
}