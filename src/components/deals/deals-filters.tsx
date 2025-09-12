import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, SlidersHorizontal } from "lucide-react"

export function DealsFilters() {
  const categories = ["All Deals", "Electronics", "Fashion", "Home & Garden", "Sports", "Books"]
  const sortOptions = ["Best Deals", "Price: Low to High", "Price: High to Low", "Newest"]

  return (
    <div className="bg-card rounded-lg p-6 mb-8 border border-border">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <Badge
              key={category}
              variant={index === 0 ? "default" : "secondary"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Sort and Filter */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Sort: Best Deals
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>
    </div>
  )
}
