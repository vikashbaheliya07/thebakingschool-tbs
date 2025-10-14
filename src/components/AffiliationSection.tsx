"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Award } from "lucide-react"

export default function AffiliationSection() {
  const affiliations = [
    {
      name: "Tourism & Hospitality Skill Council (THSC)",
      subtitle: "Affiliation of Training Partner",
      image: "/thsc-certificate.png", // Replace with your certificate screenshot
    },
    {
    name: "Council for Vocational Education and Skill Development (CVESD)",
    subtitle: "Authorised Affiliated Centre",
    image: "/other-certificate.png", // Replace with your certificate screenshot or link
  },
  ]

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-blue-50"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Our <span className="dancing-script text-gradient text-4xl sm:text-5xl lg:text-6xl block">
              Affiliations
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            We take pride in being affiliated with renowned institutions that uphold the highest
            standards of professional baking education.
          </p>
        </div>

        {/* Affiliations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {affiliations.map((affil, index) => (
            <Card
              key={index}
              className="glass border-white/20 p-6 sm:p-8 hover:scale-105 transition-transform duration-300"
            >
              <CardContent className="p-0 space-y-4">
                <div className="flex items-center justify-center mb-2">
                  <Award className="w-8 h-8 text-yellow-600 mr-2" />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {affil.name}
                  </h3>
                </div>

                <div className="relative h-56 sm:h-64 rounded-lg overflow-hidden shadow-md mt-4">
                  <Image
                    src={affil.image}
                    alt={`${affil.name} Certificate`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
