"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowLeft, ShoppingBag, MapPin, Star, Clock, Heart, Bookmark } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const shoppingSpots = [
  {
    id: 1,
    name: "Anjuna Flea Market",
    location: "Anjuna Beach, Goa",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.7,
    type: "Market",
    description: "Famous hippie market with clothing, jewelry, and souvenirs",
    bestFor: ["Souvenirs", "Clothing", "Jewelry"],
    openingHours: "Wednesday, 9 AM - 6 PM",
    priceRange: "₹₹",
  },
  {
    id: 2,
    name: "Tibetan Market",
    location: "Mall Road, Manali",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    type: "Street Market",
    description: "Colorful market with Tibetan handicrafts and winter clothing",
    bestFor: ["Woolen Items", "Handicrafts", "Winter Wear"],
    openingHours: "Daily, 10 AM - 8 PM",
    priceRange: "₹₹",
  },
  {
    id: 3,
    name: "Jew Town",
    location: "Fort Kochi, Kerala",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.8,
    type: "Heritage Market",
    description: "Historic area with antique shops and spice markets",
    bestFor: ["Antiques", "Spices", "Art"],
    openingHours: "Daily, 9 AM - 7 PM (Closed on Jewish holidays)",
    priceRange: "₹₹₹",
  },
  {
    id: 4,
    name: "Johari Bazaar",
    location: "Jaipur, Rajasthan",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.6,
    type: "Traditional Market",
    description: "Famous jewelry market with traditional Rajasthani designs",
    bestFor: ["Jewelry", "Gemstones", "Traditional Wear"],
    openingHours: "Daily, 10:30 AM - 7 PM",
    priceRange: "₹₹₹",
  },
  {
    id: 5,
    name: "Dilli Haat",
    location: "INA, New Delhi",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.4,
    type: "Crafts Market",
    description: "Permanent market showcasing handicrafts from all over India",
    bestFor: ["Handicrafts", "Textiles", "Regional Food"],
    openingHours: "Daily, 11 AM - 9 PM",
    priceRange: "₹₹",
  },
  {
    id: 6,
    name: "Commercial Street",
    location: "Bangalore, Karnataka",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.3,
    type: "Shopping Street",
    description: "Bustling shopping area with boutiques and street vendors",
    bestFor: ["Fashion", "Accessories", "Street Shopping"],
    openingHours: "Daily, 10 AM - 9 PM (Sundays may vary)",
    priceRange: "₹₹",
  },
]

const categories = ["All", "Markets", "Street Shopping", "Malls", "Boutiques", "Handicrafts", "Souvenirs"]

export default function ShoppingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [likedSpots, setLikedSpots] = useState<number[]>([])
  const [savedSpots, setSavedSpots] = useState<number[]>([])

  const toggleLike = (id: number) => {
    setLikedSpots((prev) => (prev.includes(id) ? prev.filter((spotId) => spotId !== id) : [...prev, id]))
  }

  const toggleSave = (id: number) => {
    setSavedSpots((prev) => (prev.includes(id) ? prev.filter((spotId) => spotId !== id) : [...prev, id]))
  }

  const filteredSpots = shoppingSpots.filter((spot) => {
    const matchesSearch =
      searchQuery === "" ||
      spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.bestFor.some((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || spot.type.includes(selectedCategory)

    return matchesSearch && matchesCategory
  })

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
                  Local Shopping
                </h1>
                <p className="text-amber-600">Discover authentic markets & boutiques</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-amber-100 text-amber-800 border-amber-300">
                <ShoppingBag className="w-3 h-3 mr-1" />
                Shopping Guide
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-amber-500" />
            <Input
              placeholder="Search markets, souvenirs, locations..."
              className="pl-10 border-amber-300 focus:border-amber-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-amber-600 hover:bg-amber-700 text-white"
                    : "border-amber-300 text-amber-700 hover:bg-amber-50"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Shopping Spots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpots.map((spot) => (
            <Card
              key={spot.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-amber-200 cursor-pointer hover:scale-105"
              onClick={() => alert(`🛍️ Opening ${spot.name} details...`)}
            >
              <div className="relative">
                <Image
                  src={spot.image || "/placeholder.svg"}
                  alt={spot.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-white/90 text-amber-800 border-amber-300">
                    <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {spot.rating}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 flex space-x-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="w-8 h-8 bg-white/80 hover:bg-white transition-all duration-200"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleLike(spot.id)
                    }}
                  >
                    <Heart
                      className={`w-4 h-4 transition-all duration-300 ${
                        likedSpots.includes(spot.id) ? "fill-red-500 text-red-500" : "text-amber-600"
                      }`}
                    />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="w-8 h-8 bg-white/80 hover:bg-white transition-all duration-200"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleSave(spot.id)
                    }}
                  >
                    <Bookmark
                      className={`w-4 h-4 transition-all duration-300 ${
                        savedSpots.includes(spot.id) ? "fill-amber-600 text-amber-600" : "text-amber-600"
                      }`}
                    />
                  </Button>
                </div>
                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-amber-600 text-white">{spot.type}</Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-amber-900 group-hover:text-amber-700 transition-colors font-serif">
                      {spot.name}
                    </h3>
                    <p className="text-sm text-amber-600 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {spot.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-amber-800">{spot.priceRange}</span>
                  </div>
                </div>

                <p className="text-sm text-amber-700 mb-3">{spot.description}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {spot.bestFor.map((item, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-amber-100 text-amber-700">
                      {item}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center text-xs text-amber-600 mb-3">
                  <Clock className="w-3 h-3 mr-1" />
                  {spot.openingHours}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-amber-300 text-amber-700 hover:bg-amber-50"
                    onClick={(e) => {
                      e.stopPropagation()
                      alert(`🗺️ Getting directions to ${spot.name}...`)
                    }}
                  >
                    <MapPin className="w-3 h-3 mr-1" />
                    Directions
                  </Button>
                  <Button
                    size="sm"
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      alert(`📱 Opening ${spot.name} details...`)
                    }}
                  >
                    <ShoppingBag className="w-3 h-3 mr-1" />
                    Explore
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSpots.length === 0 && (
          <Card className="border-amber-200 p-8 text-center">
            <ShoppingBag className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-amber-800 mb-2 font-serif">No shopping spots found</h3>
            <p className="text-amber-600 mb-4">Try adjusting your search or category filters.</p>
            <Button
              className="bg-amber-600 hover:bg-amber-700 text-white"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
              }}
            >
              Clear Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
