"use client"

import { useState, useEffect } from "react"
import { 
  Home, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  DollarSign,
  Calendar,
  Check,
  AlertCircle,
  PlusCircle,
  Cog,
  CreditCard,
  LifeBuoy
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { translations } from "@/translations"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { getTranslation } from "@/utils/translation"

// Mock data
const properties = [
  {
    id: 1,
    title: "Modern Apartment in Dar es Salaam",
    location: "Mikocheni, Dar es Salaam",
    price: 450000,
    status: "active",
    applications: 3,
    image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg"
  },
  {
    id: 2,
    title: "Spacious Villa with Garden",
    location: "Masaki, Dar es Salaam",
    price: 850000,
    status: "active",
    applications: 5,
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
  },
  {
    id: 3,
    title: "Cozy Studio Apartment",
    location: "Upanga, Dar es Salaam",
    price: 320000,
    status: "inactive",
    applications: 0,
    image: "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg"
  }
]

const recentApplications = [
  {
    id: 101,
    tenant: "John Doe",
    property: "Modern Apartment in Dar es Salaam",
    date: "2025-05-01",
    status: "pending",
    image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg"
  },
  {
    id: 102,
    tenant: "Mary Smith",
    property: "Spacious Villa with Garden",
    date: "2025-04-29",
    status: "approved",
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
  },
  {
    id: 103,
    tenant: "James Wilson",
    property: "Spacious Villa with Garden",
    date: "2025-04-28",
    status: "rejected",
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
  }
]

const messages = [
  {
    id: 201,
    from: "John Doe",
    content: "I'm interested in your property. Is it still available?",
    date: "2025-05-01",
    isRead: false
  },
  {
    id: 202,
    from: "Maria Rodriguez",
    content: "When can I schedule a viewing of the apartment?",
    date: "2025-04-30",
    isRead: true
  }
]

interface StatCardProps {
  title: string
  value: string | number
  description: string
  icon: React.ReactNode
  trend?: "up" | "down" | "neutral"
  percentage?: number
}

const StatCard = ({ title, value, description, icon, trend, percentage }: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && percentage && (
          <div className="flex items-center mt-2">
            <span className={`text-xs ${trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-500"}`}>
              {trend === "up" ? "+" : trend === "down" ? "-" : ""}
              {percentage}%
            </span>
            <TrendingUp className={`h-3 w-3 ml-1 ${trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-500"}`} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function LandlordDashboardPage() {
  const { language } = useLanguage()
  const router = useRouter()
  const [activeProperties, setActiveProperties] = useState(0)
  const [inactiveProperties, setInactiveProperties] = useState(0)
  const [totalApplications, setTotalApplications] = useState(0)
  const [occupancyRate, setOccupancyRate] = useState(0)
  const [unreadMessages, setUnreadMessages] = useState(0)
  
  useEffect(() => {
    // Calculate stats from mock data
    const active = properties.filter(p => p.status === "active").length
    const inactive = properties.filter(p => p.status === "inactive").length
    const applications = properties.reduce((sum, property) => sum + property.applications, 0)
    const occupancy = active > 0 ? Math.round((active / (active + inactive)) * 100) : 0
    const unread = messages.filter(m => !m.isRead).length
    
    setActiveProperties(active)
    setInactiveProperties(inactive)
    setTotalApplications(applications)
    setOccupancyRate(occupancy)
    setUnreadMessages(unread)
  }, [])

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{getTranslation('dashboard.landlord.title', "Landlord Dashboard", language)}</h1>
          <p className="text-muted-foreground">{getTranslation('dashboard.landlord.welcome', "Manage your properties and view insights.", language)}</p>
        </div>
        <Button className="mt-4 md:mt-0" onClick={() => router.push('/dashboard/landlord/properties/new')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {getTranslation('dashboard.landlord.actions.addProperty', "Add New Property", language)}
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="col-span-2 md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">{getTranslation('dashboard.landlord.billing', "Billing", language)}</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center">
              <div className="mr-2 bg-primary/10 p-2 rounded-full">
                <CreditCard className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Standard Plan</p>
                <p className="text-xs text-muted-foreground">Active until June 1, 2024</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => router.push('/dashboard/landlord/billing')}
            >
              {getTranslation('dashboard.landlord.actions.manageBilling', "Manage Billing", language)}
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="col-span-2 md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">{getTranslation('dashboard.landlord.help', "Help Center", language)}</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center">
              <div className="mr-2 bg-primary/10 p-2 rounded-full">
                <LifeBuoy className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Support Available</p>
                <p className="text-xs text-muted-foreground">24/7 assistance for landlords</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => router.push('/dashboard/landlord/help')}
            >
              {getTranslation('dashboard.landlord.actions.getHelp', "Get Help", language)}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title={getTranslation('dashboard.landlord.properties', "Properties", language)}
          value={activeProperties + inactiveProperties}
          description={`${activeProperties} active, ${inactiveProperties} inactive`}
          icon={<Home className="h-4 w-4" />}
        />
        <StatCard
          title={getTranslation('dashboard.landlord.requests', "Applications", language)}
          value={totalApplications}
          description="Total applications received"
          icon={<Users className="h-4 w-4" />}
          trend="up"
          percentage={12}
        />
        <StatCard
          title={getTranslation('dashboard.landlord.messages', "Messages", language)}
          value={messages.length}
          description={`${unreadMessages} unread messages`}
          icon={<MessageSquare className="h-4 w-4" />}
        />
        <StatCard
          title="Occupancy Rate"
          value={`${occupancyRate}%`}
          description="Of your properties are active"
          icon={<TrendingUp className="h-4 w-4" />}
          trend={occupancyRate > 50 ? "up" : "down"}
          percentage={occupancyRate > 50 ? 5 : 3}
        />
      </div>

      <Tabs defaultValue="properties" className="mb-6">
        <TabsList>
          <TabsTrigger value="properties">{getTranslation('dashboard.landlord.properties', "Properties", language)}</TabsTrigger>
          <TabsTrigger value="applications">{getTranslation('dashboard.landlord.requests', "Applications", language)}</TabsTrigger>
          <TabsTrigger value="messages">{getTranslation('dashboard.landlord.messages', "Messages", language)}</TabsTrigger>
        </TabsList>
        <TabsContent value="properties" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden">
                <div className="relative h-48">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant={property.status === "active" ? "success" : "destructive"}>
                      {property.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white font-medium">{property.price.toLocaleString()} TZS/month</p>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{property.title}</CardTitle>
                  <CardDescription>{property.location}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between items-center">
                    <p className="text-sm">{property.applications} applications</p>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="applications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Review your latest rental applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((application) => (
                  <div key={application.id} className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={application.image} 
                          alt={application.property}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{application.tenant}</p>
                        <p className="text-sm text-muted-foreground">{application.property}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={
                          application.status === "approved" ? "success" : 
                          application.status === "rejected" ? "destructive" : 
                          "outline"
                        }
                      >
                        {application.status}
                      </Badge>
                      <p className="text-sm text-muted-foreground">{application.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="flex justify-center p-4 border-t border-gray-100 dark:border-gray-800">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/dashboard/landlord/applications')}
              >
                View All Applications
              </Button>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="messages" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>Stay in touch with potential tenants</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="flex items-start justify-between border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{message.from}</p>
                        {!message.isRead && (
                          <span className="h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">{message.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground ml-4">{message.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="flex justify-center p-4 border-t border-gray-100 dark:border-gray-800">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/dashboard/landlord/messages')}
              >
                View All Messages
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Property Viewing</p>
                    <p className="text-xs text-muted-foreground">Modern Apartment in Dar es Salaam</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Tomorrow, 2:00 PM</p>
                  <p className="text-xs text-muted-foreground">With: Mary Smith</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Lease Signing</p>
                    <p className="text-xs text-muted-foreground">Spacious Villa with Garden</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">May 7, 10:00 AM</p>
                  <p className="text-xs text-muted-foreground">With: James Wilson</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center gap-2 mb-4">
              <DollarSign className="h-5 w-5 text-primary" />
              1,620,000
              <span className="text-sm font-normal text-muted-foreground">TZS</span>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">Collected</p>
                  <p className="text-sm font-medium text-green-600">1,300,000 TZS</p>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">Pending</p>
                  <p className="text-sm font-medium text-amber-600">320,000 TZS</p>
                </div>
                <Progress value={20} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">Overdue</p>
                  <p className="text-sm font-medium text-red-600">0 TZS</p>
                </div>
                <Progress value={0} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Settings Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold tracking-tight mb-4">Account Management</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile Settings</CardTitle>
              <CardDescription>Manage your account and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Update your profile information, notification preferences, and security settings.
              </p>
              <Button 
                variant="outline" 
                onClick={() => router.push('/dashboard/landlord/settings')}
                className="w-full"
              >
                <Cog className="mr-2 h-4 w-4" />
                Go to Settings
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Billing & Subscription</CardTitle>
              <CardDescription>Manage your payment details</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Review your subscription plan, payment history, and update payment methods.
              </p>
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => router.push('/dashboard/landlord/billing')}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Manage Billing
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Help & Support</CardTitle>
              <CardDescription>Get assistance when you need it</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Access our help documentation, tutorials, and contact support if needed.
              </p>
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => router.push('/dashboard/landlord/help')}
              >
                <LifeBuoy className="mr-2 h-4 w-4" />
                Get Help
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 