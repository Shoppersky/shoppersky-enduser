import React from "react";
import { ArrowRight, Tag } from "lucide-react";

// Category cards (with 4 subcategory mini-cards showing minimum price)
// Mobile: horizontal scroll; Desktop: grid
const StartingFrom99 = () => {
  const categories = [
    {
      id: 1,
      name: "Premium Electronics",
      startingPrice: 99,
      image:
        "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "High-quality gadgets and devices",
      subcategories: [
        {
          id: 11,
          name: "Laptops",
          startingPrice: 499,
          image:
            "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300",
        },
        {
          id: 12,
          name: "Headphones",
          startingPrice: 49,
          image:
            "https://images.pexels.com/photos/159579/headphones-music-ears-sound-159579.jpeg?auto=compress&cs=tinysrgb&w=300",
        },
        {
          id: 13,
          name: "Smartphones",
          startingPrice: 299,
          image:
            "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=300",
        },
        {
          id: 14,
          name: "Accessories",
          startingPrice: 19,
          image:
            "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=300",
        },
      ],
    },
    {
      id: 2,
      name: "Designer Fashion",
      startingPrice: 99,
      image:
        "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Trendy clothing and accessories",
      subcategories: [
        {
          id: 21,
          name: "Tops",
          startingPrice: 29,
          image:
            "https://images.pexels.com/photos/7679724/pexels-photo-7679724.jpeg?auto=compress&cs=tinysrgb&w=300",
        },
        {
          id: 22,
          name: "Denim",
          startingPrice: 59,
          image:
            "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=300",
        },
        {
          id: 23,
          name: "Footwear",
          startingPrice: 49,
          image:
            "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=300",
        },
        {
          id: 24,
          name: "Accessories",
          startingPrice: 19,
          image:
            "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=300",
        },
      ],
    },
    {
      id: 3,
      name: "Home Essentials",
      startingPrice: 99,
      image:
        "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Transform your living space",
      subcategories: [
        {
          id: 31,
          name: "Lighting",
          startingPrice: 25,
          image:
            "https://images.pexels.com/photos/112811/pexels-photo-112811.jpeg?auto=compress&cs=tinysrgb&w=300",
        },
        {
          id: 32,
          name: "Bedding",
          startingPrice: 39,
          image:
            "https://images.pexels.com/photos/545012/pexels-photo-545012.jpeg?auto=compress&cs=tinysrgb&w=300",
        },
        {
          id: 33,
          name: "Decor",
          startingPrice: 15,
          image:
            "https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?auto=compress&cs=tinysrgb&w=300",
        },
        {
          id: 34,
          name: "Storage",
          startingPrice: 19,
          image:
            "https://images.pexels.com/photos/1658823/pexels-photo-1658823.jpeg?auto=compress&cs=tinysrgb&w=300",
        },
      ],
    },
    {
      id: 4,
      name: "Fitness & Sports",
      startingPrice: 99,
      image:
        "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Gear up for your active lifestyle",
      subcategories: [
        {
          id: 41,
          name: "Wearables",
          startingPrice: 79,
          image:
            "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=300",
        },
        {
          id: 42,
          name: "Yoga",
          startingPrice: 29,
          image:
            "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=300",
        },
        {
          id: 43,
          name: "Equipment",
          startingPrice: 49,
          image:
            "https://images.pexels.com/photos/669584/pexels-photo-669584.jpeg?auto=compress&cs=tinysrgb&w=300",
        },
        {
          id: 44,
          name: "Accessories",
          startingPrice: 15,
          image:
            "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=300",
        },
      ],
    },
  ];

  // Rotating background colors for subcategory image tiles
  const subBgColors = [
    "bg-indigo-50",
    "bg-pink-50",
    "bg-emerald-50",
    "bg-amber-50",
    "bg-sky-50",
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-1">
            Starting from $99 – Categories
          </h2>
          <p className="text-gray-600 text-base">Discover value picks by category</p>
        </div>

        <div
          className="grid grid-flow-col auto-cols-[85%] sm:auto-cols-[60%] gap-5 overflow-x-auto pb-2
                      md:grid-flow-row md:auto-cols-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:overflow-visible md:gap-6"
        >
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              {/* Category title/description */}
              <div className="p-4 pb-2">
                <div className="flex items-start gap-2 mb-1">
                  <Tag className="h-4 w-4 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">{cat.name}</h3>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{cat.description}</p>
              </div>

              {/* Subcategories grid (2x2) */}
              <div className="px-4 pb-4">
                <div className="grid grid-cols-2 gap-3">
                  {cat.subcategories.map((sub, idx) => (
                    <div
                      key={sub.id}
                      className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-sm transition-shadow bg-white"
                    >
                      <div
                        className={`relative h-20 w-full p-2 flex items-center justify-center ${
                          subBgColors[idx % subBgColors.length]
                        }`}
                      >
                        <img
                          src={sub.image}
                          alt={sub.name}
                          className="w-full h-full object-contain rounded"
                        />
                        <div className="absolute bottom-1 left-1 bg-white/95 text-gray-800 px-2 py-0.5 rounded text-[10px] font-medium shadow-sm">
                          From ${sub.startingPrice}
                        </div>
                      </div>
                      <div className="px-2.5 py-2">
                        <div className="text-sm font-semibold text-gray-800 truncate">
                          {sub.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Explore button */}
                <div className="mt-4 flex items-center justify-between">
                  <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 text-white text-sm font-semibold hover:bg-blue-600 transition-colors">
                    Explore {cat.name}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <span className="text-xs text-gray-500">Best value</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StartingFrom99;