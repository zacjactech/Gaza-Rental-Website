"use client";

import { useState } from "react";
import Link from "next/link";
import { PlusCircle, Search, Filter, MoreHorizontal, Edit, Trash, Eye, CheckCircle, Clock, XCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock properties data
const mockProperties = [
  {
    id: 1,
    title: "Modern Apartment in Dar es Salaam",
    location: "Mikocheni, Dar es Salaam",
    price: 450000,
    status: "active",
    applications: 3,
    views: 124,
    createdAt: "2025-05-01",
    bedrooms: 2,
    bathrooms: 1,
    image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg"
  },
  {
    id: 2,
    title: "Spacious Villa with Garden",
    location: "Masaki, Dar es Salaam",
    price: 850000,
    status: "active",
    applications: 5,
    views: 76,
    createdAt: "2025-04-29",
    bedrooms: 3,
    bathrooms: 2,
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
  },
  {
    id: 3,
    title: "Cozy Studio Apartment",
    location: "Upanga, Dar es Salaam",
    price: 320000,
    status: "pending",
    applications: 0,
    views: 28,
    createdAt: "2025-04-28",
    bedrooms: 1,
    bathrooms: 1,
    image: "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg"
  },
  {
    id: 4,
    title: "Family Home with Pool",
    location: "Oyster Bay, Dar es Salaam",
    price: 750000,
    status: "inactive",
    applications: 0,
    views: 0,
    createdAt: "2025-04-15",
    bedrooms: 4,
    bathrooms: 2,
    image: "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg"
  },
  {
    id: 5,
    title: "Luxury Penthouse",
    location: "Masaki, Dar es Salaam",
    price: 1200000,
    status: "active",
    applications: 7,
    views: 213,
    createdAt: "2025-03-30",
    bedrooms: 3,
    bathrooms: 3,
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg"
  }
];

export default function PropertiesPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [properties, setProperties] = useState(mockProperties);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || property.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "pending":
        return "secondary";
      case "inactive":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case "pending":
        return <Clock className="h-4 w-4 mr-1" />;
      case "inactive":
        return <XCircle className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  const handleDeleteProperty = (id: number) => {
    setProperties(properties.filter(property => property.id !== id));
  };

  return (
    <div className="py-6 lg:py-8 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="font-bold tracking-tight">My Properties</h1>
          <p className="text-muted-foreground text-sm">Manage and view your property listings</p>
        </div>
        <Button className="mt-4 md:mt-0" asChild>
          <Link href="/dashboard/landlord/properties/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Property
          </Link>
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Property Listings</CardTitle>
          <CardDescription>
            You have {properties.length} properties in total, with {properties.filter(p => p.status === "active").length} active listings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search properties..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead className="hidden md:table-cell">Location</TableHead>
                  <TableHead className="hidden md:table-cell">Price (TZS)</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Applications</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProperties.length > 0 ? (
                  filteredProperties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-md overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={property.image}
                              alt={property.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{property.title}</div>
                            <div className="text-xs text-muted-foreground md:hidden">
                              {property.location} • {property.price.toLocaleString()} TZS/month
                            </div>
                            <div className="md:hidden flex items-center mt-1">
                              <Badge variant={getStatusBadgeVariant(property.status)} className="flex items-center text-xs py-0 px-1.5">
                                {getStatusIcon(property.status)}
                                {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{property.location}</TableCell>
                      <TableCell className="hidden md:table-cell">{property.price.toLocaleString()}/month</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant={getStatusBadgeVariant(property.status)} className="flex items-center w-fit">
                          {getStatusIcon(property.status)}
                          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{property.applications}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/properties/${property.id}`} className="flex items-center">
                                <Eye className="h-4 w-4 mr-2" />
                                View Property
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/landlord/properties/${property.id}/edit`} className="flex items-center">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteProperty(property.id)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-muted-foreground mb-2">No properties found</p>
                        <Button variant="outline" asChild className="mt-2">
                          <Link href="/dashboard/landlord/properties/new">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Your First Property
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 