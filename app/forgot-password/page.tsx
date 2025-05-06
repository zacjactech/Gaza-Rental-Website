"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

export default function ForgotPasswordPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError(t?.auth?.forgotPassword?.emailRequired || 'Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(t?.auth?.forgotPassword?.invalidEmail || 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement actual password reset request logic here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      
      toast({
        title: t?.auth?.forgotPassword?.successTitle || "Success!",
        description: t?.auth?.forgotPassword?.successMessage || "Password reset instructions have been sent to your email.",
      });
      
      setEmail('');
    } catch (error) {
      toast({
        title: t?.auth?.forgotPassword?.errorTitle || "Error",
        description: t?.auth?.forgotPassword?.errorMessage || "Failed to send reset instructions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/30 bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8" 
         style={{ backgroundImage: "url('/images/gaza-background.jpg')", backgroundBlendMode: "overlay" }}>
      <div className="max-w-md w-full space-y-8 bg-white/90 dark:bg-gray-800/95 backdrop-blur-sm p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t?.auth?.forgotPassword?.title || 'Reset Your Password'}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {t?.auth?.forgotPassword?.subtitle || 'Enter your email address and we\'ll send you instructions to reset your password.'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">
              {t?.auth?.forgotPassword?.emailLabel || 'Email address'}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 ${error ? 'border-red-500' : ''}`}
            />
            {error && (
              <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  {t?.auth?.forgotPassword?.sending || 'Sending...'}
                </div>
              ) : (
                t?.auth?.forgotPassword?.submitButton || 'Send Reset Instructions'
              )}
            </Button>
          </div>

          <div className="text-center">
            <Link 
              href="/login" 
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              {t?.auth?.forgotPassword?.backToLogin || 'Back to login'}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 