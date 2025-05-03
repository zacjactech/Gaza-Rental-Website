"use client"

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, CreditCard, Download, Plus, Check, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getTranslation } from '@/utils/translation';

// Mock payment methods data
const paymentMethods = [
  {
    id: 1,
    type: 'card',
    last4: '4242',
    expiry: '12/25',
    brand: 'Visa',
    isPrimary: true
  },
  {
    id: 2,
    type: 'card',
    last4: '1234',
    expiry: '08/26',
    brand: 'Mastercard',
    isPrimary: false
  }
];

// Mock invoices data
const invoices = [
  {
    id: 'INV-001',
    date: '2024-05-01',
    amount: 15000,
    status: 'paid'
  },
  {
    id: 'INV-002',
    date: '2024-04-01',
    amount: 15000,
    status: 'paid'
  },
  {
    id: 'INV-003',
    date: '2024-03-01',
    amount: 15000,
    status: 'paid'
  }
];

export default function BillingPage() {
  const router = useRouter();
  const { language } = useLanguage();
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'sw-TZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          className="mr-4 p-0 h-auto"
          onClick={() => router.push('/dashboard/landlord')}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">
            {getTranslation('dashboard.landlord.billing.title', 'Manage Billing', language)}
          </h1>
          <p className="text-muted-foreground">
            Manage your subscription and payment methods
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Current Plan */}
          <Card>
            <CardHeader>
              <CardTitle>{getTranslation('dashboard.landlord.billing.currentPlan', 'Current Plan', language)}</CardTitle>
              <CardDescription>Details about your current subscription</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Standard Plan</h3>
                  <p className="text-sm text-muted-foreground">
                    {getTranslation('dashboard.landlord.billing.planStatus', 'Status: Active', language)}
                  </p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Active
                </Badge>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <p className="text-sm font-medium mb-2">Price</p>
                  <p className="text-2xl font-bold">TZS 15,000<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                </div>
                <div className="border rounded-md p-4">
                  <p className="text-sm font-medium mb-2">{getTranslation('dashboard.landlord.billing.nextBilling', 'Next Billing Date', language)}</p>
                  <p className="text-lg font-medium">June 1, 2024</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">{getTranslation('dashboard.landlord.billing.features', 'Features Included', language)}</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Up to 10 property listings</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Featured listings (3/month)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Email & phone support</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Analytics dashboard</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button>{getTranslation('dashboard.landlord.billing.upgradeButton', 'Upgrade Plan', language)}</Button>
            </CardFooter>
          </Card>
          
          {/* Payment Methods */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{getTranslation('dashboard.landlord.billing.paymentMethods', 'Payment Methods', language)}</CardTitle>
                <CardDescription>Manage your payment methods</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                {getTranslation('dashboard.landlord.billing.addPayment', 'Add Payment Method', language)}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center">
                      <div className="mr-4 bg-primary/10 p-2 rounded-full">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {method.brand} •••• {method.last4}
                          {method.isPrimary && (
                            <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20">
                              Primary
                            </Badge>
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {!method.isPrimary && (
                        <Button variant="outline" size="sm">
                          {getTranslation('dashboard.landlord.billing.makePrimary', 'Make Primary', language)}
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                        {getTranslation('dashboard.landlord.billing.remove', 'Remove', language)}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Invoices */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{getTranslation('dashboard.landlord.billing.invoices', 'Invoices', language)}</CardTitle>
                <CardDescription>Your billing history</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                {getTranslation('dashboard.landlord.billing.viewInvoices', 'View All Invoices', language)}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Invoice</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y divide-border">
                    {invoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{invoice.id}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{formatDate(invoice.date)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">TZS {invoice.amount.toLocaleString()}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <Badge variant={invoice.status === 'paid' ? 'outline' : 'secondary'} className={invoice.status === 'paid' ? 'bg-green-50 text-green-700 border-green-200' : ''}>
                            {invoice.status === 'paid' ? 'Paid' : 'Pending'}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            {getTranslation('dashboard.landlord.billing.downloadInvoice', 'Download', language)}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          {/* Help Card */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>Contact our billing support team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Billing Questions</p>
                  <p className="text-sm text-muted-foreground">Contact us if you have any questions about your billing or subscription.</p>
                </div>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 