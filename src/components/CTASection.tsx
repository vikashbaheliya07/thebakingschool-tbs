import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { ChefHatIcon, DocumentIcon, SparkleIcon } from "@/components/icons/BakingIcons"
import { BookingForm } from "@/components/BookingForm"

export default function CTASection() {
  return (
    <section className="py-12 sm:py-20 lg:py-32 relative overflow-hidden">
      {/* Elegant background with subtle pattern */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/90 via-blue-900/80 to-amber-900/90"></div>
      

      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Elegant header section */}
        <div className="text-center mb-10 sm:mb-16 lg:mb-20">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="px-4 sm:px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-yellow-300 font-medium text-xs sm:text-sm tracking-wider uppercase">
              Transform Your Passion
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-8 leading-tight px-4">
            Ready to Start Your
            <span className="dancing-script text-yellow-300 text-4xl sm:text-5xl md:text-6xl lg:text-8xl block mt-2">
              Baking Journey?
            </span>
          </h2>
          
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-12 leading-relaxed">
              Join hundreds of passionate bakers who have transformed their dreams into reality. 
              Your culinary adventure begins with a single step.
            </p>
          </div>
          
          {/* Elegant CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center mb-8 sm:mb-16 lg:mb-20 px-4">
            <BookingForm>
              <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-bold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full text-base sm:text-lg shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-yellow-300/50 w-full sm:w-auto">
                <span className="flex items-center justify-center gap-2 sm:gap-3 text-black">
                  <span className="hidden sm:inline">Book Free Consultation</span>
                  <span className="sm:hidden">Free Consultation</span>
                  <ChefHatIcon className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                </span>
              </Button>
            </BookingForm>
            <Button size="lg" variant="outline" className="bg-white/20 backdrop-blur-md text-white border-white/60 hover:bg-white/30 hover:border-white/80 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full text-base sm:text-lg font-semibold hover:scale-105 transition-all duration-300 w-full sm:w-auto">
              <span className="flex items-center justify-center gap-2 sm:gap-3 text-white">
                <span className="hidden sm:inline">Download Brochure</span>
                <span className="sm:hidden">Brochure</span>
                <DocumentIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </span>
            </Button>
          </div>
        </div>

        {/* Elegant contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <Card className="bg-white/15 backdrop-blur-md border-white/40 text-center hover:scale-105 transition-all duration-300 group shadow-xl">
            <CardContent className="p-6 sm:p-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
              </div>
              <h3 className="font-bold text-white mb-2 sm:mb-3 text-base sm:text-lg drop-shadow-lg">Call Us</h3>
              <p className="text-white font-semibold text-sm sm:text-base drop-shadow-md">98763-20800, 99889-92110</p>
              <p className="text-white/90 text-xs sm:text-sm mt-1">Available 24/7</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/15 backdrop-blur-md border-white/40 text-center hover:scale-105 transition-all duration-300 group shadow-xl">
            <CardContent className="p-6 sm:p-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2 sm:mb-3 text-base sm:text-lg drop-shadow-lg">Email Us</h3>
              <p className="text-white font-semibold text-sm sm:text-base drop-shadow-md">ceo@bakingschool.in</p>
              <p className="text-white/90 text-xs sm:text-sm mt-1">Quick Response</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/15 backdrop-blur-md border-white/40 text-center hover:scale-105 transition-all duration-300 group shadow-xl">
            <CardContent className="p-6 sm:p-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
              </div>
              <h3 className="font-bold text-white mb-2 sm:mb-3 text-base sm:text-lg drop-shadow-lg">Visit Us</h3>
              <p className="text-white font-semibold text-sm sm:text-base drop-shadow-md">The Baking School, street no. 13, Ajit road</p>
              <p className="text-white/90 text-xs sm:text-sm mt-1">Bathinda, Punjab.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/15 backdrop-blur-md border-white/40 text-center hover:scale-105 transition-all duration-300 group shadow-xl">
            <CardContent className="p-6 sm:p-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2 sm:mb-3 text-base sm:text-lg drop-shadow-lg">Hours</h3>
              <p className="text-white font-semibold text-sm sm:text-base drop-shadow-md">Mon-Sat: 9AM6PM</p>
              <p className="text-white/90 text-xs sm:text-sm mt-1">Unavailable on Sundays</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Elegant bottom section */}
        <div className="text-center mt-8 sm:mt-16">
          <div className="inline-flex items-center gap-2 text-white/80 text-sm">
            <SparkleIcon className="text-yellow-300" />
            <span>Join 300+ successful bakers</span>
            <SparkleIcon className="text-yellow-300" />
          </div>
        </div>
      </div>
    </section>
  )
}