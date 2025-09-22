"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import useStore from "@/lib/Zustand";
import axiosInstance from "@/lib/axiosInstance";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import OrderDetailsPage from "@/components/orders/order-history";
import Addresses from "@/components/orders/addresses";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const paymentMethods = [
  {
    id: "1",
    type: "Visa",
    default: true,
    lastFour: "4242",
    expiryDate: "04/25",
    name: "John Doe",
  },
];

// const wishlistItems = [
//   {
//     id: "1",
//     name: "Smart Watch",
//     price: 199.99,
//     image: "/images/images/placeholder.svg?height=80&width=80",
//     inStock: true,
//   },
// ];

interface Address {
  id: string;
  type: string;
  default: boolean;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

interface Order {
  order_id: string;
  amount: number;
  payment_status: string;
  order_status: string;
  item_details: { [key: string]: { name: string; quantity: number } };
  address: {
    street?: string;
    apartment?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
  created_at?: string;
}

export default function AccountPage() {
  const { userId, token, isAuthenticated, logout, checkAuth } = useStore();
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "overview";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isDobDisabled, setIsDobDisabled] = useState<boolean>(
    !!user?.date_of_birth
  );
  const [isGenderDisabled, setIsGenderDisabled] = useState<boolean>(
    !!user?.gender
  );
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    setOpen(false);
    router.push("/update-password");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setUser({});
      setAddresses([]);
      setOrders([]);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // const userProfile = {
  //   name: "Vineetha Sharma",
  //   user_email: "vineetha@example.com",
  //   user_profile_img: "/images/vineetha.jpg",
  // };

  // Fetch user and addresses
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get(
          `/orders/orders?user_id=${userId}`
        );
        setOrders(response.data.data);
      } catch (error: any) {
        console.error("Error fetching orders:", error);
        const errorMessage =
          error.response?.data?.detail ||
          error.message ||
          "Failed to fetch orders";
        setError(errorMessage);
        console.log("error fetching orders");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchUser = async () => {
      if (!userId || !token) return;

      try {
        const res = await axiosInstance.get(`/users/profiles/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = res.data.data;
        setUser(userData);

        // Map backend "address" array into your Address[] shape
        if (userData.address && Array.isArray(userData.address)) {
          const mappedAddresses: Address[] = userData.address.map(
            (addr: any) => ({
              id: String(addr.id),
              type: addr.label,
              email: addr.details.email,
              first_name: addr.details.first_name,
              last_name: addr.details.last_name,
              default: addr.is_default,
              address: addr.details.street,
              apartment: addr.details.apartment || "",
              city: addr.details.city,
              state: addr.details.state,
              zipCode: addr.details.postcode,
              country: addr.details.country,
              phone: addr.details.phone || userData.phone_number || "",
            })
          );
          setAddresses(mappedAddresses);
        }
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    };

    fetchUser();
    fetchOrders();
  }, [userId, token]);

  // Sign-out handler
  const handleSignOut = () => {
    logout();
    setUser({}); // clear user data on logout
    router.push("/login");
  };

  const handlePersonalInfoSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!userId || !token) return;

    const formData = new FormData(e.currentTarget);

    const payload = {
      first_name: formData.get("firstName") as string,
      last_name: formData.get("lastName") as string,
      phone_number: [
        (formData.get("primaryPhone") as string) || "",
        (formData.get("secondaryPhone") as string) || "",
      ],
      date_of_birth: formData.get("date_of_birth"),
      gender: formData.get("gendar"),
    };

    try {
      const res = await axiosInstance.put(
        `/users/profiles/${userId}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Profile updated successfully!");
      setUser((prev: any) => ({ ...prev, ...res.data.data }));
      if (!isDobDisabled && payload.date_of_birth) setIsDobDisabled(true);
      if (!isGenderDisabled && payload.gender) setIsGenderDisabled(true);
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(
        error.response?.data?.detail ||
          "Failed to update profile. Please try again."
      );
    }
  };

  const accountNavigation = [
    { name: "Overview", href: "/account", icon: User, id: "overview" },
    {
      name: "Orders",
      href: "/account/orders",
      icon: ShoppingBag,
      id: "orders",
    },
    {
      name: "Addresses",
      href: "/account/addresses",
      icon: Package,
      id: "addresses",
    },
    // {
    //   name: "Payment Methods",
    //   href: "/account/payment",
    //   icon: CreditCard,
    //   id: "payment",
    // },
    // {
    //   name: "Wishlist",
    //   href: "/account/wishlist",
    //   icon: Heart,
    //   id: "wishlist",
    // },
    {
      name: "Settings",
      href: "/account/settings",
      icon: Settings,
      id: "settings",
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

          <div className="grid gap-8 md:grid-cols-[240px_1fr]">
            {/* Sidebar Navigation */}
            <aside className="hidden md:block">
              <div className="mb-8 flex items-center gap-3">
                {/* <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={userProfile?.user_profile_img}
                    alt={userProfile?.name}
                  />
                  <AvatarFallback>{userProfile?.name.charAt(0)}</AvatarFallback>
                </Avatar> */}
                <div>
                  <h2 className="text-lg font-semibold">{user?.username}</h2>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>

              <nav className="flex flex-col space-y-1">
                {accountNavigation.map((item) => (
                  <Button
                    key={item.name}
                    variant={activeTab === item.id ? "secondary" : "ghost"}
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

                {activeTab === "more" && (
                  <div className="mt-4 space-y-1">
                    {accountNavigation.slice(2).map((item) => (
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
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Account Overview</h1>
                    {/* <Button
                      variant="outline"
                      size="sm"
                      className="hidden md:flex"
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Button> */}
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
                          {orders.length > 0
                            ? `Last order on ${new Date(orders[0].created_at).toLocaleDateString()}`
                            : "No recent orders"}
                        </p>

                        <Button
                          variant="link"
                          className="mt-2 px-0"
                          onClick={() => setActiveTab("orders")}
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
                          onClick={() => setActiveTab("addresses")}
                        >
                          Manage Addresses
                        </Button>
                      </CardContent>
                    </Card>

                    {/* <Card>
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
                          {wishlistItems.filter((item) => item.inStock).length}{" "}
                          items in stock
                        </p>
                        <Button
                          variant="link"
                          className="mt-2 px-0"
                          onClick={() => setActiveTab("wishlist")}
                        >
                          View Wishlist
                        </Button>
                      </CardContent>
                    </Card> */}
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Recent Orders</h2>
                    <div className="rounded-md border">
                      {orders.slice(0, 2).map((order, index) => (
                        <div
                          key={order.order_id}
                          className={cn("p-4", index !== 0 && "border-t")}
                        >
                          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">
                                  {order.order_id}
                                </h3>
                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-600">
                                  {order.order_status}
                                </span>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                router.push(
                                  `/MyAccount/orders/${order.order_id}`
                                )
                              }
                            >
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
                          onClick={() => setActiveTab("orders")}
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
                            <div>
                              {user?.created_at
                                ? new Date(user.created_at).toLocaleDateString(
                                    "en-AU",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )
                                : "N/A"}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4"
                          onClick={() => setActiveTab("settings")}
                        >
                          Edit Profile
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && <OrderDetailsPage />}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <Addresses
                  addresses={addresses}
                  setAddresses={setAddresses}
                  userId={userId}
                  token={token}
                />
              )}
              {/* Payment Methods Tab */}
              {activeTab === "payment" && (
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
              {/* {activeTab === "wishlist" && (
                <div className="space-y-6">
                  <h1 className="text-2xl font-bold">My Wishlist</h1>
                  <div className="rounded-md border">
                    {wishlistItems.map((item, index) => (
                      <div
                        key={item.id}
                        className={cn("p-4", index !== 0 && "border-t")}
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                            <Image
                              src={item.image || "/images/placeholder.svg"}
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
                                  "text-xs",
                                  item.inStock
                                    ? "text-green-600"
                                    : "text-red-500"
                                )}
                              >
                                {item.inStock ? "In Stock" : "Out of Stock"}
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
              )} */}

              {/* Settings Tab */}
              {activeTab === "settings" && (
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
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              defaultValue={user?.first_name}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              defaultValue={user?.last_name || ""}
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              defaultValue={user?.email}
                              disabled
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="primaryPhone">
                              Primary Contact
                            </Label>
                            <Input
                              id="primaryPhone"
                              name="primaryPhone"
                              type="tel"
                              defaultValue={user.phone_number?.[0] || ""}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="secondaryPhone">
                              Secondary Contact
                            </Label>
                            <Input
                              id="secondaryPhone"
                              name="secondaryPhone"
                              type="tel"
                              defaultValue={user.phone_number?.[1] || ""}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input
                              id="dob"
                              name="date_of_birth"
                              type="date"
                              defaultValue={user?.date_of_birth || ""}
                              disabled={isDobDisabled}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender</Label>
                          <select
                            id="gender"
                            name="gender"
                            defaultValue={user?.gender || ""}
                            disabled={isGenderDisabled}
                            className="w-full rounded-md border border-input px-3 py-2"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="unspecified">Unspecified</option>
                          </select>
                        </div>

                        <Button type="submit">Save Changes</Button>
                      </form>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Password</CardTitle>
                      <CardDescription>
                        Manage your account password securely
                      </CardDescription>
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
                         <Button  onClick={handleOpen}>
        Update Password
      </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          For security reasons, password updates are handled on
                          a separate secure page.
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
                            <h3 className="font-medium">Order Updates</h3>
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
          <Dialog open={open} onOpenChange={setOpen}>
      
        <DialogContent className="sm:max-w-[475px]">
          <DialogHeader>
            <DialogTitle>Update Your Password</DialogTitle>
            <DialogDescription>
              Are you sure you want to update your password? You will be redirected to a secure page.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button onClick={handleConfirm}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
        </div>
      </main>
    </div>
  );
}
