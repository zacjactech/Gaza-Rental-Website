"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, Check, ChevronDown, Filter, Search, X, Eye, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock applications data
const mockApplications = [
  {
    id: 1,
    tenant: {
      id: 101,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+255 123 456 789",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    property: {
      id: 1,
      title: "Modern Apartment in Dar es Salaam",
      location: "Mikocheni, Dar es Salaam",
      price: 450000,
      image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg"
    },
    status: "pending",
    submittedDate: "2025-05-01",
    moveinDate: "2025-06-01",
    message: "I'm very interested in renting this apartment for 1 year. I'm a software engineer working at a tech company in Dar es Salaam.",
    documents: ["ID Verification", "Employment Letter", "Previous Landlord Reference"]
  },
  {
    id: 2,
    tenant: {
      id: 102,
      name: "Maria Rodriguez",
      email: "maria.rodriguez@example.com",
      phone: "+255 987 654 321",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    property: {
      id: 2,
      title: "Spacious Villa with Garden",
      location: "Masaki, Dar es Salaam",
      price: 850000,
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
    },
    status: "approved",
    submittedDate: "2025-04-28",
    moveinDate: "2025-05-15",
    message: "My family of four would love to rent this villa. I work as a diplomat and need a comfortable space for my family.",
    documents: ["ID Verification", "Employment Letter", "Bank Statement"]
  },
  {
    id: 3,
    tenant: {
      id: 103,
      name: "David Wilson",
      email: "david.wilson@example.com",
      phone: "+255 111 222 333",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    property: {
      id: 1,
      title: "Modern Apartment in Dar es Salaam",
      location: "Mikocheni, Dar es Salaam",
      price: 450000,
      image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg"
    },
    status: "rejected",
    submittedDate: "2025-04-25",
    moveinDate: "2025-05-10",
    message: "I'm looking for a long-term rental for at least 2 years. I work remotely and need a quiet place.",
    documents: ["ID Verification"]
  },
  {
    id: 4,
    tenant: {
      id: 104,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      phone: "+255 444 555 666",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    property: {
      id: 3,
      title: "Cozy Studio Apartment",
      location: "Upanga, Dar es Salaam",
      price: 320000,
      image: "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg"
    },
    status: "pending",
    submittedDate: "2025-04-30",
    moveinDate: "2025-05-20",
    message: "I'm a student looking for accommodation near my university. This place looks perfect for me.",
    documents: ["ID Verification", "Student ID", "Guarantor Letter"]
  }
];

export default function LandlordApplicationsPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];
  
  const [applications, setApplications] = useState(mockApplications);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentTab, setCurrentTab] = useState("all");
  
  // Process applications based on filters and search
  const filteredApplications = applications.filter(app => {
    // Status filter
    if (statusFilter !== "all" && app.status !== statusFilter) return false;
    
    // Current tab filter
    if (currentTab !== "all" && app.status !== currentTab) return false;
    
    // Search query
    const searchLower = searchQuery.toLowerCase();
    return (
      app.tenant.name.toLowerCase().includes(searchLower) ||
      app.property.title.toLowerCase().includes(searchLower) ||
      app.property.location.toLowerCase().includes(searchLower)
    );
  });
  
  // Sort applications
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
      case "oldest":
        return new Date(a.submittedDate).getTime() - new Date(b.submittedDate).getTime();
      case "price_high":
        return b.property.price - a.property.price;
      case "price_low":
        return a.property.price - b.property.price;
      default:
        return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
    }
  });
  
  // Count applications by status
  const counts = {
    all: applications.length,
    pending: applications.filter(app => app.status === "pending").length,
    approved: applications.filter(app => app.status === "approved").length,
    rejected: applications.filter(app => app.status === "rejected").length
  };
  
  // Handle application status change
  const updateApplicationStatus = (id: number, status: string) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id ? { ...app, status } : app
      )
    );
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' } as Intl.DateTimeFormatOptions;
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Rental Applications</h1>
          <p className="text-muted-foreground">
            Manage and respond to tenant applications for your properties
          </p>
        </div>
      </div>
      
      <div className="flex flex-col space-y-5">
        {/* Filters and search */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price_high">Price (High to Low)</SelectItem>
                <SelectItem value="price_low">Price (Low to High)</SelectItem>
              </SelectContent>
            </Select>
            
            {(searchQuery || statusFilter !== "all") && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="all">
              All
              <Badge variant="secondary" className="ml-2">{counts.all}</Badge>
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending
              <Badge variant="secondary" className="ml-2">{counts.pending}</Badge>
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved
              <Badge variant="secondary" className="ml-2">{counts.approved}</Badge>
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected
              <Badge variant="secondary" className="ml-2">{counts.rejected}</Badge>
            </TabsTrigger>
          </TabsList>
          
          {/* Tab content - same for all tabs, filtering done via state */}
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-4">
              {sortedApplications.length === 0 ? (
                <div className="text-center p-8 border rounded-lg bg-gray-50 dark:bg-gray-900">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                      <Filter className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">No applications found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-4">
                    {searchQuery || statusFilter !== "all" 
                      ? "Try adjusting your search or filters to find what you're looking for." 
                      : "You don't have any applications yet."}
                  </p>
                  {(searchQuery || statusFilter !== "all") && (
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("");
                        setStatusFilter("all");
                      }}
                    >
                      Clear filters
                    </Button>
                  )}
                </div>
              ) : (
                sortedApplications.map((application) => (
                  <Card key={application.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10 border">
                            <AvatarImage src={application.tenant.avatar} alt={application.tenant.name} />
                            <AvatarFallback>{application.tenant.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg mb-1">{application.tenant.name}</CardTitle>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>Applied: {formatDate(application.submittedDate)}</span>
                              </div>
                              <div className="hidden sm:block text-muted-foreground">•</div>
                              <div>Move-in: {formatDate(application.moveinDate)}</div>
                            </div>
                          </div>
                        </div>
                        <Badge 
                          variant={
                            application.status === "approved" ? "success" : 
                            application.status === "rejected" ? "destructive" : 
                            "outline"
                          }
                        >
                          {application.status === "approved" ? "Approved" : 
                           application.status === "rejected" ? "Rejected" : 
                           "Pending Review"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/3 relative rounded-md overflow-hidden h-32">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={application.property.image} 
                            alt={application.property.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="md:w-2/3 space-y-3">
                          <div>
                            <h3 className="font-medium">{application.property.title}</h3>
                            <p className="text-sm text-muted-foreground">{application.property.location}</p>
                            <p className="text-sm font-medium">{application.property.price.toLocaleString()} TZS/month</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Message from applicant:</p>
                            <p className="text-sm">{application.message}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Documents provided:</p>
                            <div className="flex flex-wrap gap-2">
                              {application.documents.map((doc, index) => (
                                <Badge key={index} variant="secondary">{doc}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-between">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                      </div>
                      
                      {application.status === "pending" ? (
                        <div className="flex gap-2">
                          <Button 
                            variant="default" 
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => updateApplicationStatus(application.id, "approved")}
                          >
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                            onClick={() => updateApplicationStatus(application.id, "rejected")}
                          >
                            <ThumbsDown className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              Change Status <ChevronDown className="h-4 w-4 ml-1" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => updateApplicationStatus(application.id, "pending")}>
                              <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2" />
                              Mark as Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateApplicationStatus(application.id, "approved")}>
                              <span className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                              Mark as Approved
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateApplicationStatus(application.id, "rejected")}>
                              <span className="h-2 w-2 rounded-full bg-red-500 mr-2" />
                              Mark as Rejected
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          
          {/* These are just placeholders since we filter using state in the "all" tab */}
          <TabsContent value="pending" className="mt-6">
            <div className="grid gap-4">
              {/* Content dynamically filtered via state */}
            </div>
          </TabsContent>
          
          <TabsContent value="approved" className="mt-6">
            <div className="grid gap-4">
              {/* Content dynamically filtered via state */}
            </div>
          </TabsContent>
          
          <TabsContent value="rejected" className="mt-6">
            <div className="grid gap-4">
              {/* Content dynamically filtered via state */}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 