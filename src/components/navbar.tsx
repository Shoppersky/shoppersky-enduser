// 'use client'

// import React, { useState, useEffect, useRef } from 'react'
// import { Button } from './ui/button'
// import { Heart, Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react'
// import Link from 'next/link'
// import { Badge } from './ui/badge'
// import { Input } from './ui/input'
// import Image from 'next/image'
// import { useRouter } from 'next/navigation'
// import { useCart } from './cart-provider'
// import { useWishlist } from './wishlist-provider'
// import { CartSidebar } from './cart-sidebar'
// import axiosInstance from '../lib/axiosInstance'
// import useAuthStore from '@/lib/Zustand'

// interface SearchResult {
//   product_id: string
//   product_name: string
//   image_url: string
//   selling_price: string
//   slug: string
//   category_slug: string
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

// const Navbar = () => {
//   const { cartCount, toggleCart } = useCart()
//   const { wishlistCount } = useWishlist()
//   const { userId, token, isAuthenticated, logout } = useAuthStore()
//   const router = useRouter()

//   const [searchQuery, setSearchQuery] = useState('')
//   const [searchResults, setSearchResults] = useState<SearchResult[]>([])
//   const [isSearchLoading, setIsSearchLoading] = useState(false)
//   const [showSearchDropout, setShowSearchDropout] = useState(false)
//   const [username, setUsername] = useState<string | null>(null)
//   const [showUserMenu, setShowUserMenu] = useState(false)
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const [showMobileSearch, setShowMobileSearch] = useState(false)
//   const [industries, setIndustries] = useState<Industry[]>([])
//   const [expandedIndustry, setExpandedIndustry] = useState<string | null>(null)
//   const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

//   const debounceTimeout = useRef<NodeJS.Timeout | null>(null)
//   const searchRef = useRef<HTMLDivElement>(null)
//   const userMenuRef = useRef<HTMLDivElement>(null)
//   const mobileMenuRef = useRef<HTMLDivElement>(null)
//   const mobileMenuButtonRef = useRef<HTMLButtonElement>(null)

//   // Fetch username from backend
//   useEffect(() => {
//     const fetchUser = async () => {
//       if (!userId || !token) return

//       try {
//         const res = await axiosInstance.get(`/users/user/${userId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         setUsername(res.data.data.username)
//       } catch (err) {
//         console.error('Failed to fetch user info:', err)
//       }
//     }

//     fetchUser()
//   }, [userId, token])

//   // Fetch industries with categories and subcategories
//   useEffect(() => {
//     const fetchIndustries = async () => {
//       try {
//         const response = await axiosInstance.get<{ data: Industry[] }>(
//           '/industries/industries/full'
//         );
//         setIndustries(response.data.data || []);
//       } catch (error) {
//         console.error('Error fetching industries:', error);
//         setIndustries([]);
//       }
//     };

//     fetchIndustries();
//   }, [])

//   // Debounced search
//   useEffect(() => {
//     const handleSearch = async () => {
//       if (searchQuery.length < 2) {
//         setSearchResults([])
//         setShowSearchDropout(false)
//         return
//       }

//       setIsSearchLoading(true)
//       try {
//         const response = await axiosInstance.get<{
//           products: {
//             product_id: string
//             product_name: string
//             product_image: string | null
//             product_pricing: string | null
//             slug: string
//             category: string
//           }[]
//           total_count: number
//         }>(`/products/search-by-name?product_name=${encodeURIComponent(searchQuery)}`)

//         // Map backend response to frontend SearchResult interface
//         const mappedResults: SearchResult[] = response.data.products.map((product) => ({
//           product_id: product.product_id,
//           product_name: product.product_name,
//           image_url: product.product_image || '/default-image.png', // Fallback image
//           selling_price: product.product_pricing || 'N/A', // Fallback price
//           slug: product.slug,
//           category_slug: product.category.toLowerCase().replace(/\s+/g, '-'), // Convert category name to slug
//         }))

//         setSearchResults(mappedResults)
//         setShowSearchDropout(true)
//       } catch (error) {
//         console.error('Search error:', error)
//         setSearchResults([])
//       } finally {
//         setIsSearchLoading(false)
//       }
//     }

//     if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
//     debounceTimeout.current = setTimeout(handleSearch, 300)

//     return () => {
//       if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
//     }
//   }, [searchQuery])

//   // Hide dropdowns when clicked outside
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
//         setShowSearchDropout(false)
//       }
//       if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
//         setShowUserMenu(false)
//       }
//       if (
//         mobileMenuRef.current && 
//         !mobileMenuRef.current.contains(e.target as Node) &&
//         mobileMenuButtonRef.current &&
//         !mobileMenuButtonRef.current.contains(e.target as Node)
//       ) {
//         setIsMobileMenuOpen(false)
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   const handleUserClick = () => {
//     if (!isAuthenticated) {
//       router.push('/login')
//     } else {
//       setShowUserMenu((prev) => !prev)
//     }
//   }

//   const handleLogout = () => {
//     logout()
//     router.push('/login')
//   }

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false)
//     setExpandedIndustry(null)
//     setExpandedCategory(null)
//   }

//   console.log(industries)

//   return (
//     <div>
//       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="mx-auto w-full max-w-screen-2xl px-3 sm:px-4 lg:px-8">
//           {/* Main Navbar */}
//           <div className="flex h-14 sm:h-16 items-center justify-between">
//             {/* Left Section - Logo */}
//             <div className="flex items-center gap-2 sm:gap-4">
//               <Link href="/" className="flex items-center gap-1 sm:gap-2">
//                 <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-lg flex items-center justify-center">
//                   <Image src="/logo.png" alt="Logo" width={32} height={32} className="sm:w-[50px] sm:h-[50px]" />
//                 </div>
//                 <span className="font-bold text-lg sm:text-xl">Shoppersky</span>
//               </Link>

//               {/* Desktop Navigation */}
//               <nav className="hidden lg:flex items-center gap-6 ml-6">
//                 <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">Shop</Link>
//                 <Link href="/vendors" className="text-sm font-medium hover:text-primary transition-colors">Vendors</Link>
//                 <Link href="/deals" className="text-sm font-medium hover:text-primary transition-colors">Deals</Link>
//               </nav>
//             </div>

//             {/* Center Search - Desktop */}
//             <div className="flex-1 max-w-md mx-4 sm:mx-6 hidden md:block relative" ref={searchRef}>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   placeholder="Search products, vendors..."
//                   className="pl-10 pr-4 h-9 sm:h-10"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onFocus={() => {
//                     if (searchQuery.length >= 2) setShowSearchDropout(true)
//                   }}
//                 />
//               </div>

//               {showSearchDropout && (
//                 <div className="absolute top-full left-0 right-0 bg-white border shadow-md rounded-md z-50 max-h-96 overflow-y-auto">
//                   {isSearchLoading ? (
//                     <div className="p-4 text-center text-muted-foreground">Loading...</div>
//                   ) : searchResults.length === 0 ? (
//                     <div className="p-4 text-center text-muted-foreground">No products found</div>
//                   ) : (
//                     searchResults.map((product) => (
//                       <Link
//                         key={product.product_id}
//                         href={`/${product.category_slug}/${product.slug}`}
//                         className="flex items-center p-2 hover:bg-muted transition-colors"
//                         onClick={() => {
//                           setSearchQuery('')
//                           setShowSearchDropout(false)
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
//                           <div className="font-medium text-sm">{product.product_name}</div>
//                           <div className="text-xs text-muted-foreground">AU${product.selling_price}</div>
//                         </div>
//                       </Link>
//                     ))
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Right Section */}
//             <div className="flex items-center gap-4 sm:gap-2 ">
//               {/* Mobile Search Button */}
//               <Button 
//                 variant="ghost" 
//                 size="icon" 
//                 className="md:hidden h-8 w-8 sm:h-10 sm:w-10"
//                 onClick={() => setShowMobileSearch(!showMobileSearch)}
//               >
//                 <Search className="h-4 w-4 sm:h-5 sm:w-5" />
//               </Button>

//               {/* Wishlist */}
//               <Button variant="ghost" size="icon" asChild className="relative h-8 w-8 sm:h-10 sm:w-10">
//                 <Link href="/wishlist">
//                   <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
//                   {wishlistCount > 0 && (
//                     <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-4 w-4 sm:h-5 sm:w-5 p-0 text-xs flex items-center justify-center">
//                       {wishlistCount}
//                     </Badge>
//                   )}
//                 </Link>
//               </Button>

//               {/* Cart */}
//               <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-10 sm:w-10" onClick={toggleCart}>
//                 <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
//                 {cartCount > 0 && (
//                   <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-4 w-4 sm:h-5 sm:w-5 p-0 text-xs flex items-center justify-center">
//                     {cartCount}
//                   </Badge>
//                 )}
//               </Button>

//               {/* User Profile - Desktop and Mobile */}
//        <div className="relative hidden sm:flex items-center" ref={userMenuRef}>
//            <Button variant="ghost" size="icon" onClick={handleUserClick} className="h-8 sm:h-10">
//     <User className="h-4 w-4 sm:h-5 sm:w-5" />
//   </Button>
//   {username && <span className="ml-2 text-sm hidden lg:inline">{username}</span>}

//                 {showUserMenu && isAuthenticated && (
//                   <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50 py-2 text-sm">
//                     <button
//                       className="w-full text-left px-4 py-2 hover:bg-muted transition-colors"
//                       onClick={() => {
//                         router.push('/MyAccount')
//                         setShowUserMenu(false)
//                       }}
//                     >
//                       My Account
//                     </button>
//                     <button
//                       className="w-full text-left px-4 py-2 hover:bg-muted transition-colors"
//                       onClick={handleLogout}
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* Mobile Menu Button */}
//               <Button 
//                 ref={mobileMenuButtonRef}
//                 variant="ghost" 
//                 size="icon" 
//                 className="lg:hidden h-8 w-8 sm:h-10 sm:w-10"
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               >
//                 {isMobileMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
//               </Button>
//             </div>
//           </div>

//           {/* Mobile Search Bar */}
//           {showMobileSearch && (
//             <div className="md:hidden py-3 border-t" ref={searchRef}>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   placeholder="Search products, vendors..."
//                   className="pl-10 pr-4 h-10"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onFocus={() => {
//                     if (searchQuery.length >= 2) setShowSearchDropout(true)
//                   }}
//                 />
//               </div>

//               {showSearchDropout && (
//                 <div className="absolute left-3 right-3 top-full bg-white border shadow-md rounded-md z-50 max-h-96 overflow-y-auto mt-1">
//                   {isSearchLoading ? (
//                     <div className="p-4 text-center text-muted-foreground">Loading...</div>
//                   ) : searchResults.length === 0 ? (
//                     <div className="p-4 text-center text-muted-foreground">No products found</div>
//                   ) : (
//                     searchResults.map((product) => (
//                       <Link
//                         key={product.product_id}
//                         href={`/${product.category_slug}/${product.slug}`}
//                         className="flex items-center p-3 hover:bg-muted transition-colors border-b last:border-b-0"
//                         onClick={() => {
//                           setSearchQuery('')
//                           setShowSearchDropout(false)
//                           setShowMobileSearch(false)
//                         }}
//                       >
//                         <Image
//                           src={product.image_url}
//                           alt={product.product_name}
//                           width={40}
//                           height={40}
//                           className="object-cover rounded mr-3"
//                         />
//                         <div>
//                           <div className="font-medium text-sm">{product.product_name}</div>
//                           <div className="text-xs text-muted-foreground">AU${product.selling_price}</div>
//                         </div>
//                       </Link>
//                     ))
//                   )}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="lg:hidden border-t bg-background" ref={mobileMenuRef}>
//             <div className="px-3 py-4 space-y-3 max-h-[70vh] overflow-y-auto">
//               {/* Navigation Links */}
//               <div className="space-y-2">
//                 <Link 
//                   href="/products" 
//                   className="block px-3 py-2 text-base font-medium hover:text-primary hover:bg-muted rounded-md transition-colors"
//                   onClick={closeMobileMenu}
//                 >
//                   Shop
//                 </Link>
//                 <Link 
//                   href="/vendors" 
//                   className="block px-3 py-2 text-base font-medium hover:text-primary hover:bg-muted rounded-md transition-colors"
//                   onClick={closeMobileMenu}
//                 >
//                   Vendors
//                 </Link>
//                 <Link 
//                   href="/deals" 
//                   className="block px-3 py-2 text-base font-medium hover:text-primary hover:bg-muted rounded-md transition-colors"
//                   onClick={closeMobileMenu}
//                 >
//                   Deals
//                 </Link>
//               </div>

//               {/* Industries Section */}
//               {industries.length > 0 && (
//                 <div className="border-t pt-3">
//                   <h3 className="px-3 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
//                     Industries
//                   </h3>
//                   <div className="space-y-1">
//                     {industries.map((industry) => (
//                       <div key={industry.industry_id}>
//                         <button
//                           className="w-full flex items-center justify-between px-3 py-2 text-base font-medium hover:text-primary hover:bg-muted rounded-md transition-colors"
//                           onClick={() => 
//                             setExpandedIndustry(
//                               expandedIndustry === industry.industry_id ? null : industry.industry_id
//                             )
//                           }
//                         >
//                           <span>{industry.industry_name}</span>
//                           <ChevronDown
//                             className={`w-4 h-4 transition-transform ${
//                               expandedIndustry === industry.industry_id ? 'rotate-180' : ''
//                             }`}
//                           />
//                         </button>
                        
//                         {expandedIndustry === industry.industry_id && (
//                           <div className="ml-4 space-y-1">
//                             {industry.categories.map((category) => (
//                               <div key={category.category_id}>
//                                 {category.subcategories && category.subcategories.length > 0 ? (
//                                   <div>
//                                     <button
//                                       className="w-full flex items-center justify-between px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
//                                       onClick={() => 
//                                         setExpandedCategory(
//                                           expandedCategory === category.category_id ? null : category.category_id
//                                         )
//                                       }
//                                     >
//                                       <span>{category.category_name}</span>
//                                       <ChevronDown
//                                         className={`w-3 h-3 transition-transform ${
//                                           expandedCategory === category.category_id ? 'rotate-180' : ''
//                                         }`}
//                                       />
//                                     </button>
                                    
//                                     {expandedCategory === category.category_id && (
//                                       <div className="ml-6 space-y-1">
//                                         {category.subcategories.map((subcategory) => (
//                                           <Link
//                                             key={subcategory.subcategory_id}
//                                             href={`/${encodeURIComponent(subcategory.subcategory_slug)}`}
//                                             className="block px-3 py-2 text-xs text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
//                                             onClick={closeMobileMenu}
//                                           >
//                                             {subcategory.subcategory_name}
//                                           </Link>
//                                         ))}
//                                       </div>
//                                     )}
//                                   </div>
//                                 ) : (
//                                   <Link
//                                     href={`/${encodeURIComponent(category.category_slug)}`}
//                                     className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
//                                     onClick={closeMobileMenu}
//                                   >
//                                     {category.category_name}
//                                   </Link>
//                                 )}
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* User Section */}
//               <div className="border-t pt-3 space-y-2">
//                 {isAuthenticated ? (
//                   <>
//                     {username && (
//                       <div className="px-3 py-2 text-sm text-muted-foreground">
//                         Welcome, {username}
//                       </div>
//                     )}
//                     <button
//                       className="block w-full text-left px-3 py-2 text-base font-medium hover:text-primary hover:bg-muted rounded-md transition-colors"
//                       onClick={() => {
//                         router.push('/MyAccount')
//                         closeMobileMenu()
//                       }}
//                     >
//                       My Account
//                     </button>
//                     <button
//                       className="block w-full text-left px-3 py-2 text-base font-medium hover:text-primary hover:bg-muted rounded-md transition-colors"
//                       onClick={() => {
//                         handleLogout()
//                         closeMobileMenu()
//                       }}
//                     >
//                       Logout
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     className="block w-full text-left px-3 py-2 text-base font-medium hover:text-primary hover:bg-muted rounded-md transition-colors"
//                     onClick={() => {
//                       router.push('/login')
//                       closeMobileMenu()
//                     }}
//                   >
//                     Login
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </header>

//       {/* Cart Sidebar */}
//       <CartSidebar />
//     </div>
//   )
// }

// export default Navbar


'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { Heart, Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCart } from './cart-provider'
import { useWishlist } from './wishlist-provider'
import { CartSidebar } from './cart-sidebar'
import axiosInstance from '../lib/axiosInstance'
import useAuthStore from '@/lib/Zustand'

interface SearchResult {
  product_id: string
  product_name: string
  image_url: string
  selling_price: string
  slug: string
  category_slug: string
}

interface IndustrySubcategory {
  subcategory_id: string
  subcategory_name: string
  subcategory_slug: string
}

interface IndustryCategory {
  category_id: string
  category_name: string
  category_slug: string
  subcategories: IndustrySubcategory[]
}

interface Industry {
  industry_id: string
  industry_name: string
  industry_slug: string
  categories: IndustryCategory[]
}

const Navbar = () => {
  const { cartCount, toggleCart } = useCart()
  const { wishlistCount } = useWishlist()
  const { userId, token, isAuthenticated, logout } = useAuthStore()
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const [showSearchDropout, setShowSearchDropout] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [industries, setIndustries] = useState<Industry[]>([])
  const [expandedIndustry, setExpandedIndustry] = useState<string | null>(null)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
  if (!isAuthenticated) {
    setUsername(null); // clear username immediately on logout
  }
}, [isAuthenticated]);

  // Fetch username from backend
  useEffect(() => {
    const fetchUser = async () => {
      if (!userId || !token) return

      try {
        const res = await axiosInstance.get(`/users/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setUsername(res.data.data.username)
      } catch (err) {
        console.error('Failed to fetch user info:', err)
      }
    }

    fetchUser()
  }, [userId, token])

  // Fetch industries with categories and subcategories
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await axiosInstance.get<{ data: Industry[] }>(
          '/industries/industries/full'
        )
        setIndustries(response.data.data || [])
      } catch (error) {
        console.error('Error fetching industries:', error)
        setIndustries([])
      }
    }

    fetchIndustries()
  }, [])

  // Debounced search
  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([])
        setShowSearchDropout(false)
        return
      }

      setIsSearchLoading(true)
      try {
        const response = await axiosInstance.get<{
          products: {
            product_id: string
            product_name: string
            product_image: string | null
            product_pricing: string | null
            slug: string
            category: string
          }[]
          total_count: number
        }>(`/products/search-by-name?product_name=${encodeURIComponent(searchQuery)}`)

        const mappedResults: SearchResult[] = response.data.products.map((product) => ({
          product_id: product.product_id,
          product_name: product.product_name,
          image_url: product.product_image || '/default-image.png',
          selling_price: product.product_pricing || 'N/A',
          slug: product.slug,
          category_slug: product.category.toLowerCase().replace(/\s+/g, '-'),
        }))

        setSearchResults(mappedResults)
        setShowSearchDropout(true)
      } catch (error) {
        console.error('Search error:', error)
        setSearchResults([])
      } finally {
        setIsSearchLoading(false)
      }
    }

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
    debounceTimeout.current = setTimeout(handleSearch, 300)

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
    }
  }, [searchQuery])

  // Hide dropdowns when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchDropout(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false)
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(e.target as Node)
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleUserClick = () => {
    if (!isAuthenticated) {
      router.push('/login')
    } else {
      setShowUserMenu((prev) => !prev)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setExpandedIndustry(null)
    setExpandedCategory(null)
  }

  return (
    <div>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto w-full max-w-screen-2xl px-3 sm:px-4 lg:px-8">
          {/* Main Navbar */}
          <div className="flex h-14 sm:h-16 items-center justify-between">
            {/* Left Section - Logo */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/" className="flex items-center gap-1 sm:gap-2">
                <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-lg flex items-center justify-center">
                  <Image src="/logo.png" alt="Logo" width={32} height={32} className="sm:w-[50px] sm:h-[50px]" />
                </div>
                <span className="font-bold text-lg sm:text-xl">Shoppersky</span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-6 ml-6">
                <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">Shop</Link>
                <Link href="/vendors" className="text-sm font-medium hover:text-primary transition-colors">Vendors</Link>
                <Link href="/deals" className="text-sm font-medium hover:text-primary transition-colors">Deals</Link>
              </nav>
            </div>

            {/* Center Search - Desktop */}
            <div className="flex-1 max-w-md mx-4 sm:mx-6 hidden md:block relative" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products"
                  className="pl-10 pr-4 h-9 sm:h-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (searchQuery.length >= 2) setShowSearchDropout(true)
                  }}
                />
              </div>

              {showSearchDropout && (
                <div className="absolute top-full left-0 right-0 bg-white border shadow-md rounded-md z-50 max-h-96 overflow-y-auto">
                  {isSearchLoading ? (
                    <div className="p-4 text-center text-muted-foreground">Loading...</div>
                  ) : searchResults.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">No products found</div>
                  ) : (
                    searchResults.map((product) => (
                      <Link
                        key={product.product_id}
                        href={`/${product.category_slug}/${product.slug}`}
                        className="flex items-center p-2 hover:bg-muted transition-colors"
                        onClick={() => {
                          setSearchQuery('')
                          setShowSearchDropout(false)
                        }}
                      >
                        <Image
                          src={product.image_url}
                          alt={product.product_name}
                          width={40}
                          height={40}
                          className="object-cover rounded mr-2"
                        />
                        <div>
                          <div className="font-medium text-sm">{product.product_name}</div>
                          <div className="text-xs text-muted-foreground">AU${product.selling_price}</div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4 sm:gap-2">
              {/* Mobile Search Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-8 w-8 sm:h-10 sm:w-10"
                onClick={() => setShowMobileSearch(!showMobileSearch)}
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>

              {/* Wishlist */}
              {/* <Button variant="ghost" size="icon" asChild className="relative h-8 w-8 sm:h-10 sm:w-10">
                <Link href="/wishlist">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                  {wishlistCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-4 w-4 sm:h-5 sm:w-5 p-0 text-xs flex items-center justify-center">
                      {wishlistCount}
                    </Badge>
                  )}
                </Link>
              </Button> */}

              {/* Cart */}
       <Link href="/cart">
  <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-10 sm:w-10">
    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
    {cartCount > 0 && (
      <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-4 w-4 sm:h-5 sm:w-5 p-0 text-xs flex items-center justify-center">
        {cartCount}
      </Badge>
    )}
  </Button>
</Link>

              {/* User Profile - Desktop and Mobile */}
              <div className="relative hidden sm:flex items-center" ref={userMenuRef}>
                <Button variant="ghost" size="icon" onClick={handleUserClick} className="h-8 sm:h-10">
                  <User className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                {username && <span className="ml-2 text-sm hidden lg:inline">{username}</span>}

                {showUserMenu && isAuthenticated && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50 py-2 text-sm">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-muted transition-colors"
                      onClick={() => {
                        router.push('/MyAccount')
                        setShowUserMenu(false)
                      }}
                    >
                      My Account
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-muted transition-colors"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <Button
                ref={mobileMenuButtonRef}
                variant="ghost"
                size="icon"
                className="lg:hidden h-8 w-8 sm:h-10 sm:w-10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {showMobileSearch && (
            <div className="md:hidden py-3 border-t" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products"
                  className="pl-10 pr-4 h-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (searchQuery.length >= 2) setShowSearchDropout(true)
                  }}
                />
              </div>

              {showSearchDropout && (
                <div className="absolute left-3 right-3 top-full bg-white border shadow-md rounded-md z-50 max-h-96 overflow-y-auto mt-1">
                  {isSearchLoading ? (
                    <div className="p-4 text-center text-muted-foreground">Loading...</div>
                  ) : searchResults.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">No products found</div>
                  ) : (
                    searchResults.map((product) => (
                      <Link
                        key={product.product_id}
                        href={`/${product.category_slug}/${product.slug}`}
                        className="flex items-center p-3 hover:bg-muted transition-colors border-b last:border-b-0"
                        onClick={() => {
                          setSearchQuery('')
                          setShowSearchDropout(false)
                          setShowMobileSearch(false)
                        }}
                      >
                        <Image
                          src={product.image_url}
                          alt={product.product_name}
                          width={40}
                          height={40}
                          className="object-cover rounded mr-3"
                        />
                        <div>
                          <div className="font-medium text-sm">{product.product_name}</div>
                          <div className="text-xs text-muted-foreground">AU${product.selling_price}</div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu - Sliding Sidebar from Right */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-background shadow-lg z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        ref={mobileMenuRef}
      >
        <div className="px-4 py-4 h-full overflow-y-auto">
          {/* Close Button */}
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-lg">Menu</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <Link
              href="/products"
              className="block px-3 py-2 text-base font-medium hover:text-primary hover:bg-muted rounded-md transition-colors"
              onClick={closeMobileMenu}
            >
              Shop
            </Link>
            <Link
              href="/vendors"
              className="block px-3 py-2 text-base font-medium hover:text-primary hover:bg-muted rounded-md transition-colors"
              onClick={closeMobileMenu}
            >
              Vendors
            </Link>
            <Link
              href="/deals"
              className="block px-3 py-2 text-base font-medium hover:text-primary hover:bg-muted rounded-md transition-colors"
              onClick={closeMobileMenu}
            >
              Deals
            </Link>
          </div>

          {/* Industries Section */}
          {/* {industries.length > 0 && (
            <div className="border-t pt-3 mt-3">
              <h3 className="px-3 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Industries
              </h3>
              <div className="space-y-1">
                {industries.map((industry) => (
                  <div key={industry.industry_id}>
                    <button
                      className="w-full flex items-center justify-between px-3 py-2 text-base font-medium hover:text-primary hover:bg-muted rounded-md transition-colors"
                      onClick={() =>
                        setExpandedIndustry(
                          expandedIndustry === industry.industry_id ? null : industry.industry_id
                        )
                      }
                    >
                      <span>{industry.industry_name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          expandedIndustry === industry.industry_id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {expandedIndustry === industry.industry_id && (
                      <div className="ml-4 space-y-1">
                        {industry.categories.map((category) => (
                          <div key={category.category_id}>
                            {category.subcategories && category.subcategories.length > 0 ? (
                              <div>
                                <button
                                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                                  onClick={() =>
                                    setExpandedCategory(
                                      expandedCategory === category.category_id ? null : category.category_id
                                    )
                                  }
                                >
                                  <span>{category.category_name}</span>
                                  <ChevronDown
                                    className={`w-3 h-3 transition-transform ${
                                      expandedCategory === category.category_id ? 'rotate-180' : ''
                                    }`}
                                  />
                                </button>

                                {expandedCategory === category.category_id && (
                                  <div className="ml-6 space-y-1">
                                    {category.subcategories.map((subcategory) => (
                                      <Link
                                        key={subcategory.subcategory_id}
                                        href={`/${encodeURIComponent(subcategory.subcategory_slug)}`}
                                        className="block px-3 py-2 text-xs text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                                        onClick={closeMobileMenu}
                                      >
                                        {subcategory.subcategory_name}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <Link
                                href={`/${encodeURIComponent(category.category_slug)}`}
                                className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                                onClick={closeMobileMenu}
                              >
                                {category.category_name}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )} */}

          {/* User Section */}
          <div className="border-t pt-3 mt-3 space-y-2">
            {isAuthenticated ? (
              <>
                {username && (
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    Welcome, {username}
                  </div>
                )}
                <button
                  className="block w-full text-left px-3 py-2 text-base font-medium hover:text-primary hover:bg-muted rounded-md transition-colors"
                  onClick={() => {
                    router.push('/MyAccount')
                    closeMobileMenu()
                  }}
                >
                  My Account
                </button>
                <button
                  className="block w-full text-left px-3 py-2 text-base font-medium hover:text-primary hover:bg-muted rounded-md transition-colors"
                  onClick={() => {
                    handleLogout()
                    closeMobileMenu()
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                className="block w-full text-left px-3 py-2 text-base font-medium hover:text-primary hover:bg-muted rounded-md transition-colors"
                onClick={() => {
                  router.push('/login')
                  closeMobileMenu()
                }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Cart Sidebar */}
      <CartSidebar />
    </div>
  )
}

export default Navbar