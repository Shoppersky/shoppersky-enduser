'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import axiosInstance from '../../lib/axiosInstance';
import { ErrorBoundary } from '../../components/ErrorBoundary';

export default function ResendVerificationPage() {
 
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();
const initialEmail = searchParams.get('email') || '';
const [email, setEmail] = useState(initialEmail);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
// /users/resend-verification
    try {
      const response = await axiosInstance.post(
        '/users/resend-verification',
        { email },
        { headers: { Accept: 'application/json' } }
      );
      console.log('Resend response:', response.data);
      setStatus('success');
    } catch (err: any) {
      console.error('Resend error:', err.response?.data || err.message);
      setStatus('error');
      setErrorMessage(
        err.response?.data?.detail || 'Failed to resend verification email.'
      );
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">
                Resend Verification Email
              </CardTitle>
            </CardHeader>

            <CardContent>
              {status === 'idle' && (
                <form onSubmit={handleResend} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full bg-[#1B4B33] hover:bg-[#153D29] text-white"
                  >
                    Resend
                  </Button>
                </form>
              )}

              {status === 'loading' && (
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B4B33]"></div>
                  </div>
                  <p className="text-gray-600">Sending verification email...</p>
                </div>
              )}

              {status === 'success' && (
                <div className="text-center space-y-4">
                  <CheckCircle className="h-16 w-16 text-[#40B86D] mx-auto" />
                  <p className="text-gray-600">
                    A new verification email has been sent! Please check your inbox.
                  </p>
                  <Button
                    onClick={() => router.push('/login')}
                    className="w-full bg-[#1B4B33] hover:bg-[#153D29] text-white"
                  >
                    Back to Login
                  </Button>
                </div>
              )}

              {status === 'error' && (
                <div className="text-center space-y-4">
                  <XCircle className="h-16 w-16 text-red-500 mx-auto" />
                  <p className="text-gray-600">{errorMessage}</p>
                  <Button
                    variant="outline"
                    onClick={() => setStatus('idle')}
                    className="w-full"
                  >
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-center">
              <div className="text-sm text-center text-gray-500">
                Need help?{' '}
                <Link href="/contact" className="text-[#40B86D] hover:underline">
                  Contact Support
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </ErrorBoundary>
  );
}
