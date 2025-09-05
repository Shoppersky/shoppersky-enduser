
import type { NextConfig } from "next";
 
const isProd = process.env.NODE_ENV === "production";
 
const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: isProd, // Skip ESLint in production builds
  },
  typescript: {
    ignoreBuildErrors: isProd, // Skip TypeScript errors in production builds
  },
  images: {
<<<<<<< Updated upstream
    domains: ['syd1.digitaloceanspaces.com', 'localhost:3000'],
=======
    domains: ['syd1.digitaloceanspaces.com','localhost'],
>>>>>>> Stashed changes
  },
 
};
 
export default nextConfig;
 
