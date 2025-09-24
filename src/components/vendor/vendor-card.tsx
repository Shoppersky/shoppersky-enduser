"use client";

import { Star, MapPin, Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface VendorCardProps {
  vendor: {
    slug: string;
    name: string;
    description: string;
    logo: string;
    banner: string;
    rating: number;
    reviewCount: number;
    yearsInBusiness: number;
    location: string;
    totalProducts: number;
    isVerified: boolean;
    categories: string[];
  };
}

export function VendorCard({ vendor }: VendorCardProps) {
  console.log(vendor);
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-0">
      <Link href={`/vendors/${vendor.slug}`} className="block">
      <CardContent className="p-0">
        {/* Banner */}
        <div className="relative h-32 overflow-hidden rounded-t-lg">
          <Image
            src={vendor.logo || "/images/placeholder.svg"}
            alt={`${vendor.name} banner`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Verified Badge */}
          {vendor.isVerified && (
            <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">
              Verified
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Logo and Basic Info */}
          {/* <div className="flex items-start gap-3 mb-3">
            <div className="relative w-12 h-12 flex-shrink-0 -mt-8 border-2 border-white rounded-full bg-white">
              <Image
                src={vendor.logo || "/placeholder.svg"}
                alt={`${vendor.name} logo`}
                fill
                className="object-cover rounded-full p-1"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg truncate">{vendor.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {vendor.description}
              </p>
            </div>
          </div> */}

          {/* Stats */}
          <div className="space-y-2 mb-4">
            <h3 className="font-semibold text-lg truncate">{vendor.store_name}</h3>
            <div className="flex items-center gap-1">
               
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{vendor.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({vendor.reviewCount.toLocaleString()})
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{vendor.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{vendor.yearsInBusiness}+ years</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{vendor.totalProducts} products</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          {/* <div className="flex flex-wrap gap-1 mb-4 h-10">
            {vendor.categories.slice(0, 4).map((category) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
            {vendor.categories.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{vendor.categories.length - 4}
              </Badge>
            )}
          </div> */}

          {/* Action Button */}
          <Link href={`/vendors/${vendor.slug}`} className="block">
            <Button className="w-full group-hover:bg-primary/90 transition-colors">
              Visit Store
            </Button>
          </Link>
        </div>
      </CardContent>
      </Link>
    </Card>
  );
}
