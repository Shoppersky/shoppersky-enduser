'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronRight,
  User,
  Package,
  ShoppingBag,
  CreditCard,
  Heart,
  LogOut,
  Settings,
  Bell,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import Image from 'next/image';
import useStore from '@/lib/Zustand';
import axiosInstance from '@/lib/axiosInstance';
import { AxiosError } from 'axios';
import { cn } from '@/lib/utils'; // Assuming a utility like `cn` for classNames

// Sample order, payment, and wishlist data (replace with API data in production)
const orders = [
  {
    id: 'ORD-001',
    date: '2023-06-12',
    status: 'Delivered',
    total: 129.99,
    items: [
      {
        id: '1',
        name: 'Minimalist Desk Lamp',
        price: 49.99,
        quantity: 1,
        image: '/images/placeholder.svg?height=80&width=80',
      },
      {
        id: '2',
        name: 'Leather Weekender Bag',
        price: 79.99,
        quantity: 1,
        image: '/images/placeholder.svg?height=80&width=80',
      },
    ],
  },
];

const paymentMethods = [
  {
    id: '1',
    type: 'Visa',
    default: true,
    lastFour: '4242',
    expiryDate: '04/25',
    name: 'John Doe',
  },
];

const wishlistItems = [
  {
    id: '1',
    name: 'Smart Watch',
    price: 199.99,
    image: '/images/placeholder.svg?height=80&width=80',
    inStock: true,
  },
];

interface Address {
  id: string;
  type: string;
  default: boolean;
  name: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  joinDate?: string;
  user_address?: Address;
  delivery_address?: Address;
}

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('overview');
//   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
  const { userId, token, isAuthenticated, logout, checkAuth } = useStore();
  const router = useRouter();
  const [user,SetUser]=useState( )
  // Fetch user profile from FastAPI
// useEffect(() => {
//   async function fetchUserProfile() {
//     // if (!isAuthenticated || !userId || !token) {
//     //   console.log(
//     //     'Not authenticated or missing userId/token, redirecting to login'
//     //   );
//     //   router.push('/login');
//     //   return;
//     // }

//     // Instead of API call, use static data
//     setIsLoading(true);
//     setError(null);

   

//     setUserProfile({
//       name: staticProfileData.user_fullname,
//       email: staticProfileData.user_email,
//       avatar:
//         staticProfileData.user_profile_img ||
//         '/images/placeholder.svg?height=40&width=40',
//       joinDate: 'Jan 1, 2024',
//       user_address: {
//         id: '1',
//         type: 'Home',
//         default: true,
//         name: staticProfileData.user_fullname,
//         address: staticProfileData.user_address.street,
//         apartment: staticProfileData.user_address.apartment,
//         city: staticProfileData.user_address.city,
//         state: staticProfileData.user_address.state,
//         zipCode: staticProfileData.user_address.postal_code,
//         country: staticProfileData.user_address.country,
//         phone: staticProfileData.user_address.phone,
//       },
//       delivery_address: {
//         id: '2',
//         type: 'Delivery',
//         default: false,
//         name: staticProfileData.user_fullname,
//         address: staticProfileData.delivery_address.street,
//         apartment: staticProfileData.delivery_address.apartment,
//         city: staticProfileData.delivery_address.city,
//         state: staticProfileData.delivery_address.state,
//         zipCode: staticProfileData.delivery_address.postal_code,
//         country: staticProfileData.delivery_address.country,
//         phone: staticProfileData.delivery_address.phone,
//       },
//     });

//     setIsLoading(false);
//   }

// //   checkAuth();
//  fetchUserProfile(); // Avoid ESLint warning for unhandled promise
// }, []);

 const userProfile = {
      name: 'Vineetha Sharma',
      user_email: 'vineetha@example.com',
      user_profile_img: '/images/vineetha.jpg',
      user_address: {
        street: '123 Rainbow Road',
        apartment: 'Apt 4B',
        city: 'Hyderabad',
        state: 'Telangana',
        postal_code: '500081',
        country: 'India',
        phone: '+91 9876543210',
      },
      delivery_address: {
        street: '456 Delivery Lane',
        apartment: 'Suite 10',
        city: 'Hyderabad',
        state: 'Telangana',
        postal_code: '500081',
        country: 'India',
        phone: '+91 9123456780',
      },
    };
  // Sign-out handler
  const handleSignOut = () => {
    logout();
    console.log(
      'Signed out, localStorage:',
      localStorage.getItem('auth-storage')
    );
    router.push('/login');
  };
  useEffect(() => {
    const fetchUser = async () => {
      if (!userId || !token) return

      try {
        const res = await axiosInstance.get(`/users/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        SetUser(res.data.data)
      } catch (err) {
        console.error('Failed to fetch user info:', err)
      }
    }

    fetchUser()
  }, [userId, token])
  // Form submission handlers
  const handlePersonalInfoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add logic to update personal information via API
    console.log('Personal info submitted');
  };

  const handlePasswordUpdateClick = () => {
    const confirmed = window.confirm('Are you sure you want to update your password? You will be redirected to a secure password update page.');
    if (confirmed) {
      router.push('/update-password');
    }
  };

  const accountNavigation = [
    { name: 'Overview', href: '/account', icon: User, id: 'overview' },
    {
      name: 'Orders',
      href: '/account/orders',
      icon: ShoppingBag,
      id: 'orders',
    },
    {
      name: 'Addresses',
      href: '/account/addresses',
      icon: Package,
      id: 'addresses',
    },
    {
      name: 'Payment Methods',
      href: '/account/payment',
      icon: CreditCard,
      id: 'payment',
    },
    {
      name: 'Wishlist',
      href: '/account/wishlist',
      icon: Heart,
      id: 'wishlist',
    },
    {
      name: 'Settings',
      href: '/account/settings',
      icon: Settings,
      id: 'settings',
    },
  ];

  // Fallback for unauthenticated or loading state
//   if (!isAuthenticated) {
//     return <div>Redirecting to login...</div>;
//   }

//   if (isLoading || !userProfile) {
//     return <div>Loading account details...</div>;
//   }

  // Dynamic addresses from API or fallback to static data
  const addresses = [
    ...(userProfile?.user_address ? [userProfile.user_address] : []),
    ...(userProfile?.delivery_address ? [userProfile.delivery_address] : []),
  ].length
    ? [
        ...(userProfile?.user_address ? [userProfile.user_address] : []),
        ...(userProfile?.delivery_address ? [userProfile.delivery_address] : []),
      ]
    : [
        {
          id: '1',
          type: 'Home',
          default: true,
          name: userProfile?.name,
          address: '123 Main Street',
          apartment: 'Apt 4B',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'United States',
          phone: '(555) 123-4567',
        },
        {
          id: '2',
          type: 'Work',
          default: false,
          name: userProfile?.name,
          address: '456 Business Ave',
          apartment: 'Suite 200',
          city: 'New York',
          state: 'NY',
          zipCode: '10002',
          country: 'United States',
          phone: '(555) 987-6543',
        },
      ];

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div className="mb-6 flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="mx-1 h-4 w-4" />
            <span className="text-foreground">My Account</span>
          </div>

          {/* {error && (
            <div className="mb-6 rounded-md bg-red-50 p-4 text-red-600">
              {error}
            </div>
          )} */}

          <div className="grid gap-8 md:grid-cols-[240px_1fr]">
            {/* Sidebar Navigation */}
            <aside className="hidden md:block">
              <div className="mb-8 flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={userProfile?.avatar}
                    alt={userProfile?.name}
                  />
                  <AvatarFallback>{userProfile?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-semibold">{user?.username}</h2>
                  <p className="text-sm text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </div>

              <nav className="flex flex-col space-y-1">
                {accountNavigation.map((item) => (
                  <Button
                    key={item.name}
                    variant={activeTab === item.id ? 'secondary' : 'ghost'}
                    className="justify-start"
                    onClick={() => setActiveTab(item.id)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Button>
                ))}
                <Separator className="my-2" />
                <Button
                  variant="ghost"
                  className="justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </nav>
            </aside>

            {/* Mobile Navigation */}
            <div className="mb-6 md:hidden">
              <Tabs
                defaultValue="overview"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="mb-4 grid grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="more">More</TabsTrigger>
                </TabsList>

                {activeTab === 'more' && (
                  <div className="mt-4 space-y-1">
                    {accountNavigation.slice(3).map((item) => (
                      <Button
                        key={item.name}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setActiveTab(item.id)}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                      </Button>
                    ))}
                    <Separator className="my-2" />
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                )}
              </Tabs>
            </div>

            {/* Main Content */}
            <div>
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Account Overview</h1>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hidden md:flex"
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center text-sm font-medium">
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Recent Orders
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {orders.length}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Last order on {orders[0].date}
                        </p>
                        <Button
                          variant="link"
                          className="mt-2 px-0"
                          onClick={() => setActiveTab('orders')}
                        >
                          View Orders
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center text-sm font-medium">
                          <Package className="mr-2 h-4 w-4" />
                          Shipping Addresses
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {addresses.length}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {addresses.filter((a) => a.default).length} default
                          address
                        </p>
                        <Button
                          variant="link"
                          className="mt-2 px-0"
                          onClick={() => setActiveTab('addresses')}
                        >
                          Manage Addresses
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center text-sm font-medium">
                          <Heart className="mr-2 h-4 w-4" />
                          Wishlist
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {wishlistItems.length}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {wishlistItems.filter((item) => item.inStock).length}{' '}
                          items in stock
                        </p>
                        <Button
                          variant="link"
                          className="mt-2 px-0"
                          onClick={() => setActiveTab('wishlist')}
                        >
                          View Wishlist
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Recent Orders</h2>
                    <div className="rounded-md border">
                      {orders.slice(0, 2).map((order, index) => (
                        <div
                          key={order.id}
                          className={cn('p-4', index !== 0 && 'border-t')}
                        >
                          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{order.id}</h3>
                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-600">
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Ordered on {order.date} • $
                                {order.total.toFixed(2)}
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              View Order
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {orders.length > 2 && (
                      <div className="text-center">
                        <Button
                          variant="link"
                          onClick={() => setActiveTab('orders')}
                        >
                          View All Orders
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Account Details</h2>
                    <Card>
                      <CardContent className="p-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <div className="text-sm text-muted-foreground">
                              Name
                            </div>
                            <div>{user?.username}</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="text-sm text-muted-foreground">
                              Email
                            </div>
                            <div>{user?.email}</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="text-sm text-muted-foreground">
                              Member Since
                            </div>
                            <div>{userProfile.joinDate}</div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4"
                          onClick={() => setActiveTab('settings')}
                        >
                          Edit Profile
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <h1 className="text-2xl font-bold">Order History</h1>

                  <div className="rounded-md border">
                    {orders.map((order, index) => (
                      <div
                        key={order.id}
                        className={cn('p-6', index !== 0 && 'border-t')}
                      >
                        <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{order.id}</h3>
                              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-600">
                                {order.status}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Ordered on {order.date} • $
                              {order.total.toFixed(2)}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Track Order
                            </Button>
                            <Button variant="outline" size="sm">
                              View Invoice
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-4"
                            >
                              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                                <Image
                                  src={item.image || '/placeholder.svg'}
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                                  width={64}
                                  height={64}
                                />
                              </div>
                              <div className="flex flex-1 flex-col">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Qty: {item.quantity} • $
                                  {item.price.toFixed(2)} each
                                </p>
                              </div>
                              <Button variant="ghost" size="sm">
                                Buy Again
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">My Addresses</h1>
                    <Button>Add New Address</Button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {addresses.map((address) => (
                      <Card key={address.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-medium">
                              {address.type}
                            </CardTitle>
                            {address.default && (
                              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                                Default
                              </span>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-1">
                            <p>{address.name}</p>
                            <p>{address.address}</p>
                            {address.apartment && <p>{address.apartment}</p>}
                            <p>
                              {address.city}, {address.state} {address.zipCode}
                            </p>
                            <p>{address.country}</p>
                            <p>{address.phone}</p>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            {!address.default && (
                              <Button variant="outline" size="sm">
                                Set as Default
                              </Button>
                            )}
                            {!address.default && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500 hover:bg-red-50 hover:text-red-600"
                              >
                                Delete
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment Methods Tab */}
              {activeTab === 'payment' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Payment Methods</h1>
                    <Button>Add Payment Method</Button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {paymentMethods.map((method) => (
                      <Card key={method.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-medium">
                              {method.type} •••• {method.lastFour}
                            </CardTitle>
                            {method.default && (
                              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                                Default
                              </span>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-1">
                            <p>{method.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Expires {method.expiryDate}
                            </p>
                          </div>
                          <div className="mt-4 flex gap-2">
                            {!method.default && (
                              <Button variant="outline" size="sm">
                                Set as Default
                              </Button>
                            )}
                            {!method.default && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500 hover:bg-red-50 hover:text-red-600"
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div className="space-y-6">
                  <h1 className="text-2xl font-bold">My Wishlist</h1>

                  <div className="rounded-md border">
                    {wishlistItems.map((item, index) => (
                      <div
                        key={item.id}
                        className={cn('p-4', index !== 0 && 'border-t')}
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                            <Image
                              src={item.image || '/placeholder.svg'}
                              alt={item.name}
                              className="h-full w-full object-cover"
                              width={64}
                              height={64}
                            />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <h4 className="font-medium">{item.name}</h4>
                            <div className="flex items-center justify-between">
                              <p className="font-medium">
                                ${item.price.toFixed(2)}
                              </p>
                              <span
                                className={cn(
                                  'text-xs',
                                  item.inStock
                                    ? 'text-green-600'
                                    : 'text-red-500'
                                )}
                              >
                                {item.inStock ? 'In Stock' : 'Out of Stock'}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" disabled={!item.inStock}>
                              Add to Cart
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:bg-red-50 hover:text-red-600"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h1 className="text-2xl font-bold">Account Settings</h1>

                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your personal details
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form
                        className="space-y-4"
                        onSubmit={handlePersonalInfoSubmit}
                      >
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <label
                              htmlFor="firstName"
                              className="text-sm font-medium"
                            >
                              First Name
                            </label>
                            <input
                              id="firstName"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              defaultValue={
                                user?.first_name
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <label
                              htmlFor="lastName"
                              className="text-sm font-medium"
                            >
                              Last Name
                            </label>
                            <input
                              id="lastName"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              defaultValue={
                                user?.last_name||''
                              }
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            defaultValue={user.email}
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="phone"
                            className="text-sm font-medium"
                          >
                            Phone Number
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            defaultValue={user.phone_number || '1234567890'}
                          />
                        </div>
                        <Button type="submit">Save Changes</Button>
                      </form>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Password</CardTitle>
                      <CardDescription>Manage your account password securely</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h3 className="font-medium">Password</h3>
                            <p className="text-sm text-muted-foreground">
                              Last updated: Never
                            </p>
                          </div>
                          <Button onClick={handlePasswordUpdateClick}>
                            Update Password
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          For security reasons, password updates are handled on a separate secure page.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Notifications</CardTitle>
                      <CardDescription>
                        Manage your notification preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Order_updates</h3>
                            <p className="text-sm text-muted-foreground">
                              Receive updates about your orders
                            </p>
                          </div>
                          <div className="flex h-6 w-11 items-center rounded-full bg-primary p-1">
                            <div className="h-4 w-4 rounded-full bg-white transition-transform translate-x-5" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Promotional Emails</h3>
                            <p className="text-sm text-muted-foreground">
                              Receive emails about new products and deals
                            </p>
                          </div>
                          <div className="flex h-6 w-11 items-center rounded-full bg-muted p-1">
                            <div className="h-4 w-4 rounded-full bg-muted-foreground transition-transform" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Account Activity</h3>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications about account activity
                            </p>
                          </div>
                          <div className="flex h-6 w-11 items-center rounded-full bg-primary p-1">
                            <div className="h-4 w-4 rounded-full bg-white transition-transform translate-x-5" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Delete Account</CardTitle>
                      <CardDescription>
                        Permanently delete your account and all data
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-sm text-muted-foreground">
                        Once you delete your account, there is no going back.
                        Please be certain.
                      </p>
                      <Button variant="destructive">Delete Account</Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
