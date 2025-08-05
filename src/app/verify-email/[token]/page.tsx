'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import axiosInstance from '../../../lib/axiosInstance';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { AxiosError } from 'axios';

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<
    'loading' | 'success' | 'error' | 'expired'
  >('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const { token } = useParams();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  
  console.log('Token:', token);
  console.log('Email:', email);
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        setStatus('loading');

        const response = await axiosInstance.post(
          `/users/verify-email/?token=${token}${email ? `&email=${email}` : ''}`,
          {},
          { headers: { Accept: 'application/json' } }
        );
        console.log('API response:', response.data); // Debug log

        setStatus('success');
        setTimeout(() => router.push('/login'), 2000);
      } catch (err) {
        const error = err as AxiosError<{ detail?: string }>;
        console.error(
          'Verification error:',
          error.response?.data || error.message
        );

        const errorMsg =
          error.response?.data?.detail?.message ||
          'An error occurred during verification.';

        if (error.response?.status === 400 && errorMsg.includes('Verification token has expired')) {
          setStatus('expired');
          setErrorMessage('The verification link has expired.');
        } else {
          setStatus('error');
          setErrorMessage(errorMsg);
        }
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, router]);

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
              {status === 'loading' && (
                <>
                  <div className="flex justify-center mb-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B4B33]"></div>
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    Verifying Your Email
                  </CardTitle>
                </>
              )}

              {status === 'success' && (
                <>
                  <div className="flex justify-center mb-4">
                    <CheckCircle className="h-16 w-16 text-[#40B86D]" />
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    Email Verified!
                  </CardTitle>
                </>
              )}

              {(status === 'error' || status === 'expired') && (
                <>
                  <div className="flex justify-center mb-4">
                    <XCircle className="h-16 w-16 text-red-500" />
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    {status === 'expired'
                      ? 'Link Expired'
                      : 'Verification Failed'}
                  </CardTitle>
                </>
              )}
            </CardHeader>

            <CardContent>
              {status === 'loading' && (
                <p className="text-center text-gray-600">
                  Please wait while we verify your email address...
                </p>
              )}

              {status === 'success' && (
                <div className="space-y-4">
                  <p className="text-center text-gray-600">
                    Your email has been successfully verified. Redirecting to
                    your account...
                  </p>
                  <Button className="w-full bg-[#1B4B33] hover:bg-[#153D29] text-white">
                    <Link href="/login">Please login</Link>
                  </Button>
                </div>
              )}

              {(status === 'error' || status === 'expired') && (
                <div className="space-y-4">
                  <p className="text-center text-gray-600">{errorMessage}</p>
                  <Button variant="outline" className="w-full">
                    <Link href="/verify-email/resend">
                      Resend Verification Email
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-center">
              <div className="text-sm text-center text-gray-500">
                Need help?{' '}
                <Link
                  href="/contact"
                  className="text-[#40B86D] hover:underline"
                >
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
