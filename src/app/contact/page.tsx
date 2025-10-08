import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Get In
            <span className="dancing-script text-yellow-300 text-6xl md:text-8xl block">
              Touch
            </span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Ready to start your baking journey? We're here to help you every step of the way. 
            Contact us today to learn more about our programs.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-blue-50"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-yellow-500" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg glass border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg glass border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg glass border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg glass border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg glass border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                    <option>Course Information</option>
                    <option>Enrollment</option>
                    <option>Certification</option>
                    <option>General Inquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg glass border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="Tell us about your baking goals and how we can help..."
                  ></textarea>
                </div>
                
                <Button className="w-full gradient-yellow-blue text-white font-semibold py-3 rounded-lg hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="glass border-white/20">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-gray-900" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Call Us</h3>
                      <p className="text-gray-600">Speak with our admissions team</p>
                    </div>
                  </div>
                  <p className="text-xl font-semibold text-gray-800">+1 (555) 123-BAKE</p>
                  <p className="text-gray-600">Available Monday - Saturday, 8AM - 8PM</p>
                </CardContent>
              </Card>

              <Card className="glass border-white/20">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Email Us</h3>
                      <p className="text-gray-600">Get detailed information</p>
                    </div>
                  </div>
                  <p className="text-xl font-semibold text-gray-800">info@bakingschool.com</p>
                  <p className="text-gray-600">We respond within 24 hours</p>
                </CardContent>
              </Card>

              <Card className="glass border-white/20">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-gray-900" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Visit Our Campus</h3>
                      <p className="text-gray-600">Schedule a tour</p>
                    </div>
                  </div>
                  <p className="text-xl font-semibold text-gray-800">123 Baker Street</p>
                  <p className="text-gray-600">Culinary District, Food City, FC 12345</p>
                </CardContent>
              </Card>

              <Card className="glass border-white/20">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Campus Hours</h3>
                      <p className="text-gray-600">When we're open</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-800"><span className="font-semibold">Mon-Fri:</span> 8:00 AM - 8:00 PM</p>
                    <p className="text-gray-800"><span className="font-semibold">Saturday:</span> 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-800"><span className="font-semibold">Sunday:</span> 10:00 AM - 4:00 PM</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}