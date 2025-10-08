import { Card, CardContent } from "@/components/ui/card"
import { Clock, Users, Trophy, BookOpen, Utensils, Heart } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "Flexible Schedule",
    description: "Learn at your own pace with morning, evening, and weekend classes available.",
    color: "text-yellow-400"
  },
  {
    icon: Users,
    title: "Small Class Sizes",
    description: "Maximum 8 students per class ensuring personalized attention from instructors.",
    color: "text-blue-400"
  },
  {
    icon: Trophy,
    title: "Industry Certification",
    description: "Get certified by internationally recognized baking institutions.",
    color: "text-yellow-400"
  },
  {
    icon: BookOpen,
    title: "Comprehensive Curriculum",
    description: "From basic techniques to advanced pastry arts, we cover it all.",
    color: "text-blue-400"
  },
  {
    icon: Utensils,
    title: "Professional Equipment",
    description: "Train with the same equipment used in top bakeries and restaurants.",
    color: "text-yellow-400"
  },
  {
    icon: Heart,
    title: "Lifetime Support",
    description: "Join our alumni network and get ongoing support for your baking journey.",
    color: "text-blue-400"
  }
]

export default function FeaturesSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-yellow-50"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Mobile Stats Section - Only visible on mobile */}
        <div className="sm:hidden mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Join Our
              <span className="dancing-script text-gradient text-3xl block">
                Community
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
            <div className="glass rounded-xl p-4 text-center border-white/20">
              <div className="text-2xl font-bold text-gradient mb-1">500+</div>
              <div className="text-gray-600 text-sm">Students</div>
            </div>
            <div className="glass rounded-xl p-4 text-center border-white/20">
              <div className="text-2xl font-bold text-gradient mb-1">15+</div>
              <div className="text-gray-600 text-sm">Expert Chefs</div>
            </div>
            <div className="glass rounded-xl p-4 text-center border-white/20">
              <div className="text-2xl font-bold text-gradient mb-1">50+</div>
              <div className="text-gray-600 text-sm">Courses</div>
            </div>
            <div className="glass rounded-xl p-4 text-center border-white/20">
              <div className="text-2xl font-bold text-gradient mb-1">4.9</div>
              <div className="text-gray-600 text-sm">Rating</div>
            </div>
          </div>
        </div>
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 px-4">
            Why Choose Our
            <span className="dancing-script text-gradient text-4xl sm:text-5xl lg:text-6xl block">
              Baking School?
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            We provide the perfect blend of traditional techniques and modern innovation
            to help you become a master baker.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="glass border-white/20 hover:scale-105 transition-all duration-300 group">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="mb-4 sm:mb-6">
                  <feature.icon className={`w-10 h-10 sm:w-12 sm:h-12 ${feature.color} mx-auto group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}