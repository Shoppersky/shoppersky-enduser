"use client";

import React from "react";
import type { Product } from "@/types/product";
import Link from "next/link";
export type IndustryProductsProps = {
  title: string;
  subtitle?: string;
  products: Product[];
};

export default function IndustryProducts({ title, subtitle, products }: IndustryProductsProps) {
  return (
    <section className=" container mx-auto space-y-6">
      {/* Section Heading */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">{title}</h2>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      </div>

      {/* Horizontal Scroll Carousel */}
      <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
        {products.map((p) => (
          <div
            key={p.id}
            className="min-w-[150px] sm:min-w-[180px] flex-shrink-0 rounded-lg  bg-white "
          >
         <Link
  href={`/${encodeURIComponent(
   p.category_name.toLowerCase().replace(/\s+/g, "-")
  )}/${encodeURIComponent(p.slug)}`}
>
  <img
    src={p.product_images}
    alt={p.name}
    className="w-full h-40 object-contain rounded-md cursor-pointer hover:scale-105 transition-transform duration-300"
  />
</Link>

            <div className="mt-2 text-center">
              <p className="text-sm font-medium truncate">{p.product_name}</p>
              <p className="text-sm font-semibold text-gray-800">${p.selling_price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
