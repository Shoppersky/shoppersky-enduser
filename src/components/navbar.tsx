// // 'use client'

// // import React, { useState, useEffect, useRef } from 'react'
// // import { Button } from './ui/button'
// // import { Heart, Search, ShoppingCart, User } from 'lucide-react'
// // import Link from 'next/link'
// // import { Badge } from './ui/badge'
// // import { Input } from './ui/input'
// // import Image from 'next/image'

// // import { useCart } from './cart-provider'
// // import { useWishlist } from './wishlist-provider'
// // import { CartSidebar } from './cart-sidebar'
// // import axiosInstance from '../lib/axiosInstance'

// // interface SearchResult {
// //   product_id: string
// //   product_name: string
// //   image_url: string
// //   selling_price: string
// //   slug: string
// //   category_slug: string
// // }

// // const Navbar = () => {
// //   const { cartCount, toggleCart } = useCart()
// //   const { wishlistCount } = useWishlist()

// //   const [searchQuery, setSearchQuery] = useState('')
// //   const [searchResults, setSearchResults] = useState<SearchResult[]>([])
// //   const [isSearchLoading, setIsSearchLoading] = useState(false)
// //   const [showSearchDropout, setShowSearchDropout] = useState(false)

// //   const debounceTimeout = useRef<NodeJS.Timeout | null>(null)
// //   const searchRef = useRef<HTMLDivElement>(null)

// //   useEffect(() => {
// //     const handleSearch = async () => {
// //       if (searchQuery.length < 2) {
// //         setSearchResults([])
// //         setShowSearchDropout(false)
// //         return
// //       }

// //       setIsSearchLoading(true)
// //       try {
// //         const response = await axiosInstance.get<SearchResult[]>(
// //           `/products/search?query=${encodeURIComponent(searchQuery)}`
// //         )
// //         setSearchResults(response.data)
// //         setShowSearchDropout(true)
// //       } catch (error) {
// //         console.error('Search error:', error)
// //         setSearchResults([])
// //       } finally {
// //         setIsSearchLoading(false)
// //       }
// //     }

// //     if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
// //     debounceTimeout.current = setTimeout(handleSearch, 300)

// //     return () => {
// //       if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
// //     }
// //   }, [searchQuery])

// //   useEffect(() => {
// //     const handleClickOutside = (e: MouseEvent) => {
// //       if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
// //         setShowSearchDropout(false)
// //       }
// //     }

// //     document.addEventListener('mousedown', handleClickOutside)
// //     return () => document.removeEventListener('mousedown', handleClickOutside)
// //   }, [])

// //   return (
// //     <div>
// //       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
// //         <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
// //           {/* Left Section */}
// //           <div className="flex items-center gap-6">
// //             <Link href="/" className="flex items-center gap-2">
// //               <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
// //                 <ShoppingCart className="h-4 w-4 text-primary-foreground" />
// //               </div>
// //               <span className="font-bold text-xl">ShoppersSky</span>
// //             </Link>

// //             <nav className="hidden md:flex items-center gap-6">
// //               <Link href="/categories" className="text-sm font-medium hover:text-primary">Categories</Link>
// //               <Link href="/vendors" className="text-sm font-medium hover:text-primary">Vendors</Link>
// //               <Link href="/deals" className="text-sm font-medium hover:text-primary">Deals</Link>
// //             </nav>
// //           </div>

// //           {/* Center Search */}
// //           <div className="flex-1 max-w-md mx-6 hidden sm:block relative" ref={searchRef}>
// //             <div className="relative">
// //               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
// //               <Input
// //                 placeholder="Search products, vendors..."
// //                 className="pl-10 pr-4"
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 onFocus={() => {
// //                   if (searchQuery.length >= 2) setShowSearchDropout(true)
// //                 }}
// //               />
// //             </div>

// //             {showSearchDropout && (
// //               <div className="absolute top-full left-0 right-0 bg-white border shadow-md rounded-md z-50 max-h-96 overflow-y-auto">
// //                 {isSearchLoading ? (
// //                   <div className="p-4 text-center text-muted-foreground">Loading...</div>
// //                 ) : searchResults.length === 0 ? (
// //                   <div className="p-4 text-center text-muted-foreground">No products found</div>
// //                 ) : (
// //                   searchResults.map((product) => (
// //                     <Link
// //                       key={product.product_id}
// //                       href={`/${encodeURIComponent(product.category_slug)}/${encodeURIComponent(product.slug)}`}
// //                       className="flex items-center p-2 hover:bg-muted"
// //                       onClick={() => {
// //                         setSearchQuery('')
// //                         setShowSearchDropout(false)
// //                       }}
// //                     >
// //                       <Image
// //                         src={product.image_url}
// //                         alt={product.product_name}
// //                         width={40}
// //                         height={40}
// //                         className="object-cover rounded mr-2"
// //                       />
// //                       <div>
// //                         <div className="font-medium">{product.product_name}</div>
// //                         <div className="text-sm text-muted-foreground">AU${product.selling_price}</div>
// //                       </div>
// //                     </Link>
// //                   ))
// //                 )}
// //               </div>
// //             )}
// //           </div>

// //           {/* Right Section */}
// //           <div className="flex items-center gap-3 sm:gap-4">
// //             {/* Wishlist */}
// //             <Button variant="ghost" size="icon" asChild className="relative">
// //               <Link href="/wishlist">
// //                 <Heart className="h-5 w-5" />
// //                 {wishlistCount > 0 && (
// //                   <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center">
// //                     {wishlistCount}
// //                   </Badge>
// //                 )}
// //               </Link>
// //             </Button>

// //             {/* Cart */}
// //             <Button variant="ghost" size="icon" className="relative" onClick={toggleCart}>
// //               <ShoppingCart className="h-5 w-5" />
// //               {cartCount > 0 && (
// //                 <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center">
// //                   {cartCount}
// //                 </Badge>
// //               )}
// //             </Button>

// //             {/* User */}
// //             <Button variant="ghost" size="icon">
// //               <User className="h-5 w-5" />
// //             </Button>

// //             {/* Sell Link */}
        
// //           </div>
// //         </div>
// //       </header>

// //       {/* Cart Sidebar */}
// //       <CartSidebar />
// //     </div>
// //   )
// // }

// // export default Navbar


// 'use client'

// import React, { useState, useEffect, useRef } from 'react'
// import { Button } from './ui/button'
// import { Heart, Search, ShoppingCart, User } from 'lucide-react'
// import Link from 'next/link'
// import { Badge } from './ui/badge'
// import { Input } from './ui/input'
// import Image from 'next/image'
// import { useRouter } from 'next/navigation'
// import { useCart } from './cart-provider'
// import { useWishlist } from './wishlist-provider'
// import { CartSidebar } from './cart-sidebar'
// import axiosInstance from '../lib/axiosInstance'
// import useAuthStore from '@/lib/Zustand' // ✅ make sure this path is correct

// interface SearchResult {
//   product_id: string
//   product_name: string
//   image_url: string
//   selling_price: string
//   slug: string
//   category_slug: string
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

//   const debounceTimeout = useRef<NodeJS.Timeout | null>(null)
//   const searchRef = useRef<HTMLDivElement>(null)
//   const userMenuRef = useRef<HTMLDivElement>(null)

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
//         const response = await axiosInstance.get<SearchResult[]>(
//           `/products/search?query=${encodeURIComponent(searchQuery)}`
//         )
//         setSearchResults(response.data)
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
//       if (
//         searchRef.current &&
//         !searchRef.current.contains(e.target as Node)
//       ) {
//         setShowSearchDropout(false)
//       }

//       if (
//         userMenuRef.current &&
//         !userMenuRef.current.contains(e.target as Node)
//       ) {
//         setShowUserMenu(false)
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

//   return (
//     <div>
//       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
//           {/* Left Section */}
//           <div className="flex items-center gap-6">
//             <Link href="/" className="flex items-center gap-2">
//               <div className="h-8 w-8 rounded-lg flex items-center justify-center">
// <Image src='/logo.png' alt='Logo' width={50} height={50}/>
//               </div>
//               <span className="font-bold text-xl">ShoppersSky</span>
//             </Link>

//             <nav className="hidden md:flex items-center gap-6">
//               <Link href="/products" className="text-sm font-medium hover:text-primary">Shop</Link>
//               <Link href="/vendors" className="text-sm font-medium hover:text-primary">Vendors</Link>
//               <Link href="/deals" className="text-sm font-medium hover:text-primary">Deals</Link>
//             </nav>
//           </div>

//           {/* Center Search */}
//           <div className="flex-1 max-w-md mx-6 hidden sm:block relative" ref={searchRef}>
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search products, vendors..."
//                 className="pl-10 pr-4"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 onFocus={() => {
//                   if (searchQuery.length >= 2) setShowSearchDropout(true)
//                 }}
//               />
//             </div>

//             {showSearchDropout && (
//               <div className="absolute top-full left-0 right-0 bg-white border shadow-md rounded-md z-50 max-h-96 overflow-y-auto">
//                 {isSearchLoading ? (
//                   <div className="p-4 text-center text-muted-foreground">Loading...</div>
//                 ) : searchResults.length === 0 ? (
//                   <div className="p-4 text-center text-muted-foreground">No products found</div>
//                 ) : (
//                   searchResults.map((product) => (
//                     <Link
//                       key={product.product_id}
//                       href={`/${product.category_slug}/${product.slug}`}
//                       className="flex items-center p-2 hover:bg-muted"
//                       onClick={() => {
//                         setSearchQuery('')
//                         setShowSearchDropout(false)
//                       }}
//                     >
//                       <Image
//                         src={product.image_url}
//                         alt={product.product_name}
//                         width={40}
//                         height={40}
//                         className="object-cover rounded mr-2"
//                       />
//                       <div>
//                         <div className="font-medium">{product.product_name}</div>
//                         <div className="text-sm text-muted-foreground">AU${product.selling_price}</div>
//                       </div>
//                     </Link>
//                   ))
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Right Section */}
//           <div className="flex items-center gap-3 sm:gap-4">
//             {/* Wishlist */}
//             <Button variant="ghost" size="icon" asChild className="relative">
//               <Link href="/wishlist">
//                 <Heart className="h-5 w-5" />
//                 {wishlistCount > 0 && (
//                   <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center">
//                     {wishlistCount}
//                   </Badge>
//                 )}
//               </Link>
//             </Button>

//             {/* Cart */}
//             <Button variant="ghost" size="icon" className="relative" onClick={toggleCart}>
//               <ShoppingCart className="h-5 w-5" />
//               {cartCount > 0 && (
//                 <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center">
//                   {cartCount}
//                 </Badge>
//               )}
//             </Button>

//             {/* User Profile */}
//             <div className="relative" ref={userMenuRef}>
//               <Button variant="ghost" size="icon" onClick={handleUserClick}>
//                 <User className="h-5 w-5" />
//                     {username}
//               </Button>
          

//               {showUserMenu && isAuthenticated && (
//                 <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50 py-2 text-sm">
//                   <button
//                     className="w-full text-left px-4 py-2 hover:bg-muted"
//                     onClick={() => router.push('/MyAccount')}
//                   >
//                     My Account
//                   </button>
//                   <button
//                     className="w-full text-left px-4 py-2 hover:bg-muted"
//                     onClick={handleLogout}
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
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
import { Heart, Search, ShoppingCart, User } from 'lucide-react'
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

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

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

        // Map backend response to frontend SearchResult interface
        const mappedResults: SearchResult[] = response.data.products.map((product) => ({
          product_id: product.product_id,
          product_name: product.product_name,
          image_url: product.product_image || '/default-image.png', // Fallback image
          selling_price: product.product_pricing || 'N/A', // Fallback price
          slug: product.slug,
          category_slug: product.category.toLowerCase().replace(/\s+/g, '-'), // Convert category name to slug
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

  return (
    <div>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center">
                <Image src="/logo.png" alt="Logo" width={50} height={50} />
              </div>
              <span className="font-bold text-xl">Shoppersky</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/products" className="text-sm font-medium hover:text-primary">Shop</Link>
              <Link href="/vendors" className="text-sm font-medium hover:text-primary">Vendors</Link>
              <Link href="/deals" className="text-sm font-medium hover:text-primary">Deals</Link>
            </nav>
          </div>

          {/* Center Search */}
          <div className="flex-1 max-w-md mx-6 hidden sm:block relative" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products, vendors..."
                className="pl-10 pr-4"
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
                      className="flex items-center p-2 hover:bg-muted"
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
                        <div className="font-medium">{product.product_name}</div>
                        <div className="text-sm text-muted-foreground">AU${product.selling_price}</div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Wishlist */}
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center">
                    {wishlistCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative" onClick={toggleCart}>
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center">
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* User Profile */}
            <div className="relative" ref={userMenuRef}>
              <Button variant="ghost" size="icon" onClick={handleUserClick}>
                <User className="h-5 w-5" />
                {username && <span className="ml-2 text-sm">{username}</span>}
              </Button>

              {showUserMenu && isAuthenticated && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50 py-2 text-sm">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-muted"
                    onClick={() => router.push('/MyAccount')}
                  >
                    My Account
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-muted"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar />
    </div>
  )
}

export default Navbar