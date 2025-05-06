"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar, 
  Clock, 
  Home, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Star, 
  User 
} from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';

// Mock data for applications
const mockApplications = [
  {
    id: 1,
    property: {
      id: 1,
      title: 'Modern Apartment in Mikocheni',
      price: 250000,
      currency: 'TZS',
      period: 'monthly',
      image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg',
      location: 'Mikocheni',
      bedrooms: 2,
      bathrooms: 1,
    },
    status: 'pending',
    appliedDate: '2024-03-15',
    landlord: {
      name: 'John Doe',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe',
    },
  },
  {
    id: 2,
    property: {
      id: 2,
      title: 'Luxury Villa in Masaki',
      price: 450000,
      currency: 'TZS',
      period: 'monthly',
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
      location: 'Masaki',
      bedrooms: 3,
      bathrooms: 2,
    },
    status: 'approved',
    appliedDate: '2024-03-10',
    landlord: {
      name: 'Jane Smith',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith',
    },
  },
];

// Mock data for saved properties
const mockSavedProperties = [
  {
    id: 3,
    title: 'Cozy Studio in Oysterbay',
    price: 180000,
    currency: 'TZS',
    period: 'monthly',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    location: 'Oysterbay',
    bedrooms: 1,
    bathrooms: 1,
    available: true,
  },
  {
    id: 4,
    title: 'Spacious Family Home in Kinondoni',
    price: 350000,
    currency: 'TZS',
    period: 'monthly',
    image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg',
    location: 'Kinondoni',
    bedrooms: 4,
    bathrooms: 2,
    available: true,
  },
];

// Mock data for messages
const mockMessages = [
  {
    id: 1,
    sender: {
      name: 'John Doe',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe',
      type: 'landlord',
    },
    property: {
      title: 'Modern Apartment in Mikocheni',
      id: 1,
    },
    message: 'Thank you for your application. I would like to schedule a viewing.',
    timestamp: '2024-03-16T10:30:00',
    unread: true,
  },
  {
    id: 2,
    sender: {
      name: 'Jane Smith',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith',
      type: 'landlord',
    },
    property: {
      title: 'Luxury Villa in Masaki',
      id: 2,
    },
    message: 'Your application has been approved! When would you like to move in?',
    timestamp: '2024-03-11T14:20:00',
    unread: false,
  },
];

export default function TenantDashboardPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState(mockApplications);
  const [savedProperties, setSavedProperties] = useState(mockSavedProperties);
  const [messages, setMessages] = useState(mockMessages);

  // Calculate statistics
  const stats = {
    totalApplications: applications.length,
    pendingApplications: applications.filter(app => app.status === 'pending').length,
    approvedApplications: applications.filter(app => app.status === 'approved').length,
    savedProperties: savedProperties.length,
    unreadMessages: messages.filter(msg => msg.unread).length,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'en' ? 'en-US' : 'sw-TZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString(language === 'en' ? 'en-US' : 'sw-TZ', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t?.dashboard?.stats?.totalApplications || 'Total Applications'}
            </CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplications}</div>
            <p className="text-xs text-muted-foreground">
              {t?.dashboard?.stats?.applications || 'Applications'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t?.dashboard?.stats?.pendingApplications || 'Pending Applications'}
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApplications}</div>
            <p className="text-xs text-muted-foreground">
              {t?.dashboard?.stats?.pending || 'Pending'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t?.dashboard?.stats?.savedProperties || 'Saved Properties'}
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.savedProperties}</div>
            <p className="text-xs text-muted-foreground">
              {t?.dashboard?.stats?.saved || 'Saved'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t?.dashboard?.stats?.unreadMessages || 'Unread Messages'}
            </CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.unreadMessages}</div>
            <p className="text-xs text-muted-foreground">
              {t?.dashboard?.stats?.unread || 'Unread'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="applications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="applications" onClick={() => setActiveTab('applications')}>
            {t?.dashboard?.tabs?.applications || 'Applications'}
          </TabsTrigger>
          <TabsTrigger value="saved" onClick={() => setActiveTab('saved')}>
            {t?.dashboard?.tabs?.saved || 'Saved Properties'}
          </TabsTrigger>
          <TabsTrigger value="messages" onClick={() => setActiveTab('messages')}>
            {t?.dashboard?.tabs?.messages || 'Messages'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-4">
          {applications.map((application) => (
            <Card key={application.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3">
                    <img
                      src={application.property.image}
                      alt={application.property.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-full md:w-2/3 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{application.property.title}</h3>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {application.property.location}
                        </p>
                      </div>
                      <Badge variant={application.status === 'approved' ? 'default' : 'secondary'}>
                        {application.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {t?.dashboard?.application?.applied || 'Applied on'}
                        </p>
                        <p className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(application.appliedDate)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {t?.dashboard?.application?.landlord || 'Landlord'}
                        </p>
                        <div className="flex items-center">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarImage src={application.landlord.avatar} />
                            <AvatarFallback>{application.landlord.name[0]}</AvatarFallback>
                          </Avatar>
                          <span>{application.landlord.name}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        {t?.dashboard?.actions?.viewDetails || 'View Details'}
                      </Button>
                      <Button variant="outline" size="sm">
                        {t?.dashboard?.actions?.message || 'Message'}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id} className={message.unread ? 'border-primary' : ''}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={message.sender.avatar} />
                    <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{message.sender.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {message.property.title}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                    <p className="text-sm">{message.message}</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        {t?.dashboard?.actions?.reply || 'Reply'}
                      </Button>
                      <Button variant="outline" size="sm">
                        {t?.dashboard?.actions?.viewProperty || 'View Property'}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
} 