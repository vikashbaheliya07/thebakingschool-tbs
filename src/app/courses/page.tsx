"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Users, Star, Award } from "lucide-react"
import Image from "next/image"
import { BookingForm } from "@/components/BookingForm"

import { AuthProvider } from "@/contexts/AuthContext"
import { PermissionGuard, AuthenticatedOnly } from "@/components/RoleBasedAccess"
import { AuthLogin } from "@/components/AuthLogin"
import { RoleBasedDashboard } from "@/components/RoleBasedDashboard"
import { Permission } from "@/types/auth"
import { CourseManager, CourseType } from "@/components/CourseManager"

function CoursesPageContent() {
  const [courses, setCourses] = useState<CourseType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses")
        const data = await res.json()
        if (res.ok && Array.isArray(data)) {
          setCourses(data)
        } else {
          console.warn("Failed to load courses:", data?.error || data)
          setCourses([])
        }
      } catch (err) {
        console.warn("Error fetching courses:", err)
        setCourses([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/Hero1.webp')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        <div className="relative z-10 max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6">
            Our
            <span className="dancing-script text-yellow-300 text-5xl sm:text-6xl md:text-8xl block">
              Courses
            </span>
          </h1>
          <p className="text-base sm:text-xl text-white/90 max-w-sm sm:max-w-2xl mx-auto px-2 sm:px-0 leading-relaxed">
            From beginner to master, explore our complete range of professional
            baking programs — all 100% VEGAN with absolutely no eggs used.
          </p>
        </div>
      </section>

      {/* Admin Management Toolbar */}
      <section className="py-8 relative bg-gradient-to-br from-yellow-50 to-blue-50/50">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex justify-center gap-3">
              <AuthLogin />
              <AuthenticatedOnly showFallback={false}>
                <RoleBasedDashboard />
              </AuthenticatedOnly>
            </div>

            <PermissionGuard permission={Permission.ADMIN_ACCESS} showFallback={false}>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <CourseManager courses={courses} onCoursesUpdate={setCourses} />
              </div>
            </PermissionGuard>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-blue-50"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading courses...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <Card
                  key={course._id || index}
                  className="glass border-white/20 hover:scale-105 transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={course.image || "/placeholder-course.webp"}
                      alt={course.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      priority={index < 6}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-400 to-blue-500 text-white">
                        {course.level}
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <CardTitle className="text-xl font-bold text-white">
                        {course.title}
                      </CardTitle>
                    </div>
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.students} max
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {course.rating}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 px-4 sm:px-6">
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                      {course.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {course.lessons} lessons
                      </div>
                      {course.certificate && (
                        <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Certificate
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <BookingForm preSelectedCourse={course.title}>
                        <Button className="gradient-yellow-blue text-white hover:scale-105 transition-transform duration-300 text-sm px-4 py-2">
                          Enroll Now
                        </Button>
                      </BookingForm>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {courses.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No courses found.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function CoursesPage() {
  return (
    <AuthProvider>
      <CoursesPageContent />
    </AuthProvider>
  )
}
