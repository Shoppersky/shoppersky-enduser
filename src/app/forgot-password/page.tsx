'use client';

import type React from "react";
import { useState, FormEvent } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { ArrowLeft, Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import Link from 'next/link';
import useStore from '../../lib/Zustand';
import { useRouter } from 'next/navigation';
import axiosInstance from '../../lib/axiosInstance';

export default function ForgotPasswordPage() {
  const { validateEmail } = useStore();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (value: string) => {
    setEmail(value);
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setError(emailValidation.error!);
      setIsLoading(false);
      return;
    }

    try {
    const formData = new FormData();
formData.append('email', email);

const response = await axiosInstance.post('/users/forgot-password', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

      if (response.status === 200) {
        setIsSuccess(true);
        toast.success("Password reset email sent successfully!");
      }
    } catch (error: any) {
      console.error('Forgot password error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to send reset email. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/login');
  };

  const handleResendEmail = () => {
    setIsSuccess(false);
    setEmail('');
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Sent!</h2>
              <p className="text-gray-600 mb-4">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="text-sm text-gray-500">
                Please check your email and click the link to reset your password. 
                The link will expire in 15 minutes.
              </p>
            </div>
            
            <div className="space-y-3">
              <Button onClick={handleBack} className="w-full">
                Return to Login
              </Button>
              <Button variant="outline" onClick={handleResendEmail} className="w-full">
                Send Another Email
              </Button>
            </div>

            <div className="mt-6 p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-yellow-700">
                  <p className="font-medium mb-1">Didn't receive the email?</p>
                  <ul className="space-y-1">
                    <li>• Check your spam/junk folder</li>
                    <li>• Make sure the email address is correct</li>
                    <li>• Wait a few minutes for delivery</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Button variant="ghost" onClick={handleBack} className="absolute top-4 left-4 text-blue-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Button>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-blue-600">Forgot Password</h1>
          </div>
          <p className="text-gray-600 mt-2">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl text-center">Reset Your Password</CardTitle>
            <CardDescription className="text-center">
              We'll send you a secure link to reset your password
            </CardDescription>
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
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className={`pl-10 ${error ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                    required
                  />
                </div>
                {error && (
                  <p className="text-red-500 text-xs">{error}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Send className="w-4 h-4 mr-2 animate-pulse" />
                    Sending Reset Link...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Reset Link
                  </>
                )}
              </Button>
            </form>

            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                Remember your password?{' '}
                <Link href="/login" className="text-blue-600 hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link href="/signup" className="text-blue-600 hover:underline font-medium">
                  Create one
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 For security reasons, we'll only send reset links to registered email addresses.
          </p>
        </div>
      </div>
    </div>
  );
}