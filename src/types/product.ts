export interface Product {
  selling_price: ReactNode;
  product_name: ReactNode;
  product_images: string | Blob | undefined;
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  category: string;
  productSlug: string;
  timestamp?: string;
  isFeatured?: boolean;
  originalPrice?: number;
  unit?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  badge?: string;
  badgeColor?: string;
}
