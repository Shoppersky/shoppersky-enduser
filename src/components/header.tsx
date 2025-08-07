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
          '/categories/menu-categories'
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
    <header className="w-full bg-background hidden md:block">
      {/* Desktop Category Navigation */}
      <div className="border-b bg-muted/40 hidden lg:block">
        <div className="mx-auto w-full max-w-screen-2xl px-4 lg:px-8">
          <nav className="flex items-center h-12 overflow-x-auto scrollbar-hide">
            {categories.map((cat) =>
              cat.subcategories.length > 0 ? (
                <DropdownMenu key={cat.category_id}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`h-12 px-4 rounded-none text-gray-700 hover:text-green-600 font-medium transition-colors whitespace-nowrap ${
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
                  className={`h-12 px-4 rounded-none text-gray-700 hover:text-green-600 font-medium transition-colors whitespace-nowrap ${
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

      {/* Mobile Category Navigation */}
      <div className="lg:hidden border-b bg-muted/40">
        <div className="px-3 sm:px-4">
          <nav className="flex items-center h-10 sm:h-12 gap-1 overflow-x-auto scrollbar-hide">
            {categories.map((cat) =>
              cat.subcategories.length > 0 ? (
                <DropdownMenu key={cat.category_id}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 sm:h-10 px-2 sm:px-3 rounded-md text-xs sm:text-sm text-gray-700 hover:text-green-600 font-medium transition-colors whitespace-nowrap ${
                        decodedPathname === `/${cat.slug}` ||
                        decodedPathname.startsWith(`/${cat.slug}/`)
                          ? 'bg-primary/10 text-primary'
                          : ''
                      }`}
                    >
                      {cat.category_name}
                      <ChevronDown className="ml-1 h-3 w-3 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-48 z-50 bg-white border shadow-lg"
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
                  size="sm"
                  className={`h-8 sm:h-10 px-2 sm:px-3 rounded-md text-xs sm:text-sm text-gray-700 hover:text-green-600 font-medium transition-colors whitespace-nowrap ${
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
    </header>
  );
}



