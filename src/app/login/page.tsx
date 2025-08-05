// // LoginPage.tsx
// 'use client';

// import Logo from '../../components/logo';
// import { Button } from '../../components/ui/button';
// import { Input } from '../../components/ui/input';
// import { Label } from '../../components/ui/label';
// import Link from 'next/link';
// import useStore from '../../lib/Zustand';
// import { useRouter } from 'next/navigation';
// import { useState, FormEvent } from 'react';
// import axiosInstance from '../../lib/axiosInstance';

// export default function LoginPage() {
//   const { login, validateEmail, validatePassword } = useStore();
//   const router = useRouter();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     setErrors({});

//     const emailValidation = validateEmail(email);
//     const passwordValidation = validatePassword(password);

//     const newErrors: Record<string, string> = {};
//     if (!emailValidation.isValid) {
//       newErrors.email = emailValidation.error!;
//     }
//     if (!passwordValidation.isValid) {
//       newErrors.password = passwordValidation.error!;
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     try {
//       const response = await axiosInstance.post('/login/', {
//         email,
//         password,
//       });

//       console.log('Login response:', response.data); // Debug

//       if (response.status === 200) {
//         const { token } = response.data.data; // Extract token from data
//         login(token);
//         // Wait for state to persist
//         await new Promise((resolve) => setTimeout(resolve, 100));
//         console.log(
//           'Post-login localStorage:',
//           localStorage.getItem('auth-storage')
//         ); // Debug
//         router.push('/');
//       }
//     } catch (error) {
//       console.error('Login error:', error); // Debug
//       setErrors({ general: 'Something went wrong. Please try again.' });
//     }
//   };

//   return (
//     <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
//       <form
//         onSubmit={handleLogin}
//         className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
//       >
//         <div className="p-8 pb-6">
//           <div>
//             <Link href="/" aria-label="go home">
//               <Logo />
//             </Link>
//             <h1 className="mb-1 mt-4 text-xl font-semibold">
//               Sign In to Desi S-Mart
//             </h1>
//             <p className="text-sm">Welcome back! Sign in to continue</p>
//           </div>

//           <div className="mt-6 grid grid-cols-2 gap-3">
//             <Button type="button" variant="outline">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="0.98em"
//                 height="1em"
//                 viewBox="0 0 256 262"
//               >
//                 <path
//                   fill="#4285f4"
//                   d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
//                 ></path>
//                 <path
//                   fill="#34a853"
//                   d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
//                 ></path>
//                 <path
//                   fill="#fbbc05"
//                   d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
//                 ></path>
//                 <path
//                   fill="#eb4335"
//                   d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
//                 ></path>
//               </svg>
//               <span>Google</span>
//             </Button>
//             <Button type="button" variant="outline">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="1em"
//                 height="1em"
//                 viewBox="0 0 256 256"
//               >
//                 <path fill="#f1511b" d="M121.666 121.666H0V0h121.666z"></path>
//                 <path fill="#80cc28" d="M256 121.666H134.335V0H256z"></path>
//                 <path
//                   fill="#00adef"
//                   d="M121.663 256.002H0V134.336h121.663z"
//                 ></path>
//                 <path
//                   fill="#fbbc09"
//                   d="M256 256.002H134.335V134.336H256z"
//                 ></path>
//               </svg>
//               <span>Microsoft</span>
//             </Button>
//           </div>

//           <hr className="my-4 border-dashed" />

//           <div className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="email" className="block text-sm">
//                 Username
//               </Label>
//               <Input
//                 type="email"
//                 required
//                 name="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-xs">{errors.email}</p>
//               )}
//             </div>

//             <div className="space-y-0.5">
//               <div className="flex items-center justify-between">
//                 <Label htmlFor="pwd" className="text-title text-sm">
//                   Password
//                 </Label>
//                 <Button asChild variant="link" size="sm">
//                   <Link
//                     href="#"
//                     className="link intent-info variant-ghost text-sm"
//                   >
//                     Forgot your Password ?
//                   </Link>
//                 </Button>
//               </div>
//               <Input
//                 type="password"
//                 required
//                 name="pwd"
//                 id="pwd"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-xs">{errors.password}</p>
//               )}
//             </div>

//             <Button className="w-full">Sign In</Button>
//           </div>
//         </div>

//         <div className="bg-muted rounded-(--radius) border p-3">
//           <p className="text-accent-foreground text-center text-sm">
//             {"Don't have an account?"}
//             <Button asChild variant="link" className="px-2">
//               <Link href="/signup">Create account</Link>
//             </Button>
//           </p>
//         </div>
//       </form>
//     </section>
//   );
// }



'use client';

import type React from "react";
import { useState, FormEvent } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import { Separator } from "../../components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import Link from 'next/link';
import useStore from '../../lib/Zustand';
import { useRouter } from 'next/navigation';
import axiosInstance from '../../lib/axiosInstance';

export default function LoginPage() {
  const { login, validateEmail, validatePassword } = useStore();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific errors when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validate using Zustand validators
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);

    const newErrors: Record<string, string> = {};
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error!;
    }
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error!;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post('/users/login', {
        email: formData.email,
        password: formData.password,
      });

      console.log('Login response:', response.data.data.access_token);

      if (response.status === 200) {
        const  token  = response.data.data.access_token;
        login(token);
        
        // Wait for state to persist
        await new Promise((resolve) => setTimeout(resolve, 100));
        console.log('Post-login localStorage:', localStorage.getItem('auth-storage'));
        
        toast.success("Welcome back! You've been logged in successfully.");
        router.push('/');
      }
    } catch (error: any) {
      console.log('Login error:', error);

      const errorMessage = error.response?.data?.detail?.message || 'Invalid credentials. Please try again.';
      setErrors({ general: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`${provider} login will be available soon!`);
  };

  const handleBack = () => {
    router.push('/');
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Button variant="ghost" onClick={handleBack} className="absolute top-4 left-4 text-green-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Store
          </Button>
          {/* <div className="flex items-center justify-center gap-2 mb-4">
            <ShoppingCart className="w-8 h-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-600">Desi S-Mart</h1>
          </div> */}
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your account to continue shopping</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl text-center">Sign In</CardTitle>
            {errors.general && (
              <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                {errors.general}
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
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

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe} 
                    onCheckedChange={(checked) => setRememberMe(checked === true)} 
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Button variant="link" className="px-0 text-green-600" onClick={handleForgotPassword}>
                  Forgot password?
                </Button>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div> */}

            {/* <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" onClick={() => handleSocialLogin("Google")} className="w-full">
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
              <Button variant="outline" onClick={() => handleSocialLogin("Microsoft")} className="w-full">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 256 256">
                  <path fill="#f1511b" d="M121.666 121.666H0V0h121.666z"></path>
                  <path fill="#80cc28" d="M256 121.666H134.335V0H256z"></path>
                  <path fill="#00adef" d="M121.663 256.002H0V134.336h121.663z"></path>
                  <path fill="#fbbc09" d="M256 256.002H134.335V134.336H256z"></path>
                </svg>
                Microsoft
              </Button>
            </div> */}

            <div className="text-center">
              <span className="text-sm text-gray-600">Don't have an account? </span>
              <Button variant="link" className="px-0 text-green-600">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8 text-center">
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">🚚</div>
              <span>Fast Delivery</span>
            </div>
            <div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">🌱</div>
              <span>Fresh Products</span>
            </div>
            <div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">💯</div>
              <span>Quality Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}