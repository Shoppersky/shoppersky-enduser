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
    addToCart({ ...product, quantity });
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 500);
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] mx-auto flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
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
                ? 'bg-red-100 text-red-700'
                : product.badgeColor === 'green'
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-100 text-blue-700'
            }`}
          >
            {product.badge}
          </Badge>
        )}

        {/* Wishlist */}
        <Button
          size="sm"
          variant="secondary"
          className="absolute top-1 right-1 sm:top-2 sm:right-2 w-6 h-6 sm:w-7 sm:h-7 p-0 rounded-full bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 sm:opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
          onClick={toggleWishlist}
          aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 ${
              isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </Button>

        {/* Desktop Overlay */}
        <div
          className={`hidden md:flex absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm transition-all duration-300 ease-in-out flex-col items-center justify-center p-3 gap-2 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          {/* Quantity */}
          <div className="flex items-center border rounded-lg">
            <Button size="sm" variant="ghost" className="w-7 h-7 p-0" onClick={decrementQuantity} disabled={quantity <= 1}>
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-7 text-center text-sm font-medium">{quantity}</span>
            <Button size="sm" variant="ghost" className="w-7 h-7 p-0" onClick={incrementQuantity}>
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Add to Cart */}
          <Button
            onClick={handleAddToCart}
            disabled={isAdding || !product.inStock}
            className={`w-full rounded-full font-medium py-2 text-sm text-white ${
              isAdding ? 'bg-green-500' : !product.inStock ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            {!product.inStock ? 'Out of Stock' : isAdding ? 'Added' : 'Add to Bag'}
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-2 sm:p-3 md:p-4 flex-1 flex flex-col">
        <div className="mb-1 sm:mb-2 text-xs text-gray-600 uppercase tracking-wide">{product.category}</div>
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
                  className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            <span className="text-xs text-gray-600 ml-1">({product.reviews || 0})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-2 sm:mb-3 flex-wrap gap-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm sm:text-base md:text-lg text-gray-900">AU${product.price.toFixed(2)}</span>
            {product.originalPrice && <span className="text-xs text-gray-500 line-through">AU${product.originalPrice.toFixed(2)}</span>}
          </div>
          {product.unit && <span className="text-xs text-gray-500">{product.unit}</span>}
        </div>

        {/* Discount */}
        {discountPercentage > 0 && <div className="text-xs text-green-600 font-medium mb-2">Save {discountPercentage}%</div>}

        {/* Mobile Add to Cart */}
        <div className="md:hidden mt-auto flex flex-col gap-2">
          {/* Quantity in column */}
          <div className="flex flex-col-2 ml- justify-center items-center border rounded-lg p-1 gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="w-8 h-8 p-0"
              onClick={incrementQuantity}
            >
              <Plus className="h-3 w-3" />
            </Button>
            <span className="text-sm font-medium">{quantity}</span>
            <Button
              size="sm"
              variant="ghost"
              className="w-8 h-8 p-0"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
          </div>

          {/* Add to Cart button */}
          <Button
            onClick={handleAddToCart}
            disabled={isAdding || !product.inStock}
            className={`w-full rounded-lg font-medium py-2 text-xs text-white ${
              isAdding
                ? 'bg-green-500'
                : !product.inStock
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            {!product.inStock ? 'Out of Stock' : isAdding ? 'Added' : 'Add'}
          </Button>
        </div>
      </div>
    </div>
  );
}
