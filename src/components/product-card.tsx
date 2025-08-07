



'use client';

import type React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Plus, Minus, Heart, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useCart } from './cart-provider';
import { useWishlist } from './wishlist-provider';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      ...product,
      quantity,
    });
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 500);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl w-full max-w-[280px] sm:max-w-[320px] mx-auto flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
        <Link href={`/${product.category.toLowerCase()}/${product.productSlug}`}>
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105 p-2"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          />
        </Link>

        {/* Badge */}
        {product.badge && (
          <Badge
            className={`absolute top-1 left-1 sm:top-2 sm:left-2 text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 ${
              product.badgeColor === 'red'
                ? 'bg-red-100 hover:bg-red-100 text-red-700'
                : product.badgeColor === 'green'
                  ? 'bg-green-100 hover:bg-green-100 text-green-700'
                  : 'bg-blue-100 hover:bg-blue-100 text-blue-700'
            }`}
          >
            {product.badge}
          </Badge>
        )}

        {/* Wishlist Button */}
        <Button
          size="sm"
          variant="secondary"
          className="absolute top-1 right-1 sm:top-2 sm:right-2 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 p-0 rounded-full bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 sm:opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
          onClick={toggleWishlist}
          aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 ${
              isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </Button>

        {/* Desktop Hover Overlay */}
        <div
          className={`hidden md:block absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm transition-all duration-300 ease-in-out ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
          style={{ height: '40%' }}
        >
          <div className="p-3 h-full flex flex-col justify-center">
            {/* Quantity Selector */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-7 h-7 p-0 hover:bg-gray-100"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <span className="w-7 text-center text-sm font-medium">{quantity}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-7 h-7 p-0 hover:bg-gray-100"
                  onClick={incrementQuantity}
                >
                  <Plus className="h-3 w-3" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={isAdding || !product.inStock}
              className={`w-full rounded-full font-medium py-2 text-sm text-white ${
                isAdding
                  ? 'bg-green-500 text-white'
                  : !product.inStock
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              {!product.inStock ? 'Out of Stock' : isAdding ? 'Added' : 'Add to Bag'}
            </Button>
          </div>
        </div>

        {/* Tablet Fallback - Always visible on medium screens */}
        <div className="hidden sm:block md:hidden absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm">
          <div className="p-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center border rounded-lg">
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-6 h-6 p-0 hover:bg-gray-100"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-2 w-2" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <span className="w-6 text-center text-xs font-medium">{quantity}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-6 h-6 p-0 hover:bg-gray-100"
                  onClick={incrementQuantity}
                >
                  <Plus className="h-2 w-2" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
              <Button
                onClick={handleAddToCart}
                disabled={isAdding || !product.inStock}
                className={`flex-1 rounded-lg font-medium py-1 text-xs text-white ${
                  isAdding
                    ? 'bg-green-500 text-white'
                    : !product.inStock
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                <ShoppingCart className="w-3 h-3 mr-1" />
                {!product.inStock ? 'Out of Stock' : isAdding ? 'Added' : 'Add'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-2 sm:p-3 md:p-4 flex-1 flex flex-col">
        <div className="mb-1 sm:mb-2 text-xs text-gray-600 uppercase tracking-wide">
          {product.category}
        </div>
        <Link href={`/${product.category.toLowerCase()}/${product.productSlug}`}>
          <h3 className="mb-2 line-clamp-2 text-xs sm:text-sm md:text-base font-medium transition-colors group-hover:text-[#1B4B33] leading-tight">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            <span className="text-xs text-gray-600 ml-1">({product.reviews || 0})</span>
          </div>
        )}

        {/* Price Section */}
        <div className="flex items-center justify-between mb-2 sm:mb-3 flex-wrap gap-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm sm:text-base md:text-lg text-gray-900">
              AU${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                AU${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {product.unit && <span className="text-xs text-gray-500">{product.unit}</span>}
        </div>

        {/* Discount Percentage */}
        {discountPercentage > 0 && (
          <div className="text-xs text-green-600 font-medium mb-2">Save {discountPercentage}%</div>
        )}

        {/* Mobile Add to Cart Section - Always Visible */}
        <div className="md:hidden mt-auto">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="flex items-center border rounded-lg">
              <Button
                size="sm"
                variant="ghost"
                className="w-6 h-6 sm:w-7 sm:h-7 p-0 hover:bg-gray-100"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-2 w-2 sm:h-3 sm:w-3" />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              <span className="w-6 sm:w-8 text-center text-xs sm:text-sm font-medium">{quantity}</span>
              <Button
                size="sm"
                variant="ghost"
                className="w-6 h-6 sm:w-7 sm:h-7 p-0 hover:bg-gray-100"
                onClick={incrementQuantity}
              >
                <Plus className="h-2 w-2 sm:h-3 sm:w-3" />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>
            <Button
              onClick={handleAddToCart}
              disabled={isAdding || !product.inStock}
              className={`flex-1 rounded-lg font-medium py-1.5 sm:py-2 text-xs text-white ${
                isAdding
                  ? 'bg-green-500 text-white'
                  : !product.inStock
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              <ShoppingCart className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
              {!product.inStock ? 'Out of Stock' : isAdding ? 'Added' : 'Add'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}