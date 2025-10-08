import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
  courses: [
    { name: "Basic Baking", href: "/courses/basic" },
    { name: "Artisan Bread", href: "/courses/bread" },
    { name: "Pastry Arts", href: "/courses/pastry" },
    { name: "Wedding Cakes", href: "/courses/wedding" },
    { name: "French Patisserie", href: "/courses/french" },
    { name: "Chocolate Making", href: "/courses/chocolate" },
  ],
  quickLinks: [
    { name: "About Us", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Success Stories", href: "/success-stories" },
    { name: "Certification", href: "/certification" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ],
  support: [
    { name: "FAQ", href: "/faq" },
    { name: "Student Portal", href: "/portal" },
    { name: "Career Services", href: "/careers" },
    { name: "Alumni Network", href: "/alumni" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ]
}

export default function Footer() {
  return (
    <footer className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"></div>

      <div className="relative z-10">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                  <Image
                    src="/thebakingschool.webp"
                    alt="The Baking School Logo"
                    fill
                    sizes="(max-width: 640px) 40px, 48px"
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl sm:text-3xl font-bold dancing-script text-white">
                  The Baking School
                </span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
                Transform your passion for baking into a rewarding career with our
                comprehensive courses and expert instruction.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                  <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>

            {/* Courses */}
            <div>
              <h3 className="text-white font-semibold text-base sm:text-lg mb-4 sm:mb-6">Popular Courses</h3>
              <ul className="space-y-2 sm:space-y-3">
                {footerLinks.courses.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-300 hover:text-yellow-300 transition-colors duration-300 text-sm sm:text-base">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold text-base sm:text-lg mb-4 sm:mb-6">Quick Links</h3>
              <ul className="space-y-2 sm:space-y-3">
                {footerLinks.quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-300 hover:text-yellow-300 transition-colors duration-300 text-sm sm:text-base">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-semibold text-base sm:text-lg mb-4 sm:mb-6">Contact Info</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm sm:text-base">The Baking School, street no. 13, Ajit road, Bathinda, Punjab.</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 flex-shrink-0" />
                  <span className="text-gray-300 text-sm sm:text-base">98763-20800, 99889-92110</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 flex-shrink-0" />
                  <span className="text-gray-300 text-sm sm:text-base">ceo@bakingschool.in</span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Newsletter</h4>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 sm:px-4 py-2 rounded-full sm:rounded-l-full sm:rounded-r-none glass border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-sm"
                  />
                  <button className="px-4 sm:px-6 py-2 gradient-yellow-blue text-white rounded-full sm:rounded-l-none sm:rounded-r-full hover:scale-105 transition-transform duration-300 text-sm font-medium">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-300 text-xs sm:text-sm text-center sm:text-left">
                © 2024 The Baking School. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                {footerLinks.support.slice(4).map((link) => (
                  <Link key={link.name} href={link.href} className="text-gray-300 hover:text-yellow-300 text-xs sm:text-sm transition-colors duration-300">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}