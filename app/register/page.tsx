"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion';
import { auth } from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language];
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'tenant',
    phone: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      userType: value
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      agreeToTerms: checked
    }));
    if (errors.agreeToTerms) {
      setErrors(prev => ({ ...prev, agreeToTerms: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.firstName.trim()) {
      newErrors.firstName = t?.validation?.firstNameRequired || 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t?.validation?.lastNameRequired || 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = t?.validation?.emailRequired || 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t?.validation?.emailInvalid || 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = t?.validation?.passwordRequired || 'Password is required';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = t?.validation?.passwordStrength || 
        'Password must be at least 8 characters and include uppercase, lowercase, number and special character';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t?.validation?.confirmPasswordRequired || 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t?.validation?.passwordsNoMatch || 'Passwords do not match';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t?.validation?.phoneRequired || 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone.trim())) {
      newErrors.phone = t?.validation?.phoneInvalid || 'Please enter a valid phone number';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = t?.validation?.termsRequired || 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: t?.auth?.register?.errorTitle || "Form Error",
        description: t?.auth?.register?.validationError || "Please fix the errors in the form.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Prepare data for API
      const registerData = {
        name: `${formData.firstName} ${formData.lastName}`, 
        email: formData.email,
        password: formData.password,
        role: formData.userType as 'landlord' | 'tenant',
        phone: formData.phone,
      };
      
      const response = await auth.register(registerData);
      
      toast({
        title: t?.auth?.register?.successTitle || "Success!",
        description: t?.auth?.register?.successMessage || "Your account has been created successfully.",
      });
      
      router.push('/login');
    } catch (error: any) {
      toast({
        title: t?.auth?.register?.errorTitle || "Registration Failed",
        description: error.message || t?.auth?.register?.errorMessage || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/30 bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8" 
      style={{ backgroundImage: "url('/images/gaza-background.jpg')", backgroundBlendMode: "overlay" }}
    >
      <div className="max-w-2xl w-full space-y-8 bg-white/90 dark:bg-gray-800/95 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <motion.div variants={itemVariants} className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t?.auth?.register?.title || 'Create an Account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {t?.auth?.register?.subtitle || 'Join our community of renters and landlords'}
          </p>
        </motion.div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t?.auth?.register?.firstName || 'First Name'}
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                className={`mt-1 ${errors.firstName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t?.auth?.register?.lastName || 'Last Name'}
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                className={`mt-1 ${errors.lastName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t?.auth?.register?.email || 'Email address'}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className={`mt-1 ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t?.auth?.register?.phone || 'Phone Number'}
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className={`mt-1 ${errors.phone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                placeholder="+255"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t?.auth?.register?.password || 'Password'}
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`pr-10 ${errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
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
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t?.auth?.register?.confirmPassword || 'Confirm Password'}
              </Label>
              <div className="relative mt-1">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`pr-10 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t?.auth?.register?.userType || 'I am a:'}
              </Label>
              <RadioGroup 
                value={formData.userType} 
                onValueChange={handleRadioChange}
                className="flex mt-2 space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tenant" id="tenant" />
                  <Label htmlFor="tenant" className="cursor-pointer">
                    {t?.auth?.register?.tenant || 'Tenant'}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="landlord" id="landlord" />
                  <Label htmlFor="landlord" className="cursor-pointer">
                    {t?.auth?.register?.landlord || 'Landlord'}
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <Checkbox 
                  id="terms" 
                  checked={formData.agreeToTerms}
                  onCheckedChange={handleCheckboxChange}
                  className={errors.agreeToTerms ? "border-red-500" : ""}
                />
              </div>
              <div className="ml-3 text-sm">
                <Label 
                  htmlFor="terms" 
                  className={`font-medium ${errors.agreeToTerms ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}
                >
                  {t?.auth?.register?.agreeToTerms || 'I agree to the '}
                  <Link href="/terms" className="text-primary hover:text-primary/90 hover:underline">
                    {t?.auth?.register?.termsLink || 'Terms of Service'}
                  </Link>
                  {' '}{t?.auth?.register?.andThe || 'and the'}{' '}
                  <Link href="/privacy" className="text-primary hover:text-primary/90 hover:underline">
                    {t?.auth?.register?.privacyLink || 'Privacy Policy'}
                  </Link>
                </Label>
                {errors.agreeToTerms && (
                  <p className="mt-1 text-sm text-red-500">{errors.agreeToTerms}</p>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
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
                  {t?.auth?.register?.creatingAccount || 'Creating account...'}
                </span>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" />
                  {t?.auth?.register?.createAccount || 'Create Account'}
                </>
              )}
            </Button>

            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              {t?.auth?.register?.alreadyHaveAccount || 'Already have an account?'}{' '}
              <Link href="/login" className="font-medium text-primary hover:text-primary/90 hover:underline">
                {t?.auth?.register?.signIn || 'Sign in'}
              </Link>
            </p>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
} 