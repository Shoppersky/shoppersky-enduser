import React from "react";
import { Percent, Tag, ArrowRight } from "lucide-react";

// Category cards instead of products
// Mobile: horizontal scroll; Desktop: grid
const FeaturedProducts = () => {
  const categoryDiscounts = [
    {
      category: "Electronics",
      discount: 25,
      image:
        "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Latest gadgets and accessories",
    },
    {
      category: "Fashion",
      discount: 30,
      image:
        "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Trendy apparel and styles",
    },
    {
      category: "Home & Garden",
      discount: 35,
      image:
        "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Decor, lighting, and essentials",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-8 ">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-1">
          Top Offers
          </h2>
          <p className="text-gray-600 text-base">Explore top deals by category</p>
        </div>

        {/* Category cards */}
        <div
          className="grid grid-flow-col auto-cols-[75%] sm:auto-cols-[55%] gap-5 overflow-x-auto pb-2
                      md:grid-flow-row md:auto-cols-auto md:grid-cols-3 lg:grid-cols-4 md:overflow-visible md:gap-6"
        >
          {categoryDiscounts.map((cat) => (
            <div
              key={cat.category}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              <div className="relative h-44">
                <img
                  src={cat.image}
                  alt={cat.category}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold">
                  <Percent className="h-3.5 w-3.5" /> Up to {cat.discount}% OFF
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Tag className="h-4 w-4 text-indigo-600" />
                      <h3 className="text-lg font-semibold text-gray-800">{cat.category}</h3>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 h-10">{cat.description}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 text-white text-sm font-semibold hover:bg-blue-600 transition-colors whitespace-nowrap">
                    Shop {cat.category}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;