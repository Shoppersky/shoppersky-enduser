// "use client";

// import type React from "react";
// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { ChevronRight, Truck, Package, ShieldCheck, Check } from "lucide-react";
// import { Button } from "../../components/ui/button";
// import { CartProvider, useCart } from "../../components/cart-provider";
// import { Separator } from "../../components/ui/separator";
// import { Input } from "../../components/ui/input";
// import { Label } from "../../components/ui/label";
// import { Textarea } from "../../components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../../components/ui/select";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import axiosInstance from "@/lib/axiosInstance";
// import useStore from "@/lib/Zustand";
// import { useRouter } from "next/navigation";

// type Address = {
//   id: string;
//   type: string;
//   default: boolean;
//   name: string;
//   address: string;
//   apartment?: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   country: string;
//   phone: string;
// };

// type CheckoutItem = {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   quantity: number;
//   category: string;
//   productSlug?: string;
// };

// // Australian states for the dropdown
// const states = [
//   { value: "NSW", label: "New South Wales" },
//   { value: "VIC", label: "Victoria" },
//   { value: "QLD", label: "Queensland" },
//   { value: "WA", label: "Western Australia" },
//   { value: "SA", label: "South Australia" },
//   { value: "TAS", label: "Tasmania" },
//   { value: "ACT", label: "Australian Capital Territory" },
//   { value: "NT", label: "Northern Territory" },
// ];

// // Single country for Australia
// const countries = [{ value: "AU", label: "Australia" }];

// function CheckoutContent() {
//   const { userId, isAuthenticated } = useStore();
//   const { cartItems, cartTotal, clearCart } = useCart();
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Check if this is a "Buy Now" checkout
//   const isBuyNow = searchParams.get("buyNow") === "true";

//   // State for checkout items (either cart items or buy now item)
//   const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>([]);
//   const [checkoutTotal, setCheckoutTotal] = useState(0);

//   const [step, setStep] = useState(1);
//   const [shippingAddress, setShippingAddress] = useState({
//     firstName: "",
//     lastName: "",
//     address: "",
//     apartment: "",
//     city: "",
//     state: "",
//     postcode: "",
//     country: "AU",
//     phone: "",
//     email: "",
//     label: "",
//   });
//   const [orderNotes, setOrderNotes] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
//     null
//   );
//   const [showNewAddressForm, setShowNewAddressForm] = useState(false);
//   // Inside CheckoutContent component
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const validateField = (name: string, value: string) => {
//     let error = "";

//     switch (name) {
//       case "postcode":
//         if (!/^\d{4}$/.test(value)) {
//           error = "Postcode must be 4 digits.";
//         }
//         break;

//       case "phone":
//         // Matches 10-digit numbers starting with 02, 03, 04, 07, or 08
//         if (!/^(0[23478]\d{8})$/.test(value)) {
//           error = "Enter a valid Australian phone number (landline or mobile).";
//         }
//         break;

//       case "email":
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//           error = "Enter a valid email address.";
//         }
//         break;

//       default:
//         if (!value.trim()) {
//           error = "This field is required.";
//         }
//     }

//     setErrors((prev) => ({ ...prev, [name]: error }));
//     return error === "";
//   };

//   const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setShippingAddress((prev) => ({ ...prev, [name]: value }));
//     validateField(name, value);
//   };

//   const validateForm = () => {
//     const fieldsToValidate = [
//       "firstName",
//       "lastName",
//       "address",
//       "city",
//       "state",
//       "postcode",
//       "phone",
//       "email",
//     ];
//     const results = fieldsToValidate.map((f) =>
//       validateField(f, (shippingAddress as any)[f] || "")
//     );
//     return results.every(Boolean);
//   };

//   const handleNextStep = () => {
//     if (validateForm()) {
//       nextStep();
//     }
//   };

//   // Initialize checkout items based on mode (Buy Now vs Cart)
//   useEffect(() => {
//     if (isBuyNow) {
//       // Get buy now product from localStorage
//       const buyNowProductStr = localStorage.getItem("buyNowProduct");

//       if (buyNowProductStr) {
//         const buyNowProduct: CheckoutItem = JSON.parse(buyNowProductStr);
//         setCheckoutItems([buyNowProduct]);
//         setCheckoutTotal(buyNowProduct.price * buyNowProduct.quantity);

//         // Clear the localStorage item after reading
//         // localStorage.removeItem('buyNowProduct');
//       } else {
//         // If no buy now product found, redirect to home
//         router.push("/");
//       }
//     } else {
//       // Use cart items
//       setCheckoutItems(cartItems);
//       setCheckoutTotal(cartTotal);
//     }
//   }, [isBuyNow, cartItems, cartTotal, router]);

//   // Shipping calculation based on method
//   const [shippingMethod, setShippingMethod] = useState("standard");
//   const shippingCost =
//     shippingMethod === "standard"
//       ? 5.99
//       : shippingMethod === "express"
//         ? 12.99
//         : 0;

//   // Free shipping for orders over A$50
//   const finalShippingCost = checkoutTotal > 50 ? 0 : shippingCost;

//   // GST calculation (10% for Australia)
//   const taxRate = 0.1;
//   const taxAmount = checkoutTotal * taxRate;

//   // Final total (includes GST)
//   const orderTotal = checkoutTotal + finalShippingCost + taxAmount;

//   const nextStep = () => {
//     setStep((prev) => prev + 1);
//     window.scrollTo(0, 0);
//   };

//   const prevStep = () => {
//     setStep((prev) => prev - 1);
//     window.scrollTo(0, 0);
//   };

//   useEffect(() => {
//     if (!isAuthenticated || !userId) {
//       router.push("/login");
//     }
//   }, [isAuthenticated, userId, router]);

//   useEffect(() => {
//     const fetchUser = async () => {
//       if (!userId) return;

//       try {
//         const res = await axiosInstance.get(`/users/profiles/${userId}`);
//         const userData = res.data.data;

//         if (userData.address && Array.isArray(userData.address)) {
//           const mappedAddresses: Address[] = userData.address.map(
//             (addr: any) => {
//               const details = addr.details || addr; // fallback to flat structure
//               return {
//                 id: String(addr.id),
//                 type: addr.label || "Other",
//                 default: addr.is_default || false,
//                 name: userData.username || "N/A",
//                 address: details.street || "",
//                 apartment: details.apartment || "",
//                 city: details.city || "",
//                 state: details.state || "",
//                 zipCode: details.postcode || "",
//                 country: details.country || "",
//                 phone: details.phone || userData.phone_number || "",
//               };
//             }
//           );

//           setAddresses(mappedAddresses);

//           const defaultAddr = mappedAddresses.find((a) => a.default);
//           if (defaultAddr) setSelectedAddressId(defaultAddr.id);
//         }
//       } catch (err) {
//         console.error("Failed to fetch user info:", err);
//       }
//     };

//     fetchUser();
//   }, [userId]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     try {
//       // Fetch vendor IDs for all checkout items
//       const vendorPromises = checkoutItems.map(async (item) => {
//         try {
//           const response = await axiosInstance.get(`/products/${item.id}`);
//           return {
//             product_id: item.id,
//             vendor_id: response.data.vendor_id,
//             quantity: item.quantity,
//             name: item.name,
//             // color: item.color || "Unknown",
//             // size: item.size || "Unknown",
//             // material: item.material || "Unknown",
//           };
//         } catch (err) {
//           console.error(`Failed to fetch vendor for product ${item.id}:`, err);
//           throw new Error(`Unable to fetch vendor for product ${item.name}`);
//         }
//       });

//       // Wait for all vendor ID requests to complete
//       const itemsWithVendors = await Promise.all(vendorPromises);

//       // Construct item_details object
//       const itemDetails = itemsWithVendors.reduce(
//         (acc, item) => ({
//           ...acc,
//           [item.product_id]: {
//             name: item.name,

//             quantity: item.quantity,
//           },
//         }),
//         {}
//       );

//       let finalAddress;
//       let addressId: string | null = null;

//       if (selectedAddressId && addresses.length > 0 && !showNewAddressForm) {
//         const chosen = addresses.find((a) => a.id === selectedAddressId)!;
//         finalAddress = {
//           label: chosen.type,
//           street: `${chosen.address}${chosen.apartment ? `, ${chosen.apartment}` : ""}`,
//           city: chosen.city,
//           state: chosen.state,
//           postcode: chosen.zipCode,
//           country: chosen.country,
//         };
//         addressId = chosen.id;
//       } else {
//         // fallback: use new address form state
//         finalAddress = {
//           label: shippingAddress.label,
//           street: `${shippingAddress.address}${shippingAddress.apartment ? `, ${shippingAddress.apartment}` : ""}`,
//           city: shippingAddress.city,
//           state: shippingAddress.state,
//           postcode: shippingAddress.postcode,
//           country: "Australia",
//         };
//       }

//       const payload = {
//         user_id: userId,
//         vendor_ids: Array.from(
//           new Set(itemsWithVendors.map((item) => item.vendor_id))
//         ),
//         product_ids: itemsWithVendors.map((item) => item.product_id),
//         item_details: itemDetails,
//         amount: orderTotal,
//         address: finalAddress,
//         address_id: addressId, // ✅ Send selected address id if available
//         order_notes: orderNotes || null,
//       };

//       // Call the API using axiosInstance
//       const response = await axiosInstance.post("/orders/place-order", payload);

//       // Axios automatically parses JSON response
//       const { data } = response.data; // Assuming api_response format: { status_code, message, data }

//       // Clear cart only if this was a cart checkout (not buy now)
//       if (!isBuyNow) {
//         clearCart();
//       }

//       // Store email in localStorage for SuccessPage
//       localStorage.setItem("checkoutEmail", shippingAddress.email);

//       // Redirect to Stripe checkout
//       window.location.href = data.checkout_url;
//     } catch (error: any) {
//       console.error("Error placing order:", error);
//       // Handle Axios error
//       const errorMessage =
//         error.response?.data?.message ||
//         error.message ||
//         "Failed to place order";
//       setError(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (checkoutItems.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center py-12">
//         <h2 className="mb-2 text-2xl font-bold">No items to checkout</h2>
//         <p className="mb-8 text-center text-muted-foreground">
//           {isBuyNow
//             ? "The product you tried to buy is no longer available."
//             : "You need to add items to your cart before checking out."}
//         </p>
//         <Button asChild>
//           <Link href="/products">Browse Products</Link>
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* Checkout Mode Indicator */}
//       {isBuyNow && (
//         <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//           <p className="text-blue-800 font-medium">
//             🚀 Quick Checkout - You're purchasing this item directly
//           </p>
//         </div>
//       )}

//       {/* Checkout Progress */}
//       <div className="mb-8">
//         <div className="flex justify-between">
//           <div
//             className={`flex flex-col items-center ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}
//           >
//             <div
//               className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
//                 step >= 1
//                   ? "border-primary bg-primary text-primary-foreground"
//                   : "border-muted-foreground"
//               }`}
//             >
//               {step > 1 ? <Check className="h-5 w-5" /> : "1"}
//             </div>
//             <span className="mt-2 text-sm font-medium">Shipping</span>
//           </div>
//           <div
//             className={`flex-1 border-t-2 self-start mt-5 mx-4 ${
//               step >= 2 ? "border-primary" : "border-muted-foreground/30"
//             }`}
//           />
//           <div
//             className={`flex flex-col items-center ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}
//           >
//             <div
//               className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
//                 step >= 2
//                   ? "border-primary bg-primary text-primary-foreground"
//                   : "border-muted-foreground"
//               }`}
//             >
//               {step > 2 ? <Check className="h-5 w-5" /> : "2"}
//             </div>
//             <span className="mt-2 text-sm font-medium">Review</span>
//           </div>
//         </div>
//       </div>

//       <div className="grid gap-8 lg:grid-cols-3">
//         <div className="lg:col-span-2">
//           <form onSubmit={handleSubmit}>
//             {/* Step 1: Shipping Information */}
//             {step === 1 && (
//               <div className="space-y-8">
//                 <div className="rounded-lg border bg-card">
//                   <div className="p-6">
//                     <h2 className="flex items-center text-xl font-bold">
//                       <Truck className="mr-2 h-5 w-5" />
//                       Shipping Address
//                     </h2>
//                   </div>
//                   <Separator />
//                   <div className="p-6 space-y-4">
//                     {addresses.length > 0 && !showNewAddressForm ? (
//                       <>
//                         {/* Display existing addresses */}
//                         <RadioGroup
//                           value={selectedAddressId || ""}
//                           onValueChange={(val) => setSelectedAddressId(val)}
//                         >
//                           {addresses.map((addr) => (
//                             <div
//                               key={addr.id}
//                               className="flex items-start space-x-2 rounded-md border p-4"
//                             >
//                               <RadioGroupItem
//                                 value={addr.id}
//                                 id={`addr-${addr.id}`}
//                               />
//                               <Label
//                                 htmlFor={`addr-${addr.id}`}
//                                 className="flex-1 cursor-pointer"
//                               >
//                                 <div className="font-medium">
//                                   {addr.type} {addr.default && "(Default)"}
//                                 </div>
//                                 <div className="text-sm text-muted-foreground">
//                                   {addr.name}, {addr.address}
//                                   {addr.apartment &&
//                                     `, ${addr.apartment}`}, {addr.city},{" "}
//                                   {addr.state} {addr.zipCode}, {addr.country}
//                                   <br />
//                                   {addr.phone}
//                                 </div>
//                               </Label>
//                             </div>
//                           ))}
//                         </RadioGroup>

//                         <Button
//                           type="button"
//                           variant="outline"
//                           onClick={() => setShowNewAddressForm(true)}
//                         >
//                           + Add New Address
//                         </Button>
//                       </>
//                     ) : (
//                       <>
//                         {/* New address form */}
//                         <div className="grid gap-4 sm:grid-cols-2">
//                           <div className="space-y-2">
//                             <Label htmlFor="firstName">First Name</Label>
//                             <Input
//                               id="firstName"
//                               name="firstName"
//                               value={shippingAddress.firstName}
//                               onChange={handleShippingChange}
//                               required
//                             />
//                           </div>
//                           <div className="space-y-2">
//                             <Label htmlFor="lastName">Last Name</Label>
//                             <Input
//                               id="lastName"
//                               name="lastName"
//                               value={shippingAddress.lastName}
//                               onChange={handleShippingChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="space-y-2">
//                           <Label htmlFor="label">Address Label</Label>
//                           <Input
//                             id="label"
//                             name="label"
//                             placeholder="e.g. Home, Work, Parents"
//                             value={shippingAddress.label}
//                             onChange={handleShippingChange}
//                             required
//                           />
//                         </div>

//                         <div className="space-y-2">
//                           <Label htmlFor="address">Street Address</Label>
//                           <Input
//                             id="address"
//                             name="address"
//                             value={shippingAddress.address}
//                             onChange={handleShippingChange}
//                             required
//                           />
//                         </div>

//                         <div className="space-y-2">
//                           <Label htmlFor="apartment">
//                             Apartment, suite, etc. (optional)
//                           </Label>
//                           <Input
//                             id="apartment"
//                             name="apartment"
//                             value={shippingAddress.apartment}
//                             onChange={handleShippingChange}
//                           />
//                         </div>

//                         <div className="grid gap-4 sm:grid-cols-3">
//                           <div className="space-y-2">
//                             <Label htmlFor="city">City</Label>
//                             <Input
//                               id="city"
//                               name="city"
//                               value={shippingAddress.city}
//                               onChange={handleShippingChange}
//                               required
//                             />
//                           </div>
//                           <div className="space-y-2">
//                             <Label htmlFor="state">State/Territory</Label>
//                             <Select
//                               value={shippingAddress.state}
//                               onValueChange={(value) =>
//                                 setShippingAddress((prev) => ({
//                                   ...prev,
//                                   state: value,
//                                 }))
//                               }
//                             >
//                               <SelectTrigger id="state">
//                                 <SelectValue placeholder="Select state" />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 {states.map((state) => (
//                                   <SelectItem
//                                     key={state.value}
//                                     value={state.value}
//                                   >
//                                     {state.label}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="postcode">Postcode</Label>
//                             <Input
//                               id="postcode"
//                               name="postcode"
//                               value={shippingAddress.postcode}
//                               onChange={handleShippingChange}
//                               required
//                             />
//                             {errors.postcode && (
//                               <p className="text-sm text-red-600">
//                                 {errors.postcode}
//                               </p>
//                             )}
//                           </div>
//                         </div>

//                         <div className="space-y-2">
//                           <Label htmlFor="country">Country</Label>
//                           <Select
//                             value={shippingAddress.country}
//                             onValueChange={(value) =>
//                               setShippingAddress((prev) => ({
//                                 ...prev,
//                                 country: value,
//                               }))
//                             }
//                             disabled
//                           >
//                             <SelectTrigger id="country">
//                               <SelectValue placeholder="Select country" />
//                             </SelectTrigger>
//                             <SelectContent>
//                               {countries.map((country) => (
//                                 <SelectItem
//                                   key={country.value}
//                                   value={country.value}
//                                 >
//                                   {country.label}
//                                 </SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                         </div>

//                         <div className="space-y-2">
//                           <Label htmlFor="phone">Phone Number</Label>
//                           <Input
//                             id="phone"
//                             name="phone"
//                             type="tel"
//                             value={shippingAddress.phone}
//                             onChange={handleShippingChange}
//                             required
//                           />
//                           {errors.phone && (
//                             <p className="text-sm text-red-600">
//                               {errors.phone}
//                             </p>
//                           )}
//                         </div>

//                         <div className="space-y-2">
//                           <Label htmlFor="email">Email Address</Label>
//                           <Input
//                             id="email"
//                             name="email"
//                             type="email"
//                             value={shippingAddress.email}
//                             onChange={handleShippingChange}
//                             required
//                           />
//                           {errors.email && (
//                             <p className="text-sm text-red-600">
//                               {errors.email}
//                             </p>
//                           )}
//                         </div>

//                         {addresses.length > 0 && (
//                           <Button
//                             type="button"
//                             variant="outline"
//                             onClick={() => setShowNewAddressForm(false)}
//                           >
//                             Back to Saved Addresses
//                           </Button>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 </div>

//                 {/* Shipping method and order notes */}
//                 <div className="rounded-lg border bg-card">
//                   <div className="p-6">
//                     <h2 className="flex items-center text-xl font-bold">
//                       <Package className="mr-2 h-5 w-5" />
//                       Shipping Method
//                     </h2>
//                   </div>
//                   <Separator />
//                   <div className="p-6">
//                     <RadioGroup
//                       value={shippingMethod}
//                       onValueChange={setShippingMethod}
//                     >
//                       <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="standard" id="standard" />
//                           <Label htmlFor="standard" className="font-medium">
//                             Standard Shipping
//                           </Label>
//                         </div>
//                         <div className="text-right">
//                           <div className="font-medium">
//                             {checkoutTotal > 50 ? "Free" : "A$5.99"}
//                           </div>
//                           <div className="text-sm text-muted-foreground">
//                             3-5 business days
//                           </div>
//                         </div>
//                       </div>
//                       <div className="mt-2 flex items-center justify-between space-x-2 rounded-md border p-4">
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="express" id="express" />
//                           <Label htmlFor="express" className="font-medium">
//                             Express Shipping
//                           </Label>
//                         </div>
//                         <div className="text-right">
//                           <div className="font-medium">
//                             {checkoutTotal > 50 ? "Free" : "A$12.99"}
//                           </div>
//                           <div className="text-sm text-muted-foreground">
//                             1-2 business days
//                           </div>
//                         </div>
//                       </div>
//                     </RadioGroup>

//                     <div className="mt-4 space-y-2">
//                       <Label htmlFor="orderNotes">Order Notes (optional)</Label>
//                       <Textarea
//                         id="orderNotes"
//                         placeholder="Special instructions for delivery"
//                         value={orderNotes}
//                         onChange={(e) => setOrderNotes(e.target.value)}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex justify-end">
//                   <Button type="button" onClick={nextStep}>
//                     Review Order
//                   </Button>
//                 </div>
//               </div>
//             )}

//             {/* Step 2: Order Review */}
//             {step === 2 && (
//               <div className="space-y-8">
//                 <div className="rounded-lg border bg-card">
//                   <div className="p-6">
//                     <h2 className="text-xl font-bold">Review Your Order</h2>
//                   </div>
//                   <Separator />
//                   <div className="p-6">
//                     <h3 className="mb-4 font-medium">Order Items</h3>
//                     <ul className="divide-y">
//                       {checkoutItems.map((item) => (
//                         <li key={item.id} className="py-4 flex items-center">
//                           <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
//                             <Image
//                               src={item.image || "/images/placeholder.svg"}
//                               alt={item.name}
//                               width={64}
//                               height={64}
//                               className="h-full w-full object-cover"
//                             />
//                           </div>
//                           <div className="ml-4 flex-1">
//                             <h4 className="font-medium">{item.name}</h4>
//                             <p className="text-sm text-muted-foreground">
//                               Qty: {item.quantity}
//                             </p>
//                           </div>
//                           <div className="text-right">
//                             <p className="font-medium">
//                               A${(item.price * item.quantity).toFixed(2)}
//                             </p>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>

//                     <div className="mt-6 space-y-4">
//                       <div className="rounded-md border p-4">
//                         <h3 className="mb-2 font-medium">Shipping Address</h3>
//                         {selectedAddressId &&
//                         addresses.length > 0 &&
//                         !showNewAddressForm ? (
//                           (() => {
//                             const chosen = addresses.find(
//                               (a) => a.id === selectedAddressId
//                             )!;
//                             return (
//                               <p>
//                                 {chosen.name}
//                                 <br />
//                                 {chosen.address}
//                                 {chosen.apartment && `, ${chosen.apartment}`}
//                                 <br />
//                                 {chosen.city}, {chosen.state} {chosen.zipCode}
//                                 <br />
//                                 {chosen.country}
//                                 <br />
//                                 {chosen.phone}
//                               </p>
//                             );
//                           })()
//                         ) : (
//                           <p>
//                             {shippingAddress.firstName}{" "}
//                             {shippingAddress.lastName}
//                             <br />
//                             {shippingAddress.address}{" "}
//                             {shippingAddress.apartment &&
//                               `, ${shippingAddress.apartment}`}
//                             <br />
//                             {shippingAddress.city},{" "}
//                             {states.find(
//                               (s) => s.value === shippingAddress.state
//                             )?.label || shippingAddress.state}{" "}
//                             {shippingAddress.postcode}
//                             <br />
//                             Australia
//                             <br />
//                             {shippingAddress.phone}
//                           </p>
//                         )}
//                       </div>

//                       <div className="rounded-md border p-4">
//                         <h3 className="mb-2 font-medium">Shipping Method</h3>
//                         <p>
//                           {shippingMethod === "standard"
//                             ? "Standard Shipping (3-5 business days)"
//                             : "Express Shipping (1-2 business days)"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex justify-between">
//                   <Button type="button" variant="outline" onClick={prevStep}>
//                     Back to Shipping
//                   </Button>
//                   <Button type="submit" disabled={isLoading}>
//                     {isLoading ? "Processing..." : "Place Order"}
//                   </Button>
//                 </div>
//                 {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
//               </div>
//             )}
//           </form>
//         </div>

//         {/* Order Summary */}
//         {step < 3 && (
//           <div>
//             <div className="rounded-lg border bg-card">
//               <div className="p-6">
//                 <h2 className="text-xl font-bold">Order Summary</h2>
//                 {isBuyNow && (
//                   <p className="text-sm text-muted-foreground mt-1">
//                     Quick Checkout
//                   </p>
//                 )}
//               </div>
//               <Separator />
//               <div className="p-6">
//                 <ul className="divide-y">
//                   {checkoutItems.map((item) => (
//                     <li key={item.id} className="py-2 flex justify-between">
//                       <div className="flex-1">
//                         <span className="font-medium">{item.name}</span>
//                         <span className="ml-1 text-muted-foreground">
//                           x{item.quantity}
//                         </span>
//                       </div>
//                       <span>A${(item.price * item.quantity).toFixed(2)}</span>
//                     </li>
//                   ))}
//                 </ul>

//                 <div className="mt-4 space-y-2">
//                   <div className="flex justify-between">
//                     <span>Subtotal</span>
//                     <span>A${checkoutTotal.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Shipping</span>
//                     <span>
//                       {finalShippingCost === 0
//                         ? "Free"
//                         : `A$${finalShippingCost.toFixed(2)}`}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>GST (10%)</span>
//                     <span>A${taxAmount.toFixed(2)}</span>
//                   </div>
//                   <Separator />
//                   <div className="flex justify-between font-bold text-lg">
//                     <span>Total</span>
//                     <span>A${orderTotal.toFixed(2)}</span>
//                   </div>
//                 </div>

//                 <div className="mt-6 space-y-4">
//                   <div className="flex items-center rounded-md bg-muted p-4">
//                     <ShieldCheck className="mr-2 h-5 w-5 text-green-600" />
//                     <span className="text-sm">
//                       Secure checkout with 256-bit SSL encryption
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default function CheckoutPage() {
//   return (
//     <CartProvider>
//       <div className="flex min-h-screen flex-col">
//         <main className="flex-1">
//           <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
//             <div className="mb-6 flex items-center text-sm text-muted-foreground">
//               <Link href="/" className="hover:text-foreground">
//                 Home
//               </Link>
//               <ChevronRight className="mx-1 h-4 w-4" />
//               <Link href="/cart" className="hover:text-foreground">
//                 Cart
//               </Link>
//               <ChevronRight className="mx-1 h-4 w-4" />
//               <span className="text-foreground">Checkout</span>
//             </div>

//             <CheckoutContent />
//           </div>
//         </main>
//         <footer className="border-t py-6 md:py-0">
//           <div className="container mx-auto max-w-7xl px-4 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
//             <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
//               © 2023 ShopSmart. All rights reserved.
//             </p>
//             <div className="flex gap-4">
//               <Link
//                 href="/terms"
//                 className="text-sm text-muted-foreground underline-offset-4 hover:underline"
//               >
//                 Terms
//               </Link>
//               <Link
//                 href="/privacy"
//                 className="text-sm text-muted-foreground underline-offset-4 hover:underline"
//               >
//                 Privacy
//               </Link>
//               <Link
//                 href="/contact"
//                 className="text-sm text-muted-foreground underline-offset-4 hover:underline"
//               >
//                 Contact
//               </Link>
//             </div>
//           </div>
//         </footer>
//       </div>
//     </CartProvider>
//   );
// }

"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Truck, Package, ShieldCheck, Check } from "lucide-react";
import { Button } from "../../components/ui/button";
import { CartProvider, useCart } from "../../components/cart-provider";
import { Separator } from "../../components/ui/separator";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axiosInstance from "@/lib/axiosInstance";
import useStore from "@/lib/Zustand";
import { useRouter } from "next/navigation";

type Address = {
  id: string;
  type: string;
  default: boolean;
  name: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
};

type CheckoutItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  productSlug?: string;
};

// Australian states for the dropdown
const states = [
  { value: "NSW", label: "New South Wales" },
  { value: "VIC", label: "Victoria" },
  { value: "QLD", label: "Queensland" },
  { value: "WA", label: "Western Australia" },
  { value: "SA", label: "South Australia" },
  { value: "TAS", label: "Tasmania" },
  { value: "ACT", label: "Australian Capital Territory" },
  { value: "NT", label: "Northern Territory" },
];

// Single country for Australia
const countries = [{ value: "AU", label: "Australia" }];

function CheckoutContent() {
  const { userId, isAuthenticated } = useStore();
  const { cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check if this is a "Buy Now" checkout
  const isBuyNow = searchParams.get("buyNow") === "true";

  // State for checkout items (either cart items or buy now item)
  const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>([]);
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postcode: "",
    country: "AU",
    phone: "",
    email: "",
    label: "",
  });
  const [orderNotes, setOrderNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) {
          error = "This field is required.";
        } else if (!/^[a-zA-Z\s-]+$/.test(value)) {
          error = "Name can only contain letters, spaces, or hyphens.";
        }
        break;
      case "address":
        if (!value.trim()) {
          error = "Street address is required.";
        } else if (!/^[0-9a-zA-Z\s,/-]+$/.test(value)) {
          error =
            "Invalid street address. Use letters, numbers, spaces, commas, or hyphens.";
        }
        break;
      case "apartment":
        if (value && !/^[0-9a-zA-Z\s,/-]+$/.test(value)) {
          error =
            "Invalid apartment details. Use letters, numbers, spaces, commas, or hyphens.";
        }
        break;
      case "city":
        if (!value.trim()) {
          error = "City is required.";
        } else if (!/^[a-zA-Z\s-]+$/.test(value)) {
          error = "City can only contain letters, spaces, or hyphens.";
        }
        break;
      case "state":
        if (!value) {
          error = "State is required.";
        } else if (!states.some((s) => s.value === value)) {
          error = "Please select a valid Australian state or territory.";
        }
        break;
      case "postcode":
        if (!/^\d{4}$/.test(value)) {
          error = "Postcode must be exactly 4 digits.";
        }
        break;
      case "phone":
        if (!/^(0[23478]\d{8})$/.test(value)) {
          error =
            "Enter a valid Australian phone number (e.g., 04xxxxxxxx or 02xxxxxxxx).";
        }
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Enter a valid email address.";
        }
        break;
      case "label":
        if (!value.trim()) {
          error = "Address label is required.";
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };

  const validateForm = () => {
    const fieldsToValidate = [
      "firstName",
      "lastName",
      "address",
      "city",
      "state",
      "postcode",
      "phone",
      "email",
      "label",
    ];
    const results = fieldsToValidate.map((field) =>
      validateField(field, (shippingAddress as any)[field] || "")
    );
    return results.every((result) => result);
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleNextStep = () => {
    if (addresses.length > 0 && !showNewAddressForm && selectedAddressId) {
      nextStep();
    } else if (showNewAddressForm && validateForm()) {
      nextStep();
    } else if (!selectedAddressId && !showNewAddressForm) {
      setError("Please select an address or add a new one.");
    }
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  // Initialize checkout items based on mode (Buy Now vs Cart)
  useEffect(() => {
    if (isBuyNow) {
      const buyNowProductStr = localStorage.getItem("buyNowProduct");
      if (buyNowProductStr) {
        const buyNowProduct: CheckoutItem = JSON.parse(buyNowProductStr);
        setCheckoutItems([buyNowProduct]);
        setCheckoutTotal(buyNowProduct.price * buyNowProduct.quantity);
      } else {
        router.push("/");
      }
    } else {
      setCheckoutItems(cartItems);
      setCheckoutTotal(cartTotal);
    }
  }, [isBuyNow, cartItems, cartTotal, router]);

  // Shipping calculation based on method
  const [shippingMethod, setShippingMethod] = useState("standard");
  const shippingCost =
    shippingMethod === "standard"
      ? 5.99
      : shippingMethod === "express"
        ? 12.99
        : 0;

  // Free shipping for orders over A$50
  const finalShippingCost = checkoutTotal > 50 ? 0 : shippingCost;

  // GST calculation (10% for Australia)
  const taxRate = 0.1;
  const taxAmount = checkoutTotal * taxRate;

  // Final total (includes GST)
  const orderTotal = checkoutTotal + finalShippingCost + taxAmount;

  useEffect(() => {
    if (!isAuthenticated || !userId) {
      router.push("/login");
    }
  }, [isAuthenticated, userId, router]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      try {
        const res = await axiosInstance.get(`/users/profiles/${userId}`);
        const userData = res.data.data;
        if (userData.address && Array.isArray(userData.address)) {
          const mappedAddresses: Address[] = userData.address.map(
            (addr: any) => {
              const details = addr.details || addr;
              return {
                id: String(addr.id),
                type: addr.label || "Other",
                default: addr.is_default || false,
                name: userData.username || "N/A",
                address: details.street || "",
                apartment: details.apartment || "",
                city: details.city || "",
                state: details.state || "",
                zipCode: details.postcode || "",
                country: details.country || "",
                phone: details.phone || userData.phone_number || "",
              };
            }
          );
          setAddresses(mappedAddresses);
          const defaultAddr = mappedAddresses.find((a) => a.default);
          if (defaultAddr) setSelectedAddressId(defaultAddr.id);
        }
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    };
    fetchUser();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const vendorPromises = checkoutItems.map(async (item) => {
        try {
          const response = await axiosInstance.get(`/products/${item.id}`);
          return {
            product_id: item.id,
            vendor_id: response.data.vendor_id,
            quantity: item.quantity,
            name: item.name,
          };
        } catch (err) {
          console.error(`Failed to fetch vendor for product ${item.id}:`, err);
          throw new Error(`Unable to fetch vendor for product ${item.name}`);
        }
      });

      const itemsWithVendors = await Promise.all(vendorPromises);

      const itemDetails = itemsWithVendors.reduce(
        (acc, item) => ({
          ...acc,
          [item.product_id]: {
            name: item.name,
            quantity: item.quantity,
          },
        }),
        {}
      );

      let finalAddress;
      let addressId: string | null = null;

      if (selectedAddressId && addresses.length > 0 && !showNewAddressForm) {
        const chosen = addresses.find((a) => a.id === selectedAddressId)!;
        finalAddress = {
          label: chosen.type,
          street: `${chosen.address}${chosen.apartment ? `, ${chosen.apartment}` : ""}`,
          city: chosen.city,
          state: chosen.state,
          postcode: chosen.zipCode,
          country: chosen.country,
        };
        addressId = chosen.id;
      } else {
        finalAddress = {
          label: shippingAddress.label,
          street: `${shippingAddress.address}${shippingAddress.apartment ? `, ${shippingAddress.apartment}` : ""}`,
          city: shippingAddress.city,
          state: shippingAddress.state,
          postcode: shippingAddress.postcode,
          country: "Australia",
        };
      }

      const payload = {
        user_id: userId,
        vendor_ids: Array.from(
          new Set(itemsWithVendors.map((item) => item.vendor_id))
        ),
        product_ids: itemsWithVendors.map((item) => item.product_id),
        item_details: itemDetails,
        amount: orderTotal,
        address: finalAddress,
        address_id: addressId,
        order_notes: orderNotes || null,
      };

      const response = await axiosInstance.post("/orders/place-order", payload);
      const { data } = response.data;

      if (!isBuyNow) {
        clearCart();
      }

      localStorage.setItem("checkoutEmail", shippingAddress.email);
      window.location.href = data.checkout_url;
    } catch (error: any) {
      console.error("Error placing order:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to place order";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (checkoutItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="mb-2 text-2xl font-bold">No items to checkout</h2>
        <p className="mb-8 text-center text-muted-foreground">
          {isBuyNow
            ? "The product you tried to buy is no longer available."
            : "You need to add items to your cart before checking out."}
        </p>
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {isBuyNow && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 font-medium">
            🚀 Quick Checkout - You're purchasing this item directly
          </p>
        </div>
      )}

      <div className="mb-8">
        <div className="flex justify-between">
          <div
            className={`flex flex-col items-center ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                step >= 1
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted-foreground"
              }`}
            >
              {step > 1 ? <Check className="h-5 w-5" /> : "1"}
            </div>
            <span className="mt-2 text-sm font-medium">Shipping</span>
          </div>
          <div
            className={`flex-1 border-t-2 self-start mt-5 mx-4 ${
              step >= 2 ? "border-primary" : "border-muted-foreground/30"
            }`}
          />
          <div
            className={`flex flex-col items-center ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                step >= 2
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted-foreground"
              }`}
            >
              {step > 2 ? <Check className="h-5 w-5" /> : "2"}
            </div>
            <span className="mt-2 text-sm font-medium">Review</span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-8">
                <div className="rounded-lg border bg-card">
                  <div className="p-6">
                    <h2 className="flex items-center text-xl font-bold">
                      <Truck className="mr-2 h-5 w-5" />
                      Shipping Address
                    </h2>
                  </div>
                  <Separator />
                  <div className="p-6 space-y-4">
                    {addresses.length > 0 && !showNewAddressForm ? (
                      <>
                        <RadioGroup
                          value={selectedAddressId || ""}
                          onValueChange={(val) => setSelectedAddressId(val)}
                          className="grid gap-4"
                        >
                          {addresses.map((addr) => (
  <div
    key={addr.id}
    className="flex items-start space-x-4 rounded-md border p-4 hover:border-primary hover:bg-blue-50 transition"
  >
    <RadioGroupItem
      value={addr.id}
      id={`addr-${addr.id}`}
      className="mt-1"
    />
   <Label
  htmlFor={`addr-${addr.id}`}
  className="flex-1 cursor-pointer flex flex-col space-y-1 text-left"
>
  {/* Row 1: Label + Name */}
  <div className="flex items-center space-x-2">
    <span className="font-semibold text-gray-900">
      {addr.type} {addr.default && "(Default)"}
    </span>
    <span className="text-sm text-gray-600">{addr.name}</span>
  </div>

  {/* Row 2: Full address */}
  <div className="text-sm text-gray-700">
    {addr.address}{addr.apartment && `, ${addr.apartment}`}, {addr.city}, {addr.state}, {addr.country} {addr.zipCode}
  </div>

  {/* Row 3: Phone */}
  <div className="text-sm text-gray-600">{addr.phone}</div>
</Label>

  </div>
))}


                        </RadioGroup>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowNewAddressForm(true)}
                        >
                          + Add New Address
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              value={shippingAddress.firstName}
                              onChange={handleShippingChange}
                              required
                            />
                            {errors.firstName && (
                              <p className="text-sm text-red-600">
                                {errors.firstName}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              value={shippingAddress.lastName}
                              onChange={handleShippingChange}
                              required
                            />
                            {errors.lastName && (
                              <p className="text-sm text-red-600">
                                {errors.lastName}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="label">Address Label</Label>
                          <Input
                            id="label"
                            name="label"
                            placeholder="e.g. Home, Work, Parents"
                            value={shippingAddress.label}
                            onChange={handleShippingChange}
                            required
                          />
                          {errors.label && (
                            <p className="text-sm text-red-600">
                              {errors.label}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Street Address</Label>
                          <Input
                            id="address"
                            name="address"
                            value={shippingAddress.address}
                            onChange={handleShippingChange}
                            required
                          />
                          {errors.address && (
                            <p className="text-sm text-red-600">
                              {errors.address}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="apartment">
                            Apartment, suite, etc. (optional)
                          </Label>
                          <Input
                            id="apartment"
                            name="apartment"
                            value={shippingAddress.apartment}
                            onChange={handleShippingChange}
                          />
                          {errors.apartment && (
                            <p className="text-sm text-red-600">
                              {errors.apartment}
                            </p>
                          )}
                        </div>
                        <div className="grid gap-4 sm:grid-cols-3">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              name="city"
                              value={shippingAddress.city}
                              onChange={handleShippingChange}
                              required
                            />
                            {errors.city && (
                              <p className="text-sm text-red-600">
                                {errors.city}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Select
                              value={shippingAddress.state}
                              onValueChange={(value) => {
                                setShippingAddress((prev) => ({
                                  ...prev,
                                  state: value,
                                }));
                                validateField("state", value);
                              }}
                            >
                              <SelectTrigger id="state">
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                              <SelectContent>
                                {states.map((state) => (
                                  <SelectItem
                                    key={state.value}
                                    value={state.value}
                                  >
                                    {state.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.state && (
                              <p className="text-sm text-red-600">
                                {errors.state}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="postcode">Postcode</Label>
                            <Input
                              id="postcode"
                              name="postcode"
                              value={shippingAddress.postcode}
                              onChange={handleShippingChange}
                              required
                            />
                            {errors.postcode && (
                              <p className="text-sm text-red-600">
                                {errors.postcode}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Select
                            value={shippingAddress.country}
                            onValueChange={(value) =>
                              setShippingAddress((prev) => ({
                                ...prev,
                                country: value,
                              }))
                            }
                            disabled
                          >
                            <SelectTrigger id="country">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem
                                  key={country.value}
                                  value={country.value}
                                >
                                  {country.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={shippingAddress.phone}
                            onChange={handleShippingChange}
                            required
                          />
                          {errors.phone && (
                            <p className="text-sm text-red-600">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={shippingAddress.email}
                            onChange={handleShippingChange}
                            required
                          />
                          {errors.email && (
                            <p className="text-sm text-red-600">
                              {errors.email}
                            </p>
                          )}
                        </div>
                        {addresses.length > 0 && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowNewAddressForm(false)}
                          >
                            Back to Saved Addresses
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div className="rounded-lg border bg-card">
                  <div className="p-6">
                    <h2 className="flex items-center text-xl font-bold">
                      <Package className="mr-2 h-5 w-5" />
                      Shipping Method
                    </h2>
                  </div>
                  <Separator />
                  <div className="p-6">
                    <RadioGroup
                      value={shippingMethod}
                      onValueChange={setShippingMethod}
                    >
                      <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="font-medium">
                            Standard Shipping
                          </Label>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {checkoutTotal > 50 ? "Free" : "A$5.99"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            3-5 business days
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between space-x-2 rounded-md border p-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express" className="font-medium">
                            Express Shipping
                          </Label>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {checkoutTotal > 50 ? "Free" : "A$12.99"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            1-2 business days
                          </div>
                        </div>
                      </div>
                    </RadioGroup>
                    <div className="mt-4 space-y-2">
                      <Label htmlFor="orderNotes">Order Notes (optional)</Label>
                      <Textarea
                        id="orderNotes"
                        placeholder="Special instructions for delivery"
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    disabled={
                      addresses.length > 0 &&
                      !showNewAddressForm &&
                      !selectedAddressId
                    }
                  >
                    Review Order
                  </Button>
                </div>
                {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
              </div>
            )}
            {step === 2 && (
              <div className="space-y-8">
                <div className="rounded-lg border bg-card">
                  <div className="p-6">
                    <h2 className="text-xl font-bold">Review Your Order</h2>
                  </div>
                  <Separator />
                  <div className="p-6">
                    <h3 className="mb-4 font-medium">Order Items</h3>
                    <ul className="divide-y">
                      {checkoutItems.map((item) => (
                        <li key={item.id} className="py-4 flex items-center">
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                            <Image
                              src={item.image || "/images/placeholder.svg"}
                              alt={item.name}
                              width={64}
                              height={64}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              A${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 space-y-4">
                      <div className="rounded-md border p-4">
                        <h3 className="mb-2 font-medium">Shipping Address</h3>
                        {selectedAddressId &&
                        addresses.length > 0 &&
                        !showNewAddressForm ? (
                          (() => {
                            const chosen = addresses.find(
                              (a) => a.id === selectedAddressId
                            )!;
                            return (
                              <p className="text-sm">
                                {chosen.name}
                                <br />
                                {chosen.address}
                                {chosen.apartment && `, ${chosen.apartment}`}
                                <br />
                                {chosen.city}, {chosen.state} {chosen.zipCode}
                                <br />
                                {chosen.country}
                                <br />
                                {chosen.phone}
                              </p>
                            );
                          })()
                        ) : (
                          <p className="text-sm">
                            {shippingAddress.firstName}{" "}
                            {shippingAddress.lastName}
                            <br />
                            {shippingAddress.address}
                            {shippingAddress.apartment &&
                              `, ${shippingAddress.apartment}`}
                            <br />
                            {shippingAddress.city},{" "}
                            {states.find(
                              (s) => s.value === shippingAddress.state
                            )?.label || shippingAddress.state}{" "}
                            {shippingAddress.postcode}
                            <br />
                            Australia
                            <br />
                            {shippingAddress.phone}
                          </p>
                        )}
                      </div>
                      <div className="rounded-md border p-4">
                        <h3 className="mb-2 font-medium">Shipping Method</h3>
                        <p className="text-sm">
                          {shippingMethod === "standard"
                            ? "Standard Shipping (3-5 business days)"
                            : "Express Shipping (1-2 business days)"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Back to Shipping
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Processing..." : "Place Order"}
                  </Button>
                </div>
                {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
              </div>
            )}
          </form>
        </div>
        {step < 3 && (
          <div>
            <div className="rounded-lg border bg-card">
              <div className="p-6">
                <h2 className="text-xl font-bold">Order Summary</h2>
                {isBuyNow && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Quick Checkout
                  </p>
                )}
              </div>
              <Separator />
              <div className="p-6">
                <ul className="divide-y">
                  {checkoutItems.map((item) => (
                    <li key={item.id} className="py-2 flex justify-between">
                      <div className="flex-1">
                        <span className="font-medium">{item.name}</span>
                        <span className="ml-1 text-muted-foreground">
                          x{item.quantity}
                        </span>
                      </div>
                      <span>A${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>A${checkoutTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {finalShippingCost === 0
                        ? "Free"
                        : `A$${finalShippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (10%)</span>
                    <span>A${taxAmount.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>A${orderTotal.toFixed(2)}</span>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center rounded-md bg-muted p-4">
                    <ShieldCheck className="mr-2 h-5 w-5 text-green-600" />
                    <span className="text-sm">
                      Secure checkout with 256-bit SSL encryption
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
            <div className="mb-6 flex items-center text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              <ChevronRight className="mx-1 h-4 w-4" />
              <Link href="/cart" className="hover:text-foreground">
                Cart
              </Link>
              <ChevronRight className="mx-1 h-4 w-4" />
              <span className="text-foreground">Checkout</span>
            </div>
            <CheckoutContent />
          </div>
        </main>
        <footer className="border-t py-6 md:py-0">
          <div className="container mx-auto max-w-7xl px-4 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © 2023 ShopSmart. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="/terms"
                className="text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                Privacy
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}
