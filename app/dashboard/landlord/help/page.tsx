"use client"

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  Search, 
  HelpCircle, 
  MessageSquare, 
  BookOpen, 
  Phone, 
  Mail,
  FileText,
  ChevronRight,
  User,
  Home,
  CreditCard,
  Calendar,
  Settings
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';

// Mock FAQs
const faqs = {
  account: [
    {
      question: "How do I change my account information?",
      answer: "You can update your account information from your profile settings. Go to the Settings tab in your dashboard and select 'Edit Profile'."
    },
    {
      question: "What happens if I forgot my password?",
      answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page. We'll send you an email with instructions to create a new password."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "To cancel your subscription, go to the Billing section of your dashboard and click 'Manage Subscription'. From there, you can select 'Cancel Subscription'."
    }
  ],
  properties: [
    {
      question: "How do I add a new property listing?",
      answer: "To add a new property, click on the 'Add New Property' button on your dashboard. Fill in the required details, upload photos, and submit for review."
    },
    {
      question: "How long does it take for my property to be approved?",
      answer: "Property listings are usually reviewed within 24-48 hours. Once approved, they will be visible to potential tenants."
    },
    {
      question: "How many photos can I upload for my property?",
      answer: "You can upload up to 15 photos per property. We recommend using high-quality images that showcase the best features of your property."
    }
  ],
  payments: [
    {
      question: "How do I add a payment method?",
      answer: "Go to the Billing section in your dashboard and click 'Add Payment Method'. You can add credit/debit cards or mobile money accounts."
    },
    {
      question: "When will I receive payments from my tenants?",
      answer: "Payments are processed within 2-3 business days after a tenant makes a payment. Funds will be transferred to your registered payment method."
    },
    {
      question: "Are there any fees for using GazaRenter?",
      answer: "GazaRenter charges a 5% service fee on each successful transaction. This covers payment processing, tenant verification, and platform maintenance."
    }
  ],
  bookings: [
    {
      question: "How do I approve or reject a booking request?",
      answer: "When you receive a booking request, you'll get a notification. Go to the Requests tab in your dashboard to approve or reject the request."
    },
    {
      question: "Can I set up automatic booking approval?",
      answer: "Yes, you can enable automatic approval in your property settings. This will automatically accept booking requests that meet your criteria."
    },
    {
      question: "How do I communicate with potential tenants?",
      answer: "You can use the built-in messaging system in your dashboard to communicate with potential tenants. This helps keep all communication in one place."
    }
  ],
  technical: [
    {
      question: "What browsers are supported by GazaRenter?",
      answer: "GazaRenter works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience."
    },
    {
      question: "How do I report a technical issue?",
      answer: "If you encounter any technical issues, please contact our support team through the 'Submit a Ticket' feature in the Help Center or email us at support@gazarenter.com."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take security seriously. All data is encrypted and stored securely. We never share your personal information with third parties without your consent."
    }
  ]
};

// Guides and resources
const guides = [
  {
    title: "Complete Landlord Guide",
    description: "Everything you need to know about managing your properties on GazaRenter",
    icon: BookOpen
  },
  {
    title: "Photo Tips for Listings",
    description: "How to take great photos that will attract more tenants",
    icon: FileText
  },
  {
    title: "Setting the Right Price",
    description: "Tips for pricing your property competitively in the current market",
    icon: CreditCard
  },
  {
    title: "Tenant Screening Guide",
    description: "How to effectively screen potential tenants",
    icon: User
  }
];

export default function HelpCenterPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would search through help content
    console.log(`Searching for: ${searchQuery}`);
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
            {typeof t.dashboard?.landlord?.help?.title === 'string' ? t.dashboard.landlord.help.title : 'Help Center'}
          </h1>
          <p className="text-muted-foreground">
            Find answers to your questions and get support
          </p>
        </div>
      </div>
      
      {/* Search */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={typeof t.dashboard?.landlord?.help?.search === 'string' ? t.dashboard.landlord.help.search : "Search for help articles..."}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </CardContent>
      </Card>
      
      {/* Quick help links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-primary" />
              {typeof t.dashboard?.landlord?.help?.liveChat === 'string' ? t.dashboard.landlord.help.liveChat : 'Live Chat'}
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground">Chat directly with our support team for immediate assistance</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Start Chat</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileText className="h-5 w-5 mr-2 text-primary" />
              {typeof t.dashboard?.landlord?.help?.ticket === 'string' ? t.dashboard.landlord.help.ticket : 'Submit a Ticket'}
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground">Submit a support ticket for complex issues that need investigation</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Create Ticket</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Phone className="h-5 w-5 mr-2 text-primary" />
              {typeof t.dashboard?.landlord?.help?.callUs === 'string' ? t.dashboard.landlord.help.callUs : 'Call Us'}
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground">Speak directly with our support team</p>
            <p className="font-medium mt-1">+255 654051913</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <a href="tel:+255654051913">Call Now</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* FAQs */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{typeof t.dashboard?.landlord?.help?.faqs === 'string' ? t.dashboard.landlord.help.faqs : 'Frequently Asked Questions'}</CardTitle>
          <CardDescription>Find quick answers to common questions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="account">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
              <TabsTrigger value="account" className="text-xs">
                <User className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">{t.dashboard?.landlord?.help?.faqTopics?.account || 'Account & Billing'}</span>
                <span className="inline md:hidden">Account</span>
              </TabsTrigger>
              <TabsTrigger value="properties" className="text-xs">
                <Home className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">{t.dashboard?.landlord?.help?.faqTopics?.properties || 'Managing Properties'}</span>
                <span className="inline md:hidden">Properties</span>
              </TabsTrigger>
              <TabsTrigger value="payments" className="text-xs">
                <CreditCard className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">{t.dashboard?.landlord?.help?.faqTopics?.payments || 'Payments & Finance'}</span>
                <span className="inline md:hidden">Payments</span>
              </TabsTrigger>
              <TabsTrigger value="bookings" className="text-xs">
                <Calendar className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">{t.dashboard?.landlord?.help?.faqTopics?.bookings || 'Bookings & Requests'}</span>
                <span className="inline md:hidden">Bookings</span>
              </TabsTrigger>
              <TabsTrigger value="technical" className="text-xs">
                <Settings className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">{t.dashboard?.landlord?.help?.faqTopics?.technical || 'Technical Issues'}</span>
                <span className="inline md:hidden">Technical</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="account">
              <Accordion type="single" collapsible className="w-full">
                {faqs.account.map((faq, index) => (
                  <AccordionItem key={index} value={`account-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            
            <TabsContent value="properties">
              <Accordion type="single" collapsible className="w-full">
                {faqs.properties.map((faq, index) => (
                  <AccordionItem key={index} value={`properties-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            
            <TabsContent value="payments">
              <Accordion type="single" collapsible className="w-full">
                {faqs.payments.map((faq, index) => (
                  <AccordionItem key={index} value={`payments-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            
            <TabsContent value="bookings">
              <Accordion type="single" collapsible className="w-full">
                {faqs.bookings.map((faq, index) => (
                  <AccordionItem key={index} value={`bookings-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            
            <TabsContent value="technical">
              <Accordion type="single" collapsible className="w-full">
                {faqs.technical.map((faq, index) => (
                  <AccordionItem key={index} value={`technical-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Guides and Resources */}
      <Card>
        <CardHeader>
          <CardTitle>{t.dashboard?.landlord?.help?.guides || 'Guides and Tutorials'}</CardTitle>
          <CardDescription>Learn how to get the most out of GazaRenter</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guides.map((guide, index) => (
              <div key={index} className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <guide.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{guide.title}</h3>
                    <p className="text-sm text-muted-foreground">{guide.description}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center justify-between w-full">
            <p className="text-sm text-muted-foreground">Need more help?</p>
            <Button variant="link" className="p-0" asChild>
              <Link href="/contact">Contact our support team</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 