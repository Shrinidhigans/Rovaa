"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  MapPin,
  Clock,
  Utensils,
  Bed,
  ShoppingBag,
  Camera,
  Star,
  Plus,
  Edit,
  Trash2,
  Navigation,
  Sparkles,
  Sun,
  Calendar,
  Wallet,
  Users,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const currentTrips = [
  {
    id: 1,
    name: "Goa Beach Getaway",
    destination: "Goa",
    dates: "March 15-18, 2024",
    budget: 15000,
    spent: 12500,
    status: "ongoing",
    image: "/placeholder.svg?height=200&width=300",
    progress: 75,
  },
  {
    id: 2,
    name: "Kerala Backwaters",
    destination: "Alleppey, Kerala",
    dates: "April 5-10, 2024",
    budget: 20000,
    spent: 0,
    status: "upcoming",
    image: "/placeholder.svg?height=200&width=300",
    progress: 0,
  },
]

const pastTrips = [
  {
    id: 3,
    name: "Rajasthan Royal Tour",
    destination: "Jaipur, Rajasthan",
    dates: "February 10-15, 2024",
    budget: 18000,
    spent: 17500,
    status: "completed",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
  },
]

const itineraryData = {
  day1: {
    date: "March 15, 2024",
    weather: { temp: "28°C", condition: "Sunny", icon: Sun },
    activities: [
      {
        time: "09:00 AM",
        title: "Arrival & Check-in",
        location: "Beachside Resort, Calangute",
        type: "accommodation",
        duration: "1 hour",
        cost: "₹0",
        notes: "Early check-in confirmed. Ask for sea-view room upgrade.",
        completed: true,
      },
      {
        time: "11:00 AM",
        title: "Breakfast at Cafe Chocolatti",
        location: "Candolim Beach",
        type: "food",
        duration: "1 hour",
        cost: "₹800",
        notes: "Try their famous pancakes and fresh juice.",
        completed: true,
      },
      {
        time: "01:00 PM",
        title: "Calangute Beach Exploration",
        location: "Calangute Beach",
        type: "activity",
        duration: "3 hours",
        cost: "₹500",
        notes: "Water sports available. Don't forget sunscreen!",
        completed: false,
      },
      {
        time: "07:00 PM",
        title: "Sunset at Anjuna Beach",
        location: "Anjuna Beach",
        type: "sightseeing",
        duration: "2 hours",
        cost: "₹200",
        notes: "Perfect spot for photos. Grab some snacks from beach shacks.",
        completed: false,
      },
    ],
  },
}

const packingList = [
  { item: "Sunscreen SPF 50+", packed: true, category: "essentials" },
  { item: "Swimwear", packed: false, category: "clothing" },
  { item: "Flip-flops", packed: true, category: "footwear" },
  { item: "Portable charger", packed: false, category: "electronics" },
  { item: "Sunglasses", packed: true, category: "accessories" },
  { item: "Light cotton shirts", packed: false, category: "clothing" },
]

export default function TripsPage() {
  const [selectedTrip, setSelectedTrip] = useState(currentTrips[0])
  const [selectedDay, setSelectedDay] = useState("day1")
  const [packingItems, setPackingItems] = useState(packingList)

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "food":
        return Utensils
      case "accommodation":
        return Bed
      case "activity":
        return Camera
      case "shopping":
        return ShoppingBag
      case "sightseeing":
        return MapPin
      default:
        return Clock
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "food":
        return "bg-orange-100 text-orange-800"
      case "accommodation":
        return "bg-blue-100 text-blue-800"
      case "activity":
        return "bg-green-100 text-green-800"
      case "shopping":
        return "bg-purple-100 text-purple-800"
      case "sightseeing":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const togglePackingItem = (index: number) => {
    setPackingItems((prev) => prev.map((item, i) => (i === index ? { ...item, packed: !item.packed } : item)))
  }

  const toggleActivityComplete = (activityIndex: number) => {
    // In a real app, this would update the backend
    alert(
      `Activity ${activityIndex + 1} marked as ${itineraryData.day1.activities[activityIndex].completed ? "incomplete" : "complete"}!`,
    )
  }

  return (
    <div className="min-h-screen bg-amber-50 p-4">
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
                <h1 className="text-3xl font-bold text-amber-800">My Trips</h1>
                <p className="text-amber-600">Plan, track, and relive your adventures</p>
              </div>
            </div>
            <Button
              className="bg-amber-600 hover:bg-amber-700 text-white"
              onClick={() => alert("🎯 Creating new trip with AI assistance...")}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Trip
            </Button>
          </div>
        </div>

        <Tabs defaultValue="current" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="current">Current Trips</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Trips</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentTrips
                .filter((trip) => trip.status === "ongoing")
                .map((trip) => (
                  <Card
                    key={trip.id}
                    className="border-amber-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedTrip(trip)}
                  >
                    <div className="relative">
                      <Image
                        src={trip.image || "/placeholder.svg"}
                        alt={trip.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-3 left-3 bg-green-100 text-green-800">{trip.status}</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-amber-900 mb-2">{trip.name}</h3>
                      <p className="text-sm text-amber-600 flex items-center mb-2">
                        <MapPin className="w-3 h-3 mr-1" />
                        {trip.destination}
                      </p>
                      <p className="text-sm text-amber-600 flex items-center mb-3">
                        <Calendar className="w-3 h-3 mr-1" />
                        {trip.dates}
                      </p>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-amber-600">Budget Progress</span>
                          <span className="font-semibold text-amber-800">
                            ₹{trip.spent.toLocaleString()} / ₹{trip.budget.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={(trip.spent / trip.budget) * 100} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentTrips
                .filter((trip) => trip.status === "upcoming")
                .map((trip) => (
                  <Card key={trip.id} className="border-amber-200 hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <Image
                        src={trip.image || "/placeholder.svg"}
                        alt={trip.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-3 left-3 bg-blue-100 text-blue-800">{trip.status}</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-amber-900 mb-2">{trip.name}</h3>
                      <p className="text-sm text-amber-600 flex items-center mb-2">
                        <MapPin className="w-3 h-3 mr-1" />
                        {trip.destination}
                      </p>
                      <p className="text-sm text-amber-600 flex items-center mb-3">
                        <Calendar className="w-3 h-3 mr-1" />
                        {trip.dates}
                      </p>

                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-amber-300 text-amber-700 bg-transparent"
                          onClick={() => alert("📝 Opening trip planner...")}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          className="bg-amber-600 hover:bg-amber-700 text-white"
                          onClick={() => alert("🎒 Opening packing checklist...")}
                        >
                          <ShoppingBag className="w-3 h-3 mr-1" />
                          Pack
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pastTrips.map((trip) => (
                <Card key={trip.id} className="border-amber-200 hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                      src={trip.image || "/placeholder.svg"}
                      alt={trip.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-3 left-3 bg-gray-100 text-gray-800">{trip.status}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-amber-900 mb-2">{trip.name}</h3>
                    <p className="text-sm text-amber-600 flex items-center mb-2">
                      <MapPin className="w-3 h-3 mr-1" />
                      {trip.destination}
                    </p>
                    <p className="text-sm text-amber-600 flex items-center mb-3">
                      <Calendar className="w-3 h-3 mr-1" />
                      {trip.dates}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{trip.rating}</span>
                      </div>
                      <span className="text-sm text-amber-600">₹{trip.spent.toLocaleString()} spent</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-amber-300 text-amber-700 bg-transparent"
                        onClick={() => alert("📸 Opening trip memories...")}
                      >
                        <Camera className="w-3 h-3 mr-1" />
                        Memories
                      </Button>
                      <Button
                        size="sm"
                        className="bg-amber-600 hover:bg-amber-700 text-white"
                        onClick={() => alert("🔄 Creating similar trip...")}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Repeat
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Detailed Trip View */}
        {selectedTrip && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Itinerary */}
            <div className="lg:col-span-2">
              <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-amber-800">{selectedTrip.name} - Smart Itinerary</span>
                    <Badge className="bg-green-100 text-green-800">
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI Optimized
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={selectedDay} onValueChange={setSelectedDay}>
                    <TabsList className="grid w-full grid-cols-4 mb-6">
                      <TabsTrigger value="day1">Day 1</TabsTrigger>
                      <TabsTrigger value="day2">Day 2</TabsTrigger>
                      <TabsTrigger value="day3">Day 3</TabsTrigger>
                      <TabsTrigger value="day4">Day 4</TabsTrigger>
                    </TabsList>

                    <TabsContent value="day1" className="space-y-4">
                      {/* Weather Info */}
                      <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-200">
                        <div className="flex items-center space-x-3">
                          <Sun className="w-6 h-6 text-yellow-500" />
                          <div>
                            <div className="font-semibold text-amber-800">{itineraryData.day1.date}</div>
                            <div className="text-sm text-amber-600">
                              {itineraryData.day1.weather.temp} • {itineraryData.day1.weather.condition}
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-amber-300 text-amber-700 bg-transparent"
                          onClick={() => alert("➕ Adding new activity with AI suggestions...")}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Activity
                        </Button>
                      </div>

                      {/* Activities Timeline */}
                      <div className="space-y-4">
                        {itineraryData.day1.activities.map((activity, index) => {
                          const Icon = getActivityIcon(activity.type)
                          return (
                            <div key={index} className="relative">
                              {/* Timeline Line */}
                              {index < itineraryData.day1.activities.length - 1 && (
                                <div className="absolute left-6 top-12 w-0.5 h-16 bg-amber-200"></div>
                              )}

                              <Card
                                className={`border-amber-200 hover:shadow-md transition-shadow ${activity.completed ? "bg-green-50" : ""}`}
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                      <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center ${activity.completed ? "bg-green-100" : "bg-amber-100"}`}
                                      >
                                        <Icon
                                          className={`w-6 h-6 ${activity.completed ? "text-green-600" : "text-amber-600"}`}
                                        />
                                      </div>
                                    </div>

                                    <div className="flex-1">
                                      <div className="flex items-start justify-between mb-2">
                                        <div>
                                          <h4
                                            className={`font-semibold ${activity.completed ? "line-through text-green-700" : "text-amber-900"}`}
                                          >
                                            {activity.title}
                                          </h4>
                                          <p className="text-sm text-amber-600 flex items-center">
                                            <MapPin className="w-3 h-3 mr-1" />
                                            {activity.location}
                                          </p>
                                        </div>
                                        <div className="text-right">
                                          <div className="text-sm font-semibold text-amber-800">{activity.time}</div>
                                          <Badge className={getActivityColor(activity.type)}>{activity.type}</Badge>
                                        </div>
                                      </div>

                                      <div className="flex items-center space-x-4 text-sm text-amber-600 mb-2">
                                        <span className="flex items-center">
                                          <Clock className="w-3 h-3 mr-1" />
                                          {activity.duration}
                                        </span>
                                        <span className="font-semibold">{activity.cost}</span>
                                      </div>

                                      <p className="text-sm text-amber-700 bg-amber-50 p-2 rounded mb-3">
                                        💡 {activity.notes}
                                      </p>

                                      <div className="flex items-center justify-between">
                                        <Button
                                          size="sm"
                                          variant={activity.completed ? "default" : "outline"}
                                          className={
                                            activity.completed
                                              ? "bg-green-600 hover:bg-green-700 text-white"
                                              : "border-amber-300 text-amber-700"
                                          }
                                          onClick={() => toggleActivityComplete(index)}
                                        >
                                          {activity.completed ? "✓ Completed" : "Mark Complete"}
                                        </Button>

                                        <div className="flex space-x-2">
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-amber-600"
                                            onClick={() => alert("📝 Editing activity...")}
                                          >
                                            <Edit className="w-3 h-3" />
                                          </Button>
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-red-600"
                                            onClick={() => alert("🗑️ Removing activity...")}
                                          >
                                            <Trash2 className="w-3 h-3" />
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          )
                        })}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Packing Assistant */}
              <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-800 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    AI Packing Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {packingItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={item.packed}
                            onChange={() => togglePackingItem(index)}
                            className="rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                          />
                          <span className={`text-sm ${item.packed ? "line-through text-amber-500" : "text-amber-800"}`}>
                            {item.item}
                          </span>
                        </div>
                        <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700">
                          {item.category}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-4 border-amber-300 text-amber-700 bg-transparent"
                    onClick={() => alert("➕ AI suggests: Portable phone stand for beach photos!")}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    AI Suggest Item
                  </Button>
                </CardContent>
              </Card>

              {/* Budget Tracker */}
              <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-800">Budget Tracker</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-amber-600">Total Budget</span>
                      <span className="font-semibold text-amber-800">₹{selectedTrip.budget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-amber-600">Spent</span>
                      <span className="font-semibold text-green-600">₹{selectedTrip.spent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-amber-600">Remaining</span>
                      <span className="font-semibold text-amber-800">
                        ₹{(selectedTrip.budget - selectedTrip.spent).toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-amber-200 rounded-full h-2">
                      <div
                        className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(selectedTrip.spent / selectedTrip.budget) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-amber-600">
                      {selectedTrip.spent / selectedTrip.budget < 0.9
                        ? "You're on track! 💰"
                        : "Watch your spending! 🚨"}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-4 border-amber-300 text-amber-700 bg-transparent"
                    onClick={() => alert("💳 Adding expense: ₹500 for lunch at beach shack")}
                  >
                    <Wallet className="w-3 h-3 mr-1" />
                    Add Expense
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-800">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-amber-300 text-amber-700 bg-transparent"
                    onClick={() => alert("🧭 Opening GPS navigation to next destination...")}
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-amber-300 text-amber-700 bg-transparent"
                    onClick={() => alert("📸 Opening camera for trip memories...")}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Add Photos
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-amber-300 text-amber-700 bg-transparent"
                    onClick={() => alert("⭐ Rate your experience: How was Cafe Chocolatti?")}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Rate Experience
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-amber-300 text-amber-700 bg-transparent"
                    onClick={() => alert("👥 Finding travel buddies near Calangute Beach...")}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Find Buddies
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
