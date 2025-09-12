// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import { Check } from 'lucide-react';
// import axiosInstance from '@/lib/axiosInstance';


// function SuccessPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const sessionId = searchParams.get('session_id');
//   const [orderId, setOrderId] = useState<string | null>(null);
//   const [email, setEmail] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (!sessionId) {
//       setError('No session ID provided');
//       setIsLoading(false);
//       return;
//     }

//     const verifySession = async () => {
//       try {
//         const response = await axiosInstance.get(`/orders/checkout-session/${sessionId}`);
//         const { data } = response.data;
//         setOrderId(data.order.order_id);
//         // Retrieve email from localStorage or context if needed
//         // For now, we'll assume it's passed or stored elsewhere
//         setEmail(localStorage.getItem('checkoutEmail') || 'your email');
//       } catch (error: any) {
//         console.error('Error verifying session:', error);
//         setError(
//           error.response?.data?.detail || error.message || 'Failed to verify payment'
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     verifySession();
//   }, [sessionId]);

//   if (isLoading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <div className="text-center">
//           <h2 className="mb-2 text-2xl font-bold">Error</h2>
//           <p className="mb-6 text-muted-foreground">{error}</p>
//           <Button asChild>
//             <Link href="/">Return to Home</Link>
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center">
//       <div className="rounded-lg border bg-card p-8 text-center">
//         <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
//           <Check className="h-8 w-8 text-green-600" />
//         </div>
//         <h2 className="mb-2 text-2xl font-bold">Thank You for Your Order!</h2>
//         <p className="mb-6 text-muted-foreground">
//           Your order has been placed successfully. We&apos;ve sent a confirmation email to {email}.
//         </p>
//         <div className="mb-6 rounded-md border p-4 text-left">
//           <h3 className="mb-2 font-medium">Order Number</h3>
//           <p className="text-lg font-bold">{orderId}</p>
//         </div>
//         <div className="space-y-4">
//           <Button asChild className="w-full">
//             <Link href="/account/orders">View Order</Link>
//           </Button>
//           <Button variant="outline" asChild className="w-full">
//             <Link href="/">Continue Shopping</Link>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SuccessPage;

'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check } from 'lucide-react';
import axiosInstance from '@/lib/axiosInstance';

function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p>Loading...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID provided');
      setIsLoading(false);
      return;
    }

    const verifySession = async () => {
      try {
        const response = await axiosInstance.get(`/orders/checkout-session/${sessionId}`);
        const { data } = response.data;
        setOrderId(data.order.order_id);
        setEmail(localStorage.getItem('checkoutEmail') || 'your email');
      } catch (error: any) {
        console.error('Error verifying session:', error);
        setError(
          error.response?.data?.detail || error.message || 'Failed to verify payment'
        );
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, [sessionId]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold">Error</h2>
          <p className="mb-6 text-muted-foreground">{error}</p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded-lg border bg-card p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="mb-2 text-2xl font-bold">Thank You for Your Order!</h2>
        <p className="mb-6 text-muted-foreground">
          Your order has been placed successfully. We&apos;ve sent a confirmation email to {email}.
        </p>
        <div className="mb-6 rounded-md border p-4 text-left">
          <h3 className="mb-2 font-medium">Order Number</h3>
          <p className="text-lg font-bold">{orderId}</p>
        </div>
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/account/orders">View Order</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
