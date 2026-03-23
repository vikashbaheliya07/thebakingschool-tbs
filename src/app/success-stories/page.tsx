"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Calendar, Award } from "lucide-react"
import { ChefHatIcon } from "@/components/icons/BakingIcons"
import Image from "next/image"

import { AuthProvider } from "@/contexts/AuthContext"
import { PermissionGuard, AuthenticatedOnly } from "@/components/RoleBasedAccess"
import { AuthLogin } from "@/components/AuthLogin"
import { RoleBasedDashboard } from "@/components/RoleBasedDashboard"
import { Permission } from "@/types/auth"
import { SuccessStoryManager, SuccessStoryType } from "@/components/SuccessStoryManager"

function SuccessStoriesPageContent() {
  const [successStories, setSuccessStories] = useState<SuccessStoryType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch("/api/success-stories")
        const data = await res.json()
        if (res.ok && Array.isArray(data)) {
          setSuccessStories(data)
        } else {
          console.warn("Failed to load success stories:", data?.error || data)
          setSuccessStories([])
        }
      } catch (err) {
        console.warn("Error fetching success stories:", err)
        setSuccessStories([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchStories()
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/Hero3.webp')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        <div className="relative z-10 max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Success
            <span className="dancing-script text-yellow-300 text-6xl md:text-8xl block">
              Stories
            </span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Meet our amazing graduates who have transformed their passion for baking
            into successful careers and thriving businesses.
          </p>
        </div>
      </section>

      {/* Stats and Admin controls Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-blue-50"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Admin Management Toolbar */}
          <div className="flex flex-col items-center gap-4 mb-12">
            <div className="flex justify-center gap-3">
              <AuthLogin />
              <AuthenticatedOnly showFallback={false}>
                <RoleBasedDashboard />
              </AuthenticatedOnly>
            </div>

            <PermissionGuard permission={Permission.ADMIN_ACCESS} showFallback={false}>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <SuccessStoryManager stories={successStories} onStoriesUpdate={setSuccessStories} />
              </div>
            </PermissionGuard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="glass border-white/20 text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-gradient mb-2">300+</div>
                <div className="text-gray-600">Successful Bakers</div>
              </CardContent>
            </Card>
            <Card className="glass border-white/20 text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-gradient mb-2">4.9</div>
                <div className="text-gray-600">Average Rating</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="pb-20 relative -mt-16 pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-blue-50"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading success stories...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {successStories.map((story) => (
                <Card key={story._id} className="glass border-white/20 hover:scale-105 transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="relative">
                        <Image
                          src={story.image || "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=400&q=80"}
                          alt={story.name}
                          width={80}
                          height={80}
                          className="w-20 h-20 rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
                          <ChefHatIcon className="w-4 h-4 text-gray-900" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{story.name}</h3>
                        <p className="text-blue-600 font-semibold mb-2">{story.role}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {story.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Class of {story.graduationYear}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(story.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Student Quote */}
                    <div className="mb-6 bg-yellow-50/50 p-5 rounded-xl border border-yellow-100 relative shadow-sm">
                      <div className="absolute top-2 left-3 text-5xl text-yellow-300 opacity-40 font-serif leading-none">"</div>
                      <p className="text-gray-700 italic relative z-10 pl-8 text-sm md:text-base leading-relaxed">
                        {story.quote}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-green-500" />
                        <span className="text-sm font-semibold text-gray-800">Achievement:</span>
                        <span className="text-sm text-gray-600">{story.achievement}</span>
                      </div>
                      <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-blue-500 text-white text-sm font-semibold">
                        {story.course}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {successStories.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No success stories found.</p>
            </div>
          )}

          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join hundreds of successful graduates who have transformed their passion into rewarding careers.
            </p>
            <Button className="gradient-yellow-blue text-white font-semibold px-8 py-4 rounded-full text-lg hover:scale-105 transition-transform duration-300">
              Start Your Journey Today
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function SuccessStoriesPage() {
  return (
    <AuthProvider>
      <SuccessStoriesPageContent />
    </AuthProvider>
  )
}
