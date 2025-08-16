"use client";

import { use, useMemo, useState, useEffect } from "react";
import { VendorCard } from "@/components/vendor/vendor-card";
import { VendorFilters } from "@/components/vendor/vendor-filters";
import axiosInstance from "@/lib/axiosInstance";

export default function VendorsPage() {
  const [vendors, SetVendors] = useState([]);
  const [totalVendors, setTotalVendors] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVendors = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axiosInstance.get("/vendor/all-vendor-details");

      // Transform API data to match VendorCard interface
      const transformedVendors = response.data.vendors.map((vendor: any) => ({
        slug: vendor.store_slug, // Using vendor_id as slug
        name: vendor.store_name,
        description: `${vendor.store_name} - ${vendor.location}`, // Creating description from available data
        logo: vendor.banner_image || "/images/placeholder.svg",
        banner: vendor.business_logo || "/images/placeholder.svg", // Using business_logo as banner fallback
        rating: 4.5, // Default rating since not provided in API
        reviewCount: Math.floor(Math.random() * 100) + 10, // Random review count for now
        yearsInBusiness: vendor.years_in_business
          ? parseInt(vendor.years_in_business.split(":")[0]) || 1
          : 1,
        location: vendor.location,
        totalProducts: vendor.total_products,
        isVerified: true, // Default to verified
        categories: vendor.categories.map((cat: any) => cat.category_name),
        // Keep original data for filtering
        store_name: vendor.store_name,
        vendor_id: vendor.vendor_id,
      }));

      SetVendors(transformedVendors);
      setTotalVendors(response.data.total_vendors);
    } catch (error: any) {
      console.error("Error fetching vendors:", error);
      setError("Failed to load vendors. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);
  const [filters, setFilters] = useState({
    search: "",
    category: "All Categories",
    location: "All Locations",
    rating: "All Ratings",
    sort: "featured",
  });
  console.log(vendors);
  const filteredVendors = useMemo(() => {
    let filtered = vendors.filter((vendor: any) => {
      const matchSearch =
        !filters.search ||
        vendor.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        vendor.store_name.toLowerCase().includes(filters.search.toLowerCase());

      const matchCategory =
        filters.category === "All Categories" ||
        vendor.categories.some((cat: string) =>
          cat.toLowerCase().includes(filters.category.toLowerCase())
        );
      console.log(filters.category);
      console.log(
        vendor.categories.some((cat: string) =>
          cat.toLowerCase().includes(filters.category.toLowerCase())
        )
      );

      const matchLocation =
        filters.location === "All Locations" ||
        vendor.location.toLowerCase().includes(filters.location.toLowerCase());

      const matchRating = (() => {
        if (filters.rating === "All Ratings") return true;
        const threshold = parseFloat(filters.rating);
        return vendor.rating >= threshold;
      })();

      return matchSearch && matchCategory && matchLocation && matchRating;
    });

    // Apply sorting
    if (filters.sort === "name") {
      filtered.sort((a: any, b: any) => a.name.localeCompare(b.name));
    } else if (filters.sort === "rating") {
      filtered.sort((a: any, b: any) => b.rating - a.rating);
    } else if (filters.sort === "products") {
      filtered.sort((a: any, b: any) => b.totalProducts - a.totalProducts);
    } else if (filters.sort === "newest") {
      filtered.sort((a: any, b: any) => b.yearsInBusiness - a.yearsInBusiness);
    }
    // Default "featured" sorting keeps original order

    return filtered;
  }, [vendors, filters]);
  console.log(filteredVendors);
  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Discover Amazing Vendors</h1>
          <p className="text-xl opacity-90">
            Explore {totalVendors} trusted vendors offering quality products and
            services
          </p>
        </div>
      </div>

      {/* Filters */}
      <VendorFilters
        onSearch={(query) => updateFilter("search", query)}
        onCategoryFilter={(category) => updateFilter("category", category)}
        onLocationFilter={(location) => updateFilter("location", location)}
        onRatingFilter={(rating) => updateFilter("rating", rating)}
        onSortChange={(sort) => updateFilter("sort", sort)}
        selectedFilters={filters}
      />

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            {filteredVendors.length} Vendor
            {filteredVendors.length !== 1 ? "s" : ""} Found
          </h2>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-xl text-muted-foreground">Loading vendors...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-xl text-red-500 mb-4">{error}</p>
            <button
              onClick={fetchVendors}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filteredVendors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVendors.map((vendor: any) => (
              <VendorCard key={vendor.vendor_id} vendor={vendor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground mb-4">
              No vendors found matching your criteria
            </p>
            <p className="text-muted-foreground">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
