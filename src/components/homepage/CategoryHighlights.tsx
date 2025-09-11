"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/product-card";

// Simple mock data grouped by category for highlights
const highlights: {
  category: string;
  tagline: string; // short marketing line under the title
  products: Product[];
}[] = [
  {
    category: "Electronics",
    tagline: "Power your day with top gadgets",
    products: [
      {
        id: "el-1",
        name: "Wireless Headphones X2",
        description: "Noise cancelling, 30h battery",
        price: 129.99,
        originalPrice: 179.99,
        image:
          "https://images.pexels.com/photos/3394668/pexels-photo-3394668.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "Electronics",
        productSlug: "wireless-headphones-x2",
        rating: 4.5,
        reviews: 132,
        inStock: true,
        badge: "Hot",
        badgeColor: "red",
      },
      {
        id: "el-2",
        name: "Smartwatch Pro",
        description: "Health tracking, AMOLED",
        price: 199.0,
        originalPrice: 249.0,
        image:
          "https://images.pexels.com/photos/277406/pexels-photo-277406.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "Electronics",
        productSlug: "smartwatch-pro",
        rating: 4.2,
        reviews: 87,
        inStock: true,
      },
      {
        id: "el-3",
        name: "Bluetooth Speaker Mini",
        description: "Pocket size, big sound",
        price: 39.99,
        image:
          "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "Electronics",
        productSlug: "bluetooth-speaker-mini",
        rating: 4.0,
        reviews: 52,
        inStock: true,
      },
    ],
  },
  {
    category: "Fashion",
    tagline: "Style picks you’ll love",
    products: [
      {
        id: "fa-1",
        name: "Denim Jacket Classic",
        price: 69.99,
        originalPrice: 89.99,
        image:
          "https://images.pexels.com/photos/7679724/pexels-photo-7679724.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "Fashion",
        productSlug: "denim-jacket-classic",
        rating: 4.4,
        reviews: 201,
        inStock: true,
      },
      {
        id: "fa-2",
        name: "Sneakers StreetRun",
        price: 59.99,
        image:
          "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "Fashion",
        productSlug: "sneakers-streetrun",
        rating: 4.1,
        reviews: 76,
        inStock: true,
      },
      {
        id: "fa-3",
        name: "Cotton Tee (3-Pack)",
        price: 24.99,
        image:
          "https://images.pexels.com/photos/1007789/pexels-photo-1007789.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "Fashion",
        productSlug: "cotton-tee-3pack",
        rating: 4.0,
        reviews: 48,
        inStock: true,
      },
    ],
  },
  {
    category: "Home",
    tagline: "Cozy upgrades for every room",
    products: [
      {
        id: "ho-1",
        name: "LED Table Lamp",
        price: 29.99,
        image:
          "https://images.pexels.com/photos/112811/pexels-photo-112811.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "Home",
        productSlug: "led-table-lamp",
        rating: 4.2,
        reviews: 64,
        inStock: true,
      },
      {
        id: "ho-2",
        name: "Plush Throw Blanket",
        price: 34.99,
        image:
          "https://images.pexels.com/photos/545012/pexels-photo-545012.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "Home",
        productSlug: "plush-throw-blanket",
        rating: 4.3,
        reviews: 91,
        inStock: true,
      },
      {
        id: "ho-3",
        name: "Decor Vase Set (2)",
        price: 22.5,
        image:
          "https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "Home",
        productSlug: "decor-vase-set",
        rating: 4.1,
        reviews: 37,
        inStock: true,
      },
    ],
  },
];

export default function CategoryHighlights() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-1">
            Handpicked by Category
          </h2>
          <p className="text-gray-600 text-base">Discover editor picks and trending items</p>
        </div>

        <div className="space-y-10">
          {highlights.map((block) => (
            <div key={block.category}>
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <h3 className="text-xl lg:text-2xl font-semibold text-gray-900">
                    {block.category}
                  </h3>
                  <p className="text-sm text-gray-600">{block.tagline}</p>
                </div>
                <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 text-white text-sm font-semibold hover:bg-blue-600 transition-colors">
                  View all {block.category}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Horizontal scroll on mobile, grid on md+ */}
              <div className="grid grid-flow-col auto-cols-[75%] sm:auto-cols-[55%] gap-4 overflow-x-auto pb-2 md:grid-flow-row md:auto-cols-auto md:grid-cols-3 md:overflow-visible">
                {block.products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}