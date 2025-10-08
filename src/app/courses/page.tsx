import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Users, Star, Award } from "lucide-react"
import Image from "next/image"
import { BookingForm } from "@/components/BookingForm"

const allCourses = [
  {
    title: "Basic Baking Fundamentals",
    description: "Perfect for beginners. Learn essential techniques, ingredient knowledge, and basic recipes including cookies, muffins, and simple cakes.",
    duration: "4 weeks",
    students: "12",
    rating: "4.9",
    price: "₹24,999",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    level: "Beginner",
    lessons: 16,
    certificate: true
  },
  {
    title: "Artisan Bread Making",
    description: "Master the art of sourdough, focaccia, and traditional bread making techniques. Learn fermentation, shaping, and scoring.",
    duration: "6 weeks",
    students: "8",
    rating: "4.8",
    price: "₹37,499",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    level: "Intermediate",
    lessons: 24,
    certificate: true
  },
  {
    title: "Pastry & Dessert Arts",
    description: "Create stunning pastries, cakes, and desserts. Master cream puffs, éclairs, tarts, and elegant plated desserts.",
    duration: "8 weeks",
    students: "10",
    rating: "4.9",
    price: "₹49,999",
    image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    level: "Advanced",
    lessons: 32,
    certificate: true
  },
  {
    title: "Wedding Cake Design",
    description: "Specialize in creating beautiful, multi-tier wedding cakes. Learn fondant work, sugar flowers, and advanced decorating.",
    duration: "10 weeks",
    students: "6",
    rating: "5.0",
    price: "₹66,999",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    level: "Professional",
    lessons: 40,
    certificate: true
  },
  {
    title: "French Patisserie",
    description: "Learn classical French techniques including croissants, macarons, and elegant pastries from traditional recipes.",
    duration: "12 weeks",
    students: "8",
    rating: "4.9",
    price: "₹74,999",
    image: "https://images.unsplash.com/photo-1555507036-ab794f4ade2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    level: "Advanced",
    lessons: 48,
    certificate: true
  },
  {
    title: "Chocolate & Confections",
    description: "Master chocolate tempering, truffle making, and artisan confectionery techniques. Create beautiful bonbons and pralines.",
    duration: "6 weeks",
    students: "10",
    rating: "4.8",
    price: "₹45,999",
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    level: "Intermediate",
    lessons: 24,
    certificate: true
  },
  {
    title: "Gluten-Free Baking",
    description: "Learn to create delicious gluten-free breads, cakes, and pastries without compromising on taste or texture.",
    duration: "5 weeks",
    students: "12",
    rating: "4.7",
    price: "₹33,299",
    image: "https://images.unsplash.com/photo-1574085733277-851d9d856a3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    level: "Intermediate",
    lessons: 20,
    certificate: true
  },
  {
    title: "Vegan Baking Mastery",
    description: "Discover plant-based baking techniques and create amazing vegan desserts, breads, and pastries.",
    duration: "5 weeks",
    students: "10",
    rating: "4.8",
    price: "₹33,299",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    level: "Intermediate",
    lessons: 20,
    certificate: true
  },
  {
    title: "International Breads",
    description: "Explore bread traditions from around the world. Learn to make naan, bagels, pretzels, and more.",
    duration: "7 weeks",
    students: "8",
    rating: "4.9",
    price: "₹41,699",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    level: "Intermediate",
    lessons: 28,
    certificate: true
  }
]

export default function CoursesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 sm:pt-24 sm:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6">
            Our
            <span className="dancing-script text-yellow-300 text-5xl sm:text-6xl md:text-8xl block">
              Courses
            </span>
          </h1>
          <p className="text-base sm:text-xl text-white/90 max-w-sm sm:max-w-2xl mx-auto px-2 sm:px-0 leading-relaxed">
            From beginner basics to professional mastery, find the perfect course 
            to match your baking aspirations and skill level.
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-blue-50"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allCourses.map((course, index) => (
              <Card key={index} className="glass border-white/20 hover:scale-105 transition-all duration-300 overflow-hidden group">
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
                    <span className="text-xl sm:text-2xl font-bold text-gradient">
                      {course.price}
                    </span>
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