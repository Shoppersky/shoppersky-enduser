// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";
// import axiosInstance from "@/lib/axiosInstance";

// interface Address {
//   id: string;
//   type: string;
//   default: boolean;
//   address: string;
//   apartment?: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   country: string;
//   phone: string;
//   first_name?: string;
//   last_name?: string;
// }

// interface AddressesProps {
//   addresses: Address[];
//   setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
//   userId: string | null;
//   token: string | null;
// }

// export default function Addresses({
//   addresses,
//   setAddresses,
//   userId,
//   token,
// }: AddressesProps) {
//   const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
//   const [editingAddress, setEditingAddress] = useState<Address | null>(null);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [addressToDelete, setAddressToDelete] = useState<string | null>(null);
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   const [addressForm, setAddressForm] = useState({
//     first_name: "",
//     last_name: "",
//     label: "",
//     address: "",
//     apartment: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     country: "Australia",
//     phone: "",
//   });

//   const australianStates = [
//     { label: "New South Wales", value: "NSW" },
//     { label: "Victoria", value: "VIC" },
//     { label: "Queensland", value: "QLD" },
//     { label: "Western Australia", value: "WA" },
//     { label: "South Australia", value: "SA" },
//     { label: "Tasmania", value: "TAS" },
//     { label: "Northern Territory", value: "NT" },
//     { label: "Australian Capital Territory", value: "ACT" },
//   ];

//   const openAddressModal = (address?: Address) => {
//   if (!address && addresses.length >= 5) {
//     toast.error("You cannot save more than 5 addresses.");
//     return; // prevent opening modal
//   }
//     if (address) {
//       setEditingAddress(address);
//       setAddressForm({
//         first_name: address.first_name || "",
//         last_name: address.last_name || "",
//         label: address.type,
//         address: address.address,
//         apartment: address.apartment || "",
//         city: address.city,
//         state: address.state,
//         zipCode: address.zipCode,
//         country: address.country,
//         phone: address.phone,
//       });
//     } else {
//       setEditingAddress(null);
//       setAddressForm({
//         first_name: "",
//         last_name: "",
//         label: "",
//         address: "",
//         apartment: "",
//         city: "",
//         state: "",
//         zipCode: "",
//         country: "Australia",
//         phone: "",
//       });
//     }
//     setErrors({});
//     setIsAddressModalOpen(true);
//   };

//   const handleAddressSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const {
//       first_name,
//       last_name,
//       label,
//       address,
//       apartment,
//       city,
//       state,
//       zipCode,
//       country,
//       phone,
//     } = addressForm;

//     const newErrors: { [key: string]: string } = {};
//     const nameRegex = /^[A-Za-z\s]+$/;

//     // Safer empty check
//     const isEmpty = (val: any) => typeof val !== "string" || val.trim() === "";

//     if (isEmpty(first_name)) {
//       newErrors.first_name = "First name is required";
//     } else if (!nameRegex.test(first_name)) {
//       newErrors.first_name = "First name can only contain letters and spaces";
//     } else if (first_name.length > 50) {
//       newErrors.first_name = "First name must not exceed 50 characters";
//     }

//     if (isEmpty(last_name)) {
//       newErrors.last_name = "Last name is required";
//     } else if (!nameRegex.test(last_name)) {
//       newErrors.last_name = "Last name can only contain letters and spaces";
//     } else if (last_name.length > 50) {
//       newErrors.last_name = "Last name must not exceed 50 characters";
//     }

//     if (isEmpty(label)) {
//       newErrors.label = "Address type is required";
//     } else if (label.length > 10) {
//       newErrors.label = "Address type must not exceed 10 characters";
//     }

//     if (isEmpty(address)) {
//       newErrors.address = "Street address is required";
//     } else if (address.length > 50) {
//       newErrors.address = "Street address must not exceed 50 characters";
//     }
//     if (!isEmpty(apartment) && apartment.length > 20) {
//       newErrors.apartment = "Apartment must not exceed 20 characters";
//     }

//     if (isEmpty(city)) {
//       newErrors.city = "City is required";
//     } else if (!nameRegex.test(city)) {
//       newErrors.city = "City can only contain letters and spaces";
//     } else if (city.length > 50) {
//       newErrors.city = "City must not exceed 50 characters";
//     }

//     if (isEmpty(state)) newErrors.state = "State is required";
//     if (isEmpty(zipCode)) newErrors.zipCode = "Postcode is required";
//     if (isEmpty(country)) newErrors.country = "Country is required";
//     if (isEmpty(phone)) newErrors.phone = "Phone number is required";

//     // Postcode validation
//     if (!isEmpty(zipCode) && !/^\d{4}$/.test(zipCode.trim())) {
//       newErrors.zipCode = "Postcode must be a 4-digit Australian postcode";
//     }

//     // State validation
//     const validStates = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "NT", "ACT"];
//     if (!isEmpty(state) && !validStates.includes(state.trim().toUpperCase())) {
//       newErrors.state = `State must be one of: ${validStates.join(", ")}`;
//     }

//     // Phone validation
//     if (
//       !isEmpty(phone) &&
//       !/^(?:\+?61|0)[2-478]\d{8}$/.test(phone.replace(/\s+/g, ""))
//     ) {
//       newErrors.phone = "Enter a valid Australian phone number";
//     }

//     setErrors(newErrors);
//     if (Object.keys(newErrors).length > 0) {
//       toast.error("Please fix the form errors before submitting.");
//       return;
//     }

//     try {
//       let payload;
//       let res;

//       if (editingAddress) {
//         payload = {
//           id: editingAddress.id,
//           addresses: [
//             {
//               label,
//               details: {
//                 first_name,
//                 last_name,

//                 street: address,
//                 apartment: apartment || undefined,
//                 city,
//                 state,
//                 postcode: zipCode,
//                 country,
//                 phone,
//               },
//             },
//           ],
//         };

//         res = await axiosInstance.put(
//           `/users/profiles/address/${userId}`,
//           payload,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         toast.success("Address updated successfully!");
//       } else {
//         payload = {
//           addresses: [
//             {
//               label,
//               details: {
//                 first_name,
//                 last_name,

//                 street: address,
//                 apartment: apartment || undefined,
//                 city,
//                 state,
//                 postcode: zipCode,
//                 country,
//                 phone,
//               },
//             },
//           ],
//         };

//         res = await axiosInstance.put(
//           `/users/profiles/add_address/${userId}`,
//           payload,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         toast.success("Address added successfully!");
//       }

//       const rawAddresses = res.data?.data?.address || [];
//       if (!Array.isArray(rawAddresses) || rawAddresses.length === 0) {
//         throw new Error("API did not return addresses");
//       }

//       const raw = editingAddress
//         ? rawAddresses.find(
//             (a: any) => String(a.id) === String(editingAddress.id)
//           )
//         : rawAddresses[rawAddresses.length - 1];

//       const parsedAddress: Address = {
//         id: String(raw.id),
//         type: raw.label,
//         default: raw.is_default || false,
//         address: raw.details.street,
//         apartment: raw.details.apartment || "",
//         city: raw.details.city,
//         state: raw.details.state,
//         zipCode: raw.details.postcode,
//         country: raw.details.country,
//         phone: raw.details.phone || "",
//         first_name: raw.details.first_name || "",
//         last_name: raw.details.last_name || "",
//       };

//       if (editingAddress) {
//         setAddresses(
//           addresses.map((addr) =>
//             addr.id === editingAddress.id ? parsedAddress : addr
//           )
//         );
//       } else {
//         setAddresses([...addresses, parsedAddress]);
//       }

//       setIsAddressModalOpen(false);
//       setAddressForm({
//         first_name: "",
//         last_name: "",

//         label: "",
//         address: "",
//         apartment: "",
//         city: "",
//         state: "",
//         zipCode: "",
//         country: "Australia",
//         phone: "",
//       });
//     } catch (err: any) {
//       toast.error(
//         "Failed to save address: " + (err.response?.data?.detail || err.message)
//       );
//     }
//   };

//   const handleSetDefault = async (addressId: string) => {
//     try {
//       await axiosInstance.put(
//         `/users/profiles/address/default/${userId}`,
//         { address_id: Number(addressId) },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setAddresses(
//         addresses.map((addr) => ({ ...addr, default: addr.id === addressId }))
//       );
//       toast.success("Default address updated successfully!");
//     } catch {
//       toast.error("Failed to set default address.");
//     }
//   };

//   const openDeleteDialog = (addressId: string) => {
//     setAddressToDelete(addressId);
//     setIsDeleteDialogOpen(true);
//   };

//   const handleDeleteAddress = async () => {
//     if (!addressToDelete) return;
//     try {
//       await axiosInstance.delete(`/users/profiles/address/${userId}`, {
//         data: { address_id: Number(addressToDelete) },
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAddresses(addresses.filter((addr) => addr.id !== addressToDelete));
//       toast.success("Address deleted successfully!");
//     } catch {
//       toast.error("Failed to delete address.");
//     } finally {
//       setIsDeleteDialogOpen(false);
//       setAddressToDelete(null);
//     }
//   };
//   console.log("Addresses component rendered with addresses:", addresses);
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">My Addresses</h1>
//         <Button onClick={() => openAddressModal()}>Add New Address</Button>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2">
//         {addresses.map((address) => (
//           <Card key={address.id}>
//             <CardHeader className="pb-2">
//               <div className="flex items-center justify-between">
//                 <CardTitle className="text-lg font-medium">
//                   {address.type}
//                 </CardTitle>
//                 {address.default && (
//                   <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
//                     Default
//                   </span>
//                 )}
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-1">
//                 <p>
//                   {address.first_name} {address.last_name}
//                 </p>

//                 <p>{address.address}</p>
//                 {address.apartment && <p>{address.apartment}</p>}
//                 <p>
//                   {address.city}, {address.state} {address.zipCode}
//                 </p>
//                 <p>{address.country}</p>
//                 <p>{address.phone}</p>
//               </div>
//               <div className="mt-4 flex gap-2 flex-wrap">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => openAddressModal(address)}
//                 >
//                   Edit
//                 </Button>
//                 {!address.default && (
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => handleSetDefault(address.id)}
//                   >
//                     Set as Default
//                   </Button>
//                 )}
//                 {!address.default && (
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="text-red-500 hover:bg-red-50 hover:text-red-600"
//                     onClick={() => openDeleteDialog(address.id)}
//                   >
//                     Delete
//                   </Button>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Address Form Modal */}
//       <Dialog
//         open={isAddressModalOpen}
//         onOpenChange={(open) => {
//           setIsAddressModalOpen(open);
//           if (!open) {
//             setErrors({});
//           }
//         }}
//       >
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>
//               {editingAddress ? "Edit Address" : "Add New Address"}
//             </DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleAddressSubmit} className="space-y-4">
//             <div className="grid gap-4 sm:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="firstname">First Name</Label>
//                 <Input
//                   id="firstname"
//                   value={addressForm.first_name}
//                   onChange={(e) =>
//                     setAddressForm({
//                       ...addressForm,
//                       first_name: e.target.value,
//                     })
//                   }
//                   placeholder="Jane"
//                   required
//                 />
//                 {errors.first_name && (
//                   <p className="text-xs text-red-500">{errors.first_name}</p>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="lastname">Last Name</Label>
//                 <Input
//                   id="lastname"
//                   value={addressForm.last_name}
//                   onChange={(e) =>
//                     setAddressForm({
//                       ...addressForm,
//                       last_name: e.target.value,
//                     })
//                   }
//                   placeholder="Doe"
//                   required
//                 />
//                 {errors.last_name && (
//                   <p className="text-xs text-red-500">{errors.last_name}</p>
//                 )}
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="type">Address Type</Label>
//               <Input
//                 id="type"
//                 value={addressForm.label}
//                 onChange={(e) =>
//                   setAddressForm({ ...addressForm, label: e.target.value })
//                 }
//                 placeholder="e.g., Home, Work"
//                 required
//               />
//               {errors.label && (
//                 <p className="text-xs text-red-500">{errors.label}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="address">Street</Label>
//               <Input
//                 id="address"
//                 value={addressForm.address}
//                 onChange={(e) =>
//                   setAddressForm({ ...addressForm, address: e.target.value })
//                 }
//                 placeholder="Street Address"
//                 required
//               />
//               {errors.address && (
//                 <p className="text-xs text-red-500">{errors.address}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="apartment">Apartment/Suite (Optional)</Label>
//               <Input
//                 id="apartment"
//                 value={addressForm.apartment}
//                 onChange={(e) =>
//                   setAddressForm({ ...addressForm, apartment: e.target.value })
//                 }
//                 placeholder="Apartment or Suite"
//               />
//               {errors.address && (
//                 <p className="text-xs text-red-500">{errors.apartment}</p>
//               )}
//             </div>

//             <div className="grid gap-4 sm:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="city">City</Label>
//                 <Input
//                   id="city"
//                   value={addressForm.city}
//                   onChange={(e) =>
//                     setAddressForm({ ...addressForm, city: e.target.value })
//                   }
//                   placeholder="City"
//                   required
//                 />
//                 {errors.city && (
//                   <p className="text-xs text-red-500">{errors.city}</p>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="state">State</Label>
//                 <select
//                   id="state"
//                   value={addressForm.state}
//                   onChange={(e) =>
//                     setAddressForm({ ...addressForm, state: e.target.value })
//                   }
//                   className="w-full rounded-md border px-3 py-2 text-sm"
//                   required
//                 >
//                   <option value="">Select State</option>
//                   {australianStates.map((state) => (
//                     <option key={state.value} value={state.value}>
//                       {state.label}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.state && (
//                   <p className="text-xs text-red-500">{errors.state}</p>
//                 )}
//               </div>
//             </div>

//             <div className="grid gap-4 sm:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="zipCode">Postcode</Label>
//                 <Input
//                   id="zipCode"
//                   value={addressForm.zipCode}
//                   onChange={(e) =>
//                     setAddressForm({ ...addressForm, zipCode: e.target.value })
//                   }
//                   placeholder="4-digit Postcode"
//                   required
//                 />
//                 {errors.zipCode && (
//                   <p className="text-xs text-red-500">{errors.zipCode}</p>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="country">Country</Label>
//                 <Input
//                   id="country"
//                   value="Australia"
//                   disabled
//                   className="bg-gray-100 cursor-not-allowed"
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="phone">Phone Number</Label>
//               <Input
//                 id="phone"
//                 value={addressForm.phone}
//                 onChange={(e) =>
//                   setAddressForm({ ...addressForm, phone: e.target.value })
//                 }
//                 placeholder="Australian Phone Number"
//                 required
//               />
//               {errors.phone && (
//                 <p className="text-xs text-red-500">{errors.phone}</p>
//               )}
//             </div>

//             <DialogFooter>
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setIsAddressModalOpen(false)}
//               >
//                 Cancel
//               </Button>
//               <Button type="submit">
//                 {editingAddress ? "Update Address" : "Save Address"}
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>

//       <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Delete Address</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to delete this address? This action cannot
//               be undone.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button
//               variant="outline"
//               onClick={() => setIsDeleteDialogOpen(false)}
//             >
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={handleDeleteAddress}>
//               Delete
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }



"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import axiosInstance from "@/lib/axiosInstance"
import { MapPin, Plus, Edit, Trash2, Star, Phone, User, Home, Building, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Address {
  id: string
  type: string
  default: boolean
  address: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  first_name?: string
  last_name?: string
}

interface AddressesProps {
  addresses: Address[]
  setAddresses: React.Dispatch<React.SetStateAction<Address[]>>
  userId: string | null
  token: string | null
}

export default function Addresses({ addresses, setAddresses, userId, token }: AddressesProps) {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [addressForm, setAddressForm] = useState({
    first_name: "",
    last_name: "",
    label: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Australia",
    phone: "",
  })

  const australianStates = [
    { label: "New South Wales", value: "NSW" },
    { label: "Victoria", value: "VIC" },
    { label: "Queensland", value: "QLD" },
    { label: "Western Australia", value: "WA" },
    { label: "South Australia", value: "SA" },
    { label: "Tasmania", value: "TAS" },
    { label: "Northern Territory", value: "NT" },
    { label: "Australian Capital Territory", value: "ACT" },
  ]

  const openAddressModal = (address?: Address) => {
    if (!address && addresses.length >= 5) {
      toast.error("You cannot save more than 5 addresses.")
      return
    }

    if (address) {
      setEditingAddress(address)
      setAddressForm({
        first_name: address.first_name || "",
        last_name: address.last_name || "",
        label: address.type,
        address: address.address,
        apartment: address.apartment || "",
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        country: address.country,
        phone: address.phone,
      })
    } else {
      setEditingAddress(null)
      setAddressForm({
        first_name: "",
        last_name: "",
        label: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        zipCode: "",
        country: "Australia",
        phone: "",
      })
    }
    setErrors({})
    setIsAddressModalOpen(true)
  }

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const { first_name, last_name, label, address, apartment, city, state, zipCode, country, phone } = addressForm

    const newErrors: { [key: string]: string } = {}
    const nameRegex = /^[A-Za-z\s]+$/

    const isEmpty = (val: any) => typeof val !== "string" || val.trim() === ""

    if (isEmpty(first_name)) {
      newErrors.first_name = "First name is required"
    } else if (!nameRegex.test(first_name)) {
      newErrors.first_name = "First name can only contain letters and spaces"
    } else if (first_name.length > 50) {
      newErrors.first_name = "First name must not exceed 50 characters"
    }

    if (isEmpty(last_name)) {
      newErrors.last_name = "Last name is required"
    } else if (!nameRegex.test(last_name)) {
      newErrors.last_name = "Last name can only contain letters and spaces"
    } else if (last_name.length > 50) {
      newErrors.last_name = "Last name must not exceed 50 characters"
    }

    if (isEmpty(label)) {
      newErrors.label = "Address type is required"
    } else if (label.length > 10) {
      newErrors.label = "Address type must not exceed 10 characters"
    }

    if (isEmpty(address)) {
      newErrors.address = "Street address is required"
    } else if (address.length > 50) {
      newErrors.address = "Street address must not exceed 50 characters"
    }

    if (!isEmpty(apartment) && apartment.length > 20) {
      newErrors.apartment = "Apartment must not exceed 20 characters"
    }

    if (isEmpty(city)) {
      newErrors.city = "City is required"
    } else if (!nameRegex.test(city)) {
      newErrors.city = "City can only contain letters and spaces"
    } else if (city.length > 50) {
      newErrors.city = "City must not exceed 50 characters"
    }

    if (isEmpty(state)) newErrors.state = "State is required"
    if (isEmpty(zipCode)) newErrors.zipCode = "Postcode is required"
    if (isEmpty(country)) newErrors.country = "Country is required"
    if (isEmpty(phone)) newErrors.phone = "Phone number is required"

    if (!isEmpty(zipCode) && !/^\d{4}$/.test(zipCode.trim())) {
      newErrors.zipCode = "Postcode must be a 4-digit Australian postcode"
    }

    const validStates = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "NT", "ACT"]
    if (!isEmpty(state) && !validStates.includes(state.trim().toUpperCase())) {
      newErrors.state = `State must be one of: ${validStates.join(", ")}`
    }

    if (!isEmpty(phone) && !/^(?:\+?61|0)[2-478]\d{8}$/.test(phone.replace(/\s+/g, ""))) {
      newErrors.phone = "Enter a valid Australian phone number"
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the form errors before submitting.")
      setIsSubmitting(false)
      return
    }

    try {
      let payload
      let res

      if (editingAddress) {
        payload = {
          id: editingAddress.id,
          addresses: [
            {
              label,
              details: {
                first_name,
                last_name,
                street: address,
                apartment: apartment || undefined,
                city,
                state,
                postcode: zipCode,
                country,
                phone,
              },
            },
          ],
        }

        res = await axiosInstance.put(`/users/profiles/address/${userId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        })
        toast.success("Address updated successfully!")
      } else {
        payload = {
          addresses: [
            {
              label,
              details: {
                first_name,
                last_name,
                street: address,
                apartment: apartment || undefined,
                city,
                state,
                postcode: zipCode,
                country,
                phone,
              },
            },
          ],
        }

        res = await axiosInstance.put(`/users/profiles/add_address/${userId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        })
        toast.success("Address added successfully!")
      }

      const rawAddresses = res.data?.data?.address || []
      if (!Array.isArray(rawAddresses) || rawAddresses.length === 0) {
        throw new Error("API did not return addresses")
      }

      const raw = editingAddress
        ? rawAddresses.find((a: any) => String(a.id) === String(editingAddress.id))
        : rawAddresses[rawAddresses.length - 1]

      const parsedAddress: Address = {
        id: String(raw.id),
        type: raw.label,
        default: raw.is_default || false,
        address: raw.details.street,
        apartment: raw.details.apartment || "",
        city: raw.details.city,
        state: raw.details.state,
        zipCode: raw.details.postcode,
        country: raw.details.country,
        phone: raw.details.phone || "",
        first_name: raw.details.first_name || "",
        last_name: raw.details.last_name || "",
      }

      if (editingAddress) {
        setAddresses(addresses.map((addr) => (addr.id === editingAddress.id ? parsedAddress : addr)))
      } else {
        setAddresses([...addresses, parsedAddress])
      }

      setIsAddressModalOpen(false)
      setAddressForm({
        first_name: "",
        last_name: "",
        label: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        zipCode: "",
        country: "Australia",
        phone: "",
      })
    } catch (err: any) {
      toast.error("Failed to save address: " + (err.response?.data?.detail || err.message))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSetDefault = async (addressId: string) => {
    try {
      await axiosInstance.put(
        `/users/profiles/address/default/${userId}`,
        { address_id: Number(addressId) },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      setAddresses(addresses.map((addr) => ({ ...addr, default: addr.id === addressId })))
      toast.success("Default address updated successfully!")
    } catch {
      toast.error("Failed to set default address.")
    }
  }

  const openDeleteDialog = (addressId: string) => {
    setAddressToDelete(addressId)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteAddress = async () => {
    if (!addressToDelete) return
    try {
      await axiosInstance.delete(`/users/profiles/address/${userId}`, {
        data: { address_id: Number(addressToDelete) },
        headers: { Authorization: `Bearer ${token}` },
      })
      setAddresses(addresses.filter((addr) => addr.id !== addressToDelete))
      toast.success("Address deleted successfully!")
    } catch {
      toast.error("Failed to delete address.")
    } finally {
      setIsDeleteDialogOpen(false)
      setAddressToDelete(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">My Addresses</h1>
        </div>
        <Button
          onClick={() => openAddressModal()}
          className="bg-primary hover:bg-primary/90"
          disabled={addresses.length >= 5}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Address
        </Button>
      </div>

      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/50">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{addresses.length} of 5 addresses used</span>
        </div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={cn("h-2 w-2 rounded-full", i < addresses.length ? "bg-primary" : "bg-muted")} />
          ))}
        </div>
      </div>

      {addresses.length === 0 ? (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-full blur-xl"></div>
              <div className="relative h-24 w-24 mx-auto bg-muted/20 rounded-full flex items-center justify-center">
                <MapPin className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-2">No addresses saved</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Add your first address to make checkout faster and easier.
            </p>
            <Button onClick={() => openAddressModal()} className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Address
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {addresses.map((address) => (
            <Card
              key={address.id}
              className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-200 group"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {address.type === "Home" ? (
                      <Home className="h-5 w-5 text-primary" />
                    ) : (
                      <Building className="h-5 w-5 text-blue-500" />
                    )}
                    {address.type}
                  </CardTitle>
                  {address.default && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                      <Star className="h-3 w-3 fill-current" />
                      Default
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {address.first_name} {address.last_name}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="text-muted-foreground">
                      <p>{address.address}</p>
                      {address.apartment && <p>{address.apartment}</p>}
                      <p>
                        {address.city}, {address.state} {address.zipCode}
                      </p>
                      <p>{address.country}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{address.phone}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-border/50">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openAddressModal(address)}
                    className="flex-1 border-border/50 hover:bg-muted/50"
                  >
                    <Edit className="mr-2 h-3 w-3" />
                    Edit
                  </Button>
                  {!address.default && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetDefault(address.id)}
                      className="flex-1 border-primary/20 hover:bg-primary/10 text-primary hover:text-primary"
                    >
                      <Star className="mr-2 h-3 w-3" />
                      Set Default
                    </Button>
                  )}
                  {!address.default && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-destructive/20 hover:bg-destructive/10 text-destructive hover:text-destructive bg-transparent"
                      onClick={() => openDeleteDialog(address.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog
        open={isAddressModalOpen}
        onOpenChange={(open) => {
          setIsAddressModalOpen(open)
          if (!open) {
            setErrors({})
          }
        }}
      >
        <DialogContent className="sm:max-w-[600px] border-border/50 bg-card/95 backdrop-blur-sm max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {editingAddress ? (
                <>
                  <Edit className="h-5 w-5 text-primary" />
                  Edit Address
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5 text-primary" />
                  Add New Address
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddressSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstname" className="text-sm font-medium">
                  First Name *
                </Label>
                <Input
                  id="firstname"
                  value={addressForm.first_name}
                  onChange={(e) =>
                    setAddressForm({
                      ...addressForm,
                      first_name: e.target.value,
                    })
                  }
                  placeholder="Jane"
                  className="bg-muted/20 border-border/50 focus:border-primary/50"
                  required
                />
                {errors.first_name && <p className="text-xs text-destructive">{errors.first_name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname" className="text-sm font-medium">
                  Last Name *
                </Label>
                <Input
                  id="lastname"
                  value={addressForm.last_name}
                  onChange={(e) =>
                    setAddressForm({
                      ...addressForm,
                      last_name: e.target.value,
                    })
                  }
                  placeholder="Doe"
                  className="bg-muted/20 border-border/50 focus:border-primary/50"
                  required
                />
                {errors.last_name && <p className="text-xs text-destructive">{errors.last_name}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type" className="text-sm font-medium">
                Address Type *
              </Label>
              <Input
                id="type"
                value={addressForm.label}
                onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                placeholder="e.g., Home, Work, Office"
                className="bg-muted/20 border-border/50 focus:border-primary/50"
                required
              />
              {errors.label && <p className="text-xs text-destructive">{errors.label}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium">
                Street Address *
              </Label>
              <Input
                id="address"
                value={addressForm.address}
                onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                placeholder="123 Main Street"
                className="bg-muted/20 border-border/50 focus:border-primary/50"
                required
              />
              {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="apartment" className="text-sm font-medium">
                Apartment/Suite (Optional)
              </Label>
              <Input
                id="apartment"
                value={addressForm.apartment}
                onChange={(e) => setAddressForm({ ...addressForm, apartment: e.target.value })}
                placeholder="Apt 4B, Suite 100"
                className="bg-muted/20 border-border/50 focus:border-primary/50"
              />
              {errors.apartment && <p className="text-xs text-destructive">{errors.apartment}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium">
                  City *
                </Label>
                <Input
                  id="city"
                  value={addressForm.city}
                  onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                  placeholder="Sydney"
                  className="bg-muted/20 border-border/50 focus:border-primary/50"
                  required
                />
                {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm font-medium">
                  State *
                </Label>
                <select
                  id="state"
                  value={addressForm.state}
                  onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                  className="w-full rounded-md border border-border/50 px-3 py-2 text-sm bg-muted/20 focus:border-primary/50"
                  required
                >
                  <option value="">Select State</option>
                  {australianStates.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
                {errors.state && <p className="text-xs text-destructive">{errors.state}</p>}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="zipCode" className="text-sm font-medium">
                  Postcode *
                </Label>
                <Input
                  id="zipCode"
                  value={addressForm.zipCode}
                  onChange={(e) => setAddressForm({ ...addressForm, zipCode: e.target.value })}
                  placeholder="2000"
                  className="bg-muted/20 border-border/50 focus:border-primary/50"
                  required
                />
                {errors.zipCode && <p className="text-xs text-destructive">{errors.zipCode}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm font-medium">
                  Country
                </Label>
                <Input
                  id="country"
                  value="Australia"
                  disabled
                  className="bg-muted/10 border-border/30 text-muted-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number *
              </Label>
              <Input
                id="phone"
                value={addressForm.phone}
                onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                placeholder="+61 4XX XXX XXX"
                className="bg-muted/20 border-border/50 focus:border-primary/50"
                required
              />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddressModalOpen(false)}
                className="border-border/50"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>{editingAddress ? "Update Address" : "Save Address"}</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="border-border/50 bg-card/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" />
              Delete Address
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this address? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="border-border/50">
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAddress}
              className="bg-destructive hover:bg-destructive/90"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Address
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
