"use client"

import { Star } from "lucide-react"
import Image from "next/image"

interface VendorHeaderProps {
  vendor: {
    vendorSlug: string
    name: string
    description: string
    logo: string
    banner: string
    rating: number
    reviewCount: number
    yearsInBusiness: number
    features: string[]
  }
}


export const VendorHeader = ({ vendor }: VendorHeaderProps) => {
  console.log(vendor)
  return (
    <div className="relative h-64 md:h-80 bg-gradient-to-r from-blue-600 to-purple-600">
      <Image
        src={vendor.banner || "/images/placeholder.svg?height=320&width=1200"}
        alt={`${vendor.name} Banner`}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute bottom-6 left-6 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white rounded-full p-2">
            <Image
              src={vendor?.logo || "/images/placeholder.svg?height=60&width=60"}
              alt={`${vendor.store_name} Logo`}
              width={60}
              height={60}
              className="rounded-full"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{vendor.store_name}</h1>
            <p className="text-lg opacity-90">{vendor.description}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            {/* <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>
              {vendor.rating} ({vendor.reviewCount.toLocaleString()} reviews)
            </span> */}
          </div>
          <span>•</span>
          <span>{vendor.years_in_bussiness}+ years in business</span>
          {/* {vendor.features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <span>•</span>
              <span className="ml-2">{feature}</span>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  )
}
