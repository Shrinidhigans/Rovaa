"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Heart,
  Share2,
  Download,
  Plus,
  Search,
  Grid,
  List,
  Camera,
  MapPin,
  Calendar,
  Bookmark,
  Edit,
  ImageIcon,
  Video,
  Music,
  FileText,
} from "lucide-react"
import Image from "next/image"

const moodboardItems = [
  {
    id: 1,
    type: "image",
    src: "/placeholder.svg?height=300&width=400",
    title: "Sunset at Anjuna Beach",
    location: "Goa",
    date: "March 15, 2024",
    notes: "Perfect golden hour vibes! The colors were absolutely magical ✨",
    tags: ["sunset", "beach", "golden hour", "peaceful"],
    likes: 24,
    isLiked: true,
  },
  {
    id: 2,
    type: "image",
    src: "/placeholder.svg?height=400&width=300",
    title: "Street Food Adventure",
    location: "Old Goa",
    date: "March 16, 2024",
    notes: "Best pav bhaji ever! The vendor was so sweet and shared stories about his family recipe 🍞",
    tags: ["food", "street food", "local", "authentic"],
    likes: 18,
    isLiked: false,
  },
  {
    id: 3,
    type: "video",
    src: "/placeholder.svg?height=300&width=300",
    title: "Dolphin Spotting",
    location: "Palolem Beach",
    date: "March 17, 2024",
    notes: "Saw a pod of dolphins! They were so playful and came really close to our boat 🐬",
    tags: ["dolphins", "boat ride", "wildlife", "adventure"],
    likes: 31,
    isLiked: true,
  },
  {
    id: 4,
    type: "note",
    title: "Travel Reflections",
    date: "March 18, 2024",
    notes:
      "This trip taught me so much about slowing down and appreciating the little moments. The people here are incredibly warm and welcoming. I feel so grateful for this experience and can't wait to come back! 💕",
    tags: ["reflection", "gratitude", "memories", "personal"],
    likes: 12,
    isLiked: true,
  },
  {
    id: 5,
    type: "image",
    src: "/placeholder.svg?height=350&width=400",
    title: "Spice Plantation Tour",
    location: "Ponda, Goa",
    date: "March 16, 2024",
    notes: "Learned so much about cardamom, pepper, and vanilla cultivation. The lunch was incredible! 🌿",
    tags: ["spices", "plantation", "learning", "nature"],
    likes: 15,
    isLiked: false,
  },
  {
    id: 6,
    type: "image",
    src: "/placeholder.svg?height=300&width=350",
    title: "Night Market Vibes",
    location: "Arpora Saturday Night Market",
    date: "March 17, 2024",
    notes: "Found the most beautiful handmade jewelry and textiles. The live music was amazing too! 🎵",
    tags: ["shopping", "night market", "handicrafts", "music"],
    likes: 22,
    isLiked: true,
  },
]

const inspirationPins = [
  {
    id: 1,
    src: "/placeholder.svg?height=250&width=300",
    title: "Kerala Backwaters Inspiration",
    source: "Pinterest",
    tags: ["kerala", "backwaters", "houseboat"],
  },
  {
    id: 2,
    src: "/placeholder.svg?height=300&width=250",
    title: "Rajasthan Palace Goals",
    source: "Instagram",
    tags: ["rajasthan", "palace", "architecture"],
  },
  {
    id: 3,
    src: "/placeholder.svg?height=280&width=300",
    title: "Himachal Adventure Inspo",
    source: "Pinterest",
    tags: ["himachal", "mountains", "trekking"],
  },
]

export default function MoodBoard() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [viewMode, setViewMode] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [newNote, setNewNote] = useState("")

  const getItemIcon = (type: string) => {
    switch (type) {
      case "image":
        return ImageIcon
      case "video":
        return Video
      case "note":
        return FileText
      case "audio":
        return Music
      default:
        return FileText
    }
  }

  const filteredItems = moodboardItems.filter((item) => {
    const matchesFilter = selectedFilter === "all" || item.type === selectedFilter
    const matchesSearch =
      searchQuery === "" ||
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-amber-800">Trip MoodBoard</h1>
              <p className="text-amber-600">Goa Beach Getaway • March 2024</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="border-amber-300 text-amber-700">
                <Share2 className="w-4 h-4 mr-2" />
                Share Board
              </Button>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-amber-500" />
              <Input
                placeholder="Search memories, notes, or tags..."
                className="pl-10 border-amber-300 focus:border-amber-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex space-x-2">
              <Button
                variant={selectedFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("all")}
                className={selectedFilter === "all" ? "bg-amber-600" : "border-amber-300 text-amber-700"}
              >
                All
              </Button>
              <Button
                variant={selectedFilter === "image" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("image")}
                className={selectedFilter === "image" ? "bg-amber-600" : "border-amber-300 text-amber-700"}
              >
                <ImageIcon className="w-3 h-3 mr-1" />
                Photos
              </Button>
              <Button
                variant={selectedFilter === "video" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("video")}
                className={selectedFilter === "video" ? "bg-amber-600" : "border-amber-300 text-amber-700"}
              >
                <Video className="w-3 h-3 mr-1" />
                Videos
              </Button>
              <Button
                variant={selectedFilter === "note" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("note")}
                className={selectedFilter === "note" ? "bg-amber-600" : "border-amber-300 text-amber-700"}
              >
                <FileText className="w-3 h-3 mr-1" />
                Notes
              </Button>
            </div>

            <div className="flex space-x-1 border border-amber-300 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-amber-600" : ""}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-amber-600" : ""}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main MoodBoard */}
          <div className="lg:col-span-3">
            {/* Quick Add Section */}
            <Card className="mb-6 border-amber-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-amber-300 text-amber-700"
                    onClick={() => setIsAddingNote(!isAddingNote)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Note
                  </Button>
                  <Button size="sm" variant="outline" className="border-amber-300 text-amber-700">
                    <Camera className="w-4 h-4 mr-2" />
                    Add Photo
                  </Button>
                  <Button size="sm" variant="outline" className="border-amber-300 text-amber-700">
                    <Video className="w-4 h-4 mr-2" />
                    Add Video
                  </Button>
                </div>

                {isAddingNote && (
                  <div className="mt-4 space-y-3">
                    <Textarea
                      placeholder="What's on your mind about this trip?"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="border-amber-300 focus:border-amber-500"
                    />
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                        Save Note
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsAddingNote(false)}
                        className="border-amber-300"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* MoodBoard Items */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredItems.map((item) => {
                const Icon = getItemIcon(item.type)
                return (
                  <Card
                    key={item.id}
                    className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-amber-200"
                  >
                    {item.type === "image" || item.type === "video" ? (
                      <div className="relative">
                        <Image
                          src={item.src || "/placeholder.svg"}
                          alt={item.title || "Memory"}
                          width={400}
                          height={300}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {item.type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                              <Video className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        )}
                        <div className="absolute top-3 right-3 flex space-x-2">
                          <Button size="icon" variant="secondary" className="w-8 h-8 bg-white/80 hover:bg-white">
                            <Heart
                              className={`w-4 h-4 ${item.isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                            />
                          </Button>
                          <Button size="icon" variant="secondary" className="w-8 h-8 bg-white/80 hover:bg-white">
                            <Bookmark className="w-4 h-4 text-gray-600" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-b border-amber-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon className="w-5 h-5 text-amber-600" />
                          <span className="font-semibold text-amber-800">{item.title}</span>
                        </div>
                      </div>
                    )}

                    <CardContent className="p-4">
                      {item.title && item.type !== "note" && (
                        <h4 className="font-semibold text-amber-900 mb-2">{item.title}</h4>
                      )}

                      {item.location && (
                        <p className="text-sm text-amber-600 flex items-center mb-2">
                          <MapPin className="w-3 h-3 mr-1" />
                          {item.location}
                        </p>
                      )}

                      {item.date && (
                        <p className="text-sm text-amber-600 flex items-center mb-3">
                          <Calendar className="w-3 h-3 mr-1" />
                          {item.date}
                        </p>
                      )}

                      <p className="text-sm text-amber-700 mb-3 line-clamp-3">{item.notes}</p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-amber-100 text-amber-700">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Heart
                            className={`w-4 h-4 ${item.isLiked ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                          />
                          <span className="text-sm text-amber-600">{item.likes}</span>
                        </div>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost" className="text-amber-600">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-amber-600">
                            <Share2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trip Stats */}
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-800">Trip Memories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-amber-600">Photos</span>
                    <span className="font-semibold text-amber-800">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-amber-600">Videos</span>
                    <span className="font-semibold text-amber-800">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-amber-600">Notes</span>
                    <span className="font-semibold text-amber-800">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-amber-600">Total Likes</span>
                    <span className="font-semibold text-amber-800">156</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Travel Inspiration */}
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-800">Travel Inspiration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inspirationPins.map((pin) => (
                    <div key={pin.id} className="relative group cursor-pointer">
                      <Image
                        src={pin.src || "/placeholder.svg"}
                        alt={pin.title}
                        width={300}
                        height={200}
                        className="w-full h-24 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button size="sm" className="bg-white/90 text-amber-800 hover:bg-white">
                          <Plus className="w-3 h-3 mr-1" />
                          Pin
                        </Button>
                      </div>
                      <div className="mt-2">
                        <h5 className="text-sm font-semibold text-amber-800">{pin.title}</h5>
                        <p className="text-xs text-amber-600">{pin.source}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {pin.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-amber-100 text-amber-700">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button size="sm" variant="outline" className="w-full mt-4 border-amber-300 text-amber-700">
                  <Search className="w-3 h-3 mr-1" />
                  Find More Inspiration
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button size="sm" variant="outline" className="w-full border-amber-300 text-amber-700">
                  <Download className="w-4 h-4 mr-2" />
                  Create Collage
                </Button>
                <Button size="sm" variant="outline" className="w-full border-amber-300 text-amber-700">
                  <Video className="w-4 h-4 mr-2" />
                  Make Reel
                </Button>
                <Button size="sm" variant="outline" className="w-full border-amber-300 text-amber-700">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Story
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
