"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  MapPin,
  Calendar,
  Star,
  Award,
  Camera,
  Edit,
  Settings,
  Share2,
  ArrowLeft,
  Trophy,
  Target,
  Globe,
  Users,
  Wallet,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const userProfile = {
  name: "Alex Kumar",
  username: "@alexwanderer",
  email: "alex@example.com",
  phone: "+91 98765 43210",
  location: "Mumbai, Maharashtra",
  bio: "Adventure seeker and culture enthusiast. Love exploring hidden gems across India and connecting with fellow travelers! 🌟",
  avatar: "/placeholder.svg?height=120&width=120",
  coverImage: "/placeholder.svg?height=200&width=800",
  joinDate: "January 2023",
  level: 5,
  xp: 2340,
  nextLevelXp: 3000,
  totalTrips: 12,
  countries: 1,
  cities: 15,
  badges: [
    { name: "First Trip", icon: "🎯", earned: "Jan 2023" },
    { name: "Foodie Explorer", icon: "🍜", earned: "Mar 2023" },
    { name: "Culture Buff", icon: "🏛️", earned: "Jun 2023" },
    { name: "Adventure Seeker", icon: "🏔️", earned: "Sep 2023" },
    { name: "Social Butterfly", icon: "🦋", earned: "Dec 2023" },
    { name: "Photo Master", icon: "📸", earned: "Feb 2024" },
  ],
  interests: ["Adventure", "Culture", "Food", "Photography", "Solo Travel"],
  languages: ["Hindi", "English", "Marathi"],
  verified: true,
}

const recentTrips = [
  {
    id: 1,
    name: "Goa Beach Getaway",
    location: "Goa",
    date: "March 2024",
    image: "/placeholder.svg?height=150&width=200",
    rating: 4.8,
    memories: 24,
  },
  {
    id: 2,
    name: "Rajasthan Royal Tour",
    location: "Jaipur, Rajasthan",
    date: "February 2024",
    image: "/placeholder.svg?height=150&width=200",
    rating: 4.9,
    memories: 31,
  },
  {
    id: 3,
    name: "Kerala Backwaters",
    location: "Alleppey, Kerala",
    date: "January 2024",
    image: "/placeholder.svg?height=150&width=200",
    rating: 4.7,
    memories: 18,
  },
]

const achievements = [
  { name: "Trip Master", description: "Complete 10 trips", progress: 100, total: 10, current: 12 },
  { name: "Social Explorer", description: "Connect with 20 travel buddies", progress: 75, total: 20, current: 15 },
  { name: "Memory Keeper", description: "Upload 100 photos", progress: 85, total: 100, current: 85 },
  { name: "Review Writer", description: "Write 25 reviews", progress: 60, total: 25, current: 15 },
]

const stats = [
  { label: "Total Distance", value: "15,420 km", icon: Globe },
  { label: "Travel Days", value: "89 days", icon: Calendar },
  { label: "Money Saved", value: "₹45,000", icon: Wallet },
  { label: "Friends Made", value: "28 buddies", icon: Users },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(userProfile)

  const saveProfile = () => {
    // In a real app, this would save to backend
    setIsEditing(false)
    alert("✅ Profile updated successfully!")
  }

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      alert("👋 Logging out... See you soon!")
    }
  }

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
                <h1 className="text-3xl font-bold text-amber-800">My Profile</h1>
                <p className="text-amber-600">Manage your travel profile and preferences</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="border-amber-300 text-amber-700"
                onClick={() => alert("📤 Sharing your travel profile...")}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Profile
              </Button>
              <Button
                variant="outline"
                className="border-amber-300 text-amber-700"
                onClick={() => alert("⚙️ Opening settings...")}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Cover Image & Profile Header */}
        <Card className="mb-8 border-amber-200 overflow-hidden">
          <div className="relative">
            <div className="w-full h-48 bg-gradient-to-r from-amber-200 via-orange-200 to-yellow-200 flex items-center justify-center">
              <Camera className="w-16 h-16 text-amber-600" />
            </div>
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-4 right-4 bg-white/80 hover:bg-white"
              onClick={() => alert("📸 Changing cover photo...")}
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>

          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 -mt-16 md:-mt-12">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarImage src={editedProfile.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-amber-100 text-amber-800 text-2xl">
                    {editedProfile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {editedProfile.verified && (
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                    <span className="text-white text-sm">✓</span>
                  </div>
                )}
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border-2 border-amber-300"
                  onClick={() => alert("📸 Changing profile photo...")}
                >
                  <Edit className="w-3 h-3" />
                </Button>
              </div>

              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile((prev) => ({ ...prev, name: e.target.value }))}
                      className="text-xl font-bold border-amber-300"
                    />
                    <Input
                      value={editedProfile.username}
                      onChange={(e) => setEditedProfile((prev) => ({ ...prev, username: e.target.value }))}
                      className="text-amber-600 border-amber-300"
                    />
                    <Textarea
                      value={editedProfile.bio}
                      onChange={(e) => setEditedProfile((prev) => ({ ...prev, bio: e.target.value }))}
                      className="border-amber-300"
                      rows={2}
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-amber-900">{editedProfile.name}</h2>
                    <p className="text-amber-600">{editedProfile.username}</p>
                    <p className="text-amber-700 mt-2">{editedProfile.bio}</p>
                  </>
                )}

                <div className="flex items-center space-x-4 mt-3 text-sm text-amber-600">
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {editedProfile.location}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Joined {editedProfile.joinDate}
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <Button className="bg-amber-600 hover:bg-amber-700 text-white" onClick={saveProfile}>
                      Save Changes
                    </Button>
                    <Button variant="outline" className="border-amber-300" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    className="border-amber-300 text-amber-700"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="trips">My Trips</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Level Progress */}
                <Card className="border-amber-200">
                  <CardHeader>
                    <CardTitle className="text-amber-800 flex items-center">
                      <Trophy className="w-5 h-5 mr-2" />
                      Travel Level {userProfile.level}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-amber-600">Progress to Level {userProfile.level + 1}</span>
                        <span className="text-sm font-semibold text-amber-800">
                          {userProfile.xp}/{userProfile.nextLevelXp} XP
                        </span>
                      </div>
                      <Progress value={(userProfile.xp / userProfile.nextLevelXp) * 100} className="h-3" />
                      <p className="text-xs text-amber-600">
                        {userProfile.nextLevelXp - userProfile.xp} XP needed for next level
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Travel Stats */}
                <Card className="border-amber-200">
                  <CardHeader>
                    <CardTitle className="text-amber-800">Travel Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {stats.map((stat, index) => {
                        const Icon = stat.icon
                        return (
                          <div key={index} className="text-center">
                            <Icon className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                            <div className="text-lg font-bold text-amber-800">{stat.value}</div>
                            <div className="text-sm text-amber-600">{stat.label}</div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="border-amber-200">
                  <CardHeader>
                    <CardTitle className="text-amber-800">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg">
                        <Award className="w-5 h-5 text-amber-600" />
                        <div>
                          <p className="text-sm font-semibold text-amber-800">Earned "Photo Master" badge</p>
                          <p className="text-xs text-amber-600">2 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg">
                        <Camera className="w-5 h-5 text-amber-600" />
                        <div>
                          <p className="text-sm font-semibold text-amber-800">Added 12 photos to Goa trip</p>
                          <p className="text-xs text-amber-600">1 week ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg">
                        <Users className="w-5 h-5 text-amber-600" />
                        <div>
                          <p className="text-sm font-semibold text-amber-800">Connected with 3 new travel buddies</p>
                          <p className="text-xs text-amber-600">2 weeks ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trips" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recentTrips.map((trip) => (
                    <Card key={trip.id} className="border-amber-200 hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="relative">
                        <Image
                          src={trip.image || "/placeholder.svg"}
                          alt={trip.name}
                          width={200}
                          height={150}
                          className="w-full h-40 object-cover rounded-t-lg"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-white/90 text-amber-800">
                            <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                            {trip.rating}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-amber-900 mb-2">{trip.name}</h3>
                        <p className="text-sm text-amber-600 flex items-center mb-2">
                          <MapPin className="w-3 h-3 mr-1" />
                          {trip.location}
                        </p>
                        <p className="text-sm text-amber-600 flex items-center mb-3">
                          <Calendar className="w-3 h-3 mr-1" />
                          {trip.date}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-amber-600">{trip.memories} memories</span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-amber-300 text-amber-700"
                            onClick={() => alert(`📸 Opening ${trip.name} memories...`)}
                          >
                            <Camera className="w-3 h-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                {/* Badges */}
                <Card className="border-amber-200">
                  <CardHeader>
                    <CardTitle className="text-amber-800">Travel Badges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {userProfile.badges.map((badge, index) => (
                        <div key={index} className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
                          <div className="text-3xl mb-2">{badge.icon}</div>
                          <h4 className="font-semibold text-amber-800 text-sm">{badge.name}</h4>
                          <p className="text-xs text-amber-600">Earned {badge.earned}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Progress Achievements */}
                <Card className="border-amber-200">
                  <CardHeader>
                    <CardTitle className="text-amber-800">Achievement Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-amber-800">{achievement.name}</h4>
                              <p className="text-sm text-amber-600">{achievement.description}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-semibold text-amber-800">
                                {achievement.current}/{achievement.total}
                              </span>
                              {achievement.progress === 100 && (
                                <Trophy className="w-4 h-4 text-yellow-500 ml-2 inline" />
                              )}
                            </div>
                          </div>
                          <Progress value={achievement.progress} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                {/* Account Settings */}
                <Card className="border-amber-200">
                  <CardHeader>
                    <CardTitle className="text-amber-800">Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-amber-800 mb-2 block">Email</label>
                        <Input value={editedProfile.email} className="border-amber-300" />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-amber-800 mb-2 block">Phone</label>
                        <Input value={editedProfile.phone} className="border-amber-300" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-amber-800 mb-2 block">Languages</label>
                      <div className="flex flex-wrap gap-2">
                        {editedProfile.languages.map((lang, index) => (
                          <Badge key={index} variant="secondary" className="bg-amber-100 text-amber-700">
                            {lang}
                          </Badge>
                        ))}
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-amber-300 text-amber-700"
                          onClick={() => alert("➕ Adding new language...")}
                        >
                          + Add Language
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Privacy & Notifications */}
                <Card className="border-amber-200">
                  <CardHeader>
                    <CardTitle className="text-amber-800">Privacy & Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Bell className="w-5 h-5 text-amber-600" />
                        <div>
                          <p className="font-semibold text-amber-800">Push Notifications</p>
                          <p className="text-sm text-amber-600">Get notified about trip updates</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => alert("🔔 Notification settings updated!")}>
                        Configure
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-amber-600" />
                        <div>
                          <p className="font-semibold text-amber-800">Privacy Settings</p>
                          <p className="text-sm text-amber-600">Control who can see your profile</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => alert("🔒 Privacy settings updated!")}>
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Support & Help */}
                <Card className="border-amber-200">
                  <CardHeader>
                    <CardTitle className="text-amber-800">Support & Help</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-amber-300 text-amber-700"
                      onClick={() => alert("❓ Opening help center...")}
                    >
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Help Center
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-amber-300 text-amber-700"
                      onClick={() => alert("📧 Opening contact support...")}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-red-300 text-red-600"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-800">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-amber-600">Total Trips</span>
                    <span className="font-semibold text-amber-800">{userProfile.totalTrips}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-amber-600">Countries</span>
                    <span className="font-semibold text-amber-800">{userProfile.countries}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-amber-600">Cities</span>
                    <span className="font-semibold text-amber-800">{userProfile.cities}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-amber-600">Travel Buddies</span>
                    <span className="font-semibold text-amber-800">28</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interests */}
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-800">Travel Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userProfile.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary" className="bg-amber-100 text-amber-700">
                      {interest}
                    </Badge>
                  ))}
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-amber-300 text-amber-700"
                    onClick={() => alert("➕ Adding new interest...")}
                  >
                    + Add Interest
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Badges */}
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-800">Latest Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userProfile.badges.slice(-3).map((badge, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 bg-amber-50 rounded-lg">
                      <div className="text-2xl">{badge.icon}</div>
                      <div>
                        <p className="text-sm font-semibold text-amber-800">{badge.name}</p>
                        <p className="text-xs text-amber-600">Earned {badge.earned}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full mt-4 border-amber-300 text-amber-700"
                  onClick={() => alert("🏆 Viewing all badges...")}
                >
                  View All Badges
                </Button>
              </CardContent>
            </Card>

            {/* Travel Goals */}
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-800">Travel Goals 2024</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-amber-600">Visit 5 new cities</span>
                      <span className="font-semibold text-amber-800">3/5</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-amber-600">Try 10 local cuisines</span>
                      <span className="font-semibold text-amber-800">7/10</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-amber-600">Make 15 travel buddies</span>
                      <span className="font-semibold text-amber-800">12/15</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full mt-4 border-amber-300 text-amber-700"
                  onClick={() => alert("🎯 Setting new travel goals...")}
                >
                  <Target className="w-3 h-3 mr-1" />
                  Set New Goals
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
