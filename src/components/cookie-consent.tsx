"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:max-w-md bg-gray-900 text-white border border-gray-700 p-3 rounded-lg shadow-lg z-50">
      <div className="mx-auto">
        <h3 className="font-bold text-white mb-1 text-sm">Your Personal Information</h3>
        <p className="text-xs mb-3 leading-relaxed">
          Information about your browsing activity on our website, including clickstream and cookie data and
          identifiers, is sent to our service providers and advertising networks. Please see our{" "}
          <Link href="/privacypolicy" className="text-green-400 font-bold hover:text-green-300">
            Privacy Policy
          </Link>{" "}
          for more information. You acknowledge and consent to these communications by browsing our website. In
          addition, we use cookies and other analytics tools to deliver the best experience. These tools allow us to
          measure website traffic, improve website performance, personalize advertising and web experiences, design
          targeted marketing campaigns, and allow content sharing to social media.
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white text-xs py-1 px-2"
            onClick={() => setIsVisible(false)}
          >
            Manage Cookies
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white text-xs py-1 px-2"
            onClick={() => setIsVisible(false)}
          >
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
}