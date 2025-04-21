"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Home, User, Building2, LogIn } from 'lucide-react';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = (e: React.FormEvent, userType: string) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      // Redirect based on user type
      window.location.href = userType === 'tenant' ? '/tenant/dashboard' : '/landlord/dashboard';
    }, 1500);
  };
  
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left section (image) for desktop */}
        <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
          <div className="h-full w-full bg-black bg-opacity-40 flex items-center justify-center p-12">
            <div className="text-white max-w-md">
              <div className="flex items-center mb-6">
                <Home className="h-8 w-8 text-primary mr-2" />
                <h1 className="text-3xl font-bold">GazaRenter</h1>
              </div>
              <h2 className="text-2xl font-semibold mb-4">Find your perfect home in Tanzania</h2>
              <p className="mb-6 text-gray-200">Access thousands of verified rental properties across Tanzania. Whether you're a tenant looking for your next home or a landlord wanting to list your property, GazaRenter has you covered.</p>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <div className="p-2 bg-primary/20 rounded-full">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold">For Tenants</h3>
                    <p className="text-sm text-gray-200">Find and book verified properties</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="p-2 bg-primary/20 rounded-full">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold">For Landlords</h3>
                    <p className="text-sm text-gray-200">List and manage your properties</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right section (login form) */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-gray-50 dark:bg-gray-900">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-2">
                <LogIn className="h-6 w-6 text-primary mr-2" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Sign in to your account to continue</p>
            </div>
            
            <Tabs defaultValue="tenant" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="tenant" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Tenant
                </TabsTrigger>
                <TabsTrigger value="landlord" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Landlord
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="tenant">
                <form onSubmit={(e) => handleLogin(e, 'tenant')}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="tenant-email">Email</Label>
                      <Input id="tenant-email" type="email" placeholder="name@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="tenant-password">Password</Label>
                        <Link 
                          href="/forgot-password" 
                          className="text-sm text-primary hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Input id="tenant-password" type="password" required />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="landlord">
                <form onSubmit={(e) => handleLogin(e, 'landlord')}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="landlord-email">Email</Label>
                      <Input id="landlord-email" type="email" placeholder="name@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="landlord-password">Password</Label>
                        <Link 
                          href="/forgot-password" 
                          className="text-sm text-primary hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Input id="landlord-password" type="password" required />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link href="/signup" className="text-primary hover:underline">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}