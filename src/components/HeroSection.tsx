"use client"

import { Button } from "@/components/ui/button"
import { Star, Users } from "lucide-react"
import { BookingForm } from "@/components/BookingForm"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-fade"

export default function HeroSection() {
  // Each slide can have a different focus area
  const slides = [
    { src: "./Hero1.jpg", position: "center 30%" }, // slightly pushed down
    { src: "./Hero2.jpg", position: "center" },
  ]

  return (
    <section className="min-h-screen flex items-center sm:items-end justify-center relative overflow-hidden pb-8 sm:pb-16 lg:pb-20">
      
      {/* ===== Background Carousel ===== */}
      <div className="absolute inset-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          className="h-full w-full"
        >
          {slides.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-full w-full">
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-no-repeat transition-all duration-700"
                  style={{
                    backgroundImage: `url(${img.src})`,
                    backgroundPosition: img.position,
                  }}
                ></div>

                {/* Subtle overlay on each image */}
                <div className="absolute inset-0 bg-black/30 sm:bg-black/20"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Global gradient overlay to keep text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/75 sm:bg-gradient-to-r sm:from-black/60 sm:via-black/40 sm:to-black/60"></div>
      </div>

      {/* ===== Foreground Content ===== */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 sm:px-6 lg:px-8 w-full pt-20 sm:pt-28 lg:pt-32">
        
        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-3 sm:mb-6 text-white drop-shadow-2xl">
          <span className="block sm:hidden">
            Discover Your 
            <span className="dancing-script text-yellow-300 text-4xl block">
              Inner Chef
            </span>
          </span>
          <span className="hidden sm:block">
            Discover Your 
            <span className="dancing-script text-yellow-300 text-6xl md:text-7xl lg:text-9xl block">
              Inner Chef
            </span>
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-sm sm:text-xl md:text-2xl text-white/90 mb-4 sm:mb-8 max-w-xs sm:max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
          <span className="block sm:hidden">
            Transform your passion into profession
          </span>
          <span className="hidden sm:block">
            Transform your passion into profession with our comprehensive baking
            courses. Learn from master chefs and create delicious memories.
          </span>
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center mb-6 sm:mb-12 px-2 sm:px-0">
          <BookingForm>
            <Button className="gradient-yellow-blue text-white font-semibold px-4 sm:px-8 py-2 sm:py-4 rounded-full text-sm sm:text-lg hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
              <span className="sm:hidden">Start Learning</span>
              <span className="hidden sm:inline">Start Your Journey</span>
            </Button>
          </BookingForm>
        </div>

        {/* Stats (visible on tablets and larger) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="glass rounded-2xl p-4 text-center">
            <Users className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">300+</div>
            <div className="text-white/80 text-sm">Students</div>
          </div>
          <div className="glass rounded-2xl p-4 text-center">
            <Star className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">4.9</div>
            <div className="text-white/80 text-sm">Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}
