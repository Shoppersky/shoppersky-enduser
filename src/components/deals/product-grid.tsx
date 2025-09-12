import { ProductCard } from "@/components/product-card"

const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    originalPrice: 199.99,
    salePrice: 79.99,
    discount: 60,
    image: "/wireless-bluetooth-headphones.jpg",
    rating: 4.5,
    reviews: 1234,
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    originalPrice: 299.99,
    salePrice: 149.99,
    discount: 50,
    image: "/smart-fitness-watch.png",
    rating: 4.3,
    reviews: 856,
  },
  {
    id: 3,
    name: "Portable Laptop Stand",
    originalPrice: 89.99,
    salePrice: 39.99,
    discount: 56,
    image: "/portable-laptop-stand.jpg",
    rating: 4.7,
    reviews: 432,
  },
  {
    id: 4,
    name: "Wireless Charging Pad",
    originalPrice: 49.99,
    salePrice: 19.99,
    discount: 60,
    image: "/wireless-charging-pad.png",
    rating: 4.2,
    reviews: 678,
  },
  {
    id: 5,
    name: "USB-C Hub Adapter",
    originalPrice: 79.99,
    salePrice: 34.99,
    discount: 56,
    image: "/usb-c-hub-adapter.jpg",
    rating: 4.6,
    reviews: 291,
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    originalPrice: 129.99,
    salePrice: 59.99,
    discount: 54,
    image: "/bluetooth-speaker.png",
    rating: 4.4,
    reviews: 1567,
  },
]

export function ProductGrid() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Today's Best Deals</h2>
        <p className="text-muted-foreground">{products.length} products found</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
