"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showManagement, setShowManagement] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    const hasConsented = localStorage.getItem("cookieConsent");
    if (!hasConsented) {
      setIsVisible(true);
    } else {
      try {
        const savedPreferences = JSON.parse(
          localStorage.getItem("cookiePreferences") || "{}"
        );
        setCookiePreferences((prev) => ({ ...prev, ...savedPreferences }));
      } catch (error) {
        console.error("Error loading cookie preferences:", error);
      }
    }
  }, []);

  const saveCookiePreferences = (preferences: typeof cookiePreferences) => {
    localStorage.setItem("cookieConsent", "true");
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    localStorage.setItem("cookieConsentDate", new Date().toISOString());

    applyCookieSettings(preferences);

    setIsVisible(false);
    setShowManagement(false);
  };

  const applyCookieSettings = (preferences: typeof cookiePreferences) => {
    if (!preferences.analytics) {
      document.cookie = "_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "_gid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "_gat=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    if (!preferences.marketing) {
      document.cookie = "_fbp=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "_fbc=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    window.dispatchEvent(
      new CustomEvent("cookiePreferencesUpdated", {
        detail: preferences,
      })
    );
  };

  const handleAcceptAll = () => {
    saveCookiePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    });
  };

  const handleRejectAll = () => {
    saveCookiePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    });
  };

  const handleTogglePreference = (type: keyof typeof cookiePreferences) => {
    if (type === "necessary") return;
    setCookiePreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  if (!isVisible) return null;

  if (showManagement) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
          <button
            onClick={() => setShowManagement(false)}
            className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-200 hover:text-gray-700 cursor-pointer transition"
          >
            ✕
          </button>
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Manage Your Cookie Settings
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              We use cookies to provide core site functionality, improve
              performance, and deliver relevant content. You can adjust your
              preferences below at any time.
            </p>

            <div className="space-y-6">
              {/* Necessary Cookies */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">
                    Necessary Cookies
                  </h3>
                  <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    Always Active
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Required for the website to function (security, login,
                  accessibility). These cannot be turned off.
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">
                    Analytics Cookies
                  </h3>
                  <button
                    onClick={() => handleTogglePreference("analytics")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${cookiePreferences.analytics
                        ? "bg-green-600"
                        : "bg-gray-300"
                      }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${cookiePreferences.analytics
                          ? "translate-x-6"
                          : "translate-x-1"
                        }`}
                    />
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  Help us understand how our site is used so we can improve the
                  experience. Data collected is aggregated and anonymous.
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">
                    Marketing Cookies
                  </h3>
                  <button
                    onClick={() => handleTogglePreference("marketing")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${cookiePreferences.marketing
                        ? "bg-green-600"
                        : "bg-gray-300"
                      }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${cookiePreferences.marketing
                          ? "translate-x-6"
                          : "translate-x-1"
                        }`}
                    />
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  Used to show you more relevant ads and measure campaign
                  performance. May be shared with advertising partners.
                </p>
              </div>

              {/* Functional Cookies */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">
                    Functional Cookies
                  </h3>
                  <button
                    onClick={() => handleTogglePreference("functional")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${cookiePreferences.functional
                        ? "bg-green-600"
                        : "bg-gray-300"
                      }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${cookiePreferences.functional
                          ? "translate-x-6"
                          : "translate-x-1"
                        }`}
                    />
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  Enhance your experience (e.g. chat support, video playback,
                  saved preferences).
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setShowManagement(false)}
                className="flex-1 border-gray-600 text-gray-700 hover:bg-gray-700 hover:text-white"
              >
                Back
              </Button>
              <Button
                onClick={() => saveCookiePreferences(cookiePreferences)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Save Preferences
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:max-w-md bg-gray-900 text-white border border-gray-700 p-4 rounded-lg shadow-lg z-50">
      <div className="mx-auto">
        <h3 className="font-bold text-white mb-2 text-sm">
          We respect your privacy
        </h3>
        <p className="text-xs mb-4 leading-relaxed">
          We use cookies to keep our site secure, improve performance, and
          deliver relevant content. By clicking "Accept All", you agree to our
          use of cookies. You can manage your choices anytime or read more in
          our{" "}
          <Link
            href="/privacypolicy"
            className="text-green-400 font-bold hover:text-green-300"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white text-xs py-1 px-3"
            onClick={handleRejectAll}
          >
            Reject All
          </Button>
          <Button
            variant="outline"
            className="border-gray-600 text-gray-700 hover:bg-gray-700 hover:text-white text-xs py-1 px-3"
            onClick={() => setShowManagement(true)}
          >
            Manage Cookies
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white text-xs py-1 px-3"
            onClick={handleAcceptAll}
          >
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
}
