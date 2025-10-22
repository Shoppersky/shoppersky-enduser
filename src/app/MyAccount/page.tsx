"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ChevronRight,
  User,
  Package,
  ShoppingBag,
  LogOut,
  Settings,
  Bell,
  Calendar,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Clock,
  Truck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useStore from "@/lib/Zustand"
import axiosInstance from "@/lib/axiosInstance"
import { cn } from "@/lib/utils"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import OrderDetailsPage from "@/components/orders/order-history"
import Addresses from "@/components/orders/addresses"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import DeleteAccount from "@/components/delete-account"

interface Address {
  id: string
  type: string
  default: boolean
  address: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
}

interface Order {
  order_id: string
  amount: number
  payment_status: string
  order_status: string
  item_details: { [key: string]: { name: string; quantity: number } }
  address: {
    street?: string
    apartment?: string
    city?: string
    state?: string
    postcode?: string
    country?: string
  }
  order_at?: string
}

const LoadingSkeleton = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div className="h-8 w-48 shimmer rounded-md"></div>
    </div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="border-border/50">
          <CardHeader className="pb-2">
            <div className="h-4 w-32 shimmer rounded"></div>
          </CardHeader>
          <CardContent>
            <div className="h-8 w-16 shimmer rounded mb-2"></div>
            <div className="h-3 w-24 shimmer rounded"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
)

export default function AccountPage() {
  const { userId, token, isAuthenticated, logout, checkAuth } = useStore()
  const router = useRouter()
  const [user, setUser] = useState<any>({})
  const [addresses, setAddresses] = useState<Address[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const initialTab = searchParams.get("tab") || "overview"
  const [activeTab, setActiveTab] = useState(initialTab)
  // const [isDobDisabled, setIsDobDisabled] = useState<boolean>(!!user?.date_of_birth)
  // const [isGenderDisabled, setIsGenderDisabled] = useState<boolean>(!!user?.gender)
  const [open, setOpen] = useState(false)
  const today = new Date().toISOString().split("T")[0]


// ✅ Status Colors
const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "confirmed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "shipped":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "delivered":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

  useEffect(() => {
    if (!isAuthenticated) {
      setUser({})
      setAddresses([])
      setOrders([])
    }
  }, [isAuthenticated])

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab) {
      setActiveTab(tab)
    }
  }, [searchParams])

  useEffect(() => {
    const fetchOrders = async () => {
  try {
    const res = await axiosInstance.get(`/orders/orders?user_id=${userId}`)

    const sortedOrders = (res.data.data || []).sort(
      (a: any, b: any) =>
        new Date(b.order_at).getTime() - new Date(a.order_at).getTime()
    )

    setOrders(sortedOrders)
  } catch (err) {
    setError("Failed to load orders")
    console.error(err)
  } finally {
    setIsLoading(false)
  }
}


    const fetchUser = async () => {
      if (!userId || !token) return

      try {
        const res = await axiosInstance.get(`/users/profiles/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        const userData = res.data.data
        setUser(userData)

        if (userData.address && Array.isArray(userData.address)) {
          const mappedAddresses: Address[] = userData.address.map((addr: any) => ({
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
          }))
          setAddresses(mappedAddresses)
        }
      } catch (err) {
        console.error("Failed to fetch user info:", err)
      }
    }

    fetchUser()
    fetchOrders()
  }, [userId, token])

  const handleSignOut = () => {
    logout()
    setUser({})
    router.push("/login")
  }

  const [errors, setErrors] = useState<{
    primaryPhone?: string
    date_of_birth?: string
    gender?: string
  }>({})

  const handlePersonalInfoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!userId || !token) return

    const formData = new FormData(e.currentTarget)
    const primaryPhone = formData.get("primaryPhone") as string
    const secondaryPhone = formData.get("secondaryPhone") as string
    const date_of_birth = formData.get("date_of_birth") as string
    const gender = formData.get("gender") as string

    const australianPhoneRegex = /^(?:\+?61|0)4\d{8}$|^(?:\+?61|0)[2-8]\d{8}$/
    const newErrors: typeof errors = {}

    if (!primaryPhone?.trim() && !secondaryPhone?.trim()) {
      newErrors.primaryPhone = "At least one contact number is required"
    }

    if (primaryPhone?.trim() && !australianPhoneRegex.test(primaryPhone)) {
      newErrors.primaryPhone = "Enter a valid Australian phone number"
    }

    if (!date_of_birth?.trim()) newErrors.date_of_birth = "Date of birth is required"
    if (!gender?.trim()) newErrors.gender = "Gender is required"

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    const phoneNumbers = [primaryPhone, secondaryPhone].filter(Boolean)

    const payload = {
      first_name: formData.get("firstName") as string,
      last_name: formData.get("lastName") as string,
      phone_number: phoneNumbers,
      date_of_birth,
      gender,
    }

    try {
      const res = await axiosInstance.put(`/users/profiles/${userId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      toast.success("Profile updated successfully!")
      setUser((prev: any) => ({ ...prev, ...res.data.data }))
      // if (!isDobDisabled && payload.date_of_birth) setIsDobDisabled(true)
      // if (!isGenderDisabled && payload.gender) setIsGenderDisabled(true)
    } catch (error: any) {
      console.error("Error updating profile:", error)
      toast.error(error.response?.data?.detail || "Failed to update profile. Please try again.")
    }
  }

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
    {
      name: "Settings",
      href: "/account/settings",
      icon: Settings,
      id: "settings",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div className="mb-8 flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <span className="text-foreground font-medium">My Account</span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <aside className="hidden lg:block">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="mb-6 flex items-center gap-4">
                    <Avatar className="h-16 w-16 ring-2 ring-primary/20">
                      <AvatarImage src={user?.profile_image || "/placeholder.svg"} alt={user?.username} />
                      <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                        {user?.username?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-semibold text-foreground truncate">{user?.username || "User"}</h2>
                      <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="h-2 w-2 bg-success rounded-full"></div>
                        <span className="text-xs text-muted-foreground">Active</span>
                      </div>
                    </div>
                  </div>

                  <nav className="space-y-1">
                    {accountNavigation.map((item) => (
                      <Button
                        key={item.name}
                        variant={activeTab === item.id ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start h-11 px-3",
                          activeTab === item.id && "bg-primary/10 text-primary border-primary/20",
                        )}
                        onClick={() => setActiveTab(item.id)}
                      >
                        <item.icon className="mr-3 h-4 w-4" />
                        {item.name}
                      </Button>
                    ))}
                    <Separator className="my-4 bg-border/50" />
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-11 px-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Sign Out
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </aside>

            <div className="mb-6 lg:hidden">
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user?.profile_image || "/placeholder.svg"} alt={user?.username} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user?.username?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-semibold">{user?.username}</h2>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>

                  <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-4 bg-muted/50">
                      <TabsTrigger value="overview" className="text-xs">
                        Overview
                      </TabsTrigger>
                      <TabsTrigger value="orders" className="text-xs">
                        Orders
                      </TabsTrigger>
                      <TabsTrigger value="addresses" className="text-xs">
                        Addresses
                      </TabsTrigger>
                      <TabsTrigger value="settings" className="text-xs">
                        Settings
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-8">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-lg"></div>
                    <Card className="relative border-border/50 ">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">
                              Welcome back, {user?.username || "User"}
                            </h1>
                            <p className="text-muted-foreground mt-1">Manage your account and track your orders</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {isLoading ? (
                    <LoadingSkeleton />
                  ) : (
                    <>
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-200 group">
                          <CardHeader className="pb-3">
                            <CardTitle className="flex items-center text-sm font-medium text-muted-foreground">
                              <ShoppingBag className="mr-2 h-4 w-4 text-primary" />
                              Recent Orders
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold text-foreground">{orders.length}</div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {orders.length > 0
                                ? `Last order on ${new Date(orders[0].order_at).toLocaleDateString()}`
                                : "No recent orders"}
                            </p>
                            <Button
                              variant="link"
                              className="mt-3 px-0 text-primary hover:text-primary/80"
                              onClick={() => setActiveTab("orders")}
                            >
                              View Orders →
                            </Button>
                          </CardContent>
                        </Card>

                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-200 group">
                          <CardHeader className="pb-3">
                            <CardTitle className="flex items-center text-sm font-medium text-muted-foreground">
                              <MapPin className="mr-2 h-4 w-4  text-primary" />
                              Shipping Addresses
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold text-foreground">{addresses.length}</div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {addresses.filter((a) => a.default).length} default address
                            </p>
                            <Button
                              variant="link"
                              className="mt-3 px-0  hover:text-primary/80"
                              onClick={() => setActiveTab("addresses")}
                            >
                              Manage Addresses →
                            </Button>
                          </CardContent>
                        </Card>

                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-200 group">
                          <CardHeader className="pb-3">
                            <CardTitle className="flex items-center text-sm font-medium text-muted-foreground">
                              <User className="mr-2 h-4 w-4  text-primary" />
                              Account Status
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold ">Active</div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Member since {user?.created_at ? new Date(user.created_at).getFullYear() : "2024"}
                            </p>
                            <Button
                              variant="link"
                              className="mt-3 px-0   hover:text-primary/80"
                              onClick={() => setActiveTab("settings")}
                            >
                              Edit Profile →
                            </Button>
                          </CardContent>
                        </Card>
                      </div>

                      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Package className="h-5 w-5 text-primary" />
                            Recent Orders
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {orders.length === 0 ? (
                            <div className="text-center py-8">
                              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                              <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                              <p className="text-muted-foreground mb-4">Start shopping to see your orders here</p>
                              <Button asChild>
                                <Link href="/products">Start Shopping</Link>
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {orders.slice(0, 3).map((order, index) => (
                                <div
                                  key={order.order_id}
                                  className={cn(
                                    "p-4 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors",
                                    index !== 0 && "mt-4",
                                  )}
                                >
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-3">
                                        <h3 className="font-semibold">Order #{order.order_id}</h3>
                                        
                                       <Badge className={cn("border", getStatusColor(order.order_status))}>
  {order.order_status}
</Badge>
                                      </div>
                                     <p className="text-sm text-muted-foreground">
  ${order.amount.toFixed(2)} •{" "}
  {order.order_at
    ? new Date(order.order_at).toLocaleDateString()
    : "N/A"}
</p>

                                    </div>
                                    {order.order_status !== "PENDING" && order.order_status !== "CANCELLED" && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-primary/20 hover:bg-primary/10 bg-transparent"
                                        onClick={() => router.push(`/MyAccount/orders/${order.order_id}`)}
                                      >
                                        View Details
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              ))}

                              {orders.length > 3 && (
                                <div className="text-center pt-4">
                                  <Button
                                    variant="outline"
                                    onClick={() => setActiveTab("orders")}
                                    className="border-primary/20 hover:bg-primary/10"
                                  >
                                    View All Orders
                                  </Button>
                                </div>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5 text-primary" />
                            Account Details
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-4">
                              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="text-sm text-muted-foreground">Name</p>
                                  <p className="font-medium">{user?.username || "Not set"}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="text-sm text-muted-foreground">Email</p>
                                  <p className="font-medium">{user?.email || "Not set"}</p>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="text-sm text-muted-foreground">Phone</p>
                                  <p className="font-medium">{user?.phone_number?.[0] || "Not set"}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="text-sm text-muted-foreground">Member Since</p>
                                  <p className="font-medium">
                                    {user?.created_at
                                      ? new Date(user.created_at).toLocaleDateString("en-AU", {
                                          day: "2-digit",
                                          month: "short",
                                          year: "numeric",
                                        })
                                      : "N/A"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-6">
                            <Button onClick={() => setActiveTab("settings")} className="bg-primary hover:bg-primary/90">
                              <Settings className="mr-2 h-4 w-4" />
                              Edit Profile
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && <OrderDetailsPage />}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <Addresses addresses={addresses} setAddresses={setAddresses} userId={userId} token={token} />
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Settings className="h-6 w-6 text-primary" />
                    <h1 className="text-2xl font-bold">Account Settings</h1>
                  </div>

                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Update your personal details and contact information</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-6" onSubmit={handlePersonalInfoSubmit}>
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-sm font-medium">
                              First Name
                            </Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              defaultValue={user?.first_name}
                              className="bg-muted/20 border-border/50 focus:border-primary/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-sm font-medium">
                              Last Name
                            </Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              defaultValue={user?.last_name || ""}
                              className="bg-muted/20 border-border/50 focus:border-primary/50"
                            />
                          </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                              Email Address
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              defaultValue={user?.email}
                              disabled
                              className="bg-muted/10 border-border/30 text-muted-foreground"
                            />
                            <p className="text-xs text-muted-foreground">
                              Email cannot be changed for security reasons
                            </p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="primaryPhone" className="text-sm font-medium">
                              Primary Contact
                            </Label>
                            <Input
                              id="primaryPhone"
                              name="primaryPhone"
                              type="tel"
                              defaultValue={user.phone_number?.[0] || ""}
                              className="bg-muted/20 border-border/50 focus:border-primary/50"
                            />
                            {errors.primaryPhone && <p className="text-destructive text-sm">{errors.primaryPhone}</p>}
                          </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="secondaryPhone" className="text-sm font-medium">
                              Secondary Contact
                            </Label>
                            <Input
                              id="secondaryPhone"
                              name="secondaryPhone"
                              type="tel"
                              defaultValue={user.phone_number?.[1] || ""}
                              className="bg-muted/20 border-border/50 focus:border-primary/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dob" className="text-sm font-medium">
                              Date of Birth
                            </Label>
                            <Input
                              id="dob"
                              name="date_of_birth"
                              type="date"
                              defaultValue={user?.date_of_birth || ""}
                              // disabled={isDobDisabled}
                              max={today}
                              className={cn(
                                "bg-muted/20 border-border/50 focus:border-primary/50",
                                // isDobDisabled && "bg-muted/10 text-muted-foreground",
                              )}
                            />
                            {errors.date_of_birth && <p className="text-destructive text-sm">{errors.date_of_birth}</p>}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="gender" className="text-sm font-medium">
                            Gender
                          </Label>
                          <select
                            id="gender"
                            name="gender"
                            defaultValue={user?.gender || ""}
                            // disabled={isGenderDisabled}
                            className={cn(
                              "w-full rounded-md border px-3 py-2 bg-muted/20 border-border/50 focus:border-primary/50",
                              // isGenderDisabled && "bg-muted/10 text-muted-foreground",
                            )}
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="unspecified">Unspecified</option>
                          </select>
                          {errors.gender && <p className="text-destructive text-sm">{errors.gender}</p>}
                        </div>

                        <Button type="submit" className="bg-primary hover:bg-primary/90">
                          <User className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Security</CardTitle>
                      <CardDescription>Manage your account password and security settings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-muted/20">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Settings className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">Password</h3>
                              {/* <p className="text-sm text-muted-foreground">Last updated: Never</p> */}
                            </div>
                          </div>
                          <Button onClick={() => setOpen(true)} className="bg-primary hover:bg-primary/90">
                            Update Password
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          For security reasons, password updates are handled on a separate secure page.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Notifications</CardTitle>
                      <CardDescription>Manage your notification preferences</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {[
                          {
                            title: "Order Updates",
                            description: "Receive updates about your orders",
                            enabled: true,
                          },
                          {
                            title: "Promotional Emails",
                            description: "Receive emails about new products and deals",
                            enabled: false,
                          },
                          {
                            title: "Account Activity",
                            description: "Receive notifications about account activity",
                            enabled: true,
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-muted/20"
                          >
                            <div className="flex items-center gap-3">
                              <Bell className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <h3 className="font-medium">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </div>
                            </div>
                            <div
                              className={cn(
                                "flex h-6 w-11 items-center rounded-full p-1 transition-colors",
                                item.enabled ? "bg-primary" : "bg-muted",
                              )}
                            >
                              <div
                                className={cn(
                                  "h-4 w-4 rounded-full bg-white transition-transform",
                                  item.enabled ? "translate-x-5" : "translate-x-0",
                                )}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-destructive/20 bg-destructive/5">
                    <CardHeader>
                      <CardTitle className="text-destructive">Danger Zone</CardTitle>
                      <CardDescription>Permanently delete your account and all data</CardDescription>
                    </CardHeader>
                    <CardContent>
  <p className="mb-4 text-sm text-muted-foreground">
    Once you delete your account, there is no going back. Please be certain.
  </p>
  <DeleteAccount userId={userId} />
</CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[475px] border-border/50 bg-card/95 backdrop-blur-sm">
              <DialogHeader>
                <DialogTitle>Update Your Password</DialogTitle>
                <DialogDescription>
                  Are you sure you want to update your password? You will be redirected to a secure page.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="border-border/50 bg-transparent">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  onClick={() => {
                    setOpen(false)
                    router.push("/update-password")
                  }}
                  className="bg-primary hover:bg-primary/90"
                >
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  )
}
