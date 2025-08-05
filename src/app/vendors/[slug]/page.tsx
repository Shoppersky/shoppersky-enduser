"use client"

import { use, useEffect, useState } from "react"
import { Product } from '../../../types/product';
import { VendorHeader } from "@/components/vendor/vendor-header"
import { VendorMenu } from "@/components/vendor/vendor-menu"
import { ProductGrid } from "@/components/shoppage/product-grid"
import axiosInstance from "@/lib/axiosInstance"
import {Grid, List, Filter, Edit3, Save, Camera, Settings, Eye, EyeOff, ArrowLeft, BoxIcon, Home } from 'lucide-react';
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
    const [vendor,setvendor]=useState({})
console.log(vendorId)

  const [searchQuery, setSearchQuery] = useState("")

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
  }

  const handleAddToCart = (productId: number) => {
    console.log(`Adding product ${productId} to cart for vendor: ${slug}`)
  }

const fetchCategories=async()=>{
  try{
    const response=await axiosInstance.get(`/vendor/vendor-products-categories?store_slug=${slug}`)
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
              image: item.images?.urls[0] || '/images/placeholder.svg',
              category:item.category_name || 'Uncategorized',
              productSlug: item.slug,
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
  setvendor(response.data.business_profile)
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
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    
    // Filter by search query
    const searchMatch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });


    console.log(products)
  return (
    <div className="min-h-screen bg-background">
      <VendorHeader
  vendor={vendor}
/>


{/* <section className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.filter(cat => cat.category_id !== 'all').map((category) => (
        <div 
          key={category.category_id}
          onClick={() => setSelectedCategory(category.category_name)}
          className={`cursor-pointer rounded-lg p-6 text-center transition-all hover:shadow-md ${
            selectedCategory === category.category_name 
              ? 'bg-indigo-100 border-2 border-indigo-500' 
              : 'bg-white border border-gray-200'
          }`}
        >
          <div className="flex flex-col items-center">
     
            
            <h3 className="font-medium text-lg">{category.category_name}</h3>
            <p className="text-sm text-gray-500 mt-1">
{
  products.filter(
    p => p.category?.toLowerCase() === category.category_name?.toLowerCase()
  ).length
} Products
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section> */}


      {/* Category Filter */}
      {/* <section className="w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Catalog</h2>
            <p className="text-gray-600">Preview how customers see your products</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              >
                {categories.map((category) => (
                  <option key={category.category_id} value={category.category_id}>
                    {category.category_name}
                  </option>
                ))}
                  <option  value='all'>
             All
                  </option>
              </select>
            </div>
               <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
            <div className="text-sm text-gray-500">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </div>
        </div>


      
      </section> */}

      <VendorMenu
        vendorSlug={slug}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        onSearch={setSearchQuery}
        onFollow={handleFollow}
      />

     <ProductGrid products={filteredProducts} viewMode={viewMode} />
    </div>
  )
}
