// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Navbar from "@/components/navbar";
// import FooterSection from '../components/footer';
// import { WishlistProvider } from '../components/wishlist-provider';
// import { CartProvider } from '../components/cart-provider';
// import { Header } from "@/components/header";
// import { Toaster } from "sonner";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Shoppersky",
//   description: "One stop shop for all requirements",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
      
//           <CartProvider>
//             <WishlistProvider>
//               <Navbar />
// <Header/>
//               {children}
//             </WishlistProvider>
//           </CartProvider>
      
//         <FooterSection />
//         <Toaster position="bottom-right" richColors />
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import FooterSection from "@/components/footer";
import { WishlistProvider } from "@/components/wishlist-provider";
import { CartProvider } from "@/components/cart-provider";
import { Header } from "@/components/header";
import { Toaster } from "sonner";
import ClientLayout from "@/components/ClientLayout";
import Script from "next/script";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shoppersky",
  description: "One stop shop for all requirements",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-QHL9KP8BLT"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QHL9KP8BLT');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Delegate client-side logic to a wrapper */}
        <ClientLayout>{children}</ClientLayout>

        <FooterSection />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
