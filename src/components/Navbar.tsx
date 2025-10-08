"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { BookingForm } from "@/components/BookingForm"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "Certification", href: "/certification" },
  { name: "Contact", href: "/contact" },
  { name: "Success Stories", href: "/success-stories" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <Image
                  src="/thebakingschool.webp"
                  alt="The Baking School Logo"
                  fill
                  sizes="(max-width: 640px) 40px, 48px"
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-lg sm:text-2xl font-bold dancing-script text-gray-800">
                The Baking School
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-2 xl:space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-gray-900 px-2 xl:px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-gray-100 whitespace-nowrap"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Book Your Seat Button */}
          <div className="hidden lg:block">
            <BookingForm>
              <Button className="gradient-yellow-blue text-white font-semibold px-4 xl:px-6 py-2 rounded-full hover:scale-105 transition-transform duration-300 text-sm">
                Book Your Seat
              </Button>
            </BookingForm>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100 transition-all duration-300 border border-gray-300 hover:border-gray-400"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMounted && isOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-white/20 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1 max-h-screen overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-gray-900 block px-3 py-3 rounded-md text-base font-medium transition-all duration-300 hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4">
              <BookingForm>
                <Button className="w-full gradient-yellow-blue text-white font-semibold py-3 rounded-full text-base">
                  Book Your Seat
                </Button>
              </BookingForm>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}