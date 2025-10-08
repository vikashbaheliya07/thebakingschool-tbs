import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Quote, MapPin, Calendar, Award } from "lucide-react"
import { ChefHatIcon } from "@/components/icons/BakingIcons"
import Image from "next/image"

const successStories = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Professional Baker & Bakery Owner",
    location: "New York, NY",
    graduationYear: "2022",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    story: "After completing the Professional Baking Certificate, I opened 'Sarah's Sweet Corner' in Manhattan. The comprehensive training I received gave me the confidence and skills to turn my passion into a thriving business. We now serve over 500 customers daily!",
    achievement: "Opened successful bakery with 12 employees",
    course: "Professional Baking Certificate",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Head Pastry Chef",
    location: "San Francisco, CA",
    graduationYear: "2021",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    story: "The French Patisserie course completely transformed my career. I went from working in a small café to becoming the Head Pastry Chef at a Michelin-starred restaurant. The techniques I learned here are invaluable.",
    achievement: "Head Pastry Chef at Michelin-starred restaurant",
    course: "French Patisserie Advanced",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Wedding Cake Designer",
    location: "Los Angeles, CA",
    graduationYear: "2023",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    story: "The Wedding Cake Design course gave me specialized skills that set me apart in the industry. I now design custom cakes for celebrity weddings and high-end events. My booking calendar is full for the next 18 months!",
    achievement: "Celebrity wedding cake designer",
    course: "Wedding Cake Design",
    rating: 5
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Restaurant Owner",
    location: "Chicago, IL",
    graduationYear: "2020",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    story: "I enrolled to improve my restaurant's dessert menu. The Chocolate & Confections course exceeded my expectations. Our dessert sales increased by 40%, and we've won several local food awards for our dessert program.",
    achievement: "40% increase in dessert sales, multiple awards",
    course: "Chocolate & Confections",
    rating: 5
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "Artisan Baker",
    location: "Portland, OR",
    graduationYear: "2022",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    story: "At 45, I decided to follow my dream of becoming a baker. The supportive environment and comprehensive curriculum made the career transition smooth. I now supply artisan breads to 15 local restaurants and farmers markets.",
    achievement: "Supplies 15 restaurants with artisan breads",
    course: "Artisan Bread Specialist",
    rating: 5
  },
  {
    id: 6,
    name: "James Wilson",
    role: "YouTube Baking Instructor",
    location: "Austin, TX",
    graduationYear: "2021",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    story: "The skills I learned here helped me create a successful YouTube channel with over 2 million subscribers. I teach traditional baking techniques to home bakers worldwide. The foundation I got here was crucial to my success.",
    achievement: "2M+ YouTube subscribers, online baking educator",
    course: "Professional Baking Certificate",
    rating: 5
  }
]

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-blue-50"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <section className="pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-blue-50"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {successStories.map((story) => (
              <Card key={story.id} className="glass border-white/20 hover:scale-105 transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="relative">
                      <Image
                        src={story.image} 
                        alt={story.name}
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
                        {[...Array(story.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative mb-6">
                    <Quote className="w-8 h-8 text-yellow-400/30 absolute -top-2 -left-2" />
                    <p className="text-gray-700 leading-relaxed italic pl-6">
                      {story.story}
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