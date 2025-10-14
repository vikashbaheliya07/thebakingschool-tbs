import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import FeaturesSection from "@/components/FeaturesSection"
import CoursesSection from "@/components/CoursesSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import FAQSection from "@/components/FAQSection"
import CTASection from "@/components/CTASection"
import Footer from "@/components/Footer"
import YouTubeEmbed from "@/components/YoutubeFrame"
import { AuthLogin } from "@/components/AuthLogin"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <AuthLogin /> 
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <CoursesSection />
        <YouTubeEmbed videoId="dQw4w9WgXcQ" autoplay={false} />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
