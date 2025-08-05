"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  User, 
  ShoppingCart, 
  CreditCard, 
  XCircle,
  AlertTriangle,
  Copyright,
  Shield,
  RefreshCw,
  Scale,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  CheckCircle,
  Users,
  Store
} from "lucide-react";

const TermsConditionsPage = () => {
  const lastUpdated = new Date().toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="h-8 w-8 text-blue-600" />
          <h1 className="text-4xl font-bold text-foreground">Terms & Conditions</h1>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
            Shoppersky (Australia)
          </Badge>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Effective Date: {lastUpdated}
          </div>
        </div>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          By using Shoppersky, you agree to these Terms & Conditions. Please read them carefully 
          before using the platform to browse, purchase, or list products as a customer or vendor.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Use of the Platform */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <User className="h-6 w-6 text-green-600" />
              1. Use of the Platform
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              You may use Shoppersky to browse products, purchase items, or list products as a vendor. 
              You must be at least 18 years old or have parental/guardian consent to use the platform.
            </p>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-800 dark:text-blue-400">
                  Age Requirement: 18+ or parental consent required
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Account Creation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Users className="h-6 w-6 text-purple-600" />
              2. Account Creation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              You can purchase products as a guest or by creating an account. Vendors must create an account to list products. 
              If you create an account, you agree to provide accurate and current information and to keep your login credentials secure.
            </p>
            <div className="mt-4 grid gap-3">
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Guest checkout available for customers</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Shield className="h-5 w-5 text-blue-600" />
                <span>Account holders must provide accurate information</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Store className="h-5 w-5 text-purple-600" />
                <span>Vendors must verify business details for account approval</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Product Purchases and Listings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <ShoppingCart className="h-6 w-6 text-orange-600" />
              3. Product Purchases and Listings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold">Product Sales</h4>
                <p className="text-sm text-muted-foreground">
                  Products are sold by vendors, not Shoppersky.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold">Purchase Contract</h4>
                <p className="text-sm text-muted-foreground">
                  Your purchase is a contract between you and the vendor.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold">Vendor Responsibilities</h4>
                <p className="text-sm text-muted-foreground">
                  Vendors are responsible for accurate product listings, inventory management, and order fulfillment.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold">Platform Role</h4>
                <p className="text-sm text-muted-foreground">
                  Shoppersky facilitates payment processing, vendor payouts, and order management but is not responsible for product quality or delivery.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Cancellations & Refunds */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <XCircle className="h-6 w-6 text-red-600" />
              4. Cancellations & Refunds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                <span>Refund policies are set by the vendor and displayed on the product page.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                <span>Refunds (if offered) are processed according to the vendor's policy.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                <span>Shoppersky is not liable for order cancellations, product issues, or delivery delays.</span>
              </li>
            </ul>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span className="font-semibold text-yellow-800 dark:text-yellow-400">
                  Important: Check vendor's refund policy before purchasing
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 5: Prohibited Use */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              5. Prohibited Use
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">You agree not to:</p>
            
            <div className="grid gap-3">
              <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <XCircle className="h-5 w-5 text-red-600" />
                <span>Use the platform for unlawful or fraudulent purposes.</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <XCircle className="h-5 w-5 text-red-600" />
                <span>Interfere with or disrupt platform functionality.</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <XCircle className="h-5 w-5 text-red-600" />
                <span>List or sell prohibited or counterfeit products as a vendor.</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 6: Intellectual Property */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Copyright className="h-6 w-6 text-purple-600" />
              6. Intellectual Property
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              All content on the platform is owned or licensed by Shoppersky. Vendors retain ownership of their product images and descriptions but grant Shoppersky a license to use them for platform purposes. You may not copy, reproduce, or distribute platform content without permission.
            </p>
          </CardContent>
        </Card>

        {/* Section 7: Liability Disclaimer */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Shield className="h-6 w-6 text-orange-600" />
              7. Liability Disclaimer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">To the extent permitted by law:</p>
            
            <div className="space-y-4">
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                <p className="text-sm">
                  Shoppersky is not liable for damages arising from product issues, vendor actions, delivery delays, or platform downtime.
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-800 dark:text-green-400">
                    Consumer rights under the Australian Consumer Law remain unaffected.
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 8: Changes to Terms */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <RefreshCw className="h-6 w-6 text-blue-600" />
              8. Changes to Terms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              We may update these Terms at any time. Continued use of the platform after changes 
              means you accept the new Terms.
            </p>
          </CardContent>
        </Card>

        {/* Section 9: Governing Law */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Scale className="h-6 w-6 text-green-600" />
              9. Governing Law
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              These Terms are governed by the laws of New South Wales, Australia.
            </p>
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-800 dark:text-green-400">
                  Jurisdiction: New South Wales, Australia
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 10: Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Phone className="h-6 w-6 text-blue-600" />
              10. Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              For questions, please contact:
            </p>
            
            <div className="bg-muted/50 p-6 rounded-lg space-y-3">
              <h4 className="font-semibold text-lg">Shoppersky Support</h4>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <span className="font-medium">Email:</span>
                  <a 
                    href="mailto:info@shoppersky.com.au" 
                    className="ml-2 text-blue-600 hover:text-blue-800 underline"
                  >
                    info@shoppersky.com.au
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-600" />
                <div>
                  <span className="font-medium">Phone:</span>
                  <a 
                    href="tel:+61430194569" 
                    className="ml-2 text-green-600 hover:text-green-800 underline"
                  >
                    +61430194569
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Notice */}
        <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">
                  Agreement Notice
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  By using Shoppersky, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions. 
                  If you do not agree to these terms, please do not use our platform.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal Compliance Notice */}
        <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-800 dark:text-green-400 mb-2">
                  Australian Consumer Law
                </h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Nothing in these Terms & Conditions excludes, restricts, or modifies any consumer rights 
                  under the Australian Consumer Law or any other applicable law that cannot be excluded, 
                  restricted, or modified by agreement.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsConditionsPage;