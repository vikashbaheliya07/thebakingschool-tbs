import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Users, Star, Award } from "lucide-react"
import Image from "next/image"
import { BookingForm } from "@/components/BookingForm"

const allCourses = [
  {
    title: "Fundamental Baker Course",
    description:
      "Learn the basics of baking, different types of cakes, and dry cakes. Perfect for beginners who want a strong foundation. 100% VEGAN — we don’t even use eggs in anything.",
    duration: "1 month",
    students: "12",
    rating: "4.9",
    price: "₹24,999",
    image:
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=1000&q=80",
    level: "Beginner",
    lessons: 16,
    certificate: true,
  },
  {
    title: "Intermediate Baker Course",
    description:
      "Includes everything from the Fundamental Course plus a variety of chocolates, advanced cake designing, cookies, brownies, and laminated dough. 100% VEGAN — we don’t even use eggs in anything.",
    duration: "2 months",
    students: "10",
    rating: "4.9",
    price: "₹39,999",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80",
    level: "Intermediate",
    lessons: 24,
    certificate: true,
  },
  {
    title: "Professional Baker Course",
    description:
      "Covers everything from the Fundamental and Intermediate Courses plus two-tier cakes, nutritional baking, fondant cakes, bread baking, and doughnuts. 100% VEGAN — we don’t even use eggs in anything.",
    duration: "3 months",
    students: "10",
    rating: "5.0",
    price: "₹54,999",
    image:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1000&q=80",
    level: "Advanced",
    lessons: 32,
    certificate: true,
  },
  {
    title: "Advanced Baker Course",
    description:
      "Covers the Fundamental, Intermediate, and Professional Courses plus buttercream, cheesecakes, advanced dry cakes, tarts & pies, and advanced breads. 100% VEGAN — we don’t even use eggs in anything.",
    duration: "4 months",
    students: "8",
    rating: "5.0",
    price: "₹69,999",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80",
    level: "Professional",
    lessons: 40,
    certificate: true,
  },
  {
    title: "Expert Baker Course",
    description:
      "Includes everything from the Fundamental to Advanced Courses plus viennoiseries, shakes, mocktails, barista skills, ice cream, wraps, advanced cookies, pasta, and macarons. 100% VEGAN — we don’t even use eggs in anything.",
    duration: "5 months",
    students: "6",
    rating: "5.0",
    price: "₹84,999",
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1000&q=80",
    level: "Expert",
    lessons: 48,
    certificate: true,
  },
  {
    title: "Master Baker Course",
    description:
      "Includes everything from the Fundamental to Expert Courses plus industrial tours, industrial training, internship opportunities, and business mentorship. 100% VEGAN — we don’t even use eggs in anything.",
    duration: "6 months",
    students: "6",
    rating: "5.0",
    price: "₹99,999",
    image:
      "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1000&q=80",
    level: "Master",
    lessons: 60,
    certificate: true,
  },
]

export default function CoursesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-12 sm:pt-24 sm:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        <div className="relative z-10 max-w-7xl mx-auto py-20 px-6 sm:px-6 lg:px-8 text-center">
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

      {/* Courses Grid */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-blue-50"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allCourses.map((course, index) => (
              <Card
                key={index}
                className="glass border-white/20 hover:scale-105 transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={course.image}
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
        </div>
      </section>

      <Footer />
    </div>
  )
}
