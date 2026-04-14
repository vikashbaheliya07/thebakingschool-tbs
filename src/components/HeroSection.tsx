"use client"

import { Button } from "@/components/ui/button"
import { Star, Users } from "lucide-react"
import { BookingForm } from "@/components/BookingForm"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules"
import Image from "next/image"
import "swiper/css"
import "swiper/css/effect-fade"

export default function HeroSection() {
  const slides = [
    { src: "/hero-new-1.webp", position: "center 20%" },
    { src: "/hero-new-2.webp", position: "center 30%" },
    { src: "/hero-new-3.webp", position: "center 25%" },
  ]

  return (
    <div className="relative w-full">

      {/* ===== Hero Section (Carousel + Button + Stats) ===== */}
      <section className="relative min-h-screen flex items-center sm:items-end justify-center overflow-hidden pb-8 sm:pb-16 lg:pb-20">

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
                  <Image
                    src={img.src}
                    alt={`The Baking School Hero ${i + 1}`}
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    className="object-cover transition-all duration-700"
                    style={{ objectPosition: img.position }}
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-black/30 sm:bg-black/20"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/75 sm:bg-gradient-to-r sm:from-black/60 sm:via-black/40 sm:to-black/60"></div>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 sm:px-6 lg:px-8 w-full pt-20 sm:pt-28 lg:pt-32">

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

      {/* ===== Marquee (Below Carousel, Single & Centered) ===== */}
      <div className="bg-[#00D100] py-2 sm:py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array(10).fill("THSC Aligned – Wide Range of Diploma Programs in Pastry & Bakery").map((text, i) => (
            <p key={i} className="text-white font-bold text-lg sm:text-2xl mx-8">
              {text}
            </p>
          ))}
        </div>
      </div>

      {/* ===== Marquee Animation ===== */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
      `}</style>
    </div>
  )
}
