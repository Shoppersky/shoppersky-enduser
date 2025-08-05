"use client"

import { Heart, Search } from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface VendorMenuProps {
  vendorSlug: string
  categories?: any[] // Make it optional to allow loading state
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

    const allCategories = [{ category_name: 'All', category_id: 'all' }, ...categories];

    return allCategories.map((category) => (
      <button
        key={category.category_id}
        onClick={() => onCategorySelect?.(category.category_id === 'all' ? 'all' : category.category_name)}
        className={`text-sm font-medium transition-colors ${
          selectedCategory === (category.category_id === 'all' ? 'all' : category.category_name)
            ? 'text-foreground border-b-2 border-primary'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        {category.category_name}
      </button>
    ))
  }, [categories, vendorSlug, isLoading, selectedCategory, onCategorySelect])

  return (
    <div className="sticky top-0 z-40 bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Desktop Categories */}
          <nav className="hidden md:flex items-center space-x-8">
            {categoryLinks}
          </nav>

          {/* Mobile Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="outline" size="sm">
                Categories
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {isLoading ? (
                <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
              ) : categories.length > 0 ? (
                [{ category_name: 'All', category_id: 'all' }, ...categories].map((category) => (
                  <DropdownMenuItem 
                    key={category.category_id}
                    onClick={() => onCategorySelect?.(category.category_id === 'all' ? 'all' : category.category_name)}
                    className={`cursor-pointer ${
                      selectedCategory === (category.category_id === 'all' ? 'all' : category.category_name)
                        ? 'bg-primary/10 text-primary'
                        : ''
                    }`}
                  >
                    {category.category_name}
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem disabled>No categories</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search in this store..."
                className="pl-10"
                onChange={(e) => onSearch?.(e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onFollow}>
              Follow Store
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
