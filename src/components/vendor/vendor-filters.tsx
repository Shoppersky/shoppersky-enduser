"use client"

import { Search, Filter, MapPin, Star } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import axiosInstance from "@/lib/axiosInstance"
interface VendorFiltersProps {
  onSearch: (query: string) => void
  onCategoryFilter: (category: string) => void
  onLocationFilter: (location: string) => void
  onRatingFilter: (rating: string) => void
  onSortChange: (sort: string) => void
  selectedFilters: {
    category: string
    location: string
    rating: string
    sort: string
  }
}
interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  productCount: number;
  status: "Active" | "Inactive";
  createdDate: string;
  lastUpdated: string;
  totalRevenue: string;
  industry: string;
  metaTitle: string;
  metaDescription: string;
  image: string | null;
  showInMenu: boolean;
 
}
export function VendorFilters({
  onSearch,
  onCategoryFilter,
  onLocationFilter,
  onRatingFilter,
  onSortChange,
  selectedFilters,
}: VendorFiltersProps) {





  
 
 

 
const [categories, setCategories] = useState<Category[]>([]);
 
  const [searchQuery, setSearchQuery] = useState("")

  
  const locations = ["All Locations", "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia"]
  const ratings = ["All Ratings", "4.5+ Stars", "4.0+ Stars", "3.5+ Stars", "3.0+ Stars"]

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    onSearch(value)
  }

  const clearFilters = () => {
    setSearchQuery("")
    onSearch("")
    onCategoryFilter("All Categories")
    onLocationFilter("All Locations")
    onRatingFilter("All Ratings")
    onSortChange("featured")
  }
  const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/categories/", {
          params: { status_filter: null },
        });
        if (response.data.statusCode === 200) {
          const fetchedCategories: Category[] = response.data.data.map(
            (cat: any) => ({
              id: cat.category_id,
              slug: cat.category_slug,
              name: cat.category_name,
              industry: cat.industry_name || "Other",
              description: cat.category_description || "",
              metaTitle: cat.category_meta_title || "",
              metaDescription: cat.category_meta_description || "",
              image: cat.category_img_thumbnail || null,
              createdDate:
                cat.category_tstamp?.split("T")[0] ||
                new Date().toISOString().split("T")[0],
              lastUpdated:
                cat.category_tstamp?.split("T")[0] ||
                new Date().toISOString().split("T")[0],
              status: cat.category_status ? "Inactive" : "Active",
              showInMenu: cat.show_in_menu,
              productCount: cat.productCount || 0,
              totalRevenue: cat.totalRevenue || "$0.00",
            })
          );
          setCategories(fetchedCategories);
         
        } else {
          throw new Error("Failed to fetch categories");
        }
      } catch (err) {
     
        console.error(err);
      }
    };
    useEffect(() => {
      fetchCategories();
    }, [])
  const hasActiveFilters =
    searchQuery ||
    selectedFilters.category !== "All Categories" ||
    selectedFilters.location !== "All Locations" ||
    selectedFilters.rating !== "All Ratings"
console.log(categories)
  return (
    <div className="bg-background border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search vendors..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>

          <Select value={selectedFilters.category} onValueChange={onCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
               <SelectItem value='All Categories'>
                  All Categories
                </SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedFilters.location} onValueChange={onLocationFilter}>
            <SelectTrigger className="w-40">
              <MapPin className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* <Select value={selectedFilters.rating} onValueChange={onRatingFilter}>
            <SelectTrigger className="w-40">
              <Star className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ratings.map((rating) => (
                <SelectItem key={rating} value={rating}>
                  {rating}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}

          {/* <Select value={selectedFilters.sort} onValueChange={onSortChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="reviews">Most Reviews</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
            </SelectContent>
          </Select> */}

          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear Filters
            </Button>
          )}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-3">
            {searchQuery && <Badge variant="secondary">Search: {searchQuery}</Badge>}
            {selectedFilters.category !== "All Categories" && (
              <Badge variant="secondary">{selectedFilters.category}</Badge>
            )}
            {selectedFilters.location !== "All Locations" && (
              <Badge variant="secondary">{selectedFilters.location}</Badge>
            )}
            {selectedFilters.rating !== "All Ratings" && <Badge variant="secondary">{selectedFilters.rating}</Badge>}
          </div>
        )}
      </div>
    </div>
  )
}
