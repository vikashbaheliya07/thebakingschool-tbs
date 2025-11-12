"use client"

import { Button } from "@/components/ui/button"
import { Star, Users } from "lucide-react"
import { BookingForm } from "@/components/BookingForm"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-fade"

export default function HeroSection() {
  const slides = [
    { src: "./Hero1.jpg", position: "center 30%" },
    { src: "./Hero2.jpg", position: "center 40%" },
    { src: "./Hero3.jpeg", position: "center 20%" },
  ]

  return (
    <div className="relative w-full">

      {/* ===== Marquee directly under Navbar ===== */}
      <div className="fixed top-[var(--navbar-height,4rem)] left-0 w-full z-50 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 py-2 sm:py-3 overflow-hidden whitespace-nowrap shadow-md">
        <p className="text-white font-bold text-lg sm:text-2xl animate-marquee">
          Discover Your Inner Chef • Discover Your Inner Chef • Discover Your Inner Chef • Discover Your Inner Chef •
        </p>
      </div>

      {/* ===== Hero Section (starts below marquee) ===== */}
      <section className="relative pt-[calc(var(--navbar-height,4rem)+3rem)] min-h-screen flex items-center sm:items-end justify-center overflow-hidden pb-8 sm:pb-16 lg:pb-20">
        
        {/* Background Carousel */}
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
                  <div
                    className="absolute inset-0 bg-cover bg-no-repeat transition-all duration-700"
                    style={{
                      backgroundImage: `url(${img.src})`,
                      backgroundPosition: img.position,
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-black/30 sm:bg-black/20"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/75 sm:bg-gradient-to-r sm:from-black/60 sm:via-black/40 sm:to-black/60"></div>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 sm:px-6 lg:px-8 w-full pt-10 sm:pt-16 lg:pt-20">

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center mb-6 sm:mb-12 px-2 sm:px-0">
            <BookingForm>
              <Button className="gradient-yellow-blue text-white font-semibold px-4 sm:px-8 py-2 sm:py-4 rounded-full text-sm sm:text-lg hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
                <span className="sm:hidden">Start Learning</span>
                <span className="hidden sm:inline">Start Your Journey</span>
              </Button>
            </BookingForm>
          </div>

          {/* Stats */}
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

      {/* ===== Marquee Animation ===== */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </div>
  )
}
