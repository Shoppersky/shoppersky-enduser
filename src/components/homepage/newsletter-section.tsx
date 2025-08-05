"use client"

import type React from "react"

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Mail, Gift } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      toast.success("Successfully subscribed to newsletter!")
      setEmail("")
    }
  }

  return (
    <div className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Gift className="w-8 h-8 text-yellow-300" />
            <Badge className="bg-yellow-400 text-black font-bold text-lg px-4 py-2">EXCLUSIVE OFFERS</Badge>
            <Gift className="w-8 h-8 text-yellow-300" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get 20% Off Your First Order!</h2>

          <p className="text-xl text-green-100 mb-8">
            Subscribe to our newsletter and be the first to know about exclusive deals, seasonal products, and special
            promotions.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 py-3 text-gray-900"
                required
              />
            </div>
            <Button type="submit" size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8">
              Subscribe Now
            </Button>
          </form>

          <div className="flex justify-center items-center gap-8 mt-8 text-sm text-green-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
              <span>Weekly deals & recipes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
              <span>No spam, unsubscribe anytime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
