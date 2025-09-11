import React from 'react';
import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import Link from "next/link";
type Category = {
  category_slug: string | number | boolean;
  category_img_thumbnail: string | Blob | undefined;
  category_name: ReactNode;
  id: string;
  name: string;
  image?: string;
  slug?: string;
};

const CategoriesSection = () => {
 
const [categories, setCategories] = useState<Category[]>([]);

useEffect(() => {
  async function fetchCategories() {
    try {
      const { data } = await axiosInstance.get("/categories/");
      setCategories(data.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
      setCategories([]); // fallback empty
    }
  }
  fetchCategories();
}, []);

  return (
    <section className=" constainer mx-auto px-4 py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our wide range of products across multiple categories
          </p>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 md:gap-8 gap-2">
          {categories.map((category) => (
      <div 
  key={category.id} 
  className="group cursor-pointer transition-transform duration-300 hover:scale-105"
>
  <Link href={`/${encodeURIComponent(category.category_slug)}`}>
    <div className="relative mb-4">
      <div className="md:w-24 md:h-24  w-14 h-14 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
        <img 
          src={category.category_img_thumbnail} 
          alt={category.category_name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
    </div>
    <div className="text-center">
      <h3 className="md:font-semibold text-gray-800 mb-1 group-hover:text-purple-600 transition-colors text-xs md:text-base">
        {category.category_name}
      </h3>
    </div>
  </Link>
</div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;