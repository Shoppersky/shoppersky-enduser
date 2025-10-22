"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../../types/product";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Star, ShoppingCart, Heart, Plus, Minus } from "lucide-react";
import { useCart } from "../cart-provider";
import { useWishlist } from "../wishlist-provider";
import { ProductCard } from "../product-card";

interface ProductGridProps {
  products: Product[];
  viewMode: "grid" | "list";
  clearFilters?: () => void;
}

export function ProductGrid({
  products,
  viewMode,
  clearFilters,
}: ProductGridProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (products.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 lg:py-16">
        <div className="max-w-md mx-auto px-4">
          <p className="text-gray-500 text-base sm:text-lg mb-4">
            No products found matching your criteria.
          </p>
          {clearFilters && (
            <Button onClick={clearFilters} className="px-6 py-2">
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-3 sm:space-y-4">
        {products.map((product) => {
          const ListProductCard = () => {
            const [quantity, setQuantity] = useState(1);
            // const [added, setAdded] = useState(false);
            const { addToCart, cartItems } = useCart();
const isAlreadyInCart = cartItems?.some(
  (item) => String(item.id) === String(product.id)
) || false;
            const discountPercentage = product.originalPrice
              ? Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )
              : 0;

            // Initialize from localStorage to reflect existing cart items
            // useEffect(() => {
            //   try {
            //     const raw =
            //       typeof window !== "undefined"
            //         ? localStorage.getItem("cart")
            //         : null;
            //     if (raw) {
            //       const items = JSON.parse(raw);
            //       const exists =
            //         Array.isArray(items) &&
            //         items.some((i: any) => String(i.id) === String(product.id));
            //       if (exists) setAdded(true);
            //     }
            //   } catch (_) {
            //     // ignore parse errors
            //   }
            // }, [product.id]);

            return (
              <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <Link
                    href={`/${product.category_slug}/${product.productSlug}`}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-1"
                    />
                  </Link>
                  {product.badge && (
                    <Badge
                      className={`absolute top-1 left-1 text-xs px-1 py-0.5 ${
                        product.badgeColor === "red"
                          ? "bg-red-100 hover:bg-red-100 text-red-700"
                          : product.badgeColor === "green"
                            ? "bg-green-100 hover:bg-green-100 text-green-700"
                            : "bg-blue-100 hover:bg-blue-100 text-blue-700"
                      }`}
                    >
                      {product.badge}
                    </Badge>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        {product.category}
                      </div>
                      <Link
                        href={`/${product.category_slug}/${product.productSlug}`}
                      >
                        <h3 className="font-semibold text-sm sm:text-base text-gray-900 cursor-pointer hover:text-green-600 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>
                    </div>
                    {/* <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 p-1 sm:p-2 flex-shrink-0"
                      onClick={() =>
                        isInWishlist(product.id)
                          ? removeFromWishlist(product.id)
                          : addToWishlist(product)
                      }
                    >
                      <Heart
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${
                          isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''
                        }`}
                      />
                    </Button> */}
                  </div>

                  {/* Rating */}
                  {product.rating > 0 && (
                    <div className="flex items-center gap-1 mb-2">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      <span className="text-xs text-gray-600 ml-1">
                        ({product.reviews || 0})
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-base sm:text-lg">
                          AU${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs sm:text-sm text-gray-500 line-through">
                            AU${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                        {product.unit && (
                          <span className="text-xs text-gray-500">
                            {product.unit}
                          </span>
                        )}
                      </div>
                      {discountPercentage > 0 && (
                        <div className="text-xs text-green-600 font-medium">
                          Save {discountPercentage}%
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                     {!isAlreadyInCart ? (
  <>
    <div className="flex items-center border rounded-lg">
      <Button
        variant="ghost"
        size="sm"
        className="w-6 h-6 sm:w-8 sm:h-8 p-0"
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
      >
        <Minus className="w-2 h-2 sm:w-3 sm:h-3" />
      </Button>
      <span className="w-6 sm:w-8 text-center text-xs sm:text-sm">
        {quantity}
      </span>
      <Button
        variant="ghost"
        size="sm"
        className="w-6 h-6 sm:w-8 sm:h-8 p-0"
        onClick={() => setQuantity(quantity + 1)}
      >
        <Plus className="w-2 h-2 sm:w-3 sm:h-3" />
      </Button>
    </div>

    <Button
      onClick={() => addToCart({ ...product, quantity })}
      disabled={!product.inStock}
      className={`text-xs sm:text-sm px-2 sm:px-3 ${
        !product.inStock
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-green-600 hover:bg-green-700"
      }`}
    >
      <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
      Add
    </Button>
  </>
) : (
  <Link href="/cart">
    <Button className="text-xs sm:text-sm px-2 sm:px-3 bg-green-600 hover:bg-green-700">
      Go to Cart
    </Button>
  </Link>
)}

                    </div>
                  </div>
                </div>
              </div>
            );
          };

          return <ListProductCard key={product.id} />;
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5 2xl:grid-cols-6 auto-rows-fr">
      {products.map((product) => (
        <div key={product.id} className="w-full flex justify-center">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
