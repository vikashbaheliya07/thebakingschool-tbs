"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Instagram } from "lucide-react"

export default function InstagramFeedSection() {
  return (
    <section className="py-20 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-blue-50"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Our{" "}
            <span className="dancing-script text-gradient text-4xl sm:text-5xl lg:text-6xl block">
              Instagram Feed
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Catch a glimpse of our students’ creations, workshops, and behind-the-scenes fun at{" "}
            <a
              href="https://www.instagram.com/thebakingschoolbti/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-600 font-semibold hover:underline"
            >
              @thebakingschoolbti
            </a>
          </p>
        </div>

        {/* Static Embedded Reels (Full Height, No Scroll) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {/* Reel 1 */}
          <Card className="glass overflow-hidden border-white/20 hover:scale-105 transition-transform duration-300">
            <CardContent className="p-0">
              <div className="w-full h-[600px] sm:h-[700px] overflow-hidden rounded-lg shadow-md">
                <iframe
                  src="https://www.instagram.com/reel/DIdHbtATmrg/embed"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  scrolling="no"
                  frameBorder="0"
                  className="w-full h-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Reel 2 */}
          <Card className="glass overflow-hidden border-white/20 hover:scale-105 transition-transform duration-300">
            <CardContent className="p-0">
              <div className="w-full h-[600px] sm:h-[700px] overflow-hidden rounded-lg shadow-md">
                <iframe
                  src="https://www.instagram.com/reel/DITfvFxzR_T/embed"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  scrolling="no"
                  frameBorder="0"
                  className="w-full h-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Reel 3 */}
          <Card className="glass overflow-hidden border-white/20 hover:scale-105 transition-transform duration-300">
            <CardContent className="p-0">
              <div className="w-full h-[600px] sm:h-[700px] overflow-hidden rounded-lg shadow-md">
                <iframe
                  src="https://www.instagram.com/reel/DIvtmU_yHZE/embed"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  scrolling="no"
                  frameBorder="0"
                  className="w-full h-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Button */}
        <div className="mt-12">
          <a
            href="https://www.instagram.com/thebakingschoolbti/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-blue-500 text-white font-semibold px-6 py-3 rounded-full hover:scale-105 transition-transform duration-300"
          >
            <Instagram className="w-5 h-5" />
            Follow Us on Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
