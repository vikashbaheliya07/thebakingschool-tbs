"use client"

import Image from "next/image"

export default function AffiliationSection() {
  const logos = ["/1.png", "/2.png", "/3.png"]

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-yellow-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12">
          Our{" "}
          <span className="dancing-script text-gradient text-4xl sm:text-5xl lg:text-6xl block">
            Affiliations
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center justify-center">
          {logos.map((logo, index) => (
            <div key={index} className="flex justify-center items-center">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 transition-transform hover:scale-105">
                <Image
                  src={logo}
                  alt={`Affiliation Logo ${index + 1}`}
                  fill
                  className="object-contain rounded-lg shadow-md bg-white p-4"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
