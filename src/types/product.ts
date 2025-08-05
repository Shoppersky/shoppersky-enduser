export interface Product {
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
