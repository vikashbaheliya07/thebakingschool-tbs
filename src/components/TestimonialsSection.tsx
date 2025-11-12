"use client"

import { useEffect } from "react"

export default function TestimonialsSection() {
  useEffect(() => {
    // Reinitialize Featurable script on client side if needed
    const existingScript = document.querySelector('script[src="https://featurable.com/assets/v2/carousel_default.min.js"]')
    if (!existingScript) {
      const script = document.createElement("script")
      script.src = "https://featurable.com/assets/v2/carousel_default.min.js"
      script.defer = true
      script.charset = "UTF-8"
      document.body.appendChild(script)
    }
  }, [])

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* ===== Background Gradient ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-blue-50"></div>

      {/* ===== Foreground ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ===== Section Header ===== */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 px-4">
            <span className="dancing-script text-gradient text-4xl sm:text-5xl lg:text-6xl block">
              Reviews
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Real feedback from our students and bakers — straight from Google Reviews!
          </p>
        </div>

        {/* ===== Featurable Google Reviews Embed ===== */}
          <div
            id="featurable-511b7fbd-9cdc-46ba-bace-0c2e11d3f0b2"
            data-featurable-async
            className="w-full"
          ></div>
        </div>
    </section>
  )
}
