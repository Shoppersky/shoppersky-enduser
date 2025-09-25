// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
// } from "@/components/ui/card";
// import {
//   AlertCircle,
//   ArrowLeft,
//   RefreshCw,
//   MessageCircle,
//   CheckCircle2,
//   CreditCard,
//   HelpCircle,
// } from "lucide-react";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";

// export default function PaymentCancelledPage() {
//   const searchParams = useSearchParams();
//   const existingOrderId = searchParams.get("order_id");
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
//       <div className="w-full max-w-lg space-y-6">
//         <div className="text-center space-y-2">
//           <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 border-2 border-amber-200">
//             <AlertCircle className="h-8 w-8 text-amber-600" />
//           </div>
//           <h1 className="text-3xl font-bold text-foreground text-balance">
//             Payment Cancelled
//           </h1>
//           <p className="text-lg text-muted-foreground text-pretty">
//             Don't worry, we're here to help you complete your purchase.
//           </p>
//         </div>

//         <Card className="border-0 shadow-lg">
//           <CardHeader className="text-center pb-4">
//             <CardDescription className="text-base leading-relaxed">
//               Your payment was safely cancelled and no charges were made to your
//               account. This can happen for various reasons, and it's completely
//               normal.
//             </CardDescription>
//           </CardHeader>

//           <CardContent className="space-y-6">
//             <div className="space-y-4">
//               <h3 className="font-semibold text-foreground flex items-center gap-2">
//                 <CheckCircle2 className="h-5 w-5 text-primary" />
//                 What you can do next:
//               </h3>

//               <div className="space-y-3 text-sm text-muted-foreground">
//                 <div className="flex items-start gap-3">
//                   <CreditCard className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
//                   <span>Check your payment method and try again</span>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <RefreshCw className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
//                   <span>Choose a different payment option if needed</span>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <HelpCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
//                   <span>Contact our support team for assistance</span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col gap-3 pt-2">
//               <Button
//                 asChild
//                 size="lg"
//                 className="w-full font-semibold"
//                 disabled={!existingOrderId || existingOrderId === "null"}
//               >
//                 <Link
//                   href={`/checkout${existingOrderId && existingOrderId !== "null" ? `?order_id=${existingOrderId}` : ""}`}
//                 >
//                   <RefreshCw className="mr-2 h-4 w-4" />
//                   Retry Payment
//                 </Link>
//               </Button>

//               <div className="grid grid-cols-2 gap-3">
//                 <Button
//                   variant="outline"
//                   asChild
//                   className="font-medium bg-transparent"
//                 >
//                   <Link href="/">
//                     <ArrowLeft className="mr-2 h-4 w-4" />
//                     Go Home
//                   </Link>
//                 </Button>

//                 <Button
//                   variant="outline"
//                   asChild
//                   className="font-medium bg-transparent"
//                 >
//                   <Link href="/support">
//                     <MessageCircle className="mr-2 h-4 w-4" />
//                     Get Help
//                   </Link>
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <div className="text-center text-sm text-muted-foreground space-y-2">
//           <p>
//             Need more help? Check out our{" "}
//             <Link href="/faq" className="text-primary hover:underline">
//               FAQ
//             </Link>{" "}
//             or{" "}
//             <Link href="/contact" className="text-primary hover:underline">
//               contact support
//             </Link>
//             .
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  AlertCircle,
  ArrowLeft,
  RefreshCw,
  MessageCircle,
  CheckCircle2,
  CreditCard,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios"; // swap with your axiosInstance if you have one
import axiosInstance from "@/lib/axiosInstance";

export default function PaymentCancelledPage() {
  const searchParams = useSearchParams();
  const existingOrderId = searchParams.get("order_id");

  const [statusMessage, setStatusMessage] = useState(
    "Updating your order status..."
  );

  useEffect(() => {
    const cancelOrder = async () => {
      if (!existingOrderId || existingOrderId === "null") {
        setStatusMessage("No valid order found.");
        return;
      }

      try {
       
        await axiosInstance.post(
          `/orders/cancel/${existingOrderId}`
        );
        setStatusMessage("Your order was marked as cancelled.");
      } catch (error) {
        console.error("❌ Cancel order failed:", error);
        setStatusMessage("Failed to update order status. Please contact support.");
      }
    };

    cancelOrder();
  }, [existingOrderId]);


  const handleRetryPayment = async () => {
  if (!existingOrderId || existingOrderId === "null") return;

  try {
    const res = await axiosInstance.get(
      `/orders/checkout-url/${existingOrderId}`
    );
    const checkoutUrl = res.data.data.checkout_url;
    window.location.href = checkoutUrl; // redirect to Stripe
  } catch (err) {
    console.error("Failed to fetch checkout URL:", err);
    alert("Unable to retry payment. Please try again later.");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 border-2 border-amber-200">
            <AlertCircle className="h-8 w-8 text-amber-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground text-balance">
            Payment Cancelled
          </h1>
          <p className="text-lg text-muted-foreground text-pretty">
            {statusMessage}
          </p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardDescription className="text-base leading-relaxed">
              Your payment was safely cancelled and no charges were made to your
              account. This can happen for various reasons, and it's completely
              normal.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                What you can do next:
              </h3>

              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <CreditCard className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Check your payment method and try again</span>
                </div>
                <div className="flex items-start gap-3">
                  <RefreshCw className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Choose a different payment option if needed</span>
                </div>
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Contact our support team for assistance</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">

              <Button
  onClick={handleRetryPayment}
  size="lg"
  className="w-full font-semibold"
  disabled={!existingOrderId || existingOrderId === "null"}
>
  <RefreshCw className="mr-2 h-4 w-4" />
  Retry Payment
</Button>

              {/* <Button
                asChild
                size="lg"
                className="w-full font-semibold"
                disabled={!existingOrderId || existingOrderId === "null"}
              >
                <Link
                  href={`/checkout${
                    existingOrderId && existingOrderId !== "null"
                      ? `?order_id=${existingOrderId}`
                      : ""
                  }`}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Retry Payment
                </Link>
              </Button> */}

              <div className="grid grid-cols-1">
                <Button
                  variant="outline"
                  asChild
                  className="font-medium bg-transparent"
                >
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Go Home
                  </Link>
                </Button>

                {/* <Button
                  variant="outline"
                  asChild
                  className="font-medium bg-transparent"
                >
                  <Link href="/support">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Get Help
                  </Link>
                </Button> */}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* <div className="text-center text-sm text-muted-foreground space-y-2">
          <p>
            Need more help? Check out our{" "}
            <Link href="/faq" className="text-primary hover:underline">
              FAQ
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact support
            </Link>
            .
          </p>
        </div> */}
      </div>
    </div>
  );
}
