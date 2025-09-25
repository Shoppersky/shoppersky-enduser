"use client";
import React, { useState, useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Heart,
  ArrowLeft,
  Truck,
  Shield,
  RotateCcw,
  Share2,
  Facebook,
  Twitter,
  Copy,
  MessageCircle,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  useCart,
  Product as CartProduct,
} from "../../../components/cart-provider";
import { useWishlist } from "../../../components/wishlist-provider";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../../components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Label } from "../../../components/ui/label";
import axiosInstance from "../../../lib/axiosInstance";
import Head from "next/head";

interface ProductResponse {
  product_id: string;
  identification: { product_name: string; product_sku: string };
  descriptions: { full_description: string; short_description: string };
  pricing: { selling_price: string };
  images: { urls: string[] };
  inventory: { stock_alert_status: string };
  physical_attributes: {
    weight: string;
    dimensions: { length: number; width: number; height: number };
    shipping_class: string;
  };
  tags_and_relationships: { product_tags: string[]; category_name?: string };
  slug: string;
   reviews?: {
    user_name: string;
    rating: number;
    comment: string;
    timestamp: string;
  }[];
  average_rating?: number;
}

function ProductDetails() {
  const { category, productSlug } = useParams();
  const pathname = usePathname();
  const { addToCart, cartCount, cartItems } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const router = useRouter();
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [reviews, setReviews] = useState<
    { user_name: string; rating: number; comment: string; timestamp: string }[]
  >([]);

  // Sync addedToCart with cartItems for this product
  useEffect(() => {
    const currentId = product?.product_id;
    if (!currentId) return;
    const inCart = cartItems?.some(
      (item) => String(item.id) === String(currentId)
    );
    setAddedToCart(!!inCart);
  }, [cartItems, product?.product_id]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [shareDropdownOpen, setShareDropdownOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    console.log("ProductDetails useParams:", { category, productSlug });
    console.log("Current pathname:", pathname);
    if (!productSlug || !category) {
      setError(
        `Invalid URL parameters. Category: ${category}, Product Slug: ${productSlug}, URL: ${pathname}`
      );
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/products/slug/${productSlug}`);
        console.log("Product API Response:", res.data);
        setProduct(res.data);
        setReviews(res.data.reviews || []);
      } catch (err: unknown) {
        console.error("Failed to load product:", err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to load product. Please try again.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productSlug, category, pathname]);

  useEffect(() => {
    console.log("ProductPage cartCount:", cartCount);
  }, [cartCount]);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading product...</div>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  if (!product)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Product not found.</div>
      </div>
    );

  const {
    product_id,
    identification,
    descriptions,
    pricing,
    images,
    inventory,
    physical_attributes,
    tags_and_relationships,
    slug: productSlugResponse,
  } = product;

  const handleAddToCart = () => {
    setIsAdding(true);
    const cartItem: CartProduct = {
      id: product_id,
      name: identification.product_name,
      price: parseFloat(pricing?.selling_price) || 0,
      image: images?.urls[0] || "/placeholder.svg",
      quantity,
      category: category as string,
      productSlug: productSlugResponse,
    };
    console.log("ProductPage adding to cart:", cartItem);
    addToCart(cartItem);
    setAddedToCart(true);
    setTimeout(() => setIsAdding(false), 600);
  };

  const handleBuyNow = () => {
    // Create the buy now product object
    const buyNowProduct = {
      id: product_id,
      name: identification.product_name,
      price: parseFloat(pricing?.selling_price) || 0,
      image: images?.urls[0] || "/placeholder.svg",
      quantity,
      category: category as string,
      productSlug: productSlugResponse,
    };

    // Store in localStorage for checkout page
    localStorage.setItem("buyNowProduct", JSON.stringify(buyNowProduct));

    // Navigate to checkout
    router.push("/checkout?buyNow=true");
  };

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const toggleWishlist = () => {
    const wishlistItem = {
      id: product_id,
      name: identification.product_name,
      price: parseFloat(pricing?.selling_price) || 0,
      image: images?.urls[0] || "/placeholder.svg",
      category: category as string,
      productSlug: productSlugResponse,
    };

    if (isInWishlist(product_id)) {
      removeFromWishlist(product_id);
      console.log("Product removed from wishlist:", product_id);
    } else {
      addToWishlist(wishlistItem);
      console.log("Product added to wishlist:", product_id);
    }
  };

  const handleShare = async (platform: string) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const title = identification.product_name;
    const description =
      descriptions.short_description ||
      `Check out ${identification.product_name} at DesiSmart`;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
          "_blank"
        );
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
          "_blank"
        );
        break;
      case "copy":
        try {
          await navigator.clipboard.writeText(url);
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
          console.error("Failed to copy URL:", err);
        }
        break;
    }
    setShareDropdownOpen(false);
  };

  const formattedCategory = category
    ? (Array.isArray(category) ? category[0] : category)
        .replace("-", " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : "Unknown Category";

  const isInStock =
    inventory?.stock_alert_status.toLowerCase() !== "out of stock";
  const isWishlistedItem = isInWishlist(product_id);

  return (
    <>
      <Head>
        <title>{identification.product_name} | DesiSmart</title>
        <meta
          name="description"
          content={
            descriptions?.short_description ||
            `Buy ${identification.product_name} at DesiSmart.`
          }
        />
        <meta
          name="keywords"
          content={tags_and_relationships?.product_tags.join(", ")}
        />
        <meta property="og:title" content={identification.product_name} />
        <meta
          property="og:description"
          content={
            descriptions?.short_description ||
            `Buy ${identification.product_name} at DesiSmart.`
          }
        />
        <meta
          property="og:image"
          content={images?.urls[0] || "/placeholder.svg"}
        />
        <meta
          property="og:url"
          content={`https://www.desismart.com/${category}/${productSlugResponse}`}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="text-sm text-gray-500">
              <Link href="/" className="hover:text-gray-700">
                Home
              </Link>
              <ChevronRight className="inline mx-1 h-4 w-4" />
              <Link href={`/${category}`} className="hover:text-gray-700">
                {formattedCategory}
              </Link>
              <ChevronRight className="inline mx-1 h-4 w-4" />
              <span className="text-gray-900">
                {identification.product_name}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-white rounded-2xl overflow-hidden border border-gray-200">
                <Image
                  src={images?.urls[selectedImage] || "/placeholder.svg"}
                  alt={identification.product_name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {images?.urls.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative aspect-square bg-white rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === i
                        ? "border-green-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Image ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <div className="text-sm text-green-600 uppercase tracking-wide font-medium mb-2">
                  {tags_and_relationships?.product_tags.join(", ")}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {identification.product_name}
                </h1>
                <div className="grid grid:cols-2 lg:cols-1 items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                         <Star
          key={i}
          className={`w-5 h-5 ${i < Math.round(product.average_rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
                      ))}
                    <span className="text-sm text-gray-600 ml-2">
                     {product.average_rating ? product.average_rating.toFixed(1) : 'No reviews yet'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* <Button variant="ghost" size="sm" onClick={toggleWishlist}>
                      <Heart className={`w-4 h-4 mr-2 ${isWishlistedItem ? 'fill-red-500 text-red-500' : ''}`} />
                      {isWishlistedItem ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </Button> */}
                    <DropdownMenu
                      open={shareDropdownOpen}
                      onOpenChange={setShareDropdownOpen}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                          onClick={() => handleShare("facebook")}
                        >
                          <Facebook className="w-4 h-4 mr-2" />
                          Facebook
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleShare("twitter")}
                        >
                          <Twitter className="w-4 h-4 mr-2" />
                          Twitter
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleShare("whatsapp")}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          WhatsApp
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare("copy")}>
                          <Copy className="w-4 h-4 mr-2" />
                          {copySuccess ? "Copied!" : "Copy Link"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-gray-900">
                  AU${pricing?.selling_price}
                </span>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${isInStock ? "bg-green-500" : "bg-red-500"}`}
                ></div>
                <span
                  className={`font-medium ${isInStock ? "text-green-700" : "text-red-700"}`}
                >
                  {inventory?.stock_alert_status}
                </span>
              </div>

              {/* Description */}
              <div className="text-gray-600 leading-relaxed">
                {descriptions?.full_description || "No description available."}
              </div>

              {/* Quantity and Add to Cart / Go to Cart / Buy Now */}
              <div className="space-y-4">
                {!addedToCart && (
                  <div className="flex items-center gap-4">
                    <Label className="font-medium">Quantity:</Label>
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-10 h-10 p-0"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-10 h-10 p-0"
                        onClick={() => handleQuantityChange(1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() =>
                      addedToCart ? router.push("/cart") : handleAddToCart()
                    }
                    disabled={!isInStock || (isAdding && !addedToCart)}
                    className=" bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-medium rounded-xl"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {addedToCart
                      ? "Go to Cart"
                      : isAdding
                        ? "Added to Cart"
                        : isInStock
                          ? `Add to Cart `
                          : "Out of Stock"}
                  </Button>

                  <Button
                    onClick={handleBuyNow}
                    disabled={!isInStock}
                    variant="outline"
                    className=" py-4 text-lg font-medium rounded-xl"
                  >
                    Buy Now
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <Truck className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">
                    Free Delivery
                  </p>
                  <p className="text-xs text-gray-600">On orders over AU$50</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">
                    Quality Guarantee
                  </p>
                  <p className="text-xs text-gray-600">100% fresh or refund</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">
                    Easy Returns
                  </p>
                  <p className="text-xs text-gray-600">Within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Product Information Tabs */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-description">
                  <AccordionTrigger>Description</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Product Description
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {descriptions?.full_description ||
                            "No description available."}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-specs">
                  <AccordionTrigger>Specifications</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Product Specifications
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="font-medium">Weight</span>
                            <span>{physical_attributes?.weight || "N/A"}</span>
                          </div>
                          <div className="flex justify-between py-2  border-gray-200">
                            <span className="font-medium">Dimensions</span>
                            <span>
                              {physical_attributes?.dimensions?.length
                                ? `${physical_attributes?.dimensions?.length} x ${physical_attributes?.dimensions?.width} x ${physical_attributes?.dimensions?.height} cm`
                                : "N/A"}
                            </span>
                          </div>
                         
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-reviews">
                  <AccordionTrigger>Reviews</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Customer Reviews
                        </h3>
                        {/* <Button variant="outline">Write a Review</Button> */}
                      </div>
                      <div className="space-y-6">
                        {reviews.length === 0 ? (
                          <p className="text-gray-600">No reviews yet.</p>
                        ) : (
                          reviews.map((review, index) => (
                            <div
                              key={index}
                              className="border-gray-200 pb-6"
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-gray-900">
                                      {review.user_name}
                                    </span>
                                    <Badge className="bg-green-100 text-green-700 text-xs">
                                      Verified Purchase
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="flex">
                                      {Array(5)
                                        .fill(0)
                                        .map((_, i) => (
                                          <Star
                                            key={i}
                                            className={`w-4 h-4 ${
                                              i < review.rating
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-gray-300"
                                            }`}
                                          />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600">
                                      {review.timestamp}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-600">{review.comment}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-shipping">
                  <AccordionTrigger>Shipping</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Delivery Options
                        </h3>
                        <div className="space-y-4">
                         <div className="flex items-start gap-3">
    <Truck className="w-5 h-5 text-green-600 mt-1" />
    <div>
      <h4 className="font-medium text-gray-900">Standard Delivery</h4>
      <p className="text-sm text-gray-600">
        3-5 business days • Free on orders over AU$50, else AU$5.99
      </p>
    </div>
  </div>

  {/* Express */}
  <div className="flex items-start gap-3">
    <Truck className="w-5 h-5 text-blue-600 mt-1" />
    <div>
      <h4 className="font-medium text-gray-900">Express Delivery</h4>
      <p className="text-sm text-gray-600">
        1-2 business days • AU$9.99
      </p>
    </div>
  </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Return Policy
                        </h3>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">
                            • 100% satisfaction guarantee
                          </p>
                          <p className="text-sm text-gray-600">
                            • Return within 24 hours of delivery
                          </p>
                          <p className="text-sm text-gray-600">
                            • Full refund for damaged or unsatisfactory items
                          </p>
                          <p className="text-sm text-gray-600">
                            • Contact customer service for easy returns
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
