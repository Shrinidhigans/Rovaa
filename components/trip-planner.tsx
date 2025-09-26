"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
} from "lucide-react"

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
      },
      {
        time: "11:00 AM",
        title: "Breakfast at Cafe Chocolatti",
        location: "Candolim Beach",
        type: "food",
        duration: "1 hour",
        cost: "₹800",
        notes: "Try their famous pancakes and fresh juice.",
      },
      {
        time: "01:00 PM",
        title: "Calangute Beach Exploration",
        location: "Calangute Beach",
        type: "activity",
        duration: "3 hours",
        cost: "₹500",
        notes: "Water sports available. Don't forget sunscreen!",
      },
      {
        time: "07:00 PM",
        title: "Sunset at Anjuna Beach",
        location: "Anjuna Beach",
        type: "sightseeing",
        duration: "2 hours",
        cost: "₹200",
        notes: "Perfect spot for photos. Grab some snacks from beach shacks.",
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

export default function TripPlanner() {
  const [selectedDay, setSelectedDay] = useState("day1")
  const [editingActivity, setEditingActivity] = useState<number | null>(null)
  const [newActivity, setNewActivity] = useState({
    time: "",
    title: "",
    location: "",
    type: "activity",
    duration: "",
    cost: "",
    notes: "",
  })

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-amber-800">Goa Beach Getaway</h1>
              <p className="text-amber-600">March 15-18, 2024 • 4 Days • ₹15,000 Budget</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="border-amber-300 text-amber-700">
                <Edit className="w-4 h-4 mr-2" />
                Edit Trip
              </Button>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                <Sparkles className="w-4 h-4 mr-2" />
                AI Optimize
              </Button>
            </div>
          </div>

          {/* Trip Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 border-amber-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-800">4</div>
                <div className="text-sm text-amber-600">Days</div>
              </div>
            </Card>
            <Card className="p-4 border-amber-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-800">₹12,500</div>
                <div className="text-sm text-amber-600">Spent</div>
              </div>
            </Card>
            <Card className="p-4 border-amber-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-800">8</div>
                <div className="text-sm text-amber-600">Activities</div>
              </div>
            </Card>
            <Card className="p-4 border-amber-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-800">3</div>
                <div className="text-sm text-amber-600">Locations</div>
              </div>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Itinerary */}
          <div className="lg:col-span-2">
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-amber-800">Smart Itinerary</span>
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
                      <Button size="sm" variant="outline" className="border-amber-300 text-amber-700">
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

                            <Card className="border-amber-200 hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-start space-x-4">
                                  <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                                      <Icon className="w-6 h-6 text-amber-600" />
                                    </div>
                                  </div>

                                  <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                      <div>
                                        <h4 className="font-semibold text-amber-900">{activity.title}</h4>
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

                                    <p className="text-sm text-amber-700 bg-amber-50 p-2 rounded">
                                      💡 {activity.notes}
                                    </p>

                                    <div className="flex items-center justify-end space-x-2 mt-3">
                                      <Button size="sm" variant="ghost" className="text-amber-600">
                                        <Edit className="w-3 h-3 mr-1" />
                                        Edit
                                      </Button>
                                      <Button size="sm" variant="ghost" className="text-red-600">
                                        <Trash2 className="w-3 h-3 mr-1" />
                                        Remove
                                      </Button>
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
                  {packingList.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" checked={item.packed} className="rounded border-amber-300" />
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
                <Button size="sm" variant="outline" className="w-full mt-4 border-amber-300 text-amber-700">
                  <Plus className="w-3 h-3 mr-1" />
                  Add Item
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
                    <span className="font-semibold text-amber-800">₹15,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-amber-600">Spent</span>
                    <span className="font-semibold text-green-600">₹12,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-amber-600">Remaining</span>
                    <span className="font-semibold text-amber-800">₹2,500</span>
                  </div>
                  <div className="w-full bg-amber-200 rounded-full h-2">
                    <div className="bg-amber-600 h-2 rounded-full" style={{ width: "83%" }}></div>
                  </div>
                  <p className="text-xs text-amber-600">You're on track! 💰</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button size="sm" variant="outline" className="w-full border-amber-300 text-amber-700">
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
                <Button size="sm" variant="outline" className="w-full border-amber-300 text-amber-700">
                  <Camera className="w-4 h-4 mr-2" />
                  Add Photos
                </Button>
                <Button size="sm" variant="outline" className="w-full border-amber-300 text-amber-700">
                  <Star className="w-4 h-4 mr-2" />
                  Rate Experience
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
