// "use client";

// import { Star } from "lucide-react";
// import Image from "next/image";

// interface VendorHeaderProps {
//   vendor: {
//     vendorSlug: string;
//     name: string;
//     description: string;
//     logo: string;
//     banner: string;
//     rating: number;
//     reviewCount: number;
//     yearsInBusiness: number;
//     features: string[];
//   };
// }

// export const VendorHeader = ({ vendor }: VendorHeaderProps) => {
//   console.log(vendor);
//   return (
//     <div className="relative h-48 sm:h-56 md:h-64 lg:h-80 xl:h-96 bg-gradient-to-r from-blue-600 to-purple-600">
//       <Image
//         src={vendor.banner_image || "/images/placeholder.svg?height=320&width=1200"}
//         alt={`${vendor.name} Banner`}
//         fill
//         className="object-cover"
//         priority
//       />
//       <div className="absolute inset-0 bg-black/40" />

//       {/* Content Container - Responsive */}
//       <div className="absolute inset-0 flex items-end">
//         <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
//           <div className="text-white">
//             {/* Store Info - Responsive Layout */}
//             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
//               {/* Logo */}
//               <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white rounded-full p-1 sm:p-2 flex-shrink-0">
//                 <Image
//                   src={
//                     vendor?.logo || "/images/placeholder.svg?height=60&width=60"
//                   }
//                   alt={`${vendor.store_name} Logo`}
//                   width={80}
//                   height={80}
//                   className="rounded-full w-full h-full object-cover"
//                 />
//               </div>

//               {/* Store Details */}
//               <div className="flex-1 min-w-0">
//                 <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 truncate">
//                   {vendor.store_name || "Store Name"}
//                 </h1>
//                 <p className="text-sm sm:text-base md:text-lg opacity-90 line-clamp-2 sm:line-clamp-1">
//                   {vendor.description || "Welcome to our store"}
//                 </p>
//               </div>
//             </div>

//             {/* Store Stats - Responsive */}
//             <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm">
//               {/* Rating Section - Commented out but structure ready */}
//               {/* <div className="flex items-center gap-1">
//                 <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
//                 <span>
//                   {vendor.rating} ({vendor.reviewCount?.toLocaleString()} reviews)
//                 </span>
//               </div> */}

//               {/* Years in Business */}
//               {vendor.years_in_bussiness && (
//                 <>
//                   <div className="flex items-center gap-1">
//                     <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
//                       {vendor.years_in_bussiness}+ years in business
//                     </span>
//                   </div>
//                 </>
//               )}

//               {/* Additional Features - Ready for future use */}
//               {/* {vendor.features?.map((feature, index) => (
//                 <div key={index} className="flex items-center">
//                   <span className="text-white/60">•</span>
//                   <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-xs">
//                     {feature}
//                   </span>
//                 </div>
//               ))} */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

interface VendorHeaderProps {
  vendor: {
    vendorSlug: string;
    store_name: string;
    banner_title?: string;
    profile_pic?: string;
    banner_image: string;
    about_us?: string;
    years_in_bussiness?: number;
  };
}

export const VendorHeader = ({ vendor }: VendorHeaderProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="relative w-full h-[28rem] sm:h-[30rem] md:h-[24rem] overflow-hidden">
      {/* Background Image */}
      <Image
        src={
          vendor.banner_image ||
          "/images/placeholder.svg?height=320&width=1200"
        }
        alt={`${vendor.store_name} banner`}
        fill
        className="object-cover brightness-75"
        priority
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/70" />

      {/* Content */}
<div className="relative z-10 h-full flex flex-col bottom-5 justify-end px-6 sm:px-10 md:px-16 lg:px-24 text-white">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start"> {/* <-- items-start fixes the shifting */}
    
    {/* LEFT SIDE — Vendor Info */}
    <div className="space-y-4 self-end">
      <div className="flex items-center gap-4 pt-10">
        <div className="w-12 h-12 bg-white rounded-full overflow-hidden shadow-md">
          <Image
            src={vendor.profile_pic || "/images/placeholder.svg?height=60&width=60"}
            alt={`${vendor.store_name} logo`}
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{vendor.store_name}</h3>
          <p className="text-sm text-gray-300">
            {vendor.banner_title || "Welcome to our store"}
          </p>
          {vendor.years_in_bussiness && (
            <p className="text-xs mt-1 text-gray-400 italic">
              {vendor.years_in_bussiness}+ years in business
            </p>
          )}
        </div>
      </div>
    </div>

   {/* RIGHT SIDE — About Us */}
{vendor.about_us && vendor.about_us.trim() !== "" && (
  <div className="md:pl-8 md:pr-4">
    <h3 className="text-white text-xl font-semibold mb-3">
      About Us
    </h3>

    <div
      className="text-gray-100 text-md sm:text-base leading-relaxed transition-all duration-500 ease-in-out overflow-hidden"
      style={{ maxHeight: expanded ? "600px" : "58px" }}
    >
      {vendor.about_us}
    </div>

    <button
      onClick={() => setExpanded(!expanded)}
      className="mt-0 flex items-center gap-0 text-xs font-semibold text-white hover:text-white transition-colors"
    >
      {expanded ? (
        <>
          View less <ChevronUp className="w-4 h-4" />
        </>
      ) : (
        <>
          View more <ChevronDown className="w-4 h-4" />
        </>
      )}
    </button>
  </div>
)}

  </div>
</div>


      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
    </section>
  );
};
