'use client';

import type React from "react";
import { useState, useEffect, FormEvent } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { ArrowLeft, Eye, EyeOff, Lock, Shield, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import Link from 'next/link';
import useStore from '../../lib/Zustand';
import { useRouter } from 'next/navigation';
import axiosInstance from '../../lib/axiosInstance';

export default function UpdatePasswordPage() {
  const { userId, isAuthenticated, validatePassword } = useStore();
  const router = useRouter();

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated || !userId) {
      router.push('/login');
    }
  }, [isAuthenticated, userId, router]);

  const handleInputChange = (field: string, value: string) => {
    setPasswordForm((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific errors when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validate form fields
    const newErrors: Record<string, string> = {};
    
    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordForm.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else {
      const passwordValidation = validatePassword(passwordForm.newPassword);
      if (!passwordValidation.isValid) {
        newErrors.newPassword = passwordValidation.error!;
      }
    }
    
    if (!passwordForm.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (passwordForm.currentPassword === passwordForm.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    if (!userId) {
      newErrors.general = 'User not authenticated';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
 const formData = new FormData();
 formData.append('current_password', passwordForm.currentPassword);
 formData.append('new_password', passwordForm.newPassword);
 formData.append('user_id', userId);

 console.log(formData)
    try {
      const response = await axiosInstance.post('/users/change-password', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

      if (response.status === 200) {
        setIsSuccess(true);
        // Reset form on success
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        toast.success("Password updated successfully!");
        
        // Redirect to account page after 3 seconds
        setTimeout(() => {
          router.push('/MyAccount');
        }, 3000);
      }
    } catch (error: any) {
      console.error('Password update error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update password. Please try again.';
      setErrors({ general: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/MyAccount');
  };

  if (!isAuthenticated || !userId) {
    return null; // Will redirect to login
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Updated!</h2>
              <p className="text-gray-600">
                Your password has been successfully updated. You will be redirected to your account page shortly.
              </p>
            </div>
            <Button onClick={handleBack} className="w-full">
              Return to Account
            </Button>
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
            Back to Account
          </Button>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-blue-600">Secure Password Update</h1>
          </div>
          <p className="text-gray-600 mt-2">Update your password to keep your account secure</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl text-center">Change Password</CardTitle>
            <CardDescription className="text-center">
              Enter your current password and choose a new secure password
            </CardDescription>
            {errors.general && (
              <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                {errors.general}
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Current Password */}
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="currentPassword"
                    type={showPasswords.current ? "text" : "password"}
                    placeholder="Enter your current password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                    className={`pl-10 pr-10 ${errors.currentPassword ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.currentPassword && (
                  <p className="text-red-500 text-xs">{errors.currentPassword}</p>
                )}
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="newPassword"
                    type={showPasswords.new ? "text" : "password"}
                    placeholder="Enter your new password"
                    value={passwordForm.newPassword}
                    onChange={(e) => handleInputChange("newPassword", e.target.value)}
                    className={`pl-10 pr-10 ${errors.newPassword ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-xs">{errors.newPassword}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showPasswords.confirm ? "text" : "password"}
                    placeholder="Confirm your new password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Password Requirements */}
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Password Requirements:</h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• 8-12 characters long</li>
                  <li>• At least one uppercase letter</li>
                  <li>• At least one lowercase letter</li>
                  <li>• At least one number</li>
                  <li>• At least one special character</li>
                </ul>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Updating Password...' : 'Update Password'}
              </Button>
            </form>

            <div className="text-center">
              <Button variant="link" onClick={handleBack} className="text-sm">
                Cancel and return to account
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 This is a secure page. Your password is encrypted and never stored in plain text.
          </p>
        </div>
      </div>
    </div>
  );
}