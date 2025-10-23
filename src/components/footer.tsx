// "use client"

// import { Button } from "../components/ui/button"
// import { Input } from "../components/ui/input"
// import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"
// import { CookieConsent } from "./cookie-consent"
// import { useState,useEffect } from "react"
// import axiosInstance from "@/lib/axiosInstance"
// type Industry = {
//   industry_name: ReactNode
//   id: string | number;
//   name: string;
// };
// export default function Footer() {
//    const [industries, setIndustries] = useState<Industry[]>([]);

//     useEffect(() => {
//     const fetchIndustries = async () => {
//       try {
//         const response = await axiosInstance.get("/industries/industries/full"); 
//     setIndustries(response.data.data || []);
//       } catch (error) {
//         console.error("Error fetching industries:", error);
//       }
//     };

//     fetchIndustries();
//   }, []);
//   return (
//     <footer className="bg-gray-900 text-white py-16">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//           {/* Company Info */}
//           {/* <div className="space-y-4">
//             <h3 className="text-2xl font-bold text-green-400">Shoppersky</h3>
//             <p className="text-gray-300">
//               Your trusted partner for fresh, organic groceries delivered right to your doorstep. Quality guaranteed,
//               convenience delivered.
//             </p>
//             <div className="flex space-x-4">
//               <Button size="sm" variant="ghost" className="text-gray-300 hover:text-green-400 p-2">
//                 <Facebook className="w-5 h-5" />
//               </Button>
//               <Button size="sm" variant="ghost" className="text-gray-300 hover:text-green-400 p-2">
//                 <Twitter className="w-5 h-5" />
//               </Button>
//               <Button size="sm" variant="ghost" className="text-gray-300 hover:text-green-400 p-2">
//                 <Instagram className="w-5 h-5" />
//               </Button>
//             </div>
//           </div> */}

//           {/* Quick Links */}
//           <div className="space-y-4">
//             <h4 className="text-lg font-semibold">Quick Links</h4>
//             <ul className="space-y-2">
//               <li>
//                 <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
//                   About Us
//                 </a>
//               </li>
          
           
          
//               <li>
//                 <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
//                   FAQ
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Categories */}
//           <div className="space-y-4">
//             <h4 className="text-lg font-semibold">Industries</h4>
//     <ul className="space-y-2">
//         {industries.map((industry) => (
//           <li key={industry.id}>
//             <a
//               href="#"
//               className="text-gray-300 hover:text-green-400 transition-colors"
//             >
//               {industry.industry_name}
//             </a>
//           </li>
//         ))}
//       </ul>
//           </div>

//           {/* Newsletter */}
       
//         </div>

//         {/* Contact Info */}
//        <div className="border-t border-gray-800 pt-8 mb-8">
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    
//     {/* Call Us */}
//     <div className="flex items-start gap-3">
//       <Phone className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
//       <div>
//         <div className="font-semibold mb-2">Call Us</div>
//         <div className="text-gray-300">+61430194569</div>
//       </div>
//     </div>
    
//     {/* Email Us */}
//     <div className="flex items-start gap-3">
//       <Mail className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
//       <div>
//         <div className="font-semibold mb-2">Email Us</div>
//         <div className="text-gray-300 break-all">info@shoppersky.com.au</div>
//       </div>
//     </div>
    
//     {/* Main Store */}
//     <div className="flex items-start gap-3">
//       <MapPin className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
//       <div>
//         <div className="font-semibold mb-2">Location</div>
//         <div className="text-gray-300 text-sm leading-relaxed">
//           Shoppersky<br />
//           Australia<br />
          
//         </div>
//       </div>
//     </div>
    
//     {/* Temple Store */}
//     {/* <div className="flex items-start gap-3">
//       <MapPin className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
//       <div>
//         <div className="font-semibold mb-2">Temple Store</div>
//         <div className="text-gray-300 text-sm leading-relaxed">
//           Sri Venkateswara (Balaji) Temple<br />
//           Dudley Road (E)<br />
//           Tividale, Oldbury<br />
//           B69 3DU, UK
//         </div>
//       </div>
//     </div> */}
    
//   </div>
// </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
//           <div className="text-gray-300 text-sm">
//   © {new Date().getFullYear()} ShoppersSky. All rights reserved.
// </div>
//           <div className="flex gap-6 text-sm text-gray-300 mt-4 md:mt-0">
//             <a href="/privacypolicy" className="hover:text-green-400 transition-colors">
//               Privacy Policy
//             </a>
//             <a href="/termsnconditions" className="hover:text-green-400 transition-colors">
//               Terms of Service
//             </a>
//             {/* <a href="#" className="hover:text-green-400 transition-colors">
//               Cookie Policy
//             </a> */}
//             <a href="/contact" className="hover:text-green-400 transition-colors">
//               Contact
//             </a>
//           </div>
//         </div>
//       </div>
//       <CookieConsent />
//     </footer>
//   )
// }


"use client"

import { Button } from "../components/ui/button"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"
// import { CookieConsent } from "./cookie-consent"
import { useState, useEffect } from "react"
import axiosInstance from "@/lib/axiosInstance"
import Link from "next/link"

type Industry = {
  id: string | number
  industry_name: string
  name: string
}

export default function Footer() {
  const [industries, setIndustries] = useState<Industry[]>([])

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await axiosInstance.get("/industries/industries/full")
        setIndustries(response.data.data || [])
      } catch (error) {
        console.error("Error fetching industries:", error)
      }
    }
    fetchIndustries()
  }, [])

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Single row, 5 columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          
          {/* Column 1: Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-green-400">Shoppersky</h3>
            <p className="text-gray-300 text-sm">
             Everything you need, from groceries to gadgets, delivered to your doorstep with ease.
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

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/privacypolicy" className="text-gray-300 hover:text-green-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/termsnconditions" className="text-gray-300 hover:text-green-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-green-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Industries */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Industries</h4>
            <ul className="flex flex-col space-y-2">
              {industries.map((industry) => (
                <li key={industry.id}>
                  <p
             
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    {industry.industry_name}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-green-400 mt-1" />
              <div>
                <div className="font-semibold">Call Us</div>
                <div className="text-gray-300 text-sm">+61430194569</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-green-400 mt-1" />
              <div>
                <div className="font-semibold">Email Us</div>
                <div className="text-gray-300 text-sm break-all">info@shoppersky.com.au</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-green-400 mt-1" />
              <div>
                <div className="font-semibold">Location</div>
                <div className="text-gray-300 text-sm">Shoppersky, Australia</div>
              </div>
            </div>
          </div>

          {/* Column 5: call to action */}
          <div className="flex justify-center items-center">
            <Link href="https://vendor.shoppersky.com.au">
            <Button className="bg-green-400 hover:bg-green-500 text-white">
              Open your Storefront
            </Button>
            </Link>
            
            
          </div>
        </div>

         

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-300">
          © {new Date().getFullYear()} Shoppersky. All rights reserved.
        </div>
      </div>
      {/* <CookieConsent /> */}
    </footer>
  )
}
