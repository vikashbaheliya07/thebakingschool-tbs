import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, CheckCircle, Clock, Users } from "lucide-react"

const certifications = [
  {
    title: "Professional Baking Certificate",
    duration: "6 months",
    level: "Professional",
    description: "Comprehensive certification covering all aspects of professional baking, from basic techniques to advanced pastry arts.",
    requirements: [
      "Complete 8 core courses",
      "Pass practical examinations",
      "Complete 100 hours of hands-on practice",
      "Submit portfolio of work"
    ],
    benefits: [
      "Industry-recognized certification",
      "Career placement assistance",
      "Alumni network access",
      "Continuing education opportunities"
    ]
  },
  {
    title: "Artisan Bread Specialist",
    duration: "3 months",
    level: "Specialist",
    description: "Specialized certification focusing on traditional and modern bread-making techniques.",
    requirements: [
      "Complete bread-making courses",
      "Master sourdough techniques",
      "Pass written and practical exams",
      "Create signature bread recipes"
    ],
    benefits: [
      "Artisan bread expertise",
      "Small business guidance",
      "Supplier network access",
      "Marketing support"
    ]
  },
  {
    title: "Pastry Arts Diploma",
    duration: "9 months",
    level: "Advanced",
    description: "Advanced diploma program covering French pastry techniques, cake decoration, and dessert presentation.",
    requirements: [
      "Complete all pastry courses",
      "Master advanced techniques",
      "Complete internship program",
      "Final project presentation"
    ],
    benefits: [
      "Advanced pastry skills",
      "Restaurant placement opportunities",
      "International recognition",
      "Master class access"
    ]
  }
]

export default function CertificationPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] sm:bg-[url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/75"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Professional
            <span className="dancing-script text-yellow-300 text-6xl md:text-8xl block">
              Certification
            </span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Earn industry-recognized certifications that validate your skills and 
            open doors to exciting career opportunities in the baking industry.
          </p>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/90 to-blue-50/90"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {certifications.map((cert, index) => (
              <Card key={index} className="glass border-white/20 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-yellow-400 to-blue-500 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold mb-2">{cert.title}</CardTitle>
                      <p className="text-white/90">{cert.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5" />
                        <span>{cert.duration}</span>
                      </div>
                      <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-sm font-semibold">
                        {cert.level}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Award className="w-6 h-6 text-yellow-500" />
                        Requirements
                      </h3>
                      <ul className="space-y-2">
                        {cert.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Users className="w-6 h-6 text-blue-500" />
                        Benefits
                      </h3>
                      <ul className="space-y-2">
                        {cert.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Button className="gradient-yellow-blue text-white font-semibold px-8 py-3 rounded-full hover:scale-105 transition-transform duration-300">
                      Apply for Certification
                    </Button>
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