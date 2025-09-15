"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CheckCircle, Clock, Package, Truck, Star } from "lucide-react";
import Link from "next/link";

const getStatusIcon = (status: string) => {
  switch (status?.toLowerCase()) {
    case "confirmed":
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    case "pending":
      return <Clock className="h-6 w-6 text-yellow-500" />;
    case "shipped":
      return <Truck className="h-6 w-6 text-blue-500" />;
    case "delivered":
      return <Package className="h-6 w-6 text-green-600" />;
    default:
      return <Clock className="h-6 w-6 text-gray-500" />;
  }
};

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

// ⭐ Interactive Rating Component
const RatingStars = ({
  rating,
  onRate,
}: {
  rating: number;
  onRate: (val: number) => void;
}) => {
  return (
    <div className="flex items-center gap-1 cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-6 h-6 transition ${
            star <= rating
              ? "text-yellow-500 fill-yellow-500"
              : "text-gray-300 hover:text-yellow-400"
          }`}
          onClick={() => onRate(star)}
        />
      ))}
    </div>
  );
};

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Store ratings for each item
  const [ratings, setRatings] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosInstance.get(`/orders/orders/${orderId}`);
        setOrder(res.data.data);
      } catch (err) {
        setError("Failed to load order details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (orderId) fetchOrder();
  }, [orderId]);

  const handleRate = (idx: number, value: number) => {
    setRatings((prev) => ({ ...prev, [idx]: value }));
    // TODO: send rating to API if needed
    console.log(`Rated item ${idx} with ${value} stars`);
  };

  if (loading) return <div className="p-8 text-center">Loading order...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!order) return <div className="p-8 text-center">Order not found</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/MyAccount?tab=orders">
            <ArrowLeft className="h-6 w-6 mr-2 cursor-pointer hover:text-primary transition" />
          </Link>
          <h1 className="text-2xl font-bold">Order #{order.order_id}</h1>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Payment: {order.payment_status}</CardTitle>
            <div className="flex items-center gap-2">
              {getStatusIcon(order.order_status)}
              <Badge className={getStatusColor(order.order_status)}>
                {order.order_status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Items */}
            <div className="space-y-6">
              {Object.values(order.item_details || {}).map((item: any, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-6 p-3 rounded-lg hover:bg-accent transition"
                >
                  <img
                    src={item.images?.[0] || "/placeholder.svg"}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md border"
                  />
                  <div className="flex-1 space-y-2">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                    {/* Ask user to rate product */}
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground">
                        Rate this product:
                      </span>
                      <RatingStars
                        rating={ratings[idx] || 0}
                        onRate={(val) => handleRate(idx, val)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            {/* Total */}
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total Amount</span>
              <span>${order.amount?.toFixed(2)}</span>
            </div>

            {/* Address */}
            {order.address && Object.keys(order.address).length > 0 && (
              <>
                <Separator />
                <div className="space-y-2">
                  <p className="font-semibold text-lg">Delivery Address</p>
                  <div className="text-sm text-muted-foreground leading-relaxed border rounded-md p-3 bg-accent/30">
                    <p>{order.address.street}</p>
                    <p>
                      {order.address.city}, {order.address.state}{" "}
                      {order.address.postcode}
                    </p>
                    <p>{order.address.country}</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
