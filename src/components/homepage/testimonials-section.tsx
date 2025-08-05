"use client"

import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, NY",
    rating: 5,
    comment:
      "Amazing quality and super fast delivery! The fruits were so fresh and the vegetables were crisp. Will definitely order again!",
    avatar: "images/placeholder.svg?height=60&width=60&text=SJ",
  },
  {
    id: 2,
    name: "Mike Chen",
    location: "Los Angeles, CA",
    rating: 5,
    comment:
      "Best grocery delivery service I've used. Great prices, excellent customer service, and everything arrives perfectly packaged.",
    avatar: "images/placeholder.svg?height=60&width=60&text=MC",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Chicago, IL",
    rating: 5,
    comment:
      "Love the organic selection! As a busy mom, this service saves me so much time while ensuring my family gets the best quality food.",
    avatar: "images/placeholder.svg?height=60&width=60&text=ER",
  },
  {
    id: 4,
    name: "David Thompson",
    location: "Houston, TX",
    rating: 5,
    comment:
      "The seasonal collections are fantastic! I discovered so many new products I wouldn't have found in regular stores.",
    avatar: "images/placeholder.svg?height=60&width=60&text=DT",
  },
]

export default function TestimonialsSection() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600">
            Join thousands of happy customers who trust us with their grocery needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.comment}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar || "images/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
