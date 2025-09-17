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
                    <div key={ind.industry_id} className="flex-shrink-0">
                      <Button
                        variant="ghost"
                        className={`
                          h-10 px-2 text-xs font-medium whitespace-nowrap
                          sm:h-11 sm:px-3 sm:text-sm
                          md:h-12 md:px-4 md:text-base
                          ${
                            hoverIndustryId === ind.industry_id
                              ? 'bg-green-100 text-green-600'
                              : 'text-gray-700 hover:text-green-600'
                          }
                        `}
                      onMouseEnter={(e) => {
  setHoverIndustryId(ind.industry_id);
  setHoverCategoryId(null);
  setShowMega(true);

  const buttonRect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
  const containerRect = e.currentTarget.offsetParent?.getBoundingClientRect();

  if (containerRect) {
    // Default position (below the button)
    let left = buttonRect.left - containerRect.left;
    const top = buttonRect.height;

    // Mega menu width estimate (you can tweak if needed)
    const megaWidth = 600; // assume max 600px
    const viewportWidth = window.innerWidth;

    // If it would overflow the right side, shift it left
    if (left + megaWidth > viewportWidth) {
      left = viewportWidth - megaWidth - containerRect.left - 16; // 16px padding
    }

    // Prevent going off left edge
    if (left < 0) {
      left = 0;
    }

    setMegaPosition({ left, top });
  }
}}

                      >
                        {ind.industry_name}
                        <ChevronDown className="ml-1 h-3 w-3 sm:h-4 sm:w-4 opacity-50" />
                      </Button>
                    </div>
                  ))}
                </div>
 
                {/* Mega menu */}
                {showMega && hoverIndustryId && megaPosition && (
                  <div
                    className={`
                      absolute bg-white border shadow-xl flex flex-col sm:flex-row
                      w-full md:w-fit z-50
                    `}
                    style={{
                      top: megaPosition.top,
                      left: megaPosition.left,
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
                                  href={`/${encodeURIComponent(cat.category_slug)}`}
                                  key={cat.category_id}
                                  onMouseEnter={() => setHoverCategoryId(cat.category_id)}
                                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                                    hoverCategoryId === cat.category_id
                                      ? 'bg-white font-medium'
                                      : ''
                                  }`}
                                >
                                  {cat.category_name}
                                  <ChevronRight className="inline ml-2 h-4 w-4 opacity-50 float-right" />
                                </Link>
                              ))
                            ) : (
                              <div className="px-4 py-2 text-sm text-muted-foreground">
                                No categories
                              </div>
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
                                        onClick={() => {
                        
                                          handleSelectSubcategory(sub.subcategory_id);
                                        }}
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
 
 