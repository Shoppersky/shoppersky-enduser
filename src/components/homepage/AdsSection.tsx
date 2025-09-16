// 'use client'
// import React, { useState } from 'react';
// import { Heart, ChevronRight, Plus, ChevronLeft, Star } from 'lucide-react';

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   originalPrice?: number;
//   image: string;
//   hasOptions?: boolean;
//   optionsFrom?: number;
//   isClearance?: boolean;
//   discount?: number;
// }

// interface ProductSection {
//   id: string;
//   title: string;
//   subtitle: string;
//   products: Product[];
//   adContent: {
//     title: string;
//     subtitle: string;
//     mainText: string;
//     price: string;
//     priceSubtext: string;
//     buttonText: string;
//     bgColor: string;
//     textColor: string;
//   };
// }

// const productSections: ProductSection[] = [
//   {
//     id: 'college-savings',
//     title: 'College-ready savings',
//     subtitle: 'All you need, $50 & under.',
//     products: [
//       {
//         id: 1,
//         name: 'Mainstays By Becky G. & Alejandra 3-Piece Stacked Bathroom Canisters...',
//         price: 9.97,
//         image: 'https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=400',
//         hasOptions: true,
//         isClearance: true,
//         discount: 35
//       },
//       {
//         id: 2,
//         name: 'TERGAYEE Soft Knot Ball Pillows,Handmade Round Throw...',
//         price: 15.59,
//         originalPrice: 24.99,
//         image: 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=400',
//         hasOptions: true,
//         optionsFrom: 6.00,
//         discount: 38
//       },
//       {
//         id: 3,
//         name: 'Home Decor Collection Cordless Rechargeable 11.9" Brass Table Lamp...',
//         price: 17.96,
//         image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400',
//         discount: 25
//       },
//       {
//         id: 4,
//         name: 'College Dorm Room Essential Storage Organizer Set...',
//         price: 12.97,
//         originalPrice: 19.99,
//         image: 'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=400',
//         hasOptions: true,
//         discount: 35
//       },
//       {
//         id: 5,
//         name: 'Compact Mini Fridge for Dorm Room - Energy Efficient...',
//         price: 89.97,
//         originalPrice: 129.99,
//         image: 'https://images.pexels.com/photos/2343468/pexels-photo-2343468.jpeg?auto=compress&cs=tinysrgb&w=400',
//         discount: 31
//       },
//       {
//         id: 6,
//         name: 'Study Desk Lamp with USB Charging Port - Adjustable...',
//         price: 24.97,
//         originalPrice: 39.99,
//         image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400',
//         hasOptions: true,
//         discount: 38
//       },
//       {
//         id: 7,
//         name: 'Memory Foam Mattress Topper - Twin XL College Size...',
//         price: 49.97,
//         originalPrice: 79.99,
//         image: 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=400',
//         discount: 38
//       },
//       {
//         id: 8,
//         name: 'Portable Coffee Maker - Single Serve for Dorm Room...',
//         price: 34.97,
//         originalPrice: 49.99,
//         image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
//         hasOptions: true,
//         discount: 30
//       },
//       {
//         id: 9,
//         name: 'College Textbook Stand - Adjustable Reading Support...',
//         price: 18.97,
//         originalPrice: 29.99,
//         image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
//         discount: 37
//       }
//     ],
//     adContent: {
//       title: 'Get free delivery with Walmart+',
//       subtitle: '',
//       mainText: 'Save on college essentials',
//       price: '$50',
//       priceSubtext: '& under',
//       buttonText: 'Shop now',
//       bgColor: 'from-blue-900 to-blue-700',
//       textColor: 'text-white',
//       image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=800'
//     }
//   },
//   {
//     id: 'electronics',
//     title: 'Tech & Electronics',
//     subtitle: 'Latest gadgets at unbeatable prices.',
//     products: [
//       {
//         id: 10,
//         name: 'Wireless Bluetooth Headphones - Noise Cancelling Premium Sound',
//         price: 29.97,
//         originalPrice: 59.99,
//         image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
//         hasOptions: true,
//         isClearance: true,
//         discount: 50
//       },
//       {
//         id: 11,
//         name: 'Portable Laptop Stand - Adjustable Height Ergonomic Design',
//         price: 16.59,
//         originalPrice: 24.99,
//         image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400',
//         hasOptions: true,
//         optionsFrom: 12.99,
//         discount: 34
//       },
//       {
//         id: 12,
//         name: 'USB-C Fast Charging Cable - 6ft Braided Durable Design',
//         price: 8.96,
//         originalPrice: 15.99,
//         image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400',
//         discount: 44
//       },
//       {
//         id: 13,
//         name: 'Wireless Mouse - Ergonomic Design with Long Battery Life',
//         price: 19.97,
//         originalPrice: 34.99,
//         image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400',
//         hasOptions: true,
//         discount: 43
//       },
//       {
//         id: 14,
//         name: 'Bluetooth Speaker - Waterproof Portable Sound System',
//         price: 39.97,
//         originalPrice: 69.99,
//         image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400',
//         discount: 43
//       },
//       {
//         id: 15,
//         name: 'Smartphone Car Mount - 360° Rotation Dashboard Holder',
//         price: 14.97,
//         originalPrice: 24.99,
//         image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400',
//         hasOptions: true,
//         discount: 40
//       },
//       {
//         id: 16,
//         name: 'Power Bank 10000mAh - Fast Charging Portable Battery',
//         price: 24.97,
//         originalPrice: 39.99,
//         image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400',
//         discount: 38
//       },
//       {
//         id: 17,
//         name: 'Webcam HD 1080p - USB Plug and Play for Video Calls',
//         price: 29.97,
//         originalPrice: 49.99,
//         image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400',
//         hasOptions: true,
//         discount: 40
//       },
//       {
//         id: 18,
//         name: 'Gaming Keyboard - RGB Backlit Mechanical Feel',
//         price: 34.97,
//         originalPrice: 59.99,
//         image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400',
//         discount: 42
//       }
//     ],
//     adContent: {
//       title: 'Tech Revolution Sale',
//       subtitle: 'Up to 60% off',
//       mainText: 'Upgrade your tech game',
//       price: '60%',
//       priceSubtext: 'OFF',
//       buttonText: 'Explore deals',
//       bgColor: 'from-purple-900 to-purple-700',
//       textColor: 'text-white',
//       image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800'
//     }
//   },
//   {
//     id: 'home-living',
//     title: 'Home & Living',
//     subtitle: 'Transform your space with style.',
//     products: [
//       {
//         id: 19,
//         name: 'Modern Ceramic Vase Set - Minimalist Home Decor Collection',
//         price: 24.97,
//         originalPrice: 39.99,
//         image: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=400',
//         hasOptions: true,
//         discount: 38
//       },
//       {
//         id: 20,
//         name: 'Cozy Throw Blanket - Ultra Soft Fleece for Living Room',
//         price: 19.59,
//         originalPrice: 29.99,
//         image: 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=400',
//         hasOptions: true,
//         optionsFrom: 15.99,
//         discount: 35
//       },
//       {
//         id: 21,
//         name: 'LED String Lights - Warm White Fairy Lights for Bedroom',
//         price: 12.96,
//         originalPrice: 19.99,
//         image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400',
//         discount: 35
//       },
//       {
//         id: 22,
//         name: 'Scented Candles Set - Aromatherapy Relaxation Collection',
//         price: 16.97,
//         originalPrice: 26.99,
//         image: 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=400',
//         hasOptions: true,
//         discount: 37
//       },
//       {
//         id: 23,
//         name: 'Wall Art Canvas Prints - Abstract Modern Design Set',
//         price: 32.97,
//         originalPrice: 54.99,
//         image: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=400',
//         discount: 40
//       },
//       {
//         id: 24,
//         name: 'Indoor Plant Pot Set - Ceramic Planters with Drainage',
//         price: 21.97,
//         originalPrice: 34.99,
//         image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=400',
//         hasOptions: true,
//         discount: 37
//       },
//       {
//         id: 25,
//         name: 'Area Rug - Soft Shag Carpet for Living Room Bedroom',
//         price: 45.97,
//         originalPrice: 79.99,
//         image: 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=400',
//         discount: 43
//       },
//       {
//         id: 26,
//         name: 'Picture Frames Set - Gallery Wall Collection Wood Frames',
//         price: 18.97,
//         originalPrice: 29.99,
//         image: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=400',
//         hasOptions: true,
//         discount: 37
//       },
//       {
//         id: 27,
//         name: 'Essential Oil Diffuser - Ultrasonic Aromatherapy Humidifier',
//         price: 28.97,
//         originalPrice: 44.99,
//         image: 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=400',
//         discount: 36
//       }
//     ],
//     adContent: {
//       title: 'Home Makeover Special',
//       subtitle: 'Free shipping on orders $35+',
//       mainText: 'Refresh your living space',
//       price: '40%',
//       priceSubtext: 'OFF',
//       buttonText: 'Shop home',
//       bgColor: 'from-green-900 to-green-700',
//       textColor: 'text-white',
//       image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
//     }
//   },
//   {
//     id: 'fashion',
//     title: 'Fashion & Style',
//     subtitle: 'Trendy looks for every occasion.',
//     products: [
//       {
//         id: 28,
//         name: 'Classic Denim Jacket - Vintage Wash Unisex Style',
//         price: 34.97,
//         originalPrice: 59.99,
//         image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
//         hasOptions: true,
//         discount: 42
//       },
//       {
//         id: 29,
//         name: 'Comfortable Sneakers - All-Day Wear Athletic Shoes',
//         price: 28.59,
//         originalPrice: 45.99,
//         image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
//         hasOptions: true,
//         optionsFrom: 24.99,
//         discount: 38
//       },
//       {
//         id: 30,
//         name: 'Stylish Backpack - Water Resistant Travel Bag',
//         price: 22.96,
//         originalPrice: 34.99,
//         image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400',
//         discount: 34
//       },
//       {
//         id: 31,
//         name: 'Casual T-Shirt - 100% Cotton Comfortable Fit',
//         price: 12.97,
//         originalPrice: 19.99,
//         image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
//         hasOptions: true,
//         discount: 35
//       },
//       {
//         id: 32,
//         name: 'Leather Belt - Genuine Leather Classic Design',
//         price: 18.97,
//         originalPrice: 29.99,
//         image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
//         discount: 37
//       },
//       {
//         id: 33,
//         name: 'Baseball Cap - Adjustable Sports Hat Collection',
//         price: 14.97,
//         originalPrice: 22.99,
//         image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
//         hasOptions: true,
//         discount: 35
//       },
//       {
//         id: 34,
//         name: 'Sunglasses - UV Protection Stylish Frames',
//         price: 24.97,
//         originalPrice: 39.99,
//         image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
//         discount: 38
//       },
//       {
//         id: 35,
//         name: 'Hoodie Sweatshirt - Soft Fleece Pullover',
//         price: 29.97,
//         originalPrice: 49.99,
//         image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
//         hasOptions: true,
//         discount: 40
//       },
//       {
//         id: 36,
//         name: 'Wrist Watch - Classic Analog Design Water Resistant',
//         price: 39.97,
//         originalPrice: 69.99,
//         image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
//         discount: 43
//       }
//     ],
//     adContent: {
//       title: 'Fashion Forward Sale',
//       subtitle: 'New arrivals daily',
//       mainText: 'Express your style',
//       price: '50%',
//       priceSubtext: 'OFF',
//       buttonText: 'Shop fashion',
//       bgColor: 'from-pink-900 to-pink-700',
//       textColor: 'text-white',
//       image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800'
//     }
//   }
// ];

// // Shuffle function to randomize arrays
// const shuffleArray = <T,>(array: T[]): T[] => {
//   const shuffled = [...array];
//   for (let i = shuffled.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//   }
//   return shuffled;
// };

// // Function to get 2 random sections with shuffled products
// const getRandomSections = (): ProductSection[] => {
//   const shuffledSections = shuffleArray(productSections);
//   return shuffledSections.slice(0, 2).map(section => ({
//     ...section,
//     products: shuffleArray(section.products)
//   }));
// };

// function App() {
//   const [favorites, setFavorites] = useState<Set<number>>(new Set());
//   const [currentSlides, setCurrentSlides] = useState<{[key: string]: number}>({});
//   const [displaySections] = useState<ProductSection[]>(() => getRandomSections());

//   const toggleFavorite = (productId: number) => {
//     const newFavorites = new Set(favorites);
//     if (newFavorites.has(productId)) {
//       newFavorites.delete(productId);
//     } else {
//       newFavorites.add(productId);
//     }
//     setFavorites(newFavorites);
//   };

//   const nextSlide = (sectionId: string, totalSlides: number) => {
//     setCurrentSlides(prev => ({
//       ...prev,
//       [sectionId]: ((prev[sectionId] || 0) + 1) % totalSlides
//     }));
//   };

//   const prevSlide = (sectionId: string, totalSlides: number) => {
//     setCurrentSlides(prev => ({
//       ...prev,
//       [sectionId]: ((prev[sectionId] || 0) - 1 + totalSlides) % totalSlides
//     }));
//   };

//   const ProductCarousel = ({ section, isReversed }: { section: ProductSection, isReversed: boolean }) => {
//     const productsPerSlide = 3;
//     const totalSlides = Math.ceil(section.products.length / productsPerSlide);
//     const currentSlide = currentSlides[section.id] || 0;

//     const getCurrentProducts = () => {
//       const startIndex = currentSlide * productsPerSlide;
//       return section.products.slice(startIndex, startIndex + productsPerSlide);
//     };

//     return (
//       <div className="relative">
//         {/* Section Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
//             <p className="text-gray-600 mt-1">{section.subtitle}</p>
//           </div>
//           <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
//             View all
//           </button>
//         </div>

//         {/* Products Carousel */}
//         <div className="relative">
//           {/* Navigation Buttons */}
//           {totalSlides > 1 && (
//             <>
//               <button
//                 onClick={() => prevSlide(section.id, totalSlides)}
//                 className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 -ml-4"
//                 disabled={currentSlide === 0}
//               >
//                 <ChevronLeft className="w-5 h-5 text-gray-600" />
//               </button>
              
//               <button
//                 onClick={() => nextSlide(section.id, totalSlides)}
//                 className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 -mr-4"
//                 disabled={currentSlide === totalSlides - 1}
//               >
//                 <ChevronRight className="w-5 h-5 text-gray-600" />
//               </button>
//             </>
//           )}

//           {/* Products Container */}
//           <div className="overflow-hidden">
//             <div 
//               className="flex transition-transform duration-300 ease-in-out gap-4"
//               style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//             >
//               {Array.from({ length: totalSlides }).map((_, slideIndex) => (
//                 <div key={slideIndex} className="w-full flex-shrink-0 grid grid-cols-3 gap-4">
//                   {section.products
//                     .slice(slideIndex * productsPerSlide, (slideIndex + 1) * productsPerSlide)
//                     .map((product) => (
//                       <div key={product.id} className="group relative bg-white rounded-lg overflow-hidden">
//                         {/* Product Image */}
//                         <div className="relative overflow-hidden">
//                           <img
//                             src={product.image}
//                             alt={product.name}
//                             className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
//                           />
                          
//                           {/* Badges */}
//                           {product.isClearance && (
//                             <div className="absolute top-2 left-2">
//                               <span className="bg-yellow-400 text-black px-1.5 py-0.5 text-xs font-bold rounded">
//                                 Clearance
//                               </span>
//                             </div>
//                           )}

//                           {product.discount && (
//                             <div className="absolute top-2 right-2">
//                               <span className="bg-red-500 text-white px-1.5 py-0.5 text-xs font-bold rounded">
//                                 -{product.discount}%
//                               </span>
//                             </div>
//                           )}

//                           {/* Favorite Button */}
//                           <button
//                             onClick={() => toggleFavorite(product.id)}
//                             className="absolute bottom-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-200"
//                           >
//                             <Heart
//                               className={`w-3 h-3 ${
//                                 favorites.has(product.id)
//                                   ? 'fill-red-500 text-red-500'
//                                   : 'text-gray-400 hover:text-red-500'
//                               }`}
//                             />
//                           </button>
//                         </div>

//                         {/* Product Details */}
//                         <div className="p-3">
//                           {/* Price */}
//                           <div className="mb-2">
//                             <span className="text-lg font-bold text-gray-900">
//                               ${product.price}
//                             </span>
//                             {product.originalPrice && (
//                               <span className="text-xs text-gray-500 line-through ml-1">
//                                 ${product.originalPrice}
//                               </span>
//                             )}
//                           </div>

//                           {/* Options Info */}
//                           {product.optionsFrom && (
//                             <p className="text-xs text-gray-600 mb-2">
//                               More options from ${product.optionsFrom.toFixed(2)}
//                             </p>
//                           )}

//                           {/* Product Name */}
//                           <h3 className="text-xs text-gray-800 mb-3 line-clamp-2 leading-relaxed">
//                             {product.name}
//                           </h3>

//                           {/* Action Buttons */}
//                           <div className="flex gap-1">
//                             {product.hasOptions ? (
//                               <button className="flex-1 border border-gray-300 text-gray-700 px-2 py-1.5 rounded font-medium hover:bg-gray-50 transition-colors duration-200 text-xs">
//                                 Options
//                               </button>
//                             ) : (
//                               <button className="flex-1 bg-blue-600 text-white px-2 py-1.5 rounded font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-1 text-xs">
//                                 <Plus className="w-3 h-3" />
//                                 Add
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           {/* Slide Indicators */}
//           {totalSlides > 1 && (
//             <div className="flex justify-center mt-4 gap-2">
//               {Array.from({ length: totalSlides }).map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentSlides(prev => ({ ...prev, [section.id]: index }))}
//                   className={`w-2 h-2 rounded-full transition-colors duration-200 ${
//                     index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
//                   }`}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const AdBanner = ({ section }: { section: ProductSection }) => {
//     return (
//       <div className="relative rounded-2xl overflow-hidden h-full min-h-[400px]">
//         {/* Background Image */}
//         <div className="absolute inset-0">
//           <img
//             src={section.adContent.image}
//             alt={section.adContent.mainText}
//             className="w-full h-full object-cover"
//           />
//           <div className={`absolute inset-0 bg-gradient-to-br ${section.adContent.bgColor} opacity-85`}></div>
//         </div>

//         {/* Content Overlay */}
//         <div className={`relative z-10 ${section.adContent.textColor} p-6 h-full flex flex-col justify-between`}>
//           {/* Header */}
//           <div>
//             <div className="flex items-center gap-2 mb-4">
//               <span className="text-sm font-medium">{section.adContent.title}</span>
//             </div>
            
//             {section.adContent.subtitle && (
//               <p className="text-sm opacity-90 mb-2">{section.adContent.subtitle}</p>
//             )}
            
//             <h3 className="text-3xl font-bold mb-6 leading-tight">
//               {section.adContent.mainText}
//             </h3>
//           </div>

//           {/* Price Badge and CTA */}
//           <div className="relative">
//             <div className="bg-white text-gray-900 rounded-full px-6 py-4 inline-block mb-4">
//               <div className="text-3xl font-bold">{section.adContent.price}</div>
//               <div className="text-sm font-medium">{section.adContent.priceSubtext}</div>
//             </div>
            
//             <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 text-sm">
//               {section.adContent.buttonText}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className=" ">
//       {/* Header */}
    

//       <div className="container mx-auto  sm:px-6  py-4">
//         {/* Alternating Sections */}
//         {displaySections.map((section, index) => (
//           <div key={section.id} className="mb-16">
//             <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
//               {/* Products Section */}
//               <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
//                 <ProductCarousel section={section} isReversed={index % 2 === 1} />
//               </div>

//               {/* Advertisement Banner */}
//               <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
//                 <AdBanner section={section} />
//               </div>
//             </div>

//             {/* Additional Info */}
          
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;



'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart, ChevronRight, Plus, ChevronLeft } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hasOptions?: boolean;
  optionsFrom?: number;
  isClearance?: boolean;
  discount?: number;
}

interface ProductSection {
  id: string;
  title: string;
  subtitle: string;
  products: Product[];
  adContent: {
    title: string;
    subtitle: string;
    mainText: string;
    price: string;
    priceSubtext: string;
    buttonText: string;
    bgColor: string;
    textColor: string;
    image: string;
  };
}

const productSections: ProductSection[] = [
  {
    id: 'college-savings',
    title: 'College-ready savings',
    subtitle: 'All you need, $50 & under.',
    products: [
      {
        id: 1,
        name: 'Mainstays By Becky G. & Alejandra 3-Piece Stacked Bathroom Canisters...',
        price: 9.97,
        image: 'https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=400',
        hasOptions: true,
        isClearance: true,
        discount: 35,
      },
      {
        id: 2,
        name: 'TERGAYEE Soft Knot Ball Pillows, Handmade Round Throw...',
        price: 15.59,
        originalPrice: 24.99,
        image: 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=400',
        hasOptions: true,
        optionsFrom: 6.00,
        discount: 38,
      },
      {
        id: 3,
        name: 'Home Decor Collection Cordless Rechargeable 11.9" Brass Table Lamp...',
        price: 17.96,
        image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400',
        discount: 25,
      },
      {
        id: 4,
        name: 'College Dorm Room Essential Storage Organizer Set...',
        price: 12.97,
        originalPrice: 19.99,
        image: 'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=400',
        hasOptions: true,
        discount: 35,
      },
      {
        id: 5,
        name: 'Compact Mini Fridge for Dorm Room - Energy Efficient...',
        price: 89.97,
        originalPrice: 129.99,
        image: 'https://images.pexels.com/photos/2343468/pexels-photo-2343468.jpeg?auto=compress&cs=tinysrgb&w=400',
        discount: 31,
      },
      {
        id: 6,
        name: 'Study Desk Lamp with USB Charging Port - Adjustable...',
        price: 24.97,
        originalPrice: 39.99,
        image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400',
        hasOptions: true,
        discount: 38,
      },
      {
        id: 7,
        name: 'Memory Foam Mattress Topper - Twin XL College Size...',
        price: 49.97,
        originalPrice: 79.99,
        image: 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=400',
        discount: 38,
      },
      {
        id: 8,
        name: 'Portable Coffee Maker - Single Serve for Dorm Room...',
        price: 34.97,
        originalPrice: 49.99,
        image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
        hasOptions: true,
        discount: 30,
      },
      {
        id: 9,
        name: 'College Textbook Stand - Adjustable Reading Support...',
        price: 18.97,
        originalPrice: 29.99,
        image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
        discount: 37,
      },
    ],
    adContent: {
      title: 'Get free delivery with Walmart+',
      subtitle: '',
      mainText: 'Save on college essentials',
      price: '$50',
      priceSubtext: '& under',
      buttonText: 'Shop now',
      bgColor: 'from-blue-900 to-blue-700',
      textColor: 'text-white',
      image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  },
  {
    id: 'electronics',
    title: 'Tech & Electronics',
    subtitle: 'Latest gadgets at unbeatable prices.',
    products: [
      {
        id: 10,
        name: 'Wireless Bluetooth Headphones - Noise Cancelling Premium Sound',
        price: 29.97,
        originalPrice: 59.99,
        image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
        hasOptions: true,
        isClearance: true,
        discount: 50,
      },
      {
        id: 11,
        name: 'Portable Laptop Stand - Adjustable Height Ergonomic Design',
        price: 16.59,
        originalPrice: 24.99,
        image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400',
        hasOptions: true,
        optionsFrom: 12.99,
        discount: 34,
      },
      {
        id: 12,
        name: 'USB-C Fast Charging Cable - 6ft Braided Durable Design',
        price: 8.96,
        originalPrice: 15.99,
        image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400',
        discount: 44,
      },
      {
        id: 13,
        name: 'Wireless Mouse - Ergonomic Design with Long Battery Life',
        price: 19.97,
        originalPrice: 34.99,
        image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400',
        hasOptions: true,
        discount: 43,
      },
      {
        id: 14,
        name: 'Bluetooth Speaker - Waterproof Portable Sound System',
        price: 39.97,
        originalPrice: 69.99,
        image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400',
        discount: 43,
      },
      {
        id: 15,
        name: 'Smartphone Car Mount - 360° Rotation Dashboard Holder',
        price: 14.97,
        originalPrice: 24.99,
        image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400',
        hasOptions: true,
        discount: 40,
      },
      {
        id: 16,
        name: 'Power Bank 10000mAh - Fast Charging Portable Battery',
        price: 24.97,
        originalPrice: 39.99,
        image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400',
        discount: 38,
      },
      {
        id: 17,
        name: 'Webcam HD 1080p - USB Plug and Play for Video Calls',
        price: 29.97,
        originalPrice: 49.99,
        image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400',
        hasOptions: true,
        discount: 40,
      },
      {
        id: 18,
        name: 'Gaming Keyboard - RGB Backlit Mechanical Feel',
        price: 34.97,
        originalPrice: 59.99,
        image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400',
        discount: 42,
      },
    ],
    adContent: {
      title: 'Tech Revolution Sale',
      subtitle: 'Up to 60% off',
      mainText: 'Upgrade your tech game',
      price: '60%',
      priceSubtext: 'OFF',
      buttonText: 'Explore deals',
      bgColor: 'from-purple-900 to-purple-700',
      textColor: 'text-white',
      image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  },
  {
    id: 'home-living',
    title: 'Home & Living',
    subtitle: 'Transform your space with style.',
    products: [
      {
        id: 19,
        name: 'Modern Ceramic Vase Set - Minimalist Home Decor Collection',
        price: 24.97,
        originalPrice: 39.99,
        image: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=400',
        hasOptions: true,
        discount: 38,
      },
      {
        id: 20,
        name: 'Cozy Throw Blanket - Ultra Soft Fleece for Living Room',
        price: 19.59,
        originalPrice: 29.99,
        image: 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=400',
        hasOptions: true,
        optionsFrom: 15.99,
        discount: 35,
      },
      {
        id: 21,
        name: 'LED String Lights - Warm White Fairy Lights for Bedroom',
        price: 12.96,
        originalPrice: 19.99,
        image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400',
        discount: 35,
      },
      {
        id: 22,
        name: 'Scented Candles Set - Aromatherapy Relaxation Collection',
        price: 16.97,
        originalPrice: 26.99,
        image: 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=400',
        hasOptions: true,
        discount: 37,
      },
      {
        id: 23,
        name: 'Wall Art Canvas Prints - Abstract Modern Design Set',
        price: 32.97,
        originalPrice: 54.99,
        image: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=400',
        discount: 40,
      },
      {
        id: 24,
        name: 'Indoor Plant Pot Set - Ceramic Planters with Drainage',
        price: 21.97,
        originalPrice: 34.99,
        image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=400',
        hasOptions: true,
        discount: 37,
      },
      {
        id: 25,
        name: 'Area Rug - Soft Shag Carpet for Living Room Bedroom',
        price: 45.97,
        originalPrice: 79.99,
        image: 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=400',
        discount: 43,
      },
      {
        id: 26,
        name: 'Picture Frames Set - Gallery Wall Collection Wood Frames',
        price: 18.97,
        originalPrice: 29.99,
        image: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=400',
        hasOptions: true,
        discount: 37,
      },
      {
        id: 27,
        name: 'Essential Oil Diffuser - Ultrasonic Aromatherapy Humidifier',
        price: 28.97,
        originalPrice: 44.99,
        image: 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=400',
        discount: 36,
      },
    ],
    adContent: {
      title: 'Home Makeover Special',
      subtitle: 'Free shipping on orders $35+',
      mainText: 'Refresh your living space',
      price: '40%',
      priceSubtext: 'OFF',
      buttonText: 'Shop home',
      bgColor: 'from-green-900 to-green-700',
      textColor: 'text-white',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  },
  {
    id: 'fashion',
    title: 'Fashion & Style',
    subtitle: 'Trendy looks for every occasion.',
    products: [
      {
        id: 28,
        name: 'Classic Denim Jacket - Vintage Wash Unisex Style',
        price: 34.97,
        originalPrice: 59.99,
        image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
        hasOptions: true,
        discount: 42,
      },
      {
        id: 29,
        name: 'Comfortable Sneakers - All-Day Wear Athletic Shoes',
        price: 28.59,
        originalPrice: 45.99,
        image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
        hasOptions: true,
        optionsFrom: 24.99,
        discount: 38,
      },
      {
        id: 30,
        name: 'Stylish Backpack - Water Resistant Travel Bag',
        price: 22.96,
        originalPrice: 34.99,
        image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400',
        discount: 34,
      },
      {
        id: 31,
        name: 'Casual T-Shirt - 100% Cotton Comfortable Fit',
        price: 12.97,
        originalPrice: 19.99,
        image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
        hasOptions: true,
        discount: 35,
      },
      {
        id: 32,
        name: 'Leather Belt - Genuine Leather Classic Design',
        price: 18.97,
        originalPrice: 29.99,
        image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
        discount: 37,
      },
      {
        id: 33,
        name: 'Baseball Cap - Adjustable Sports Hat Collection',
        price: 14.97,
        originalPrice: 22.99,
        image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
        hasOptions: true,
        discount: 35,
      },
      {
        id: 34,
        name: 'Sunglasses - UV Protection Stylish Frames',
        price: 24.97,
        originalPrice: 39.99,
        image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
        discount: 38,
      },
      {
        id: 35,
        name: 'Hoodie Sweatshirt - Soft Fleece Pullover',
        price: 29.97,
        originalPrice: 49.99,
        image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
        hasOptions: true,
        discount: 40,
      },
      {
        id: 36,
        name: 'Wrist Watch - Classic Analog Design Water Resistant',
        price: 39.97,
        originalPrice: 69.99,
        image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
        discount: 43,
      },
    ],
    adContent: {
      title: 'Fashion Forward Sale',
      subtitle: 'New arrivals daily',
      mainText: 'Express your style',
      price: '50%',
      priceSubtext: 'OFF',
      buttonText: 'Shop fashion',
      bgColor: 'from-pink-900 to-pink-700',
      textColor: 'text-white',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  },
];

// Shuffle function to randomize arrays
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Function to get 2 random sections with shuffled products
const getRandomSections = (): ProductSection[] => {
  const shuffledSections = shuffleArray(productSections);
  return shuffledSections.slice(0, 2).map(section => ({
    ...section,
    products: shuffleArray(section.products),
  }));
};

export default function Home() {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [currentSlides, setCurrentSlides] = useState<{ [key: string]: number }>({});
  const [displaySections] = useState<ProductSection[]>(() => getRandomSections());
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

  // Update window width for responsive product count
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleFavorite = (productId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const nextSlide = (sectionId: string, totalSlides: number) => {
    setCurrentSlides(prev => ({
      ...prev,
      [sectionId]: ((prev[sectionId] || 0) + 1) % totalSlides,
    }));
  };

  const prevSlide = (sectionId: string, totalSlides: number) => {
    setCurrentSlides(prev => ({
      ...prev,
      [sectionId]: ((prev[sectionId] || 0) - 1 + totalSlides) % totalSlides,
    }));
  };

  const ProductCarousel = ({ section, isReversed }: { section: ProductSection; isReversed: boolean }) => {
    // Determine products per slide based on window width
    const productsPerSlide = windowWidth && windowWidth < 640 ? 1 : windowWidth && windowWidth < 768 ? 2 : 3;
    const totalSlides = Math.ceil(section.products.length / productsPerSlide);
    const currentSlide = currentSlides[section.id] || 0;

    return (
      <div className="relative">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{section.title}</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">{section.subtitle}</p>
          </div>
          <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
            View all
          </button>
        </div>

        {/* Products Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={() => prevSlide(section.id, totalSlides)}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-200 -ml-4 sm:-ml-6"
                disabled={currentSlide === 0}
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </button>
              <button
                onClick={() => nextSlide(section.id, totalSlides)}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-200 -mr-4 sm:-mr-6"
                disabled={currentSlide === totalSlides - 1}
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </button>
            </>
          )}

          {/* Products Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="w-full flex-shrink-0 flex justify-center"
                >
                  <div
                    className={`grid gap-2 sm:gap-4 w-full max-w-[calc(100%-${productsPerSlide===1?'0px':'16px'})] sm:max-w-[calc(100%-${productsPerSlide===1?'0px':'32px'})] ${
                      productsPerSlide === 1
                        ? 'grid-cols-1'
                        : productsPerSlide === 2
                        ? 'grid-cols-2'
                        : 'grid-cols-3'
                    }`}
                  >
                    {section.products
                      .slice(slideIndex * productsPerSlide, (slideIndex + 1) * productsPerSlide)
                      .map((product) => (
                        <div key={product.id} className="group relative bg-white rounded-lg overflow-hidden">
                          {/* Product Image */}
                          <div className="relative overflow-hidden aspect-w-1 aspect-h-1">
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={400}
                              height={300}
                              className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                              priority={slideIndex === 0}
                            />
                            {/* Badges */}
                            {product.isClearance && (
                              <div className="absolute top-2 left-2">
                                <span className="bg-yellow-400 text-black px-1.5 py-0.5 text-xs font-bold rounded">
                                  Clearance
                                </span>
                              </div>
                            )}
                            {product.discount && (
                              <div className="absolute top-2 right-2">
                                <span className="bg-red-500 text-white px-1.5 py-0.5 text-xs font-bold rounded">
                                  -{product.discount}%
                                </span>
                              </div>
                            )}
                            {/* Favorite Button */}
                            <button
                              onClick={() => toggleFavorite(product.id)}
                              className="absolute bottom-2 right-2 p-1.5 sm:p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-200"
                              aria-label={favorites.has(product.id) ? 'Remove from favorites' : 'Add to favorites'}
                            >
                              <Heart
                                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                  favorites.has(product.id)
                                    ? 'fill-red-500 text-red-500'
                                    : 'text-gray-400 hover:text-red-500'
                                }`}
                              />
                            </button>
                          </div>

                          {/* Product Details */}
                          <div className="p-2 sm:p-3">
                            {/* Price */}
                            <div className="mb-1 sm:mb-2">
                              <span className="text-base sm:text-lg font-bold text-gray-900">
                                ${product.price.toFixed(2)}
                              </span>
                              {product.originalPrice && (
                                <span className="text-xs text-gray-500 line-through ml-1">
                                  ${product.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>

                            {/* Options Info */}
                       

                            {/* Product Name */}
                            <h3 className="text-xs sm:text-sm text-gray-800 mb-2 sm:mb-3 line-clamp-2 leading-relaxed">
                              {product.name}
                            </h3>

                            {/* Action Buttons */}
                            <div className="flex gap-1">
                              {product.hasOptions ? (
                                <button className="flex-1 border border-gray-300 text-gray-700 px-2 py-1 sm:py-1.5 rounded font-medium hover:bg-gray-50 transition-colors duration-200 text-xs">
                                  Options
                                </button>
                              ) : (
                                <button className="flex-1 bg-blue-600 text-white px-2 py-1 sm:py-1.5 rounded font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-1 text-xs">
                                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                                  Add
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center mt-3 sm:mt-4 gap-1 sm:gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlides(prev => ({ ...prev, [section.id]: index }))}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-200 ${
                    index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const AdBanner = ({ section }: { section: ProductSection }) => {
    return (
      <div className="relative rounded-2xl overflow-hidden h-full min-h-[300px] sm:min-h-[400px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={section.adContent.image}
            alt={section.adContent.mainText}
            width={800}
            height={800}
            className="w-full h-full object-cover"
            priority
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${section.adContent.bgColor} opacity-85`}></div>
        </div>

        {/* Content Overlay */}
        <div className={`relative z-10 ${section.adContent.textColor} p-4 sm:p-6 h-full flex flex-col justify-between`}>
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="text-sm font-medium">{section.adContent.title}</span>
            </div>
            {section.adContent.subtitle && (
              <p className="text-xs sm:text-sm opacity-90 mb-2 sm:mb-3">{section.adContent.subtitle}</p>
            )}
            <h3 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 leading-tight">
              {section.adContent.mainText}
            </h3>
          </div>

          {/* Price Badge and CTA */}
          <div className="relative">
            <div className="bg-white text-gray-900 rounded-full px-4 sm:px-6 py-3 sm:py-4 inline-block mb-3 sm:mb-4">
              <div className="text-xl sm:text-3xl font-bold">{section.adContent.price}</div>
              <div className="text-xs sm:text-sm font-medium">{section.adContent.priceSubtext}</div>
            </div>
            <button className="bg-white text-gray-900 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 text-xs sm:text-sm">
              {section.adContent.buttonText}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Alternating Sections */}
        {displaySections.map((section, index) => (
          <div key={section.id} className="mb-12 sm:mb-16">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-8">
              {/* Products Section */}
              <div className={index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}>
                <ProductCarousel section={section} isReversed={index % 2 === 1} />
              </div>

              {/* Advertisement Banner */}
              <div className={index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}>
                <AdBanner section={section} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
