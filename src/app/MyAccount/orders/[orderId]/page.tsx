"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Package,
  Truck,
  Star,
} from "lucide-react";
import Link from "next/link";
import useStore from "@/lib/Zustand";

// ✅ Status Icon
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

// ⭐ Interactive Rating Component
const RatingStars = ({
  rating,
  onRate,
  readOnly = false,
}: {
  rating: number;
  onRate?: (val: number) => void;
  readOnly?: boolean;
}) => {
  return (
    <div className="flex items-center gap-1 cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-6 h-6 transition ${
            star <= rating
              ? "text-yellow-500 fill-yellow-500"
              : readOnly
              ? "text-gray-300"
              : "text-gray-300 hover:text-yellow-400"
          }`}
          onClick={() => !readOnly && onRate?.(star)}
        />
      ))}
    </div>
  );
};

// ⭐ Feedback type
type Feedback = {
  rating: number;
  comment: string;
  submitted: boolean;
};

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useStore();

  // Combined feedback state
  const [feedbacks, setFeedbacks] = useState<Record<number, Feedback>>({});

 useEffect(() => {
  const fetchOrder = async () => {
    try {
      const res = await axiosInstance.get(`/orders/orders/${orderId}`);
      setOrder(res.data.data);

      // Initialize feedbacks with existing user reviews
      const initialFeedbacks: Record<number, Feedback> = {};
      Object.entries(res.data.data.item_details || {}).forEach(
        ([productId, item]: [string, any], idx) => {
          // Assuming each item has a "user_rating" object if the user has already rated
          const userRating = item.user_rating; // { rating: 4, comment: "..." }
          initialFeedbacks[idx] = {
            rating: userRating?.rating || 0,
            comment: userRating?.comment || "",
            submitted: !!userRating,
          };
        }
      );

      setFeedbacks(initialFeedbacks);

    } catch (err) {
      setError("Failed to load order details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  if (orderId) fetchOrder();
}, [orderId]);


  const handleSubmitFeedback = async (idx: number, item: any, productId: string) => {
    const feedback = feedbacks[idx];
    if (!feedback) return;

    try {
      const payload = {
        user_id: userId,
        vendor_id: productId, // adjust if vendor_id is separate
        rating: feedback.rating,
        comment: feedback.comment,
      };

      const res = await axiosInstance.post(
        `/product_ratings/products/${productId}/ratings`,
        payload
      );

      console.log("✅ Feedback submitted:", res.data);

      // Mark as submitted
      setFeedbacks((prev) => ({
        ...prev,
        [idx]: { ...prev[idx], submitted: true },
      }));
    } catch (err) {
      console.error("❌ Failed to submit feedback:", err);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading order...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!order) return <div className="p-8 text-center">Order not found</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
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
              {Object.entries(order.item_details || {}).map(
                ([productId, item]: [string, any], idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-4 p-3 rounded-lg hover:bg-accent transition"
                  >
                    <div className="flex items-center gap-6">
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

                        {/* Rating & Comment */}
                        <div className="flex flex-col gap-2">
                          <span className="text-xs text-muted-foreground">
                            Rate this product:
                          </span>
                          <RatingStars
  rating={feedbacks[idx]?.rating || 0}
  onRate={(val) =>
    setFeedbacks((prev) => ({
      ...prev,
      [idx]: { ...prev[idx], rating: val }, // remove submitted reset
    }))
  }
  readOnly={feedbacks[idx]?.submitted} // disable after submission
/>
                          {/* <RatingStars
                            rating={feedbacks[idx]?.rating || 0}
                            onRate={(val) =>
                              setFeedbacks((prev) => ({
                                ...prev,
                                [idx]: { ...prev[idx], rating: val, submitted: false },
                              }))
                            }
                          /> */}
                          <textarea
                            value={feedbacks[idx]?.comment || ""}
                            onChange={(e) =>
                              setFeedbacks((prev) => ({
                                ...prev,
                                [idx]: {
                                  ...prev[idx],
                                  comment: e.target.value,
                                  submitted: false,
                                },
                              }))
                            }
                            placeholder="Write your feedback..."
                            className="w-full border rounded-md p-2 text-sm"
                            disabled={feedbacks[idx]?.submitted}
                          />
                          {!feedbacks[idx]?.submitted &&
                            (feedbacks[idx]?.rating || feedbacks[idx]?.comment) && (
                              <button
                                onClick={() =>
                                  handleSubmitFeedback(idx, item, productId)
                                }
                                className="self-start px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
                              >
                                Submit Feedback
                              </button>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
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
