"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Award, Users, Clock, Heart, ChefHat, Star, MapPin, Phone, Mail, Target, Lightbulb } from "lucide-react"
import Image from "next/image"

const stats = [
  {
    icon: Users,
    number: "300+",
    label: "Happy Students",
    color: "text-blue-600"
  },
  {
    icon: Award,
    number: "ISO 9001 2015",
    label: "Certified Institute",
    color: "text-green-600"
  },
  {
    icon: Star,
    number: "4.9/5",
    label: "Average Rating",
    color: "text-yellow-600"
  }
]

const values = [
  {
    icon: Heart,
    title: "Passion for Excellence",
    description: "We believe that great baking comes from passion, dedication, and the pursuit of perfection in every recipe."
  },
  {
    icon: Users,
    title: "Community Focused",
    description: "The Baking School is more than just classes - it's a community of food lovers sharing knowledge and experiences."
  },
  {
    icon: Clock,
    title: "Hands-On Learning",
    description: "We emphasize practical, hands-on experience with personalized attention to help you master every technique."
  }
]


export default function AboutSection() {
  const [showAboutModal, setShowAboutModal] = useState(false)

  const handleLearnMore = () => {
    setShowAboutModal(true)
  }

  const handleCloseAboutModal = () => {
    setShowAboutModal(false)
  }


  return (
    <>
      {/* About Us Modal */}
      <Dialog open={showAboutModal} onOpenChange={handleCloseAboutModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center mb-6">
              About The Baking School
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-8">
            {/* Hero Image */}
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="The Baking School Kitchen"
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">State-of-the-Art Facilities</h3>
                  <p className="text-white/90">Professional-grade equipment and spacious learning environments</p>
                </div>
              </div>
            </div>

            {/* Our Story */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-600" />
                  Our Mission
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Our mission is to provide comprehensive and accessible baking education that fosters creativity, empowers women and youth, equips students with the skills needed to excel in the baking industry.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We aim to create a supportive and inclusive learning environment, promote sustainable practices, and inspire a passion for baking that transcends borders, preparing our graduates to meet the growing demand for baking professionals around the world.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-yellow-600" />
                  Our Vision
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  To be a leading institution that empowers individuals through exceptional baking education, nurturing creativity, skill development, and professional growth, ultimately contributing to the Global Baking Industry with innovative and skilled professionals.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We strive to create a global community of skilled bakers who carry forward the traditions of fine baking while embracing modern techniques and sustainable practices.
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center">Why Choose The Baking School?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-lg bg-blue-50">
                  <ChefHat className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-bold mb-2">Expert Instructors</h4>
                  <p className="text-sm text-gray-600">Learn from industry professionals with a decent experience</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-green-50">
                  <Award className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h4 className="font-bold mb-2">Certified Programs</h4>
                  <p className="text-sm text-gray-600">Industry-recognized certifications that boost your career</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-yellow-50">
                  <Clock className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                  <h4 className="font-bold mb-2">Flexible Scheduling</h4>
                  <p className="text-sm text-gray-600">Morning and evening batches to fit your lifestyle</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-red-50">
                  <Heart className="w-12 h-12 text-red-600 mx-auto mb-3" />
                  <h4 className="font-bold mb-2">Lifetime Support</h4>
                  <p className="text-sm text-gray-600">Ongoing mentorship and career guidance after Course completion</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-indigo-50">
                  <Star className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
                  <h4 className="font-bold mb-2">Modern Equipment</h4>
                  <p className="text-sm text-gray-600">Professional-grade ovens, mixers, and baking tools</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-center">Visit Our Campus</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <MapPin className="w-8 h-8 text-blue-600 mb-2" />
                  <h4 className="font-semibold mb-1">Location</h4>
                  <p className="text-sm text-gray-600">The Baking School,<br />Street no. 13, Ajit road,<br />  Bathinda, Punjab.</p>
                </div>
                <div className="flex flex-col items-center">
                  <Phone className="w-8 h-8 text-green-600 mb-2" />
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <p className="text-sm text-gray-600">98763-20800<br />99889-92110</p>
                  </div>
                <div className="flex flex-col items-center">
                  <Mail className="w-8 h-8 text-purple-600 mb-2" />
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-sm text-gray-600">ceo@thebakingschool.in</p>
                </div>
              </div>

          </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Main About Section */}
      <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-yellow-50"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              About
              <span className="dancing-script text-gradient text-4xl sm:text-5xl lg:text-6xl block">
                Our Story
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the passion and expertise behind India&apos;s premier baking school, 
              where culinary dreams become delicious reality.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
            {/* Image */}
            <div className="relative">
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Professional chef in white uniform working in commercial kitchen"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Crafting Culinary Dreams Since 2009
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Crafting Culinary Dreams Since 2023: Founded with a vision to be a leading institution that empowers individuals through exceptional Baking education, nurturing creativity, Skill development, and professional growth, ultimately contributing to the Global Baking Industry with Innovative and skilled professionals.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We aim to create a supportive and inclusive learning environment, promote sustainable practices, and inspire a passion for baking that transcends borders, preparing our graduates to meet the growing demand for baking professionals around the world.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="gradient-yellow-blue text-white px-6 py-3 rounded-full hover:scale-105 transition-transform duration-300"
                  onClick={handleLearnMore}
                >
                  Learn More About Us
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="glass border-white/20 text-center p-4 sm:p-6 hover:scale-105 transition-transform duration-300">
                <CardContent className="p-0">
                  <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-100 mb-3 sm:mb-4`}>
                    <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color}`} />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Values Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do and shape the learning experience for our students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <Card key={index} className="glass border-white/20 p-6 sm:p-8 text-center hover:scale-105 transition-transform duration-300">
                <CardContent className="p-0">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-100 to-blue-100 mb-4">
                    <value.icon className="w-8 h-8 text-gray-700" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}