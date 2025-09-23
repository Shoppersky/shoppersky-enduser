"use client";

import { useState, useEffect } from "react";
import { Product } from "../../types/product";
import { MobileFilters } from "./mobile-filters";
import { SortDropdown } from "./sort-dropdown";
import { FilterSidebar } from "./filter-sidebar";
import { ProductGrid } from "./product-grid";
import axiosInstance from "../../lib/axiosInstance";
import { Button } from "../ui/button";
import { Filter, Grid, List } from "lucide-react";
import { useCart } from "../../components/cart-provider";
import { useWishlist } from "../../components/wishlist-provider";

interface ApiCategory {
  category_id: string;
  category_name: string;
}

interface ApiProduct {
  product_id: string;
  identification: { product_name: string };
  descriptions: { short_description: string };
  pricing: { selling_price: string; original_price?: string };
  images: { urls: string[] };
  tags_and_relationships: { product_tags?: string[] };
  slug: string;
  cat_id: string;
  timestamp: string;
  in_stock?: boolean;
  badge?: string;
  badge_color?: string;
  ratings?: number;
  reviews?: number;
  average_rating?: number;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortOption, setSortOption] = useState<string>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch categories
        const categoriesResponse = await axiosInstance.get<{
          data: ApiCategory[];
        }>("/categories/");
        const categoryMap: { [key: string]: string } = {};
        const categoryNames = categoriesResponse.data.data.map((cat) => {
          categoryMap[cat.category_id] = cat.category_name;
          return cat.category_name;
        });
        setCategories(categoryNames);

        // Fetch products
        const productsResponse = await axiosInstance.get<{
          products: ApiProduct[];
        }>("/products/");
        const mappedProducts: Product[] = productsResponse.data.products.map(
          (item) => ({
            id: item.product_id,
            name: item.identification.product_name,
            description: item.descriptions?.short_description || "",
            price: parseFloat(item.pricing?.selling_price || "0"),
            originalPrice: item.pricing?.original_price
              ? parseFloat(item.pricing.original_price)
              : undefined,
            image: item.images?.urls[0] || "/placeholder.svg",
            category: item.category_name || "Uncategorized",
            productSlug: item.slug,
            timestamp: item.timestamp,
            unit: "unit",
            rating: item.average_rating || 0,
reviews: item.ratings?.length || 0,
            inStock: item.in_stock !== undefined ? item.in_stock : true,
            badge: item.badge,
            badgeColor: item.badge_color,
            category_slug:item.category_slug,
           
          })
        );
        setProducts(mappedProducts);
        setFilteredProducts(mappedProducts);
      } catch (error) {
        const errorMsg = "Failed to load data. Please try again later.";
        setError(errorMsg);
        console.error("Error details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => {
        const productCategories = Array.isArray(p.category)
          ? p.category
          : [p.category];
        return productCategories.some((cat) =>
          selectedCategories.some(
            (sel) => sel.toLowerCase() === cat.toLowerCase()
          )
        );
      });
    }

    // Filter by price
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Filter by stock
    if (inStockOnly) {
      filtered = filtered.filter((p) => p.inStock);
    }

    // Sort
    switch (sortOption) {
      case "price_low_to_high":
        filtered.sort((a, b) => a.price - b.price);

        break;

      case "price_high_to_low":
        filtered.sort((a, b) => b.price - a.price);

        break;

      case "latest":
        filtered.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

        break;

      case "name_a_to_z":
        filtered.sort((a, b) => a.name.localeCompare(b.name));

        break;

       case "rating_above_4":
        filtered = filtered.filter((p) => (p.rating || 0) > 4);
        break;  

      case "featured":

      default:
        // Maintain original order or apply featured logic if defined

        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategories, priceRange, inStockOnly, sortOption]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceChange = (range: [number, number]) => {
    setPriceRange(range);
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 500]);
    setSortOption("featured");
    setInStockOnly(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Shop All Products
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
          <SortDropdown value={sortOption} onChange={handleSortChange} />
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <div
            className={`w-full lg:w-64 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <FilterSidebar
              categories={categories}
              selectedCategories={selectedCategories}
              priceRange={priceRange}
              inStockOnly={inStockOnly}
              onCategoryChange={handleCategoryChange}
              onPriceChange={handlePriceChange}
              onInStockChange={setInStockOnly}
              onClearFilters={clearFilters}
            />
            <MobileFilters
              categories={categories}
              selectedCategories={selectedCategories}
              priceRange={priceRange}
              inStockOnly={inStockOnly}
              onCategoryChange={handleCategoryChange}
              onPriceChange={handlePriceChange}
              onInStockChange={setInStockOnly}
              onClearFilters={clearFilters}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />
          </div>
          <div className="flex-1">
            <ProductGrid products={filteredProducts} viewMode={viewMode} />
          </div>
        </div>
      )}
    </div>
  );
}
