"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  MapPin,
  Star,
  Heart,
  Camera,
  Sparkles,
  Zap,
  Coffee,
  Mountain,
  Waves,
  Music,
  ShoppingBag,
  Calendar,
  Wallet,
  Users,
  Bell,
  Award,
  Wifi,
  WifiOff,
  Sun,
  User,
  Bookmark,
  Map,
  Phone,
  MessageCircle,
  Shirt,
  UserCheck,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const moods = [
  { name: "Chill", icon: Coffee, color: "bg-amber-100 text-amber-800", emoji: "☕" },
  { name: "Adventure", icon: Mountain, color: "bg-green-100 text-green-800", emoji: "🏔️" },
  { name: "Romantic", icon: Heart, color: "bg-rose-100 text-rose-800", emoji: "💕" },
  { name: "Party", icon: Music, color: "bg-purple-100 text-purple-800", emoji: "🎉" },
  { name: "Cultural", icon: Star, color: "bg-orange-100 text-orange-800", emoji: "🏛️" },
  { name: "Beach", icon: Waves, color: "bg-blue-100 text-blue-800", emoji: "🏖️" },
]

const destinations = [
  {
    id: 1,
    name: "Goa Vibes",
    location: "Goa",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.8,
    price: "₹8,999",
    mood: "Chill",
    days: "3-5 days",
    vibe: "Beach • Nightlife • Chill",
    aiScore: 95,
    outfits: [
      { type: "Beach Day", items: ["Flowy sundress", "Sandals", "Sun hat", "Sunglasses"], weather: "Sunny 28°C" },
      { type: "Night Out", items: ["Casual shirt", "Shorts", "Sneakers", "Light jacket"], weather: "Cool 22°C" },
      {
        type: "Water Sports",
        items: ["Swimwear", "Rash guard", "Water shoes", "Quick-dry shorts"],
        weather: "Hot 30°C",
      },
    ],
  },
  {
    id: 2,
    name: "Himachal Escape",
    location: "Manali, HP",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.7,
    price: "₹12,999",
    mood: "Adventure",
    days: "5-7 days",
    vibe: "Mountains • Trekking • Snow",
    aiScore: 92,
    outfits: [
      {
        type: "Trekking",
        items: ["Thermal wear", "Hiking boots", "Windproof jacket", "Trekking pants"],
        weather: "Cold 5°C",
      },
      { type: "Casual Day", items: ["Warm sweater", "Jeans", "Comfortable shoes", "Beanie"], weather: "Cool 12°C" },
      { type: "Evening", items: ["Hoodie", "Warm pants", "Woolen socks", "Gloves"], weather: "Freezing 2°C" },
    ],
  },
  {
    id: 3,
    name: "Kerala Backwaters",
    location: "Alleppey, Kerala",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.9,
    price: "₹15,999",
    mood: "Romantic",
    days: "4-6 days",
    vibe: "Houseboat • Nature • Peaceful",
    aiScore: 98,
    outfits: [
      {
        type: "Houseboat",
        items: ["Cotton kurta", "Comfortable pants", "Slip-on shoes", "Light scarf"],
        weather: "Humid 26°C",
      },
      {
        type: "Temple Visit",
        items: ["Modest dress", "Covered shoulders", "Comfortable flats", "Dupatta"],
        weather: "Warm 24°C",
      },
      {
        type: "Backwater Tour",
        items: ["Breathable shirt", "Light pants", "Sun protection", "Comfortable sandals"],
        weather: "Hot 29°C",
      },
    ],
  },
]

const travelBuddies = [
  { name: "Arjun", avatar: "/placeholder.svg?height=40&width=40", location: "Mumbai", trips: 12, badge: "Explorer" },
  { name: "Priya", avatar: "/placeholder.svg?height=40&width=40", location: "Delhi", trips: 8, badge: "Foodie" },
  {
    name: "Rohan",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "Bangalore",
    trips: 15,
    badge: "Adventurer",
  },
]

// Indian tourist spots for carousel
const touristSpots = [
  {
    id: 1,
    name: "Taj Mahal, Agra",
    image: "/placeholder.svg?height=500&width=800",
    type: "Heritage",
  },
  {
    id: 2,
    name: "Beaches of Goa",
    image: "/placeholder.svg?height=500&width=800",
    type: "Beach",
  },
  {
    id: 3,
    name: "Varanasi Ghats",
    image: "/placeholder.svg?height=500&width=800",
    type: "Spiritual",
  },
  {
    id: 4,
    name: "Jaipur City Palace",
    image: "/placeholder.svg?height=500&width=800",
    type: "Heritage",
  },
  {
    id: 5,
    name: "Backwaters of Kerala",
    image: "/placeholder.svg?height=500&width=800",
    type: "Nature",
  },
  {
    id: 6,
    name: "Valley of Flowers, Uttarakhand",
    image: "/placeholder.svg?height=500&width=800",
    type: "Nature",
  },
]

export default function RovaaApp() {
  const [selectedMood, setSelectedMood] = useState("")
  const [budget, setBudget] = useState("15000")
  const [days, setDays] = useState("5")
  const [currentUser, setCurrentUser] = useState({
    name: "Alex",
    level: 5,
    xp: 2340,
    nextLevelXp: 3000,
    badges: ["First Trip", "Foodie", "Explorer"],
    avatar: "/placeholder.svg?height=40&width=40",
  })
  const [isOnline, setIsOnline] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [likedDestinations, setLikedDestinations] = useState<number[]>([])
  const [notifications, setNotifications] = useState(3)
  const [showAIChat, setShowAIChat] = useState(false)
  const [aiMessage, setAiMessage] = useState("Hey! Need help planning? 🌟")
  const [showOutfitInspo, setShowOutfitInspo] = useState<number | null>(null)
  const [showEmergencyModal, setShowEmergencyModal] = useState(false)
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [selectedTravelStyle, setSelectedTravelStyle] = useState("")

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Carousel functionality
  const nextSlide = () => {
    setCurrentCarouselIndex((prevIndex) => (prevIndex + 1) % touristSpots.length)
  }

  const prevSlide = () => {
    setCurrentCarouselIndex((prevIndex) => (prevIndex - 1 + touristSpots.length) % touristSpots.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const toggleLike = (id: number) => {
    setLikedDestinations((prev) => (prev.includes(id) ? prev.filter((destId) => destId !== id) : [...prev, id]))
  }

  const generateTrip = () => {
    if (!selectedMood) {
      alert("Please select your mood first! 😊")
      return
    }

    // Simulate AI trip generation
    setAiMessage(
      `Perfect! I'm creating a ${selectedMood.toLowerCase()} trip for ${days} days within ₹${budget}. Give me a moment... ✨`,
    )

    setTimeout(() => {
      setAiMessage(`Your ${selectedMood.toLowerCase()} adventure is ready! Check out the curated destinations below 🎉`)
    }, 2000)
  }

  const handleQuickFeature = (feature: string) => {
    switch (feature) {
      case "shopping":
        window.location.href = "/shopping"
        break
      case "photos":
        window.location.href = "/memories"
        break
      case "budget":
        window.location.href = "/trips"
        break
      case "weather":
        // Open weather modal
        alert(
          "🌤️ Weather forecast for your destination: Sunny with occasional showers. Pack light clothes and an umbrella!",
        )
        break
      case "buddies":
        window.location.href = "/social"
        break
      case "maps":
        // Open offline maps
        alert("🗺️ Offline maps for Goa have been downloaded. You can access them without internet connection.")
        break
    }
  }

  const handleEmergencyAction = (action: string) => {
    switch (action) {
      case "police":
        window.location.href = "tel:100"
        break
      case "ambulance":
        window.location.href = "tel:108"
        break
      case "tourist":
        window.location.href = "tel:1363"
        break
      case "family":
        setShowEmergencyModal(true)
        break
    }
  }

  const notifyFamily = () => {
    // In a real app, this would send notifications to emergency contacts
    alert("📱 Emergency notification sent to family members with your location and situation. Stay safe!")
    setShowEmergencyModal(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-x-hidden">
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200/20 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-orange-200/20 rounded-full"></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-yellow-200/20 rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-amber-200/20 rounded-full"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-amber-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold font-serif bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent">
                  rovaa
                </h1>
                <p className="text-xs text-amber-600 font-medium">your ai travel buddy</p>
              </div>
            </Link>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                {isOnline ? <Wifi className="w-4 h-4 text-green-600" /> : <WifiOff className="w-4 h-4 text-red-600" />}
                <span className="text-xs text-amber-700">{isOnline ? "Online" : "Offline Mode"}</span>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => {
                  setNotifications(0)
                  alert("🔔 Notifications: New travel buddy request from Priya! Goa beach cleanup event tomorrow!")
                }}
              >
                <Bell className="w-5 h-5 text-amber-700" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Button>

              <Link href="/profile">
                <Avatar className="w-8 h-8 border-2 border-amber-300 cursor-pointer hover:border-amber-400 transition-all duration-300">
                  <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-amber-100 text-amber-800">{currentUser.name[0]}</AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* AI Avatar Guide - Simplified */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <Button
            className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
            onClick={() => setShowAIChat(!showAIChat)}
          >
            <Sparkles className="w-8 h-8 text-white" />
          </Button>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">AI</span>
          </div>
          {showAIChat && (
            <div className="absolute bottom-20 right-0 bg-white rounded-lg px-4 py-3 shadow-xl border border-amber-200 max-w-64">
              <p className="text-sm text-amber-800">{aiMessage}</p>
              <div className="flex space-x-2 mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs border-amber-300"
                  onClick={() => alert("🧠 AI is planning your perfect trip...")}
                >
                  Plan Trip
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs border-amber-300"
                  onClick={() => alert("❓ What would you like to know about your destination?")}
                >
                  Ask Question
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Stats Bar */}
      <div className="bg-gradient-to-r from-amber-100 to-orange-100 border-b border-amber-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-800">Level {currentUser.level}</span>
              </div>
              <div className="flex-1 max-w-32">
                <Progress value={(currentUser.xp / currentUser.nextLevelXp) * 100} className="h-2 bg-amber-200" />
              </div>
              <span className="text-xs text-amber-600">
                {currentUser.xp}/{currentUser.nextLevelXp} XP
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {currentUser.badges.slice(0, 3).map((badge, index) => (
                <Badge key={index} variant="secondary" className="bg-amber-200 text-amber-800 text-xs">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Carousel */}
      <section className="py-8 px-4 relative">
        <div className="container mx-auto">
          {/* Image Carousel */}
          <div className="relative h-[300px] md:h-[400px] mb-8 rounded-xl overflow-hidden">
            <div
              ref={carouselRef}
              className="absolute inset-0 w-full h-full transition-opacity duration-1000"
              style={{ opacity: 0.7 }}
            >
              {touristSpots.map((spot, index) => (
                <div
                  key={spot.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentCarouselIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={spot.image || "/placeholder.svg"}
                    alt={spot.name}
                    fill
                    className="object-cover"
                    priority={index === currentCarouselIndex}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-serif font-bold">{spot.name}</h3>
                    <p className="text-sm">{spot.type}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Carousel Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {touristSpots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCarouselIndex(index)}
                  className={`w-2 h-2 rounded-full ${index === currentCarouselIndex ? "bg-white" : "bg-white/50"}`}
                ></button>
              ))}
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white mr-2" />
                <Badge className="bg-white/80 text-amber-800 border-amber-300">AI-Powered Trip Planning</Badge>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white font-serif">what's your vibe today?</h2>

              <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
                Tell me your mood, budget & days - I'll craft the perfect Indian adventure just for you ✨
              </p>
            </div>
          </div>

          {/* Mood Selection */}
          <div className="max-w-4xl mx-auto mb-8">
            <h3 className="text-xl font-semibold text-amber-800 mb-4 text-center font-serif">Pick Your Mood</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {moods.map((mood) => {
                const Icon = mood.icon
                return (
                  <Button
                    key={mood.name}
                    variant={selectedMood === mood.name ? "default" : "outline"}
                    onClick={() => setSelectedMood(mood.name)}
                    className={`h-20 flex-col space-y-2 transition-all duration-300 hover:scale-105 ${
                      selectedMood === mood.name
                        ? "bg-amber-600 hover:bg-amber-700 text-white shadow-lg"
                        : "border-amber-300 hover:bg-amber-50 hover:shadow-md"
                    }`}
                  >
                    <span className="text-2xl">{mood.emoji}</span>
                    <span className="text-sm font-medium">{mood.name}</span>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Trip Parameters */}
          <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm border-amber-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="text-sm font-semibold text-amber-800 mb-2 block">Budget Range</label>
                  <div className="space-y-2">
                    <Input
                      type="range"
                      min="5000"
                      max="100000"
                      step="1000"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full accent-amber-600"
                    />
                    <div className="flex justify-between text-xs text-amber-600">
                      <span>₹5K</span>
                      <span className="font-semibold">₹{(Number.parseInt(budget) / 1000).toFixed(0)}K</span>
                      <span>₹100K</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-amber-800 mb-2 block">Trip Duration</label>
                  <div className="space-y-2">
                    <Input
                      type="range"
                      min="1"
                      max="15"
                      value={days}
                      onChange={(e) => setDays(e.target.value)}
                      className="w-full accent-amber-600"
                    />
                    <div className="flex justify-between text-xs text-amber-600">
                      <span>1 day</span>
                      <span className="font-semibold">{days} days</span>
                      <span>15 days</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-amber-800 mb-2 block">Travel Style</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Solo", "Group", "Couple", "Family"].map((style) => (
                      <Button
                        key={style}
                        variant={selectedTravelStyle === style ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTravelStyle(style)}
                        className={
                          selectedTravelStyle === style
                            ? "bg-amber-600 hover:bg-amber-700 text-white"
                            : "border-amber-300 hover:bg-amber-50"
                        }
                      >
                        {style}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                onClick={generateTrip}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate My Perfect Trip ✨
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* AI Suggestions */}
      <section className="py-12 px-4 bg-gradient-to-r from-amber-100/50 to-orange-100/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-amber-800 font-serif">AI Curated for You</h3>
              <p className="text-amber-600">Based on your vibe & preferences</p>
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-300">
              <Zap className="w-3 h-3 mr-1" />
              Live AI Matching
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <Card
                key={destination.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-amber-200 cursor-pointer hover:scale-105"
                onClick={() => alert(`🎯 Opening ${destination.name} details... Book now or add to wishlist!`)}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 text-amber-800 border-amber-300">
                      <Sparkles className="w-3 h-3 mr-1" />
                      {destination.aiScore}% Match
                    </Badge>
                  </div>

                  <div className="absolute top-3 right-3 flex space-x-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="w-8 h-8 bg-white/80 hover:bg-white transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleLike(destination.id)
                      }}
                    >
                      <Heart
                        className={`w-4 h-4 transition-all duration-300 ${likedDestinations.includes(destination.id) ? "fill-red-500 text-red-500" : "text-amber-600"}`}
                      />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="w-8 h-8 bg-white/80 hover:bg-white transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation()
                        alert("📌 Added to your travel wishlist!")
                      }}
                    >
                      <Bookmark className="w-4 h-4 text-amber-600" />
                    </Button>
                  </div>

                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-amber-600 text-white">{destination.mood}</Badge>
                  </div>

                  {/* Outfit Inspiration Button */}
                  <div className="absolute bottom-3 right-3">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="w-8 h-8 bg-white/80 hover:bg-white transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowOutfitInspo(destination.id)
                      }}
                    >
                      <Shirt className="w-4 h-4 text-purple-600" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-lg text-amber-900 group-hover:text-amber-700 transition-colors font-serif">
                        {destination.name}
                      </h4>
                      <p className="text-sm text-amber-600 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {destination.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{destination.rating}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-amber-700 mb-3">{destination.vibe}</p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-amber-600">{destination.days}</span>
                    <div>
                      <span className="text-xl font-bold text-amber-800">{destination.price}</span>
                      <span className="text-sm text-amber-600">/person</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-300 text-amber-700 hover:bg-amber-50"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.location.href = `/plan-trip?destination=${encodeURIComponent(destination.name)}&location=${encodeURIComponent(destination.location)}&price=${destination.price}&mood=${destination.mood}`
                      }}
                    >
                      <Calendar className="w-3 h-3 mr-1" />
                      Plan Trip
                    </Button>
                    <Button
                      size="sm"
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        alert(`✨ Exploring ${destination.name} details...`)
                      }}
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      Explore
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Features Grid - Functional */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold text-center text-amber-800 mb-8 font-serif">Everything You Need</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: ShoppingBag, label: "Local Shopping", feature: "shopping" },
              { icon: Camera, label: "Photo Album", feature: "photos" },
              { icon: Wallet, label: "Budget Tracker", feature: "budget" },
              { icon: Sun, label: "Weather AI", feature: "weather" },
              { icon: Users, label: "Travel Buddies", feature: "buddies" },
              { icon: Map, label: "Offline Maps", feature: "maps" },
            ].map((item) => (
              <Card
                key={item.feature}
                className="p-4 text-center hover:shadow-lg transition-all duration-300 border-amber-200 cursor-pointer hover:scale-105"
                onClick={() => handleQuickFeature(item.feature)}
              >
                <item.icon className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-amber-800">{item.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Buddies Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-orange-100/50 to-yellow-100/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-amber-800 font-serif">Connect with Travel Buddies</h3>
              <p className="text-amber-600">Find like-minded travelers & locals</p>
            </div>
            <Link href="/social">
              <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
                <Users className="w-4 h-4 mr-2" />
                Find Buddies
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {travelBuddies.map((buddy, index) => (
              <Card
                key={index}
                className="p-4 border-amber-200 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="w-12 h-12 border-2 border-amber-300">
                    <AvatarImage src={buddy.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-amber-100 text-amber-800">{buddy.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-amber-900">{buddy.name}</h4>
                    <p className="text-sm text-amber-600">{buddy.location}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                      {buddy.badge}
                    </Badge>
                    <span className="text-xs text-amber-600">{buddy.trips} trips</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-amber-300 text-amber-700 hover:bg-amber-50"
                    onClick={() => (window.location.href = "/social")}
                  >
                    <MessageCircle className="w-3 h-3 mr-1" />
                    Connect
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-amber-200 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-around">
            {[
              { href: "/", icon: Search, label: "Explore" },
              { href: "/trips", icon: Calendar, label: "Trips" },
              { href: "/memories", icon: Camera, label: "Memories" },
              { href: "/social", icon: Users, label: "Buddies" },
              { href: "/profile", icon: User, label: "Profile" },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <Button variant="ghost" size="sm" className="flex-col space-y-1 text-amber-700 hover:bg-amber-50">
                  <item.icon className="w-5 h-5" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Button - Simplified */}
      <div className="fixed bottom-20 left-6 z-50">
        <div className="relative group">
          <Button
            size="icon"
            className="w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-xl"
            onClick={() => setShowEmergencyModal(true)}
          >
            <Phone className="w-6 h-6" />
          </Button>

          {/* Emergency Quick Actions */}
          <div className="absolute bottom-16 left-0 opacity-0 group-hover:opacity-100 transition-all duration-300 space-y-2">
            <Button
              size="sm"
              className="bg-red-500 hover:bg-red-600 text-white shadow-lg"
              onClick={() => handleEmergencyAction("police")}
            >
              🚨 Police
            </Button>
            <Button
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
              onClick={() => handleEmergencyAction("ambulance")}
            >
              🚑 Ambulance
            </Button>
            <Button
              size="sm"
              className="bg-green-500 hover:bg-green-600 text-white shadow-lg"
              onClick={() => handleEmergencyAction("tourist")}
            >
              ℹ️ Tourist Help
            </Button>
            <Button
              size="sm"
              className="bg-purple-500 hover:bg-purple-600 text-white shadow-lg"
              onClick={() => handleEmergencyAction("family")}
            >
              👨‍👩‍👧‍👦 Notify Family
            </Button>
          </div>
        </div>
      </div>

      {/* Outfit Inspiration Modal */}
      {showOutfitInspo && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-purple-800 flex items-center font-serif">
                  <Shirt className="w-6 h-6 mr-2" />
                  Outfit Inspiration
                </h3>
                <Button variant="ghost" size="icon" onClick={() => setShowOutfitInspo(null)}>
                  ✕
                </Button>
              </div>

              {destinations
                .find((d) => d.id === showOutfitInspo)
                ?.outfits.map((outfit, index) => (
                  <Card key={index} className="mb-4 border-purple-200 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-purple-800 font-serif">{outfit.type}</h4>
                        <Badge className="bg-blue-100 text-blue-800">{outfit.weather}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {outfit.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center space-x-2 p-2 bg-purple-50 rounded-lg">
                            <Shirt className="w-4 h-4 text-purple-600" />
                            <span className="text-sm text-purple-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}

              <div className="mt-6 text-center">
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => {
                    alert("🛍️ Opening shopping recommendations for these outfits...")
                    setShowOutfitInspo(null)
                  }}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Shop These Items
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Family Notification Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-red-800 flex items-center font-serif">
                  <AlertTriangle className="w-6 h-6 mr-2 text-red-600" />
                  Emergency Alert
                </h3>
                <Button variant="ghost" size="icon" onClick={() => setShowEmergencyModal(false)}>
                  ✕
                </Button>
              </div>

              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="text-sm text-red-800 mb-3">
                    This will immediately notify your emergency contacts with:
                  </p>
                  <ul className="text-xs text-red-700 space-y-1">
                    <li>• Your current location</li>
                    <li>• Emergency situation alert</li>
                    <li>• Your travel itinerary</li>
                    <li>• Local emergency numbers</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">Emergency Contacts:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                      <UserCheck className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Mom - +91 98765 43210</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                      <UserCheck className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Dad - +91 98765 43211</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                      <UserCheck className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Emergency Contact - +91 98765 43212</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <Button variant="outline" className="flex-1" onClick={() => setShowEmergencyModal(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white" onClick={notifyFamily}>
                    Send Alert
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Padding for bottom nav */}
      <div className="h-20"></div>
    </div>
  )
}
