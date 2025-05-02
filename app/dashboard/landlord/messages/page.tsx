"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowLeft, MessageSquare, Trash, User, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

// Mock messages data
const mockConversations = [
  {
    id: 1,
    user: {
      id: 101,
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    property: "Modern Apartment in Dar es Salaam",
    lastMessage: "I'm interested in viewing the apartment tomorrow. Is it possible to schedule a visit around 4 PM?",
    timestamp: "2025-05-01T14:30:00",
    unread: true
  },
  {
    id: 2,
    user: {
      id: 102,
      name: "Maria Rodriguez",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    property: "Spacious Villa with Garden",
    lastMessage: "Thank you for accepting my application. When can I come to sign the lease agreement?",
    timestamp: "2025-04-30T09:15:00",
    unread: false
  },
  {
    id: 3,
    user: {
      id: 103,
      name: "David Wilson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    property: "Modern Apartment in Dar es Salaam",
    lastMessage: "Is the property still available for rental next month?",
    timestamp: "2025-04-29T16:45:00",
    unread: false
  },
  {
    id: 4,
    user: {
      id: 104,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    property: "Cozy Studio Apartment",
    lastMessage: "I have some questions about the utilities included in the rent. Could you provide more details?",
    timestamp: "2025-04-28T11:20:00",
    unread: true
  },
  {
    id: 5,
    user: {
      id: 105,
      name: "Michael Brown",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    property: "Spacious Villa with Garden",
    lastMessage: "Are pets allowed in the property? I have a small dog.",
    timestamp: "2025-04-27T08:50:00",
    unread: false
  }
];

// Format the timestamp to a readable format
const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffInDays === 1) {
    return 'Yesterday';
  } else if (diffInDays < 7) {
    return date.toLocaleDateString([], { weekday: 'short' });
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
};

export default function LandlordMessagesPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];
  
  const [conversations, setConversations] = useState(mockConversations);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  
  // Filter conversations based on search query
  const filteredConversations = conversations.filter(
    conversation => 
      conversation.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Count unread messages
  const unreadCount = conversations.filter(c => c.unread).length;
  
  // Mark conversation as read
  const markAsRead = (id: number) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === id ? { ...conv, unread: false } : conv
      )
    );
  };
  
  // Delete conversation
  const deleteConversation = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setConversations(prev => prev.filter(conv => conv.id !== id));
    if (selectedConversation === id) {
      setSelectedConversation(null);
    }
  };
  
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground">
            Manage your conversations with potential tenants and applicants
          </p>
        </div>
        {unreadCount > 0 && (
          <Badge variant="default" className="text-sm">
            {unreadCount} unread
          </Badge>
        )}
      </div>
      
      <div className="flex h-[calc(100vh-12rem)] border rounded-lg overflow-hidden">
        {/* Conversations sidebar */}
        <div className="w-full md:w-1/3 lg:w-1/4 border-r">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <div className="overflow-y-auto h-[calc(100%-56px)]">
            {filteredConversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-2 opacity-20" />
                <p className="text-muted-foreground">No conversations found</p>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => {
                    setSelectedConversation(conversation.id);
                    markAsRead(conversation.id);
                  }}
                  className={`p-3 border-b cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                    selectedConversation === conversation.id ? 'bg-gray-50 dark:bg-gray-800' : ''
                  } ${conversation.unread ? 'bg-primary/5' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                      <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium truncate ${conversation.unread ? 'text-primary' : ''}`}>
                          {conversation.user.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatTimestamp(conversation.timestamp)}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mb-1">
                        {conversation.property}
                      </p>
                      <p className="text-xs truncate">
                        {conversation.lastMessage}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        {conversation.unread && (
                          <Badge variant="default" className="h-2 w-2 rounded-full p-0" />
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 ml-auto opacity-0 group-hover:opacity-100 hover:opacity-100"
                          onClick={(e) => deleteConversation(conversation.id, e)}
                        >
                          <Trash className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Conversation detail */}
        <div className="hidden md:flex md:flex-col md:w-2/3 lg:w-3/4 bg-gray-50 dark:bg-gray-900">
          {selectedConversation ? (
            <>
              {/* Selected conversation header */}
              {(() => {
                const conversation = conversations.find(c => c.id === selectedConversation);
                if (!conversation) return null;
                
                return (
                  <>
                    <div className="p-4 border-b bg-white dark:bg-gray-800 flex items-center">
                      <Button variant="ghost" size="icon" className="md:hidden mr-2">
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                        <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{conversation.user.name}</p>
                        <p className="text-xs text-muted-foreground">{conversation.property}</p>
                      </div>
                      <div className="ml-auto flex">
                        <Button variant="ghost" size="sm">
                          View Profile
                        </Button>
                      </div>
                    </div>
                    
                    {/* Message thread placeholder */}
                    <div className="flex-1 p-4 overflow-y-auto">
                      <div className="space-y-4">
                        {/* Tenant message example */}
                        <div className="flex items-start gap-3 max-w-[80%]">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                            <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <Card className="bg-white dark:bg-gray-800">
                              <CardContent className="p-3 text-sm">
                                <p>Hello! I'm interested in your property. Is it still available for rent?</p>
                              </CardContent>
                            </Card>
                            <p className="text-xs text-muted-foreground mt-1 ml-2">
                              {formatTimestamp(new Date(new Date(conversation.timestamp).getTime() - 3600000).toISOString())}
                            </p>
                          </div>
                        </div>
                        
                        {/* Landlord (my) message example */}
                        <div className="flex items-start gap-3 max-w-[80%] ml-auto flex-row-reverse">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>You</AvatarFallback>
                          </Avatar>
                          <div>
                            <Card className="bg-primary text-primary-foreground">
                              <CardContent className="p-3 text-sm">
                                <p>Yes, the property is still available! Would you like to schedule a viewing?</p>
                              </CardContent>
                            </Card>
                            <p className="text-xs text-muted-foreground mt-1 mr-2 text-right">
                              {formatTimestamp(new Date(new Date(conversation.timestamp).getTime() - 1800000).toISOString())}
                            </p>
                          </div>
                        </div>
                        
                        {/* Tenant message */}
                        <div className="flex items-start gap-3 max-w-[80%]">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                            <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <Card className="bg-white dark:bg-gray-800">
                              <CardContent className="p-3 text-sm">
                                <p>{conversation.lastMessage}</p>
                              </CardContent>
                            </Card>
                            <p className="text-xs text-muted-foreground mt-1 ml-2">
                              {formatTimestamp(conversation.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Message input */}
                    <div className="p-4 border-t bg-white dark:bg-gray-800">
                      <div className="flex items-center gap-2">
                        <Input 
                          placeholder="Type your message..." 
                          className="flex-1"
                        />
                        <Button>Send</Button>
                      </div>
                    </div>
                  </>
                );
              })()}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <MessageSquare className="h-16 w-16 text-muted-foreground mb-4 opacity-20" />
              <h3 className="text-xl font-medium mb-2">No conversation selected</h3>
              <p className="text-muted-foreground max-w-md">
                Select a conversation from the list to view the message thread.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 