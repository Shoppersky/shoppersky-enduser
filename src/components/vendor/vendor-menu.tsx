"use client"

import { Heart, Search, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Category {
  category_id: string
  category_name: string
  subcategories: Category[]
}

interface VendorMenuProps {
  vendorSlug: string
  categories?: Category[] // Make it optional to allow loading state
  onSearch?: (query: string) => void
  onFollow?: () => void
  onCategorySelect?: (category: string) => void
  selectedCategory?: string
  isLoading?: boolean // Optional flag to show loading state
}

export function VendorMenu({
  vendorSlug,
  categories = [],
  onSearch,
  onFollow,
  onCategorySelect,
  selectedCategory = 'all',
  isLoading = false,
}: VendorMenuProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  const categoryLinks = useMemo(() => {
    if (isLoading) {
      return (
        <span className="text-sm text-muted-foreground italic">Loading categories...</span>
      )
    }

    if (categories.length === 0) {
      return (
        <span className="text-sm text-muted-foreground italic">No categories available</span>
      )
    }

    const allCategory = { category_name: 'All', category_id: 'all', subcategories: [] }
    const allCategories = [allCategory, ...categories]

    return allCategories.map((category) => {
      const hasSubcategories = category.subcategories && category.subcategories.length > 0
      const categoryValue = category.category_id === 'all' ? 'all' : category.category_name
      const isSelected = selectedCategory === categoryValue

      return (
        <div
          key={category.category_id}
          className="relative"
          onMouseEnter={() => hasSubcategories && setHoveredCategory(category.category_id)}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          <button
            onClick={() => onCategorySelect?.(categoryValue)}
            className={`flex items-center gap-1 text-sm font-medium transition-colors ${
              isSelected
                ? 'text-foreground border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {category.category_name}
            {hasSubcategories && (
              <ChevronDown className="w-3 h-3 transition-transform duration-200" />
            )}
          </button>

          {/* Subcategories Dropdown */}
          {hasSubcategories && hoveredCategory === category.category_id && (
            <div className="absolute top-full left-0 mt-1 bg-background border rounded-md shadow-lg py-2 min-w-[200px] z-50">
              {category.subcategories.map((subcategory) => (
                <button
                  key={subcategory.category_id}
                  onClick={() => onCategorySelect?.(subcategory.category_name)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-muted ${
                    selectedCategory === subcategory.category_name
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {subcategory.category_name}
                </button>
              ))}
            </div>
          )}
        </div>
      )
    })
  }, [categories, isLoading, selectedCategory, onCategorySelect, hoveredCategory])

  return (
    <div className="sticky top-0 z-40 bg-background border-b shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Desktop Categories Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8 flex-1">
            {categoryLinks}
          </nav>

          {/* Tablet Categories - Horizontal Scroll */}
          <nav className="hidden md:flex lg:hidden items-center space-x-4 flex-1 overflow-x-auto scrollbar-hide">
            <div className="flex items-center space-x-4 min-w-max">
              {categoryLinks}
            </div>
          </nav>

          {/* Mobile Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="outline" size="sm" className="text-xs">
                Categories
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-h-[400px] overflow-y-auto">
              {isLoading ? (
                <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
              ) : categories.length > 0 ? (
                <>
                  {/* All Categories Option */}
                  <DropdownMenuItem 
                    onClick={() => onCategorySelect?.('all')}
                    className={`cursor-pointer ${
                      selectedCategory === 'all'
                        ? 'bg-primary/10 text-primary'
                        : ''
                    }`}
                  >
                    All
                  </DropdownMenuItem>
                  
                  {/* Main Categories and their Subcategories */}
                  {categories.map((category) => (
                    <div key={category.category_id}>
                      <DropdownMenuItem 
                        onClick={() => onCategorySelect?.(category.category_name)}
                        className={`cursor-pointer font-medium ${
                          selectedCategory === category.category_name
                            ? 'bg-primary/10 text-primary'
                            : ''
                        }`}
                      >
                        {category.category_name}
                      </DropdownMenuItem>
                      
                      {/* Subcategories */}
                      {category.subcategories && category.subcategories.length > 0 && (
                        <>
                          {category.subcategories.map((subcategory) => (
                            <DropdownMenuItem 
                              key={subcategory.category_id}
                              onClick={() => onCategorySelect?.(subcategory.category_name)}
                              className={`cursor-pointer pl-6 text-sm ${
                                selectedCategory === subcategory.category_name
                                  ? 'bg-primary/10 text-primary'
                                  : 'text-muted-foreground'
                              }`}
                            >
                              {subcategory.category_name}
                            </DropdownMenuItem>
                          ))}
                        </>
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <DropdownMenuItem disabled>No categories</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search - Responsive */}
          <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md mx-2 sm:mx-4">
            <div className="relative">
              <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 h-3 sm:w-4 sm:h-4" />
              <Input
                placeholder="Search in this store..."
                className="pl-7 sm:pl-10 text-xs sm:text-sm h-8 sm:h-10"
                onChange={(e) => onSearch?.(e.target.value)}
              />
            </div>
          </div>

          {/* Actions - Responsive */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Follow Button - Hidden on mobile, text on larger screens */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onFollow}
              className="hidden sm:flex text-xs sm:text-sm px-2 sm:px-3"
            >
              <span className="hidden md:inline">Follow Store</span>
              <span className="md:hidden">Follow</span>
            </Button>
            
            {/* Heart Button - Always visible */}
            <Button variant="outline" size="sm" className="p-1 sm:p-2">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
