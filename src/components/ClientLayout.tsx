'use client';

import { usePathname } from "next/navigation";
import AuthGuard from "@/lib/AuthGuard";
import Navbar from "@/components/navbar";
import { WishlistProvider } from "@/components/wishlist-provider";
import { CartProvider } from "@/components/cart-provider";
import { Header } from "@/components/header";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Define public routes
  const publicRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/update-password",
    "/verify-email",
    "/verify-email-resend",
  ];

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  const content = (
    <CartProvider>
      <WishlistProvider>
        <Navbar />
        <Header />
        {children}
      </WishlistProvider>
    </CartProvider>
  );

  return isPublicRoute ? content : <AuthGuard>{content}</AuthGuard>;
}
