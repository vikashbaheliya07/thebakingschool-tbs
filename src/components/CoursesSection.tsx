"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Users, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { BookingForm } from "@/components/BookingForm"
import { CourseType } from "@/components/CourseManager"

export default function CoursesSection() {
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
    <section className="py-12 sm:py-16 lg:py-20 relative">
      <div className="absolute inset-0 gradient-yellow-blue opacity-10"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 px-4">
            Our Popular
            <span className="dancing-script text-gradient text-4xl sm:text-5xl lg:text-6xl block">
              Courses
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Discover our comprehensive baking courses designed to help you
            master the art of baking with hands-on learning and expert
            guidance. Every course is 100% VEGAN — we don’t even use eggs in anything.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading popular courses...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {[...courses].reverse().slice(0, 6).map((course, index) => (
              <Card
                key={course._id || index}
                className="glass border-white/20 hover:scale-105 transition-all duration-300 overflow-hidden group flex flex-col h-full"
              >
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <Image
                    src={course.image || "/placeholder-course.webp"}
                    alt={course.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <CardTitle className="text-lg sm:text-xl font-bold text-white mb-2">
                      {course.title}
                    </CardTitle>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex flex-wrap items-center justify-between mb-2 text-xs sm:text-sm text-gray-500 gap-2">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="whitespace-nowrap">
                        {course.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="whitespace-nowrap">
                        {course.students} max
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 px-4 sm:px-6 pb-6 flex-grow flex flex-col">
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base line-clamp-3">
                    {course.description}
                  </p>

                  <div className="mt-auto w-full">
                    <BookingForm preSelectedCourse={course.title}>
                      <Button className="gradient-yellow-blue text-white hover:scale-105 transition-transform duration-300 w-full text-base py-3 sm:h-12 rounded-full font-semibold shadow-md">
                        Enroll Now
                      </Button>
                    </BookingForm>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && courses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No courses found.</p>
          </div>
        )}

        <div className="text-center mt-8 sm:mt-12">
          <Link href="/courses">
            <Button
              size="lg"
              variant="outline"
              className="glass text-gray-800 border-gray-300 hover:bg-white/50 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg"
            >
              View All Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
