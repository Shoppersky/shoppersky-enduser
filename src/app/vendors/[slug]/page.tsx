"use client"

import { use, useEffect, useState } from "react"
import { Product } from '../../../types/product';
import { VendorHeader } from "@/components/vendor/vendor-header"
import { VendorMenu } from "@/components/vendor/vendor-menu"
import { ProductGrid } from "@/components/shoppage/product-grid"
import axiosInstance from "@/lib/axiosInstance"
import {Grid, List } from 'lucide-react';
// import { ProductsGrid } from "@/components/products-grid"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"


interface VendorPageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    category?: string
  }>
}

export default function VendorPage({ params, searchParams }: VendorPageProps) {
  const { slug } = use(params)
  const { category } = use(searchParams)
  const [categories,setCategories]=useState([])

  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [products, setProducts] = useState<Product[]>([]);
    const[vendorId,setVendorid]=useState('')
    const [vendor,setVendor]=useState({})


  const [searchQuery, setSearchQuery] = useState("")

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
  }


const fetchCategories=async()=>{
  try{
    const response=await axiosInstance.get(`/vendor/vendor-products-categories?store_slug=${slug}`)
    console.log(response.data.category_management)
    setCategories(response.data.category_management)

    setVendorid(response.data.vendor_id)
      const mappedProducts: Product[] = response.data.products.map((item) => ({
              id: item.product_id,
              name: item.identification.product_name,
              description: item.descriptions?.short_description || '',
              price: parseFloat(item.pricing?.selling_price || '0'),
              originalPrice: item.pricing?.original_price
                ? parseFloat(item.pricing.original_price)
                : undefined,
              image: item.images?.urls?.[0] || '/images/placeholder.svg', 
              category:item.category_name || 'Uncategorized',
              subCategory: item.subcategory_name || 'General',
              productSlug: item.slug,
              category_slug:item.category_slug,
              timestamp: item.timestamp,
              unit: 'unit',
              rating: item.rating || 0,
              reviews: item.reviews || 0,
              inStock: item.in_stock !== undefined ? item.in_stock : true,
              badge: item.badge,
              badgeColor: item.badge_color,
              
            }));
                setProducts(mappedProducts)
  }
  catch(error){
    toast.error('failed to load event data')
  }
}


const fetchvendor=async()=>{
  try{
    const response=await axiosInstance.get(`/vendor/details/by-slug?slug=${slug}`)
  const { business_profile, vendor_login } = response.data;

    // Merge both objects safely
    setVendor({
      ...business_profile,
      ...vendor_login,
    });
  }
  catch(error){
    toast.error('failed to load event data')
  }
}

  const handleFollow = () => {
    console.log(`Following vendor: ${slug}`)
  }

  const handleLoadMore = () => {
    console.log("Loading more products...")
  }
  useEffect(() => {
    fetchCategories();
    fetchvendor();
  }, [])
  const filteredProducts = products.filter(product => {
    // Filter by category
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory || product.subCategory === selectedCategory;
    
    // Filter by search query
    const searchMatch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });


  return (
    <div className="min-h-screen bg-background">
      {/* Vendor Header - Responsive */}
      <VendorHeader vendor={vendor} />

      {/* Vendor Menu - Responsive Navigation */}
      <VendorMenu
        vendorSlug={slug}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        onSearch={setSearchQuery}
        onFollow={handleFollow}
      />

      {/* Main Content Area - Responsive Container */}
      <main className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Category Overview Section - Optional for larger screens */}
       

        {/* Products Section Header - Responsive */}
        <section className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Title and Description */}
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                {selectedCategory === 'all' ? 'All Products' : selectedCategory}
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {selectedCategory === 'all' 
                  ? `Browse all ${products.length} products from this store`
                  : `${filteredProducts.length} products in ${selectedCategory}`
                }
              </p>
            </div>

            {/* View Mode Toggle - Desktop/Tablet Only */}
            <div className="hidden sm:flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="text-xs sm:text-sm"
              >
                <Grid className="w-3 h-3 sm:w-4 sm:h-4" />
                {/* <span className="hidden md:inline ml-1">Grid</span> */}
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="text-xs sm:text-sm"
              >
                <List className="w-3 h-3 sm:w-4 sm:h-4" />
                {/* <span className="hidden md:inline ml-1">List</span> */}
              </Button>
            </div>

            {/* Product Count - Mobile */}
            <div className="sm:hidden text-xs text-gray-500">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </div>

          {/* Product Count - Desktop */}
          <div className="hidden sm:block text-sm text-gray-500 mt-2">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </section>

        {/* Products Grid - Responsive */}
        <ProductGrid 
          products={filteredProducts} 
          viewMode={viewMode}
          clearFilters={() => setSelectedCategory('all')}
        />

        {/* Load More Button - For future pagination */}
        {filteredProducts.length > 0 && filteredProducts.length >= 20 && (
          <div className="flex justify-center mt-8 sm:mt-12">
            <Button 
              variant="outline" 
              onClick={handleLoadMore}
              className="px-6 sm:px-8 py-2 sm:py-3"
            >
              Load More Products
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
