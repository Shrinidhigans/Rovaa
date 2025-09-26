"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Users,
  MapPin,
  Calendar,
  Star,
  MessageCircle,
  UserPlus,
  Search,
  Share2,
  Award,
  Camera,
  Phone,
  ArrowLeft,
  Send,
  Video,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

const travelBuddies = [
  {
    id: 1,
    name: "Arjun Sharma",
    avatar: "/placeholder.svg?height=60&width=60",
    location: "Mumbai, Maharashtra",
    age: 24,
    trips: 15,
    rating: 4.8,
    badges: ["Explorer", "Foodie", "Photographer"],
    interests: ["Adventure", "Street Food", "Photography"],
    currentTrip: "Planning Ladakh expedition",
    mutualFriends: 3,
    isOnline: true,
    bio: "Love exploring hidden gems and trying local cuisines. Always up for spontaneous adventures! 🌟",
    languages: ["Hindi", "English", "Marathi"],
    verified: true,
    connected: false,
  },
  {
    id: 2,
    name: "Priya Patel",
    avatar: "/placeholder.svg?height=60&width=60",
    location: "Delhi, NCR",
    age: 26,
    trips: 22,
    rating: 4.9,
    badges: ["Culture Expert", "Solo Traveler", "Blogger"],
    interests: ["Heritage", "Solo Travel", "Writing"],
    currentTrip: "Exploring Rajasthan palaces",
    mutualFriends: 7,
    isOnline: false,
    bio: "Heritage enthusiast and travel blogger. Love connecting with locals and learning about cultures! 🏛️",
    languages: ["Hindi", "English", "Gujarati"],
    verified: true,
    connected: true,
  },
  {
    id: 3,
    name: "Rohan Kumar",
    avatar: "/placeholder.svg?height=60&width=60",
    location: "Bangalore, Karnataka",
    age: 28,
    trips: 31,
    rating: 4.7,
    badges: ["Adventure King", "Trekker", "Guide"],
    interests: ["Trekking", "Mountains", "Camping"],
    currentTrip: "Leading group trek in Himachal",
    mutualFriends: 12,
    isOnline: true,
    bio: "Professional trekking guide with 8+ years experience. Safety first, adventure always! ⛰️",
    languages: ["Hindi", "English", "Kannada"],
    verified: true,
    connected: false,
  },
]

const localGuides = [
  {
    id: 1,
    name: "Ravi Goan",
    avatar: "/placeholder.svg?height=50&width=50",
    location: "Goa",
    speciality: "Beach & Nightlife Expert",
    rating: 4.9,
    reviews: 156,
    price: "₹1,500/day",
    languages: ["English", "Hindi", "Konkani"],
    verified: true,
    available: true,
  },
  {
    id: 2,
    name: "Maya Kerala",
    avatar: "/placeholder.svg?height=50&width=50",
    location: "Kerala",
    speciality: "Backwater & Spice Tours",
    rating: 4.8,
    reviews: 203,
    price: "₹2,000/day",
    languages: ["English", "Hindi", "Malayalam"],
    verified: true,
    available: false,
  },
  {
    id: 3,
    name: "Amit Rajasthan",
    avatar: "/placeholder.svg?height=50&width=50",
    location: "Rajasthan",
    speciality: "Desert Safari & Heritage",
    rating: 4.7,
    reviews: 89,
    price: "₹1,800/day",
    languages: ["English", "Hindi", "Rajasthani"],
    verified: true,
    available: true,
  },
]

const travelEvents = [
  {
    id: 1,
    title: "Goa Beach Cleanup & Party",
    date: "March 25, 2024",
    time: "4:00 PM - 10:00 PM",
    location: "Baga Beach, Goa",
    attendees: 45,
    maxAttendees: 60,
    organizer: "EcoTravel Goa",
    type: "Community Service",
    price: "Free",
    image: "/placeholder.svg?height=200&width=300",
    joined: false,
  },
  {
    id: 2,
    title: "Rajasthan Food Walk",
    date: "March 28, 2024",
    time: "6:00 PM - 9:00 PM",
    location: "Jodhpur, Rajasthan",
    attendees: 12,
    maxAttendees: 20,
    organizer: "Foodie Travelers",
    type: "Food Tour",
    price: "₹800",
    image: "/placeholder.svg?height=200&width=300",
    joined: true,
  },
  {
    id: 3,
    title: "Himachal Trekking Meetup",
    date: "April 5, 2024",
    time: "6:00 AM - 8:00 PM",
    location: "Triund, Himachal Pradesh",
    attendees: 8,
    maxAttendees: 15,
    organizer: "Mountain Explorers",
    type: "Adventure",
    price: "₹1,200",
    image: "/placeholder.svg?height=200&width=300",
    joined: false,
  },
]

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState("buddies")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [buddies, setBuddies] = useState(travelBuddies)
  const [events, setEvents] = useState(travelEvents)
  const [selectedBuddy, setSelectedBuddy] = useState<(typeof travelBuddies)[0] | null>(null)
  const [chatMessage, setChatMessage] = useState("")

  const interests = ["Adventure", "Beach", "Culture", "Food", "Photography", "Trekking", "Solo Travel", "Backpacking"]

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]))
  }

  const connectWithBuddy = (buddyId: number) => {
    setBuddies((prev) =>
      prev.map((buddy) => (buddy.id === buddyId ? { ...buddy, connected: !buddy.connected } : buddy)),
    )
  }

  const joinEvent = (eventId: number) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId
          ? {
              ...event,
              joined: !event.joined,
              attendees: event.joined ? event.attendees - 1 : event.attendees + 1,
            }
          : event,
      ),
    )
  }

  const sendMessage = () => {
    if (!chatMessage.trim()) return
    alert(`💬 Message sent to ${selectedBuddy?.name}: "${chatMessage}"`)
    setChatMessage("")
  }

  const filteredBuddies = buddies.filter((buddy) => {
    const matchesSearch =
      searchQuery === "" ||
      buddy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      buddy.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      buddy.interests.some((interest) => interest.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesInterests =
      selectedInterests.length === 0 || selectedInterests.some((interest) => buddy.interests.includes(interest))

    return matchesSearch && matchesInterests
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="icon" className="text-amber-700">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-amber-800">Social Connect</h1>
                <p className="text-amber-600">Find travel buddies, local guides, and join amazing events</p>
              </div>
            </div>
            <Button
              className="bg-amber-600 hover:bg-amber-700 text-white"
              onClick={() => alert("🎯 Creating your travel buddy profile...")}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Create Profile
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 border-amber-200">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-amber-500" />
                <Input
                  placeholder="Search by name, location, or interests..."
                  className="pl-10 border-amber-300 focus:border-amber-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <Button
                    key={interest}
                    variant={selectedInterests.includes(interest) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleInterest(interest)}
                    className={
                      selectedInterests.includes(interest)
                        ? "bg-amber-600 hover:bg-amber-700"
                        : "border-amber-300 text-amber-700 hover:bg-amber-50"
                    }
                  >
                    {interest}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="buddies" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Travel Buddies</span>
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Local Guides</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Events</span>
            </TabsTrigger>
          </TabsList>

          {/* Travel Buddies Tab */}
          <TabsContent value="buddies">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBuddies.map((buddy) => (
                <Card key={buddy.id} className="border-amber-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="relative">
                        <Avatar className="w-16 h-16 border-2 border-amber-300">
                          <AvatarImage src={buddy.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-amber-100 text-amber-800 text-lg">
                            {buddy.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {buddy.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                        {buddy.verified && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-bold text-amber-900">{buddy.name}</h3>
                        <p className="text-sm text-amber-600 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {buddy.location}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="text-sm font-semibold">{buddy.rating}</span>
                          </div>
                          <span className="text-sm text-amber-600">• {buddy.trips} trips</span>
                          <span className="text-sm text-amber-600">• Age {buddy.age}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-amber-700 mb-3 line-clamp-2">{buddy.bio}</p>

                    <div className="space-y-3 mb-4">
                      <div>
                        <p className="text-xs font-semibold text-amber-800 mb-1">Badges</p>
                        <div className="flex flex-wrap gap-1">
                          {buddy.badges.slice(0, 2).map((badge, index) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-amber-100 text-amber-700">
                              <Award className="w-2 h-2 mr-1" />
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-amber-800 mb-1">Interests</p>
                        <div className="flex flex-wrap gap-1">
                          {buddy.interests.slice(0, 3).map((interest, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-amber-300 text-amber-700">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="bg-amber-50 p-2 rounded-lg">
                        <p className="text-xs font-semibold text-amber-800">Currently:</p>
                        <p className="text-xs text-amber-700">{buddy.currentTrip}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-amber-600 mb-4">
                      <span>{buddy.mutualFriends} mutual friends</span>
                      <span className={buddy.isOnline ? "text-green-600" : "text-gray-500"}>
                        {buddy.isOnline ? "Online now" : "Last seen 2h ago"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        className={
                          buddy.connected ? "bg-green-600 hover:bg-green-700" : "bg-amber-600 hover:bg-amber-700"
                        }
                        onClick={() => connectWithBuddy(buddy.id)}
                      >
                        {buddy.connected ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Connected
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-3 h-3 mr-1" />
                            Connect
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-amber-300 text-amber-700"
                        onClick={() => setSelectedBuddy(buddy)}
                      >
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredBuddies.length === 0 && (
              <Card className="border-amber-200 p-8 text-center">
                <Users className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-amber-800 mb-2">No travel buddies found</h3>
                <p className="text-amber-600 mb-4">Try adjusting your search or interests to find more matches.</p>
                <Button
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedInterests([])
                  }}
                >
                  Clear Filters
                </Button>
              </Card>
            )}
          </TabsContent>

          {/* Local Guides Tab */}
          <TabsContent value="guides">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {localGuides.map((guide) => (
                <Card key={guide.id} className="border-amber-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="relative">
                        <Avatar className="w-14 h-14 border-2 border-amber-300">
                          <AvatarImage src={guide.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-amber-100 text-amber-800">
                            {guide.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {guide.verified && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                        )}
                        {guide.available && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-bold text-amber-900">{guide.name}</h3>
                        <p className="text-sm text-amber-600 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {guide.location}
                        </p>
                        <p className="text-sm font-semibold text-amber-800">{guide.speciality}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="text-sm font-semibold">{guide.rating}</span>
                          </div>
                          <span className="text-sm text-amber-600">• {guide.reviews} reviews</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-amber-800">{guide.price}</p>
                        <Badge
                          variant={guide.available ? "default" : "secondary"}
                          className={guide.available ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
                        >
                          {guide.available ? "Available" : "Busy"}
                        </Badge>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs font-semibold text-amber-800 mb-1">Languages</p>
                      <p className="text-xs text-amber-600">{guide.languages.join(", ")}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        className="bg-amber-600 hover:bg-amber-700 text-white"
                        disabled={!guide.available}
                        onClick={() => alert(`📞 Booking ${guide.name} as your local guide...`)}
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        Book Guide
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-amber-300 text-amber-700"
                        onClick={() => alert(`💬 Starting chat with ${guide.name}...`)}
                      >
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Chat
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="border-amber-200 hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <div className="w-full h-48 bg-gradient-to-r from-amber-200 to-orange-200 flex items-center justify-center">
                      <Camera className="w-12 h-12 text-amber-600" />
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-white/90 text-amber-800">{event.type}</Badge>
                    </div>
                    {event.joined && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Joined
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <h3 className="font-bold text-amber-900 mb-2">{event.title}</h3>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-amber-600 flex items-center">
                        <Calendar className="w-3 h-3 mr-2" />
                        {event.date} • {event.time}
                      </p>
                      <p className="text-sm text-amber-600 flex items-center">
                        <MapPin className="w-3 h-3 mr-2" />
                        {event.location}
                      </p>
                      <p className="text-sm text-amber-600 flex items-center">
                        <Users className="w-3 h-3 mr-2" />
                        {event.attendees}/{event.maxAttendees} attending
                      </p>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-amber-600">by {event.organizer}</span>
                      <span className="font-bold text-amber-800">{event.price}</span>
                    </div>

                    <div className="w-full bg-amber-200 rounded-full h-2 mb-4">
                      <div
                        className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                      ></div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        className={event.joined ? "bg-green-600 hover:bg-green-700" : "bg-amber-600 hover:bg-amber-700"}
                        onClick={() => joinEvent(event.id)}
                      >
                        {event.joined ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Joined
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-3 h-3 mr-1" />
                            Join Event
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-amber-300 text-amber-700"
                        onClick={() => alert(`📤 Sharing ${event.title} with friends...`)}
                      >
                        <Share2 className="w-3 h-3 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Chat Modal */}
        <Dialog open={!!selectedBuddy} onOpenChange={() => setSelectedBuddy(null)}>
          <DialogContent className="max-w-md">
            {selectedBuddy && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10 border-2 border-amber-300">
                      <AvatarImage src={selectedBuddy.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-amber-100 text-amber-800">
                        {selectedBuddy.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="text-amber-800">{selectedBuddy.name}</span>
                      <p className="text-sm text-amber-600 font-normal">
                        {selectedBuddy.isOnline ? "Online now" : "Last seen 2h ago"}
                      </p>
                    </div>
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="bg-amber-50 p-4 rounded-lg max-h-60 overflow-y-auto">
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded-lg ml-8">
                        <p className="text-sm text-amber-800">
                          Hey! I saw you're interested in {selectedBuddy.interests[0].toLowerCase()} trips. Want to plan
                          something together? 😊
                        </p>
                        <p className="text-xs text-amber-600 mt-1">2 hours ago</p>
                      </div>

                      <div className="bg-amber-600 text-white p-3 rounded-lg mr-8">
                        <p className="text-sm">
                          That sounds amazing! I'm planning a trip to{" "}
                          {selectedBuddy.currentTrip.includes("Ladakh") ? "Ladakh" : "Kerala"} next month. Would love to
                          have a travel buddy!
                        </p>
                        <p className="text-xs text-amber-200 mt-1">1 hour ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      className="flex-1 border-amber-300 focus:border-amber-500"
                    />
                    <Button size="icon" className="bg-amber-600 hover:bg-amber-700" onClick={sendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-amber-300 text-amber-700"
                      onClick={() => alert("📞 Starting voice call...")}
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Call
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-amber-300 text-amber-700"
                      onClick={() => alert("📹 Starting video call...")}
                    >
                      <Video className="w-3 h-3 mr-1" />
                      Video
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
