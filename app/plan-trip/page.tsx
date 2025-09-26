"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Heart,
  Share2,
  Calendar,
  MapPin,
  Users,
  Wallet,
  Clock,
  Star,
  Plus,
  Minus,
  Trash2,
  Save,
  Download,
  Sparkles,
  Camera,
  Bed,
  Plane,
  Car,
  Train,
  Bus,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

const accommodationOptions = [
  {
    id: 1,
    name: "Beachside Resort",
    type: "Resort",
    price: "₹4,500/night",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["Pool", "Spa", "Beach Access", "WiFi"],
    location: "Calangute Beach",
  },
  {
    id: 2,
    name: "Heritage Homestay",
    type: "Homestay",
    price: "₹2,800/night",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["Local Experience", "Home Cooked Meals", "WiFi"],
    location: "Old Goa",
  },
  {
    id: 3,
    name: "Boutique Hotel",
    type: "Hotel",
    price: "₹3,200/night",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["Restaurant", "Bar", "Gym", "WiFi"],
    location: "Panaji",
  },
]

const activities = [
  {
    id: 1,
    name: "Water Sports Package",
    duration: "3 hours",
    price: "₹1,500",
    rating: 4.7,
    image: "/placeholder.svg?height=150&width=200",
    description: "Jet skiing, parasailing, and banana boat rides",
    location: "Baga Beach",
  },
  {
    id: 2,
    name: "Spice Plantation Tour",
    duration: "4 hours",
    price: "₹800",
    rating: 4.5,
    image: "/placeholder.svg?height=150&width=200",
    description: "Guided tour with traditional lunch included",
    location: "Ponda",
  },
  {
    id: 3,
    name: "Sunset Cruise",
    duration: "2 hours",
    price: "₹1,200",
    rating: 4.8,
    image: "/placeholder.svg?height=150&width=200",
    description: "Romantic cruise with dinner and live music",
    location: "Mandovi River",
  },
  {
    id: 4,
    name: "Old Goa Heritage Walk",
    duration: "3 hours",
    price: "₹600",
    rating: 4.4,
    image: "/placeholder.svg?height=150&width=200",
    description: "Explore churches and colonial architecture",
    location: "Old Goa",
  },
]

const transportOptions = [
  { id: 1, type: "Flight", icon: Plane, price: "₹8,500", duration: "2h 30m", details: "Mumbai to Goa" },
  { id: 2, type: "Train", icon: Train, price: "₹1,200", duration: "12h", details: "Konkan Railway" },
  { id: 3, type: "Bus", icon: Bus, price: "₹800", duration: "14h", details: "Sleeper AC" },
  { id: 4, type: "Car", icon: Car, price: "₹6,000", duration: "10h", details: "Self-drive rental" },
]

export default function PlanTripPage() {
  const searchParams = useSearchParams()
  const [destination, setDestination] = useState(searchParams.get("destination") || "Goa Vibes")
  const [location, setLocation] = useState(searchParams.get("location") || "Goa")
  const [basePrice, setBasePrice] = useState(searchParams.get("price") || "₹8,999")
  const [mood, setMood] = useState(searchParams.get("mood") || "Chill")

  const [tripDetails, setTripDetails] = useState({
    startDate: "",
    endDate: "",
    travelers: 2,
    budget: 15000,
    notes: "",
  })

  const [selectedAccommodation, setSelectedAccommodation] = useState<number | null>(null)
  const [selectedActivities, setSelectedActivities] = useState<number[]>([])
  const [selectedTransport, setSelectedTransport] = useState<number | null>(null)
  const [wishlistItems, setWishlistItems] = useState<any[]>([])
  const [totalCost, setTotalCost] = useState(0)

  const toggleActivity = (activityId: number) => {
    setSelectedActivities((prev) =>
      prev.includes(activityId) ? prev.filter((id) => id !== activityId) : [...prev, activityId],
    )
  }

  const addToWishlist = (item: any, type: string) => {
    const wishlistItem = { ...item, type, addedAt: new Date().toISOString() }
    setWishlistItems((prev) => [...prev, wishlistItem])
  }

  const removeFromWishlist = (index: number) => {
    setWishlistItems((prev) => prev.filter((_, i) => i !== index))
  }

  const calculateTotalCost = () => {
    let total = 0

    // Accommodation cost
    if (selectedAccommodation) {
      const accommodation = accommodationOptions.find((acc) => acc.id === selectedAccommodation)
      if (accommodation) {
        const pricePerNight = Number.parseInt(accommodation.price.replace(/[₹,]/g, ""))
        const nights = tripDetails.startDate && tripDetails.endDate ? 3 : 3 // Default 3 nights
        total += pricePerNight * nights
      }
    }

    // Activities cost
    selectedActivities.forEach((activityId) => {
      const activity = activities.find((act) => act.id === activityId)
      if (activity) {
        total += Number.parseInt(activity.price.replace(/[₹,]/g, "")) * tripDetails.travelers
      }
    })

    // Transport cost
    if (selectedTransport) {
      const transport = transportOptions.find((trans) => trans.id === selectedTransport)
      if (transport) {
        total += Number.parseInt(transport.price.replace(/[₹,]/g, "")) * tripDetails.travelers
      }
    }

    setTotalCost(total)
  }

  useEffect(() => {
    calculateTotalCost()
  }, [selectedAccommodation, selectedActivities, selectedTransport, tripDetails.travelers])

  const saveTripPlan = () => {
    const tripPlan = {
      destination,
      location,
      mood,
      tripDetails,
      selectedAccommodation,
      selectedActivities,
      selectedTransport,
      wishlistItems,
      totalCost,
      createdAt: new Date().toISOString(),
    }

    // In a real app, this would save to backend
    localStorage.setItem("savedTripPlan", JSON.stringify(tripPlan))
    alert("🎉 Trip plan saved successfully! You can access it from your trips page.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-amber-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <Button variant="ghost" size="icon" className="text-amber-700 hover:bg-amber-100">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold font-serif bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent">
                  Plan Your Trip
                </h1>
                <p className="text-amber-600">
                  {destination} • {location}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="border-amber-300 text-amber-700 hover:bg-amber-50"
                onClick={() => alert("📤 Sharing your trip plan...")}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white" onClick={saveTripPlan}>
                <Save className="w-4 h-4 mr-2" />
                Save Plan
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Planning Area */}
          <div className="lg:col-span-2">
            {/* Trip Overview */}
            <Card className="mb-6 border-amber-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-amber-800 font-serif flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Trip Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-amber-800 mb-2 block">Start Date</label>
                    <Input
                      type="date"
                      value={tripDetails.startDate}
                      onChange={(e) => setTripDetails((prev) => ({ ...prev, startDate: e.target.value }))}
                      className="border-amber-300 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-amber-800 mb-2 block">End Date</label>
                    <Input
                      type="date"
                      value={tripDetails.endDate}
                      onChange={(e) => setTripDetails((prev) => ({ ...prev, endDate: e.target.value }))}
                      className="border-amber-300 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-amber-800 mb-2 block">Number of Travelers</label>
                    <div className="flex items-center space-x-3">
                      <Button
                        size="icon"
                        variant="outline"
                        className="border-amber-300 text-amber-700 hover:bg-amber-50"
                        onClick={() =>
                          setTripDetails((prev) => ({ ...prev, travelers: Math.max(1, prev.travelers - 1) }))
                        }
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-lg font-semibold text-amber-800 w-8 text-center">
                        {tripDetails.travelers}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="border-amber-300 text-amber-700 hover:bg-amber-50"
                        onClick={() => setTripDetails((prev) => ({ ...prev, travelers: prev.travelers + 1 }))}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-amber-800 mb-2 block">
                      Budget (₹{tripDetails.budget.toLocaleString()})
                    </label>
                    <Input
                      type="range"
                      min="5000"
                      max="100000"
                      step="1000"
                      value={tripDetails.budget}
                      onChange={(e) => setTripDetails((prev) => ({ ...prev, budget: Number.parseInt(e.target.value) }))}
                      className="w-full accent-amber-600"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="text-sm font-semibold text-amber-800 mb-2 block">Trip Notes</label>
                  <Textarea
                    placeholder="Add any special requirements, preferences, or notes..."
                    value={tripDetails.notes}
                    onChange={(e) => setTripDetails((prev) => ({ ...prev, notes: e.target.value }))}
                    className="border-amber-300 focus:border-amber-500"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Planning Tabs */}
            <Tabs defaultValue="accommodation" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-amber-100">
                <TabsTrigger
                  value="accommodation"
                  className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                >
                  <Bed className="w-4 h-4 mr-2" />
                  Stay
                </TabsTrigger>
                <TabsTrigger
                  value="activities"
                  className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Activities
                </TabsTrigger>
                <TabsTrigger
                  value="transport"
                  className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                >
                  <Plane className="w-4 h-4 mr-2" />
                  Transport
                </TabsTrigger>
                <TabsTrigger
                  value="wishlist"
                  className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Wishlist
                </TabsTrigger>
              </TabsList>

              {/* Accommodation Tab */}
              <TabsContent value="accommodation">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {accommodationOptions.map((accommodation) => (
                    <Card
                      key={accommodation.id}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        selectedAccommodation === accommodation.id
                          ? "border-amber-500 bg-amber-50"
                          : "border-amber-200 hover:border-amber-300"
                      }`}
                      onClick={() => setSelectedAccommodation(accommodation.id)}
                    >
                      <div className="relative">
                        <Image
                          src={accommodation.image || "/placeholder.svg"}
                          alt={accommodation.name}
                          width={300}
                          height={200}
                          className="w-full h-40 object-cover rounded-t-lg"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-white/90 text-amber-800">
                            <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                            {accommodation.rating}
                          </Badge>
                        </div>
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-amber-600 text-white">{accommodation.type}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-amber-900 font-serif">{accommodation.name}</h3>
                            <p className="text-sm text-amber-600 flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {accommodation.location}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-amber-800">{accommodation.price}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {accommodation.amenities.map((amenity, index) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-amber-100 text-amber-700">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50"
                            onClick={(e) => {
                              e.stopPropagation()
                              addToWishlist(accommodation, "accommodation")
                            }}
                          >
                            <Heart className="w-3 h-3 mr-1" />
                            Wishlist
                          </Button>
                          <Button
                            size="sm"
                            className={`flex-1 ${
                              selectedAccommodation === accommodation.id
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-amber-600 hover:bg-amber-700"
                            } text-white`}
                          >
                            {selectedAccommodation === accommodation.id ? "Selected" : "Select"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Activities Tab */}
              <TabsContent value="activities">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activities.map((activity) => (
                    <Card
                      key={activity.id}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        selectedActivities.includes(activity.id)
                          ? "border-amber-500 bg-amber-50"
                          : "border-amber-200 hover:border-amber-300"
                      }`}
                      onClick={() => toggleActivity(activity.id)}
                    >
                      <div className="relative">
                        <Image
                          src={activity.image || "/placeholder.svg"}
                          alt={activity.name}
                          width={200}
                          height={150}
                          className="w-full h-32 object-cover rounded-t-lg"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-white/90 text-amber-800">
                            <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                            {activity.rating}
                          </Badge>
                        </div>
                        <div className="absolute bottom-3 left-3">
                          <Badge className="bg-amber-600 text-white">
                            <Clock className="w-3 h-3 mr-1" />
                            {activity.duration}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-amber-900 font-serif">{activity.name}</h3>
                            <p className="text-sm text-amber-600 flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {activity.location}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-amber-800">{activity.price}</p>
                            <p className="text-xs text-amber-600">per person</p>
                          </div>
                        </div>
                        <p className="text-sm text-amber-700 mb-3">{activity.description}</p>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50"
                            onClick={(e) => {
                              e.stopPropagation()
                              addToWishlist(activity, "activity")
                            }}
                          >
                            <Heart className="w-3 h-3 mr-1" />
                            Wishlist
                          </Button>
                          <Button
                            size="sm"
                            className={`flex-1 ${
                              selectedActivities.includes(activity.id)
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-amber-600 hover:bg-amber-700"
                            } text-white`}
                          >
                            {selectedActivities.includes(activity.id) ? "Added" : "Add"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Transport Tab */}
              <TabsContent value="transport">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {transportOptions.map((transport) => {
                    const Icon = transport.icon
                    return (
                      <Card
                        key={transport.id}
                        className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                          selectedTransport === transport.id
                            ? "border-amber-500 bg-amber-50"
                            : "border-amber-200 hover:border-amber-300"
                        }`}
                        onClick={() => setSelectedTransport(transport.id)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                              <Icon className="w-6 h-6 text-amber-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-amber-900 font-serif">{transport.type}</h3>
                              <p className="text-sm text-amber-600">{transport.details}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-amber-800">{transport.price}</p>
                              <p className="text-xs text-amber-600">per person</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-amber-600">
                              <Clock className="w-4 h-4 mr-1" />
                              {transport.duration}
                            </div>
                            <Button
                              size="sm"
                              className={`${
                                selectedTransport === transport.id
                                  ? "bg-green-600 hover:bg-green-700"
                                  : "bg-amber-600 hover:bg-amber-700"
                              } text-white`}
                            >
                              {selectedTransport === transport.id ? "Selected" : "Select"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>

              {/* Wishlist Tab */}
              <TabsContent value="wishlist">
                {wishlistItems.length === 0 ? (
                  <Card className="border-amber-200 p-8 text-center">
                    <Heart className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-amber-800 mb-2 font-serif">Your Wishlist is Empty</h3>
                    <p className="text-amber-600 mb-4">
                      Add accommodations, activities, and experiences you're interested in to your wishlist.
                    </p>
                    <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Start Adding Items
                    </Button>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {wishlistItems.map((item, index) => (
                      <Card key={index} className="border-amber-200 hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center">
                                {item.type === "accommodation" && <Bed className="w-8 h-8 text-amber-600" />}
                                {item.type === "activity" && <Camera className="w-8 h-8 text-amber-600" />}
                                {item.type === "transport" && <Plane className="w-8 h-8 text-amber-600" />}
                              </div>
                              <div>
                                <h3 className="font-bold text-amber-900 font-serif">{item.name}</h3>
                                <p className="text-sm text-amber-600">{item.location || item.details}</p>
                                <Badge variant="secondary" className="bg-amber-100 text-amber-700 text-xs mt-1">
                                  {item.type}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-amber-800">{item.price}</span>
                              <Button
                                size="icon"
                                variant="outline"
                                className="border-red-300 text-red-600 hover:bg-red-50"
                                onClick={() => removeFromWishlist(index)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Cost Summary */}
            <Card className="border-amber-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-amber-800 font-serif flex items-center">
                  <Wallet className="w-5 h-5 mr-2" />
                  Cost Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-amber-600">Accommodation</span>
                    <span className="font-semibold text-amber-800">
                      ₹
                      {selectedAccommodation
                        ? (
                            Number.parseInt(
                              accommodationOptions
                                .find((acc) => acc.id === selectedAccommodation)
                                ?.price.replace(/[₹,]/g, "") || "0",
                            ) * 3
                          ).toLocaleString()
                        : "0"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-amber-600">Activities</span>
                    <span className="font-semibold text-amber-800">
                      ₹
                      {selectedActivities
                        .reduce((total, activityId) => {
                          const activity = activities.find((act) => act.id === activityId)
                          return (
                            total +
                            (activity
                              ? Number.parseInt(activity.price.replace(/[₹,]/g, "")) * tripDetails.travelers
                              : 0)
                          )
                        }, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-amber-600">Transport</span>
                    <span className="font-semibold text-amber-800">
                      ₹
                      {selectedTransport
                        ? (
                            Number.parseInt(
                              transportOptions
                                .find((trans) => trans.id === selectedTransport)
                                ?.price.replace(/[₹,]/g, "") || "0",
                            ) * tripDetails.travelers
                          ).toLocaleString()
                        : "0"}
                    </span>
                  </div>
                  <hr className="border-amber-200" />
                  <div className="flex justify-between">
                    <span className="font-semibold text-amber-800">Total Cost</span>
                    <span className="font-bold text-lg text-amber-800">₹{totalCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-amber-600">Budget</span>
                    <span
                      className={`font-semibold ${totalCost > tripDetails.budget ? "text-red-600" : "text-green-600"}`}
                    >
                      ₹{tripDetails.budget.toLocaleString()}
                    </span>
                  </div>
                  <Progress
                    value={Math.min((totalCost / tripDetails.budget) * 100, 100)}
                    className={`h-2 ${totalCost > tripDetails.budget ? "bg-red-200" : "bg-amber-200"}`}
                  />
                  <p className="text-xs text-amber-600">
                    {totalCost > tripDetails.budget
                      ? `₹${(totalCost - tripDetails.budget).toLocaleString()} over budget`
                      : `₹${(tripDetails.budget - totalCost).toLocaleString()} remaining`}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Trip Details */}
            <Card className="border-amber-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-amber-800 font-serif">Trip Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span className="text-sm text-amber-800">
                      {destination}, {location}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span className="text-sm text-amber-800">
                      {tripDetails.startDate && tripDetails.endDate
                        ? `${tripDetails.startDate} to ${tripDetails.endDate}`
                        : "Dates not selected"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-amber-600" />
                    <span className="text-sm text-amber-800">{tripDetails.travelers} travelers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span className="text-sm text-amber-800">Mood: {mood}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-amber-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-amber-800 font-serif">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
                  onClick={() => alert("📧 Sending trip plan to your email...")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Itinerary
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
                  onClick={() => (window.location.href = "/social")}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Find Travel Buddies
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
                  onClick={() => alert("🤖 AI is optimizing your itinerary for better experience and cost savings...")}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Optimize
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
