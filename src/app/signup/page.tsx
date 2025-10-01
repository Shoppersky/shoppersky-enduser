// app/signup/page.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
// import Logo from '../../components/logo';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Checkbox } from '../../components/ui/checkbox';
import { Separator } from '../../components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, Phone, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import axiosInstance from '../../lib/axiosInstance';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const router = useRouter();

// const validateName = (name: string) => {
//   if (!name) {
//     return { isValid: false, error: "Name is required" };
//   }

//   // 🧹 Trim and collapse multiple spaces into one
//   const cleanedName = name.trim().replace(/\s+/g, " ");

//   // ✅ Only letters and single spaces allowed
//   const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

//   if (!nameRegex.test(cleanedName)) {
//     return {
//       isValid: false,
//       error:
//         "Name can only contain letters and single spaces (no digits, no special characters).",
//     };
//   }

//   return { isValid: true, value: cleanedName };
// };
const validateName = (name: string) => {
  if (!name) {
    return { isValid: false, error: "Name is required" };
  }

  // 🧹 Trim and collapse multiple spaces into one
  const cleanedName = name.trim().replace(/\s+/g, " ");

  // ✅ Each word must have at least 2 letters, only letters and spaces allowed
  const nameRegex = /^[A-Za-z]{2,}(?: [A-Za-z]{2,})*$/;

  if (!nameRegex.test(cleanedName)) {
    return {
      isValid: false,
      error:
        "Each name part must have at least 2 letters and can only contain letters and single spaces (no digits, no special characters).",
    };
  }

  return { isValid: true, value: cleanedName };
};


  const validateUsername = (username: string) => {
    if (!username) {
      return { isValid: false, error: 'Username is required' };
    }
    if (username.length < 3 || username.length > 20) {
      return {
        isValid: false,
        error: 'Username must be between 3 and 20 characters',
      };
    }
    const usernameRegex = /^[A-Za-z0-9_-]+$/;
    if (!usernameRegex.test(username)) {
      return {
        isValid: false,
        error: 'Username can only contain letters, numbers, underscores, and hyphens',
      };
    }
    return { isValid: true };
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return { isValid: false, error: 'Email is required' };
    }
    if (!emailRegex.test(email)) {
      return { isValid: false, error: 'Invalid email format' };
    }
    return { isValid: true };
  };

  const validatePhoneNumber = (phone: string) => {
    if (!phone) {
      return { isValid: false, error: 'Phone number is required' };
    }
    
    // Remove all non-digit characters for validation
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Australian phone number validation
    // Mobile: 04XX XXX XXX (10 digits starting with 04)
    // Landline: 0X XXXX XXXX (10 digits starting with 02, 03, 07, 08)
    // International format: +61 4XX XXX XXX or +61 X XXXX XXXX
    
    // Check for international format (+61)
    if (phone.startsWith('+61')) {
      const phoneWithoutCountryCode = cleanPhone.substring(2); // Remove '61'
      
      // Mobile: +61 4XX XXX XXX (9 digits starting with 4)
      if (phoneWithoutCountryCode.startsWith('4')) {
        if (phoneWithoutCountryCode.length !== 9) {
          return {
            isValid: false,
            error: 'Australian mobile number should be +61 4XX XXX XXX format',
          };
        }
        return { isValid: true };
      }
      
      // Landline: +61 X XXXX XXXX (9 digits starting with 2, 3, 7, or 8)
      if (['2', '3', '7', '8'].includes(phoneWithoutCountryCode[0])) {
        if (phoneWithoutCountryCode.length !== 9) {
          return {
            isValid: false,
            error: 'Australian landline number should be +61 X XXXX XXXX format',
          };
        }
        return { isValid: true };
      }
      
      return {
        isValid: false,
        error: 'Invalid Australian phone number format',
      };
    }
    
    // Check for domestic format (starting with 0)
    if (cleanPhone.startsWith('0')) {
      if (cleanPhone.length !== 10) {
        return {
          isValid: false,
          error: 'Australian phone number should be 10 digits',
        };
      }
      
      // Mobile: 04XX XXX XXX
      if (cleanPhone.startsWith('04')) {
        return { isValid: true };
      }
      
      // Landline: 02, 03, 07, 08
      if (['02', '03', '07', '08'].some(prefix => cleanPhone.startsWith(prefix))) {
        return { isValid: true };
      }
      
      return {
        isValid: false,
        error: 'Australian phone numbers should start with 02, 03, 04, 07, or 08',
      };
    }
    
    return {
      isValid: false,
      error: 'Please enter a valid Australian phone number (e.g., 04XX XXX XXX or +61 4XX XXX XXX)',
    };
  };

  const validatePassword = (password: string) => {
    if (!password) {
      return { isValid: false, error: 'Password is required' };
    }
    if (password.length < 8 || password.length > 12) {
      return {
        isValid: false,
        error: 'Password must be between 8 and 12 characters',
      };
    }
    if (
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[!@#$%^&*()-_=+[\]{}|;:,.<>?/~`]/.test(password)
    ) {
      return {
        isValid: false,
        error: 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
      };
    }
    return { isValid: true };
  };

  // Format Australian phone number as user types
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters except +
    const cleaned = value.replace(/[^\d+]/g, '');
    
    // Handle international format (+61)
    if (cleaned.startsWith('+61')) {
      const digits = cleaned.substring(3); // Remove +61
      if (digits.length <= 9) {
        // Format as +61 4XX XXX XXX or +61 X XXXX XXXX
        if (digits.startsWith('4')) {
          // Mobile format
          return `+61 ${digits.substring(0, 3)} ${digits.substring(3, 6)} ${digits.substring(6, 9)}`.trim();
        } else {
          // Landline format
          return `+61 ${digits.substring(0, 1)} ${digits.substring(1, 5)} ${digits.substring(5, 9)}`.trim();
        }
      }
      return cleaned;
    }
    
    // Handle domestic format
    if (cleaned.startsWith('0')) {
      if (cleaned.length <= 10) {
        if (cleaned.startsWith('04')) {
          // Mobile: 04XX XXX XXX
          return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
        } else {
          // Landline: 0X XXXX XXXX
          return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '$1 $2 $3');
        }
      }
    }
    
    return cleaned;
  };

  const handleInputChange = (field: string, value: string) => {
    let processedValue = value;
    
    // Format phone number as user types
    if (field === 'phone') {
      processedValue = formatPhoneNumber(value);
    }
    
    setFormData((prev) => ({ ...prev, [field]: processedValue }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate using local validators
    const firstnameValidation = validateName(formData.firstname);
    const lastnameValidation = validateName(formData.lastname);
    const usernameValidation = validateUsername(formData.username);
    const emailValidation = validateEmail(formData.email);
    const phoneValidation = validatePhoneNumber(formData.phone);
    const passwordValidation = validatePassword(formData.password);

    if (!firstnameValidation.isValid) {
      newErrors.firstname = firstnameValidation.error!;
    }
    if (!lastnameValidation.isValid) {
      newErrors.lastname = lastnameValidation.error!;
    }
    if (!usernameValidation.isValid) {
      newErrors.username = usernameValidation.error!;
    }
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error!;
    }
    if (!phoneValidation.isValid) {
      newErrors.phone = phoneValidation.error!;
    }
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error!;
    }

    // Additional validations
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!agreeToTerms) {
      newErrors.terms = 'Please agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Clean phone number for API submission
  const cleanPhoneForAPI = (phone: string) => {
    // Remove all formatting and keep only digits and +
    const cleaned = phone.replace(/[^\d+]/g, '');
    
    // Convert domestic format to international format for consistency
    if (cleaned.startsWith('0')) {
      return `+61${cleaned.substring(1)}`;
    }
    
    return cleaned;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      toast.error('Please fix the errors below');
      return;
    }

    setIsLoading(true);

    try {
      // Clean phone number before sending to API
      const cleanedPhone = cleanPhoneForAPI(formData.phone);
      
      await axiosInstance.post('/users/register', {
        first_name: formData.firstname,
        last_name: formData.lastname,
        username: formData.username,
        email: formData.email,
        phone_number: cleanedPhone,
        password: formData.password,
      });
      
      localStorage.setItem('pendingEmail', formData.email);
      toast.success('Account created successfully! Please check your email for verification.');
      router.push('/verify-email/');
    } catch (error) {
      const err = error as AxiosError<{ detail?: string; message?: string }>;
      const errorMsg = err.response?.data?.detail?.message || err.response?.data?.message || 'Something went wrong. Please try again.';
      setErrors({ general: errorMsg });
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider: string) => {
    toast.success(`Signing up with ${provider}...`);
    // Add your social signup logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="absolute top-4 left-4 text-green-600 hover:text-green-700 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Store</span>
          </Link>
          {/* <div className="flex items-center justify-center gap-2 mb-4">
            <Logo />
          </div> */}
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600 mt-2">Join Shoppersky and start shopping fresh groceries</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl text-center">Sign Up</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstname">First Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="firstname"
                      placeholder="John"
                      value={formData.firstname}
                      onChange={(e) => handleInputChange('firstname', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                  {errors.firstname && (
                    <p className="text-red-500 text-xs">{errors.firstname}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastname">Last Name *</Label>
                    <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="lastname"
                    placeholder="Doe"
                    value={formData.lastname}
                    className='pl-10'
                    onChange={(e) => handleInputChange('lastname', e.target.value)}
                    required
                  />
                  </div>
                  {errors.lastname && (
                    <p className="text-red-500 text-xs">{errors.lastname}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    placeholder="johndoe123"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-xs">{errors.username}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="04XX XXX XXX or +61 4XX XXX XXX"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Enter Australian mobile (04XX XXX XXX) or landline (02/03/07/08 XXXX XXXX) number
                </p>
                {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreeToTerms} 
                    onCheckedChange={(checked) => setAgreeToTerms(checked === true)} 
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{' '}
                    <Button variant="link" className="px-0 h-auto text-green-600">
                      Terms of Service
                    </Button>{' '}
                    and{' '}
                    <Button variant="link" className="px-0 h-auto text-green-600">
                      Privacy Policy
                    </Button>
                  </Label>
                </div>
                {errors.terms && (
                  <p className="text-red-500 text-xs">{errors.terms}</p>
                )}
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="newsletter" 
                    checked={subscribeNewsletter} 
                    onCheckedChange={(checked) => setSubscribeNewsletter(checked === true)} 
                   
                  />
                  <Label htmlFor="newsletter" className="text-sm">
                    Subscribe to our newsletter for deals and updates
                  </Label>
                </div>
              </div>

              {errors.general && (
                <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md">
                  {errors.general}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700" 
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              {/* <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or sign up with</span>
              </div> */}
            </div>

            {/* <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                onClick={() => handleSocialSignup('Google')} 
                className="w-full"
                type="button"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleSocialSignup('Microsoft')} 
                className="w-full"
                type="button"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 256 256">
                  <path fill="#f1511b" d="M121.666 121.666H0V0h121.666z" />
                  <path fill="#80cc28" d="M256 121.666H134.335V0H256z" />
                  <path fill="#00adef" d="M121.663 256.002H0V134.336h121.663z" />
                  <path fill="#fbbc09" d="M256 256.002H134.335V134.336H256z" />
                </svg>
                Microsoft
              </Button>
            </div> */}

            <div className="text-center">
              <span className="text-sm text-gray-600">Already have an account? </span>
              <Button variant="link" className="px-0 text-green-600" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}