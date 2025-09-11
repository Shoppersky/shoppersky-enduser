// import HeroSection from "@/components/homepage/HeroSection";
// import CategoriesSection from "@/components/homepage/CategoriesSection";
// import FeaturedProducts from "@/components/homepage/DiscountSection";
// import StartingFrom99 from "@/components/homepage/minumumSale";
// import Partners from "@/components/Partners";
// import App from '@/components/homepage/AdsSection'
// import IndustryProducts from "@/components/homepage/IndustryProducts";

// export default function Home() {
//   return (
//     <main className="font-sans min-h-screen">
//       <HeroSection />
//       {/* Content container with sensible spacing */}
//       <div className="space-y-16 px-4 sm:px-6 lg:px-8 py-12">
//         {/* After Hero */}
//         <IndustryProducts title="Top picks in Electronics" subtitle="Curated just for you" industry="Electronics" />

//         <App/>
//         <CategoriesSection />

//         {/* Between Categories and Featured */}
//         <IndustryProducts title="Fresh Fashion Finds" subtitle="Trending now" industry="Fashion" />
//         <IndustryProducts title="Home & Living Essentials" subtitle="Refresh your space" industry="Home & Living" />

//         <FeaturedProducts />

//         {/* Between Featured and Minimum Sale */}
//         <IndustryProducts title="Grocery Staples" subtitle="Daily deals" industry="Groceries" />
//         <IndustryProducts title="Beauty Bestsellers" subtitle="Top rated picks" industry="Beauty" />

//         <StartingFrom99 />

//         {/* Before Partners */}
//         <IndustryProducts title="Sports & Outdoors" subtitle="Gear up and go" industry="Sports" />
//         <Partners />
//       </div>
//     </main>
//   );
// }


"use client";

import React, { useEffect, useState } from "react";
import HeroSection from "@/components/homepage/HeroSection";
import CategoriesSection from "@/components/homepage/CategoriesSection";
import FeaturedProducts from "@/components/homepage/DiscountSection";
import StartingFrom99 from "@/components/homepage/minumumSale";
import Partners from "@/components/Partners";
import App from "@/components/homepage/AdsSection";
import IndustryProducts from "@/components/homepage/IndustryProducts";
import axiosInstance from "@/lib/axiosInstance";
import type { Product } from "@/types/product";

type IndustryResponse = {
  id: string;
  name: string;
  products: Product[];
};
const industriess=[
  {
    "id": "1",
    "name": "Fashion",
    "products": [
      {
        "id": "f-1",
        "name": "Casual T-Shirt",
        "description": "Comfortable cotton t-shirt",
        "price": 499,
        "originalPrice": 799,
        "image": "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400",
        "category": "Fashion",
        "productSlug": "fashion-casual-tshirt",
        "rating": 4.5,
        "reviews": 120,
        "inStock": true
      },
      {
        "id": "f-2",
        "name": "Denim Jacket",
        "description": "Trendy and stylish denim jacket",
        "price": 1499,
        "image": "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400",
        "category": "Fashion",
        "productSlug": "fashion-denim-jacket",
        "rating": 4.7,
        "reviews": 85,
        "inStock": true
      },
      {
        "id": "f-3",
        "name": "Sneakers",
        "description": "Comfortable white sneakers",
        "price": 1999,
        "image": "https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=400",
        "category": "Fashion",
        "productSlug": "fashion-sneakers",
        "rating": 4.6,
        "reviews": 95,
        "inStock": true
      },

    ]
  },
  {
    "id": "2",
    "name": "Groceries",
    "products": [
      {
        "id": "g-1",
        "name": "Organic Apples",
        "description": "Fresh and juicy organic apples",
        "price": 199,
        "image": "https://images.pexels.com/photos/5946081/pexels-photo-5946081.jpeg?auto=compress&cs=tinysrgb&w=400",
        "category": "Groceries",
        "productSlug": "groceries-organic-apples",
        "rating": 4.3,
        "reviews": 45,
        "inStock": true
      },
      {
        "id": "g-2",
        "name": "Whole Wheat Bread",
        "description": "Healthy brown bread loaf",
        "price": 59,
        "image": "https://images.pexels.com/photos/4199098/pexels-photo-4199098.jpeg?auto=compress&cs=tinysrgb&w=400",
        "category": "Groceries",
        "productSlug": "groceries-whole-wheat-bread",
        "rating": 4.6,
        "reviews": 60,
        "inStock": true
      },
      {
        "id": "g-3",
        "name": "Fresh Milk",
        "description": "1 litre full cream milk",
        "price": 65,
        "image": "https://images.pexels.com/photos/5945641/pexels-photo-5945641.jpeg?auto=compress&cs=tinysrgb&w=400",
        "category": "Groceries",
        "productSlug": "groceries-fresh-milk",
        "rating": 4.8,
        "reviews": 50,
        "inStock": true
      },

    ]
  },
  {
    "id": "3",
    "name": "Beauty",
    "products": [
      {
        "id": "b-1",
        "name": "Moisturizing Cream",
        "description": "Hydrating daily face cream",
        "price": 299,
        "originalPrice": 399,
        "image": "https://images.pexels.com/photos/853427/pexels-photo-853427.jpeg?auto=compress&cs=tinysrgb&w=400",
        "category": "Beauty",
        "productSlug": "beauty-moisturizing-cream",
        "rating": 4.8,
        "reviews": 200,
        "inStock": true
      },
      {
        "id": "b-2",
        "name": "Lipstick Set",
        "description": "Pack of 3 matte lipsticks",
        "price": 499,
        "image": "https://images.pexels.com/photos/3612186/pexels-photo-3612186.jpeg?auto=compress&cs=tinysrgb&w=400",
        "category": "Beauty",
        "productSlug": "beauty-lipstick-set",
        "rating": 4.4,
        "reviews": 150,
        "inStock": true
      },
      {
        "id": "b-3",
        "name": "Eyeliner",
        "description": "Waterproof liquid eyeliner",
        "price": 199,
        "image": "https://images.pexels.com/photos/3373743/pexels-photo-3373743.jpeg?auto=compress&cs=tinysrgb&w=400",
        "category": "Beauty",
        "productSlug": "beauty-eyeliner",
        "rating": 4.6,
        "reviews": 95,
        "inStock": true
      },
    
    ]
  }
]

export default function Home() {
  const [industries, setIndustries] = useState<IndustryResponse[]>([]);

  useEffect(() => {
    async function fetchIndustries() {
      try {
        const { data } = await axiosInstance.get<IndustryResponse[]>("stats/latest-products");
        setIndustries(data.data);
      } catch (err) {
        console.error("Failed to fetch industries", err);
        setIndustries(industriess);
      }
    }
    fetchIndustries();
  }, []);
console.log(industries);
  return (
    <main className="font-sans min-h-screen">
      <HeroSection />
       <CategoriesSection />
      <div className="space-y-16 px-4 sm:px-6 lg:px-8 py-12">
        {/* Slot 1: First industry from API */}
        {industries[0] && (
          <IndustryProducts
            title={`Top picks in ${industries[0].industry_name}`}
            subtitle="Curated just for you"
            products={industries[0].products}
          />
        )}

        <App />
 

        {/* Slot 2: Second industry */}
        {industries[1] && (
          <IndustryProducts
            title={` ${industries[1].industry_name} `}
            subtitle="Trending now"
            products={industries[1].products}
          />
        )}

        {/* Slot 3: Third industry */}
    

        <FeaturedProducts />
    {industries[2] && (
          <IndustryProducts
            title={`${industries[2].industry_name} `}
            subtitle="Refresh your space"
            products={industries[2].products}
          />
        )}
        {/* Slot 4 */}
        {industries[3] && (
          <IndustryProducts
            title={`${industries[3].industry_name} `}
            subtitle="Daily deals"
            products={industries[3].products}
          />
        )}

        {/* Slot 5 */}
        {industries[4] && (
          <IndustryProducts
            title={`${industries[4].industry_name}`}
            subtitle="Top rated picks"
            products={industries[4].products}
          />
        )}

        {/* <StartingFrom99 /> */}

        {/* Slot 6 */}
        {industries[5] && (
          <IndustryProducts
            title={`${industries[5].industry_name} & More`}
            subtitle="Gear up and go"
            products={industries[5].products}
          />
        )}

        <Partners />
      </div>
    </main>
  );
}
