'use client';

import type React from 'react';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronRight,
  CreditCard,
  Check,
  Truck,
  Package,
  ShieldCheck,
} from 'lucide-react';

import { Button } from '../../components/ui/button';
import { CartProvider, useCart } from '../../components/cart-provider';

import { Separator } from '../../components/ui/separator';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Textarea } from '../../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Checkbox } from '../../components/ui/checkbox';
import Navbar from '@/components/navbar';

// Sample countries for the dropdown
const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
];

// Sample states for the dropdown
const states = [
  { value: 'al', label: 'Alabama' },
  { value: 'ak', label: 'Alaska' },
  { value: 'az', label: 'Arizona' },
  { value: 'ca', label: 'California' },
  { value: 'co', label: 'Colorado' },
  { value: 'ct', label: 'Connecticut' },
  { value: 'ny', label: 'New York' },
  { value: 'tx', label: 'Texas' },
];

function CheckoutContent() {
  const { cartItems, cartTotal } = useCart();
  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    email: '',
  });
  const [billingAddress, setBillingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    nameOnCard: '',
    expiryDate: '',
    cvv: '',
  });
  const [orderNotes, setOrderNotes] = useState('');

  // Shipping calculation based on method
  const shippingCost =
    shippingMethod === 'standard'
      ? 5.99
      : shippingMethod === 'express'
        ? 12.99
        : 0;

  // Free shipping for orders over $50
  const finalShippingCost = cartTotal > 50 ? 0 : shippingCost;

  // Tax calculation (simplified)
  const taxRate = 0.08;
  const taxAmount = cartTotal * taxRate;

  // Final total
  const orderTotal = cartTotal + finalShippingCost + taxAmount;

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSameAsShippingChange = (checked: boolean) => {
    setSameAsShipping(checked);
    if (checked) {
      setBillingAddress(shippingAddress);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would process the order here
    nextStep();
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="mb-2 text-2xl font-bold">Your cart is empty</h2>
        <p className="mb-8 text-center text-muted-foreground">
          You need to add items to your cart before checking out.
        </p>
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Checkout Progress */}
      <div className="mb-8">
        <div className="flex justify-between">
          <div
            className={`flex flex-col items-center ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                step >= 1
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-muted-foreground'
              }`}
            >
              {step > 1 ? <Check className="h-5 w-5" /> : '1'}
            </div>
            <span className="mt-2 text-sm font-medium">Shipping</span>
          </div>
          <div
            className={`flex-1 border-t-2 self-start mt-5 mx-4 ${
              step >= 2 ? 'border-primary' : 'border-muted-foreground/30'
            }`}
          />
          <div
            className={`flex flex-col items-center ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                step >= 2
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-muted-foreground'
              }`}
            >
              {step > 2 ? <Check className="h-5 w-5" /> : '2'}
            </div>
            <span className="mt-2 text-sm font-medium">Payment</span>
          </div>
          <div
            className={`flex-1 border-t-2 self-start mt-5 mx-4 ${
              step >= 3 ? 'border-primary' : 'border-muted-foreground/30'
            }`}
          />
          <div
            className={`flex flex-col items-center ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                step >= 3
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-muted-foreground'
              }`}
            >
              {step > 3 ? <Check className="h-5 w-5" /> : '3'}
            </div>
            <span className="mt-2 text-sm font-medium">Review</span>
          </div>
          <div
            className={`flex-1 border-t-2 self-start mt-5 mx-4 ${
              step >= 4 ? 'border-primary' : 'border-muted-foreground/30'
            }`}
          />
          <div
            className={`flex flex-col items-center ${step >= 4 ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                step >= 4
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-muted-foreground'
              }`}
            >
              {step > 4 ? <Check className="h-5 w-5" /> : '4'}
            </div>
            <span className="mt-2 text-sm font-medium">Confirmation</span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <div className="space-y-8">
                <div className="rounded-lg border bg-card">
                  <div className="p-6">
                    <h2 className="flex items-center text-xl font-bold">
                      <Truck className="mr-2 h-5 w-5" />
                      Shipping Information
                    </h2>
                  </div>
                  <Separator />
                  <div className="p-6 space-y-4">
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
                      </div>
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
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State/Province</Label>
                        <Select
                          value={shippingAddress.state}
                          onValueChange={(value) =>
                            setShippingAddress((prev) => ({
                              ...prev,
                              state: value,
                            }))
                          }
                        >
                          <SelectTrigger id="state">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {states.map((state) => (
                              <SelectItem key={state.value} value={state.value}>
                                {state.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={shippingAddress.zipCode}
                          onChange={handleShippingChange}
                          required
                        />
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

                    <div className="grid gap-4 sm:grid-cols-2">
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
                      </div>
                    </div>
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
                            {cartTotal > 50 ? 'Free' : '$5.99'}
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
                            {cartTotal > 50 ? 'Free' : '$12.99'}
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
                  <Button type="button" onClick={nextStep}>
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {step === 2 && (
              <div className="space-y-8">
                <div className="rounded-lg border bg-card">
                  <div className="p-6">
                    <h2 className="flex items-center text-xl font-bold">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Payment Method
                    </h2>
                  </div>
                  <Separator />
                  <div className="p-6">
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                    >
                      <div className="flex items-center space-x-2 rounded-md border p-4">
                        <RadioGroupItem value="credit" id="credit" />
                        <Label htmlFor="credit" className="font-medium">
                          Credit / Debit Card
                        </Label>
                      </div>
                      <div className="mt-2 flex items-center space-x-2 rounded-md border p-4">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="font-medium">
                          PayPal
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === 'credit' && (
                      <div className="mt-6 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardDetails.cardNumber}
                            onChange={handleCardDetailsChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="nameOnCard">Name on Card</Label>
                          <Input
                            id="nameOnCard"
                            name="nameOnCard"
                            placeholder="John Doe"
                            value={cardDetails.nameOnCard}
                            onChange={handleCardDetailsChange}
                            required
                          />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              name="expiryDate"
                              placeholder="MM/YY"
                              value={cardDetails.expiryDate}
                              onChange={handleCardDetailsChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              name="cvv"
                              placeholder="123"
                              value={cardDetails.cvv}
                              onChange={handleCardDetailsChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'paypal' && (
                      <div className="mt-6 rounded-md bg-muted p-4 text-center">
                        <p>
                          You will be redirected to PayPal to complete your
                          payment.
                        </p>
                        <Button className="mt-4" variant="outline">
                          Continue to PayPal
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-lg border bg-card">
                  <div className="p-6">
                    <h2 className="text-xl font-bold">Billing Address</h2>
                  </div>
                  <Separator />
                  <div className="p-6 space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sameAsShipping"
                        checked={sameAsShipping}
                        onCheckedChange={handleSameAsShippingChange}
                      />
                      <Label htmlFor="sameAsShipping">
                        Same as shipping address
                      </Label>
                    </div>

                    {!sameAsShipping && (
                      <div className="mt-4 space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="billingFirstName">First Name</Label>
                            <Input
                              id="billingFirstName"
                              name="firstName"
                              value={billingAddress.firstName}
                              onChange={handleBillingChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="billingLastName">Last Name</Label>
                            <Input
                              id="billingLastName"
                              name="lastName"
                              value={billingAddress.lastName}
                              onChange={handleBillingChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="billingAddress">Street Address</Label>
                          <Input
                            id="billingAddress"
                            name="address"
                            value={billingAddress.address}
                            onChange={handleBillingChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="billingApartment">
                            Apartment, suite, etc. (optional)
                          </Label>
                          <Input
                            id="billingApartment"
                            name="apartment"
                            value={billingAddress.apartment}
                            onChange={handleBillingChange}
                          />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                          <div className="space-y-2">
                            <Label htmlFor="billingCity">City</Label>
                            <Input
                              id="billingCity"
                              name="city"
                              value={billingAddress.city}
                              onChange={handleBillingChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="billingState">State/Province</Label>
                            <Select
                              value={billingAddress.state}
                              onValueChange={(value) =>
                                setBillingAddress((prev) => ({
                                  ...prev,
                                  state: value,
                                }))
                              }
                            >
                              <SelectTrigger id="billingState">
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
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="billingZipCode">
                              ZIP / Postal Code
                            </Label>
                            <Input
                              id="billingZipCode"
                              name="zipCode"
                              value={billingAddress.zipCode}
                              onChange={handleBillingChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="billingCountry">Country</Label>
                          <Select
                            value={billingAddress.country}
                            onValueChange={(value) =>
                              setBillingAddress((prev) => ({
                                ...prev,
                                country: value,
                              }))
                            }
                          >
                            <SelectTrigger id="billingCountry">
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
                          <Label htmlFor="billingPhone">Phone Number</Label>
                          <Input
                            id="billingPhone"
                            name="phone"
                            type="tel"
                            value={billingAddress.phone}
                            onChange={handleBillingChange}
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Back to Shipping
                  </Button>
                  <Button type="button" onClick={nextStep}>
                    Review Order
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Order Review */}
            {step === 3 && (
              <div className="space-y-8">
                <div className="rounded-lg border bg-card">
                  <div className="p-6">
                    <h2 className="text-xl font-bold">Review Your Order</h2>
                  </div>
                  <Separator />
                  <div className="p-6">
                    <h3 className="mb-4 font-medium">Order Items</h3>
                    <ul className="divide-y">
                      {cartItems.map((item) => (
                        <li key={item.id} className="py-4 flex items-center">
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                            <Image
                              src={item.image || '/placeholder.svg'}
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
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 space-y-4">
                      <div className="rounded-md border p-4">
                        <h3 className="mb-2 font-medium">Shipping Address</h3>
                        <p>
                          {shippingAddress.firstName} {shippingAddress.lastName}
                          <br />
                          {shippingAddress.address}{' '}
                          {shippingAddress.apartment &&
                            `, ${shippingAddress.apartment}`}
                          <br />
                          {shippingAddress.city},{' '}
                          {states.find((s) => s.value === shippingAddress.state)
                            ?.label || shippingAddress.state}{' '}
                          {shippingAddress.zipCode}
                          <br />
                          {countries.find(
                            (c) => c.value === shippingAddress.country
                          )?.label || shippingAddress.country}
                          <br />
                          {shippingAddress.phone}
                        </p>
                      </div>

                      <div className="rounded-md border p-4">
                        <h3 className="mb-2 font-medium">Billing Address</h3>
                        <p>
                          {sameAsShipping ? (
                            <>
                              {shippingAddress.firstName}{' '}
                              {shippingAddress.lastName}
                              <br />
                              {shippingAddress.address}{' '}
                              {shippingAddress.apartment &&
                                `, ${shippingAddress.apartment}`}
                              <br />
                              {shippingAddress.city},{' '}
                              {states.find(
                                (s) => s.value === shippingAddress.state
                              )?.label || shippingAddress.state}{' '}
                              {shippingAddress.zipCode}
                              <br />
                              {countries.find(
                                (c) => c.value === shippingAddress.country
                              )?.label || shippingAddress.country}
                              <br />
                              {shippingAddress.phone}
                            </>
                          ) : (
                            <>
                              {billingAddress.firstName}{' '}
                              {billingAddress.lastName}
                              <br />
                              {billingAddress.address}{' '}
                              {billingAddress.apartment &&
                                `, ${billingAddress.apartment}`}
                              <br />
                              {billingAddress.city},{' '}
                              {states.find(
                                (s) => s.value === billingAddress.state
                              )?.label || billingAddress.state}{' '}
                              {billingAddress.zipCode}
                              <br />
                              {countries.find(
                                (c) => c.value === billingAddress.country
                              )?.label || billingAddress.country}
                              <br />
                              {billingAddress.phone}
                            </>
                          )}
                        </p>
                      </div>

                      <div className="rounded-md border p-4">
                        <h3 className="mb-2 font-medium">Payment Method</h3>
                        <p>
                          {paymentMethod === 'credit' ? (
                            <>
                              Credit Card ending in{' '}
                              {cardDetails.cardNumber.slice(-4)}
                              <br />
                              {cardDetails.nameOnCard}
                            </>
                          ) : (
                            'PayPal'
                          )}
                        </p>
                      </div>

                      <div className="rounded-md border p-4">
                        <h3 className="mb-2 font-medium">Shipping Method</h3>
                        <p>
                          {shippingMethod === 'standard'
                            ? 'Standard Shipping (3-5 business days)'
                            : 'Express Shipping (1-2 business days)'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Back to Payment
                  </Button>
                  <Button type="submit">Place Order</Button>
                </div>
              </div>
            )}

            {/* Step 4: Order Confirmation */}
            {step === 4 && (
              <div className="space-y-8 text-center">
                <div className="rounded-lg border bg-card p-8">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="mb-2 text-2xl font-bold">
                    Thank You for Your Order!
                  </h2>
                  <p className="mb-6 text-muted-foreground">
                    Your order has been placed successfully. We`&apos;`ve sent a
                    confirmation email to {shippingAddress.email}.
                  </p>

                  <div className="mb-6 rounded-md border p-4 text-left">
                    <h3 className="mb-2 font-medium">Order Number</h3>
                    <p className="text-lg font-bold">
                      #ORD-{Math.floor(100000 + Math.random() * 900000)}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Button asChild className="w-full">
                      <Link href="/account/orders">View Order</Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full">
                      <Link href="/">Continue Shopping</Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Order Summary */}
        {step < 4 && (
          <div>
            <div className="rounded-lg border bg-card">
              <div className="p-6">
                <h2 className="text-xl font-bold">Order Summary</h2>
              </div>
              <Separator />
              <div className="p-6">
                <ul className="divide-y">
                  {cartItems.map((item) => (
                    <li key={item.id} className="py-2 flex justify-between">
                      <div className="flex-1">
                        <span className="font-medium">{item.name}</span>
                        <span className="ml-1 text-muted-foreground">
                          x{item.quantity}
                        </span>
                      </div>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {finalShippingCost === 0
                        ? 'Free'
                        : `$${finalShippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
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
