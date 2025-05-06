"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { auth } from '@/lib/api';
import { motion } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language];
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errorMessages, setErrorMessages] = useState({
    email: '',
    password: '',
    general: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user types
    if (errorMessages[name as keyof typeof errorMessages]) {
      setErrorMessages(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRememberMeChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      rememberMe: checked
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      email: '',
      password: '',
      general: ''
    };

    // Email validation
    if (!formData.email.trim()) {
      errors.email = t?.validation?.emailRequired || 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = t?.validation?.emailInvalid || 'Email is invalid';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      errors.password = t?.validation?.passwordRequired || 'Password is required';
      isValid = false;
    }

    setErrorMessages(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrorMessages({ email: '', password: '', general: '' });

    try {
      const response = await auth.login(formData.email, formData.password);
      
      if (response.user) {
        toast({
          title: t?.auth?.login?.successTitle || "Success!",
          description: t?.auth?.login?.successMessage || "You have successfully logged in.",
        });
        
        // Store remember me preference if needed
        if (formData.rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        
        router.push('/dashboard');
      }
    } catch (error: any) {
      setErrorMessages({
        ...errorMessages,
        general: error.message || t?.auth?.login?.errorMessage || "Invalid email or password."
      });
      
      toast({
        title: t?.auth?.login?.errorTitle || "Login Failed",
        description: error.message || t?.auth?.login?.errorMessage || "Invalid email or password.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/30 bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8" 
      style={{ backgroundImage: "url('/images/gaza-background.jpg')", backgroundBlendMode: "overlay" }}
    >
      <div className="max-w-md w-full space-y-8 bg-white/90 dark:bg-gray-800/95 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t?.auth?.login?.title || 'Welcome back'}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {t?.auth?.login?.subtitle || 'Please sign in to your account'}
          </p>
        </motion.div>

        {errorMessages.general && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm"
          >
            {errorMessages.general}
          </motion.div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t?.auth?.login?.email || 'Email address'}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className={`mt-1 ${errorMessages.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                placeholder="you@example.com"
              />
              {errorMessages.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errorMessages.email}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t?.auth?.login?.password || 'Password'}
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`pr-10 ${errorMessages.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errorMessages.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errorMessages.password}</p>
              )}
            </motion.div>

            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember-me" 
                  checked={formData.rememberMe} 
                  onCheckedChange={handleRememberMeChange}
                />
                <Label htmlFor="remember-me" className="text-sm font-medium">
                  {t?.auth?.login?.rememberMe || 'Remember me'}
                </Label>
              </div>

              <Link
                href="/forgot-password"
                className="text-sm font-medium text-primary hover:text-primary/90 transition-colors"
              >
                {t?.auth?.login?.forgotPassword || 'Forgot your password?'}
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t?.auth?.login?.signingIn || 'Signing in...'}
                </span>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  {t?.auth?.login?.signIn || 'Sign in'}
                </>
              )}
            </Button>

            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              {t?.auth?.login?.noAccount || "Don't have an account?"}{' '}
              <Link
                href="/register"
                className="font-medium text-primary hover:text-primary/90 transition-colors"
              >
                {t?.auth?.login?.register || 'Register now'}
              </Link>
            </p>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}