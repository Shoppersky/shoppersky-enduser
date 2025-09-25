// // "use client";

// // import { useEffect, useState } from "react";
// // import axiosInstance from "@/lib/axiosInstance";
// // import { Badge } from "@/components/ui/badge";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Separator } from "@/components/ui/separator";
// // import { ArrowLeft, Package, Truck, CheckCircle, Clock } from "lucide-react";
// // import Link from "next/link";
// // import useStore from "@/lib/Zustand";

// // const getStatusIcon = (status: string) => {
// //   switch (status?.toLowerCase()) {
// //     case "confirmed":
// //       return <CheckCircle className="h-5 w-5 text-green-500" />;
// //     case "pending":
// //       return <Clock className="h-5 w-5 text-yellow-500" />;
// //     case "shipped":
// //       return <Truck className="h-5 w-5 text-blue-500" />;
// //     case "delivered":
// //       return <Package className="h-5 w-5 text-green-600" />;
// //     default:
// //       return <Clock className="h-5 w-5 text-gray-500" />;
// //   }
// // };

// // const getStatusColor = (status: string) => {
// //   switch (status?.toLowerCase()) {
// //     case "confirmed":
// //       return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
// //     case "pending":
// //       return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
// //     case "shipped":
// //       return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
// //     case "delivered":
// //       return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
// //     default:
// //       return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
// //   }
// // };

// // export default function OrderDetailsPage() {
// //   const [orders, setOrders] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const { userId } = useStore();

// //   useEffect(() => {
// //     const fetchOrders = async () => {
// //       try {
// //         const res = await axiosInstance.get(`/orders/orders?user_id=${userId}`);
// //         setOrders(res.data.data || []);
// //       } catch (err) {
// //         setError("Failed to load orders");
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchOrders();
// //   }, [userId]);

// //   if (loading) {
// //     return <div className="p-8 text-center">Loading orders...</div>;
// //   }

// //   if (error) {
// //     return <div className="p-8 text-center text-red-500">{error}</div>;
// //   }
// // console.log(orders)
// //  if (!orders.length) {
// //   return (
// //     <div className="flex items-center justify-center min-h-screen bg-background">
// //       <Card className="w-full max-w-md text-center p-8">
// //         <CardContent className="flex flex-col items-center gap-4">
// //           <Package className="h-12 w-12 text-muted-foreground" />
// //           <h2 className="text-xl font-semibold">No orders found</h2>
// //           <p className="text-sm text-muted-foreground">
// //             Looks like you haven’t placed any orders yet.
// //           </p>
// //           <Link href="/products">
// //             <button className="mt-4 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
// //               Start Shopping
// //             </button>
// //           </Link>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // }


// //   return (
// //     <div className="min-h-screen bg-background">
// //       <div className="container mx-auto px-4 py-8 max-w-3xl">
// //         {/* Header */}
// //         <div className="flex items-center gap-4 mb-8">
         
// //           <h1 className="text-2xl font-bold">My Orders</h1>
// //         </div>

// //         {orders.map((order,index) => (
       
// //             <Card key={index} className="mb-6">
// //               <CardHeader className="flex flex-row items-center justify-between">
// //                 <div>
// //                   <CardTitle>Order {order.order_id}</CardTitle>
// //                   <p className="text-sm text-muted-foreground">
// //                     Payment: {order.payment_status}
// //                   </p>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   {getStatusIcon(order.order_status)}
// //                   <Badge className={getStatusColor(order.order_status)}>
// //                     {order.order_status}
// //                   </Badge>
// //                 </div>
// //               </CardHeader>

// //               <CardContent className="space-y-4">
// //                 {/* Items */}
// //                 <div className="space-y-4">
// //                   {Object.values(order.item_details || {}).map(
// //                     (item: unknown, idx) => (
// //                       <div key={idx} className="flex items-center gap-4">
// //                         <img
// //                           src={item.images?.[0] || "/placeholder.svg"}
// //                           alt={item.name}
// //                           className="w-16 h-16 object-cover rounded-md border"
// //                         />
// //                         <div className="flex-1">
// //                           <p className="font-medium">{item.name}</p>
// //                           <p className="text-sm text-muted-foreground">
// //                             Quantity: {item.quantity}
// //                           </p>
// //                         </div>
// //                       </div>
// //                     )
// //                   )}
// //                 </div>

// //                 <Separator />

// //                 {/* Total */}
// //                 <div className="flex justify-between font-medium">
// //                   <span>Total Amount</span>
// //                   <span>${order.amount.toFixed(2)}</span>
// //                 </div>

// //                 {/* Address */}
// //                 {order.address && Object.keys(order.address).length > 0 && (
// //                   <>
// //                     <Separator />
// //                     <div>
// //                       <p className="font-medium">Delivery Address</p>
// //                       <p>{order.address.first_name} {order.address.last_name}</p>
// //                       <p>{order.address.phone}</p>
// //                       <p className="text-sm text-muted-foreground">
// //                         {order.address.street}, {order.address.city},{" "}
// //                         {order.address.state} {order.address.postcode},{" "}
// //                         {order.address.country}
// //                       </p>
// //                     </div>
// //                   </>
// //                 )}

// //                  <Separator />

      
// //       {order.order_status !== "PENDING" && (
// //         <div className= "flex justify-end">
// //         <Link href={`/MyAccount/orders/${order.order_id}`}>
// //           <button className="mt-4 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
// //             View Order
// //           </button>
// //         </Link>
// //         </div>
// //       )}
// //               </CardContent>
// //             </Card>
        
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }


// "use client"

// import { useEffect, useState } from "react"
// import axiosInstance from "@/lib/axiosInstance"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"
// import { Package, Truck, CheckCircle, Clock, ShoppingBag, MapPin, Calendar, CreditCard } from "lucide-react"
// import Link from "next/link"
// import useStore from "@/lib/Zustand"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"

// const getStatusIcon = (status: string) => {
//   switch (status?.toLowerCase()) {
//     case "confirmed":
//       return <CheckCircle className="h-5 w-5 text-green-400" />
//     case "pending":
//       return <Clock className="h-5 w-5 text-yellow-400" />
//     case "shipped":
//       return <Truck className="h-5 w-5 text-blue-400" />
//     case "delivered":
//       return <Package className="h-5 w-5 text-green-400" />
//     default:
//       return <Clock className="h-5 w-5 text-muted-foreground" />
//   }
// }

// const getStatusColor = (status: string) => {
//   switch (status?.toLowerCase()) {
//     case "confirmed":
//       return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
//     case "pending":
//       return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
//     case "shipped":
//       return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
//     case "delivered":
//       return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
//     default:
//       return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
//   }
// };
// const OrderSkeleton = () => (
//   <Card className="border-border/50 bg-card/50">
//     <CardHeader>
//       <div className="flex items-center justify-between">
//         <div className="space-y-2">
//           <div className="h-5 w-32 shimmer rounded"></div>
//           <div className="h-4 w-24 shimmer rounded"></div>
//         </div>
//         <div className="h-6 w-20 shimmer rounded-full"></div>
//       </div>
//     </CardHeader>
//     <CardContent className="space-y-4">
//       <div className="flex items-center gap-4">
//         <div className="h-16 w-16 shimmer rounded-md"></div>
//         <div className="space-y-2 flex-1">
//           <div className="h-4 w-48 shimmer rounded"></div>
//           <div className="h-3 w-24 shimmer rounded"></div>
//         </div>
//       </div>
//       <Separator className="bg-border/50" />
//       <div className="flex justify-between">
//         <div className="h-4 w-24 shimmer rounded"></div>
//         <div className="h-4 w-16 shimmer rounded"></div>
//       </div>
//     </CardContent>
//   </Card>
// )

// export default function OrderDetailsPage() {
//   const [orders, setOrders] = useState<any[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const { userId } = useStore()

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axiosInstance.get(`/orders/orders?user_id=${userId}`)
//         setOrders(res.data.data || [])
//       } catch (err) {
//         setError("Failed to load orders")
//         console.error(err)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchOrders()
//   }, [userId])

//   if (loading) {
//     return (
//       <div className="space-y-6">
//         <div className="flex items-center gap-2">
//           <ShoppingBag className="h-6 w-6 text-primary" />
//           <h1 className="text-2xl font-bold">My Orders</h1>
//         </div>
//         <div className="space-y-6">
//           {[1, 2, 3].map((i) => (
//             <OrderSkeleton key={i} />
//           ))}
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <Card className="border-destructive/20 bg-destructive/5">
//         <CardContent className="p-8 text-center">
//           <Package className="h-12 w-12 text-destructive mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-destructive mb-2">Error Loading Orders</h2>
//           <p className="text-muted-foreground">{error}</p>
//         </CardContent>
//       </Card>
//     )
//   }

//   if (!orders.length) {
//     return (
//       <div className="space-y-6">
//         <div className="flex items-center gap-2">
//           <ShoppingBag className="h-6 w-6 text-primary" />
//           <h1 className="text-2xl font-bold">My Orders</h1>
//         </div>

//         <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
//           <CardContent className="p-12 text-center">
//             <div className="relative mb-6">
//               <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-full blur-xl"></div>
//               <div className="relative h-24 w-24 mx-auto bg-muted/20 rounded-full flex items-center justify-center">
//                 <ShoppingBag className="h-12 w-12 text-muted-foreground" />
//               </div>
//             </div>
//             <h2 className="text-2xl font-semibold mb-2">No orders found</h2>
//             <p className="text-muted-foreground mb-6 max-w-md mx-auto">
//               Looks like you haven&apos;t placed any orders yet. Start shopping to see your orders here.
//             </p>
//             <Button asChild className="bg-primary hover:bg-primary/90">
//               <Link href="/products">
//                 <ShoppingBag className="mr-2 h-4 w-4" />
//                 Start Shopping
//               </Link>
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-2">
//         <ShoppingBag className="h-6 w-6 text-primary" />
//         <h1 className="text-2xl font-bold">My Orders</h1>
//         <Badge variant="secondary" className="ml-2">
//           {orders.length} {orders.length === 1 ? "order" : "orders"}
//         </Badge>
//       </div>

//       <div className="space-y-6">
//         {orders.map((order, index) => (
//           <Card
//             key={index}
//             className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-200"
//           >
//             <CardHeader>
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                 <div className="space-y-1">
//                   <CardTitle className="flex items-center gap-2">
//                     <Package className="h-5 w-5 text-primary" />
//                     Order #{order.order_id}
//                   </CardTitle>
//                   <div className="flex items-center gap-4 text-sm text-muted-foreground">
//                     <div className="flex items-center gap-1">
//                       <CreditCard className="h-4 w-4" />
//                       Payment: {order.payment_status}
//                     </div>
//                     {order.created_at && (
//                       <div className="flex items-center gap-1">
//                         <Calendar className="h-4 w-4" />
//                         {new Date(order.created_at).toLocaleDateString()}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   {getStatusIcon(order.order_status)}
//                   <Badge className={cn("border", getStatusColor(order.order_status))}>{order.order_status}</Badge>
//                 </div>
//               </div>
//             </CardHeader>

//             <CardContent className="space-y-6">
//               <div className="space-y-4">
//                 <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Order Items</h4>
//                 {Object.values(order.item_details || {}).map((item: any, idx) => (
//                   <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-muted/20 border border-border/30">
//                     <div className="h-16 w-16 rounded-md overflow-hidden bg-muted/40 flex items-center justify-center">
//                       <img
//                         src={item.images?.[0] || "/placeholder.svg?height=64&width=64"}
//                         alt={item.name}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
// <div className="flex-1 min-w-0">
//   <p className="font-medium truncate">{item.name}</p>
//   <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
// </div>

//                   </div>
//                 ))}
//               </div>

//               <Separator className="bg-border/50" />

//               <div className="flex justify-between items-center p-4 rounded-lg bg-primary/5 border border-primary/20">
//                 <span className="font-medium">Total Amount</span>
//                 <span className="text-xl font-bold text-primary">${order.amount.toFixed(2)}</span>
//               </div>

//               {order.address && Object.keys(order.address).length > 0 && (
//                 <>
//                   <Separator className="bg-border/50" />
//                   <div className="space-y-2">
//                     <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
//                       <MapPin className="h-4 w-4" />
//                       Delivery Address
//                     </h4>
//                     <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
//                       <p className="font-medium">
//                         {order.address.first_name} {order.address.last_name}
//                       </p>
//                       {order.address.phone && <p className="text-sm text-muted-foreground">{order.address.phone}</p>}
//                       <p className="text-sm text-muted-foreground mt-1">
//                         {order.address.street}
//                         {order.address.apartment && `, ${order.address.apartment}`}
//                         <br />
//                         {order.address.city}, {order.address.state} {order.address.postcode}
//                         <br />
//                         {order.address.country}
//                       </p>
//                     </div>
//                   </div>
//                 </>
//               )}

//               {order.order_status !== "PENDING" && (
//                 <>
//                   <Separator className="bg-border/50" />
//                   <div className="flex justify-end">
//                     <Button asChild className="bg-primary hover:bg-primary/90">
//                       <Link href={`/MyAccount/orders/${order.order_id}`}>View Order Details</Link>
//                     </Button>
//                   </div>
//                 </>
//               )}
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }



"use client"

import { useEffect, useState } from "react"
import axiosInstance from "@/lib/axiosInstance"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  ShoppingBag,
  MapPin,
  Calendar,
  CreditCard,
} from "lucide-react"
import Link from "next/link"
import useStore from "@/lib/Zustand"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const getStatusIcon = (status: string) => {
  switch (status?.toLowerCase()) {
    case "confirmed":
      return <CheckCircle className="h-5 w-5 text-green-400" />
    case "pending":
      return <Clock className="h-5 w-5 text-yellow-400" />
    case "shipped":
      return <Truck className="h-5 w-5 text-blue-400" />
    case "delivered":
      return <Package className="h-5 w-5 text-green-400" />
    default:
      return <Clock className="h-5 w-5 text-muted-foreground" />
  }
}

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "confirmed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "shipped":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "delivered":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

export default function OrderDetailsPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { userId } = useStore()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get(`/orders/orders?user_id=${userId}`)
        setOrders(res.data.data || [])
      } catch (err) {
        setError("Failed to load orders")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [userId])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">My Orders</h1>
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-border/50 bg-card/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-5 w-32 shimmer rounded"></div>
                    <div className="h-4 w-24 shimmer rounded"></div>
                  </div>
                  <div className="h-6 w-20 shimmer rounded-full"></div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 shimmer rounded-md"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-48 shimmer rounded"></div>
                    <div className="h-3 w-24 shimmer rounded"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-destructive/20 bg-destructive/5">
        <CardContent className="p-8 text-center">
          <Package className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-destructive mb-2">
            Error Loading Orders
          </h2>
          <p className="text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (!orders.length) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">My Orders</h1>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-full blur-xl"></div>
              <div className="relative h-24 w-24 mx-auto bg-muted/20 rounded-full flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-2">No orders found</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Looks like you haven&apos;t placed any orders yet. Start shopping
              to see your orders here.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/products">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Start Shopping
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden">
      <div className="flex items-center gap-2">
        <ShoppingBag className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">My Orders</h1>
        <Badge variant="secondary" className="ml-2">
          {orders.length} {orders.length === 1 ? "order" : "orders"}
        </Badge>
      </div>

      <div className="space-y-6">
        {orders.map((order, index) => (
          <Card
            key={index}
            className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-200"
          >
            {/* Header */}
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    Order #{order.order_id}
                  </CardTitle>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CreditCard className="h-4 w-4" />
                      Payment: {order.payment_status}
                    </div>
                    {order.created_at && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(order.created_at).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.order_status)}
                  <Badge
                    className={cn("border", getStatusColor(order.order_status))}
                  >
                    {order.order_status}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            {/* Content */}
            <CardContent className="space-y-6">
              {/* Items */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  Order Items
                </h4>
                {Object.values(order.item_details || {}).map(
                  (item: any, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 rounded-lg bg-muted/20 border border-border/30"
                    >
                      <div className="h-16 w-16 rounded-md overflow-hidden bg-muted/40 flex items-center justify-center flex-shrink-0">
                        <img
                          src={
                            item.images?.[0] ||
                            "/placeholder.svg?height=64&width=64"
                          }
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
  <div className="flex-1 min-w-0">
  <p className="font-medium truncate whitespace-nowrap overflow-hidden text-ellipsis block w-50 md:w-full">
    {item.name}
  </p>
  <p className="text-sm text-muted-foreground">
    Quantity: {item.quantity}
  </p>
</div>
                    </div>
                  )
                )}
              </div>

              <Separator className="bg-border/50" />

              {/* Total */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg bg-primary/5 border border-primary/20 gap-2">
                <span className="font-medium">Total Amount</span>
                <span className="text-xl font-bold text-primary">
                  ${order.amount.toFixed(2)}
                </span>
              </div>

              {/* Address */}
              {order.address && Object.keys(order.address).length > 0 && (
                <>
                  <Separator className="bg-border/50" />
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Delivery Address
                    </h4>
                    <div className="p-4 rounded-lg bg-muted/20 border border-border/30 text-sm">
                      <p className="font-medium">
                        {order.address.first_name} {order.address.last_name}
                      </p>
                      {order.address.phone && (
                        <p className="text-muted-foreground">
                          {order.address.phone}
                        </p>
                      )}
                      <p className="text-muted-foreground mt-1">
                        {order.address.street}
                        {order.address.apartment &&
                          `, ${order.address.apartment}`}
                        <br />
                        {order.address.city}, {order.address.state}{" "}
                        {order.address.postcode}
                        <br />
                        {order.address.country}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Details button */}
              {order.order_status !== "PENDING" && order.order_status !== "CANCELLED" &&(
                <>
                  <Separator className="bg-border/50" />
                  <div className="flex justify-end">
                    <Button
                      asChild
                      className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
                    >
                      <Link href={`/MyAccount/orders/${order.order_id}`}>
                        View Order Details
                      </Link>
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
