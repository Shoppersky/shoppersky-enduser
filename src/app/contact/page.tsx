"use client";

import type React from "react";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { SocialLinks } from "../../components/social-links";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";

interface ContactPageProps {
  onBack: () => void;
}

export default function ContactPage({ onBack }: ContactPageProps) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone_number: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post("/users/CustomerContactPage", {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        phone_number: formData.phone_number || undefined, // Send undefined if empty to match optional field
        message: formData.message,
      });

      // Handle success response (HTTP 201)
      toast.success(response.data.message || "Enquiry sent successfully! We'll get back to you within 24 hours.");
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone_number: "",
        message: "",
      });
    } catch (error: any) {
      // Handle errors based on backend response
      if (error.response) {
        const { status, data } = error.response;
        if (status === 403) {
          toast.error(data.message || "Only registered users can submit enquiries. Please register first.");
        } else if (status === 409) {
          toast.error(data.message || "Enquiry already sent. Please try again with a different message.");
        } else {
          toast.error(data.message || "Failed to send enquiry. Please try again later.");
        }
      } else {
        // Network or other errors
        toast.error("Network error. Please check your connection and try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // FAQ items from the first component
  const userFAQs = [
  {
    question: "Do I need an account to buy products?",
    answer: "Yes, you need to sign up to place an order and track your purchases, but you can browse products without an account.",
  },
  {
    question: "How can I search for specific products or vendors?",
    answer: "Use the search bar at the top of the page to find products, categories, or vendors by name or keyword.",
  },
  {
    question: "Can I buy from multiple vendors in one order?",
    answer: "Yes, you can add products from different vendors to your cart. Each vendor will fulfill and ship their items separately.",
  },
  {
    question: "How do I track my order?",
    answer: "Go to your profile > Orders to see the status and tracking information of your purchases.",
  },
];

const vendorFAQs = [
  {
    question: "Can I manage my own inventory and pricing?",
    answer: "Yes, vendors have full control over their product listings, stock levels, pricing, and promotions.",
  },
  {
    question: "How do I get paid?",
    answer: "Payments are made on a scheduled basis (e.g. weekly or biweekly) via your selected payout method, after deducting platform fees.",
  },
  {
    question: "Can I respond to customer inquiries?",
    answer: "Yes, vendors can communicate with buyers directly through the platform’s messaging system.",
  },
];

const technicalFAQs = [
  {
    question: "Is Shoppersky mobile-friendly?",
    answer: "Yes, the site is fully responsive and works well on all devices—desktop, tablet, and mobile.",
  },
  {
    question: "Who do I contact for support?",
    answer: "Reach out via our Contact Us page or email support@shopperssky.com.au.",
  },
  {
    question: "What if I forget my password?",
    answer: "Use the Forgot Password link on the login page to reset it via email.",
  },
];


  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          {/* <Button
            variant="ghost"
            onClick={onBack}
            className="text-[#1B4B33] hover:text-[#153D29]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Store
          </Button> */}
          <h1 className="text-3xl font-semibold text-[#1B4B33]">
            Contact Us
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-white rounded-lg shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                   <MapPin className="w-5 h-5 text-[#40B86D] mt-1 flex-shrink-0" />
                  <div >
                    <h3 className="font-medium text-gray-900">Location</h3>
                    <p className="text-gray-600">
                     Shoppersky<br />
          Australia<br />
  
                    </p>
                  </div>
                </div>
                {/* <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#40B86D] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Temple Store</h3>
                    <p className="text-gray-600">
                     Sri Venkateswara (Balaji) Temple<br />
          Dudley Road (E)<br />
          Tividale, Oldbury<br />
          B69 3DU, UK
                    </p>
                  </div>
                 

                  
                </div> */}
                
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#40B86D] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">+61430194569</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#40B86D] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">info@shoppersky.com.au</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#40B86D] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Working Hours</h3>
                    <p className="text-gray-600">Mon-Sun: 06:00 AM - 11:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-white rounded-lg shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Follow Us</CardTitle>
              </CardHeader>
              <CardContent>
                <SocialLinks />
              </CardContent>
            </Card>
            <div className="mt-8 bg-white rounded-lg shadow-sm p-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57690517.41045619!2d87.25976176792778!3d-18.803691871345578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2b2bfd076787c5df%3A0x538267a1955b1352!2sAustralia!5e1!3m2!1sen!2sin!4v1752921557993!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Form & FAQ */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Form */}
          
            <Card className="bg-white rounded-lg shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">
                  Send us a Message
                </CardTitle>
                <p className="text-gray-600">
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <Input
                        placeholder="Your First Name"
                        required
                        value={formData.firstname}
                        onChange={(e) => handleInputChange("firstname", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <Input
                        placeholder="Your Last Name"
                        required
                        value={formData.lastname}
                        onChange={(e) => handleInputChange("lastname", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Email *
                      </label>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        placeholder="Your Phone Number"
                        value={formData.phone_number}
                        onChange={(e) => handleInputChange("phone_number", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message *
                    </label>
                    <Textarea
                      placeholder="Your Message"
                      className="min-h-[150px] resize-none"
                      required
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      !formData.firstname ||
                      !formData.lastname ||
                      !formData.email ||
                      !formData.message
                    }
                    className="w-full bg-[#1B4B33] hover:bg-[#153D29] text-white py-3"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Section */}
           {/* FAQ Section */}
<Card className="bg-white rounded-lg shadow-sm">
  <CardHeader>
    <CardTitle className="text-xl text-gray-900">
      Frequently Asked Questions
    </CardTitle>
    <p className="text-gray-600">Find quick answers to common questions.</p>
  </CardHeader>
  <CardContent className="space-y-8">

    {/* User FAQs */}
    <div>
      <h3 className="text-lg font-semibold text-[#1B4B33] mb-2">For Users</h3>
      <div className="space-y-4">
        {userFAQs.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h4 className="font-medium text-gray-900 mb-1">{item.question}</h4>
            <p className="text-sm text-gray-600">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Vendor FAQs */}
    <div>
      <h3 className="text-lg font-semibold text-[#1B4B33] mb-2">For Vendors</h3>
      <div className="space-y-4">
        {vendorFAQs.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h4 className="font-medium text-gray-900 mb-1">{item.question}</h4>
            <p className="text-sm text-gray-600">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Technical / Support FAQs */}
    <div>
      <h3 className="text-lg font-semibold text-[#1B4B33] mb-2">Technical & Support</h3>
      <div className="space-y-4">
        {technicalFAQs.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h4 className="font-medium text-gray-900 mb-1">{item.question}</h4>
            <p className="text-sm text-gray-600">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>

  </CardContent>
</Card>

          </div>
        </div>
      </div>
    </div>
  );
}