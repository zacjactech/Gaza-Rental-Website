"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.password) {
      newErrors.password = t?.auth?.resetPassword?.passwordRequired || 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = t?.auth?.resetPassword?.passwordLength || 'Password must be at least 8 characters long';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t?.auth?.resetPassword?.confirmPasswordRequired || 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t?.auth?.resetPassword?.passwordsDontMatch || 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: t?.auth?.resetPassword?.errorTitle || "Error",
        description: t?.auth?.resetPassword?.fixErrors || "Please fix the errors in the form.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement actual password reset logic here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      
      toast({
        title: t?.auth?.resetPassword?.successTitle || "Success!",
        description: t?.auth?.resetPassword?.successMessage || "Your password has been reset successfully.",
      });
      
      router.push('/login');
    } catch (error) {
      toast({
        title: t?.auth?.resetPassword?.errorTitle || "Error",
        description: t?.auth?.resetPassword?.errorMessage || "Failed to reset password. Please try again.",
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
            {t?.auth?.resetPassword?.title || 'Reset Your Password'}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {t?.auth?.resetPassword?.subtitle || 'Enter your new password below.'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="password">
              {t?.auth?.resetPassword?.newPassword || 'New Password'}
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleInputChange}
                className={`mt-1 pr-10 ${errors.password ? 'border-red-500' : ''}`}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword">
              {t?.auth?.resetPassword?.confirmPassword || 'Confirm New Password'}
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`mt-1 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
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
                  {t?.auth?.resetPassword?.resetting || 'Resetting...'}
                </div>
              ) : (
                t?.auth?.resetPassword?.submitButton || 'Reset Password'
              )}
            </Button>
          </div>

          <div className="text-center">
            <Link 
              href="/login" 
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              {t?.auth?.resetPassword?.backToLogin || 'Back to login'}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 