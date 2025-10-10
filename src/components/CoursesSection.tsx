import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Users, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { BookingForm } from "@/components/BookingForm"

export const courses = [
  {
    title: "Fundamental Baker Course",
    description: "Learn basics of baking, different types of cakes, and dry cakes. 100% VEGAN — no eggs used.",
    duration: "1 month",
    students: "12",
    rating: "4.9",
    price: "₹24,999",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Intermediate Baker Course",
    description: "Covers Fundamental Course + variety of chocolates, advanced cake designing, cookies, brownies, and laminated dough. 100% VEGAN — no eggs used.",
    duration: "2 months",
    students: "10",
    rating: "4.9",
    price: "₹39,999",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Professional Baker Course",
    description: "Covers Fundamental + Intermediate courses + two-tier cakes, nutritional baking, fondant cakes, bread baking, and doughnuts. 100% VEGAN — no eggs used.",
    duration: "3 months",
    students: "10",
    rating: "5.0",
    price: "₹54,999",
    image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Advanced Baker Course",
    description: "Covers Fundamental, Intermediate, and Professional courses + buttercream, cheesecakes, advanced dry cakes, tarts & pies, advanced breads. 100% VEGAN — no eggs used.",
    duration: "4 months",
    students: "8",
    rating: "5.0",
    price: "₹69,999",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Expert Baker Course",
    description: "Covers Fundamental to Advanced courses + viennoiseries, shakes, mocktails, barista skills, ice cream, wraps, advanced cookies, pasta, and macarons. 100% VEGAN — no eggs used.",
    duration: "5 months",
    students: "6",
    rating: "5.0",
    price: "₹84,999",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Master Baker Course",
    description: "Covers everything from Fundamental to Expert courses + industrial tours, industrial training, internship opportunities, and business mentorship. 100% VEGAN — no eggs used.",
    duration: "6 months",
    students: "6",
    rating: "5.0",
    price: "₹99,999",
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1000&q=80"
  }
]


export default function CoursesSection() {
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
            Discover our comprehensive baking courses designed to help you master 
            the art of baking with hands-on learning and expert guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {courses.map((course, index) => (
            <Card key={index} className="glass border-white/20 hover:scale-105 transition-all duration-300 overflow-hidden group">
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <Image
                  src={course.image}
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
                    <span className="whitespace-nowrap">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="whitespace-nowrap">{course.students} max</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 px-4 sm:px-6">
                <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
                  {course.description}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <BookingForm preSelectedCourse={course.title}>
                    <Button className="gradient-yellow-blue text-white hover:scale-105 transition-transform duration-300 w-full sm:w-auto text-sm sm:text-base px-4 py-2">
                      Enroll Now
                    </Button>
                  </BookingForm>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Link href="/courses">
            <Button size="lg" variant="outline" className="glass text-gray-800 border-gray-300 hover:bg-white/50 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg">
              View All Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}