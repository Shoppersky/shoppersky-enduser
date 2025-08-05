"use client"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { CookieConsent } from "./cookie-consent"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-green-400">Shoppersky</h3>
            <p className="text-gray-300">
              Your trusted partner for fresh, organic groceries delivered right to your doorstep. Quality guaranteed,
              convenience delivered.
            </p>
            <div className="flex space-x-4">
              <Button size="sm" variant="ghost" className="text-gray-300 hover:text-green-400 p-2">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-300 hover:text-green-400 p-2">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-300 hover:text-green-400 p-2">
                <Instagram className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/products" className="text-gray-300 hover:text-green-400 transition-colors">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  Deals
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-green-400 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Categories</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  Fresh Fruits
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  Vegetables
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  Dairy & Eggs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  Meat & Seafood
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  Organic
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Stay Updated</h4>
            <p className="text-gray-300 text-sm">Subscribe to get special offers, free giveaways, and deals.</p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button className="bg-green-600 hover:bg-green-700">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
       <div className="border-t border-gray-800 pt-8 mb-8">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    
    {/* Call Us */}
    <div className="flex items-start gap-3">
      <Phone className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
      <div>
        <div className="font-semibold mb-2">Call Us</div>
        <div className="text-gray-300">+61430194569</div>
      </div>
    </div>
    
    {/* Email Us */}
    <div className="flex items-start gap-3">
      <Mail className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
      <div>
        <div className="font-semibold mb-2">Email Us</div>
        <div className="text-gray-300 break-all">info@shoppersky.com.au</div>
      </div>
    </div>
    
    {/* Main Store */}
    <div className="flex items-start gap-3">
      <MapPin className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
      <div>
        <div className="font-semibold mb-2">Location</div>
        <div className="text-gray-300 text-sm leading-relaxed">
          Shoppersky<br />
          Australia<br />
          
        </div>
      </div>
    </div>
    
    {/* Temple Store */}
    {/* <div className="flex items-start gap-3">
      <MapPin className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
      <div>
        <div className="font-semibold mb-2">Temple Store</div>
        <div className="text-gray-300 text-sm leading-relaxed">
          Sri Venkateswara (Balaji) Temple<br />
          Dudley Road (E)<br />
          Tividale, Oldbury<br />
          B69 3DU, UK
        </div>
      </div>
    </div> */}
    
  </div>
</div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-300 text-sm">
  © {new Date().getFullYear()} ShoppersSky. All rights reserved.
</div>
          <div className="flex gap-6 text-sm text-gray-300 mt-4 md:mt-0">
            <a href="/privacypolicy" className="hover:text-green-400 transition-colors">
              Privacy Policy
            </a>
            <a href="/termsnconditions" className="hover:text-green-400 transition-colors">
              Terms of Service
            </a>
            {/* <a href="#" className="hover:text-green-400 transition-colors">
              Cookie Policy
            </a> */}
            <a href="/contact" className="hover:text-green-400 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
      <CookieConsent />
    </footer>
  )
}
