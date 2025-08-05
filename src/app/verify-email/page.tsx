'use client';

import { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import axios from 'axios';
import axiosInstance from '../../lib/axiosInstance';
import { ErrorBoundary } from '../../components/ErrorBoundary';

export default function VerifyEmailInstructionsPage() {
  const [email, setEmail] = useState<string>('your-email@example.com');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState<string>('');
  const [resendCount, setResendCount] = useState<number>(0);
  const maxResends = 3;

  useEffect(() => {
    const storedEmail = localStorage.getItem('pendingEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleResend = async () => {
    if (!isValidEmail(email)) {
      setStatus('error');
      setMessage('Please provide a valid email address.');
      return;
    }

    if (resendCount >= maxResends) {
      setStatus('error');
      setMessage(
        'Maximum resend attempts reached. Please try again later or contact support.'
      );
      return;
    }

    try {
      setStatus('loading');
      setMessage('');

      await axiosInstance.put(
        `/resend-email-token/?emailaddress=${encodeURIComponent(email)}`,
        {},
        { headers: { Accept: 'application/json' } }
      );

      setStatus('success');
      setMessage(
        'Verification email sent successfully. Please check your inbox.'
      );
      setResendCount((prev) => prev + 1);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMsg =
          error.response?.data?.detail ||
          'Failed to resend verification email.';
        setStatus('error');
        setMessage(errorMsg);
      } else {
        setStatus('error');
        setMessage('An unexpected error occurred.');
      }
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
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-[#40B86D]/10 p-4">
                  <Mail className="h-10 w-10 text-[#40B86D]" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">
                Check Your Email
              </CardTitle>
              <CardDescription>
                We&apos;ve sent you a verification link to complete your
                registration
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="rounded-lg bg-[#40B86D]/5 p-4 text-sm text-[#1B4B33] border border-[#40B86D]/20">
                <p>
                  We&apos;ve sent a verification email to{' '}
                  <strong>{email}</strong>.
                </p>
                <p className="mt-2">
                  Click the link in the email to verify your account.
                </p>
              </div>

              {status === 'success' && (
                <p className="text-center text-[#40B86D]">{message}</p>
              )}
              {status === 'error' && (
                <p className="text-center text-red-500">{message}</p>
              )}

              <div className="space-y-2">
                <h3 className="font-medium">Didn&apos;t receive an email?</h3>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  <li>Check your spam or junk folder</li>
                  <li>
                    Ensure <strong>{email}</strong> is correct
                  </li>
                  <li>Allow a few minutes for the email to arrive</li>
                </ul>
              </div>

              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={handleResend}
                disabled={status === 'loading' || resendCount >= maxResends}
              >
                {status === 'loading'
                  ? 'Sending...'
                  : 'Resend Verification Email'}
              </Button>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center">
                <Link href="/" className="text-[#40B86D] hover:underline">
                  Back to Home
                </Link>
              </div>
              <div className="text-xs text-center text-gray-400">
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
