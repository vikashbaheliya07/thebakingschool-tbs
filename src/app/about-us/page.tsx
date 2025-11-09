"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70"></div>
        <div className="relative z-10 max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            About
            <span className="dancing-script text-yellow-300 text-6xl md:text-8xl block">
              The Baking School
            </span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Learn about our story, our founders, and our vision to empower passionate bakers across the world.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-pink-50 to-white"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-3xl p-10 md:p-14 text-center border border-gray-100">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Our Story</h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              The Baking School Bathinda was born from a passion for the art of baking and the dream to create a space where creativity meets craftsmanship. 
              From humble beginnings in a family bakery to becoming a hub of modern baking education, we’ve always believed in the power of skill, dedication, and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Founders' Message Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-yellow-50 to-pink-50"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
          {/* Gaurav Bansal */}
          <div className="bg-white shadow-lg rounded-3xl p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold mb-2 text-gray-800">Mr. Gaurav Bansal</h3>
            <p className="italic text-gray-500 mb-4">Founder & Director</p>
            <p className="text-gray-700 leading-relaxed">
              Dear Aspiring Bakers,
              <br /><br />
              Welcome to The Baking School Bathinda! My journey began in a small family bakery, where I discovered the joy and artistry of baking. 
              Through years of learning and innovation, I’ve realized that baking is more than a skill — it’s a passion that can shape lives.
              <br /><br />
              At The Baking School, our goal is to provide quality training that blends traditional techniques with modern trends, 
              preparing you to succeed in the global baking industry. Together, let’s create delicious masterpieces and shape the future of baking!
              <br /><br />
              <span className="font-semibold">Warm regards,<br />Mr. Gaurav Bansal</span>
            </p>
          </div>

          {/* Meenu Dhiman */}
          <div className="bg-white shadow-lg rounded-3xl p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold mb-2 text-gray-800">Ms. Meenu Dhiman</h3>
            <p className="italic text-gray-500 mb-4">Founder & CEO</p>
            <p className="text-gray-700 leading-relaxed">
              Welcome to The Baking School Bathinda!
              <br /><br />
              We believe in the power of education and skill development to transform lives. Our mission goes beyond teaching baking — 
              we focus on empowering women, nurturing youth talent, and preparing students to become confident professionals in the global baking industry.
              <br /><br />
              With hands-on training and real-world learning, we help you turn your passion into a successful profession. 
              Join us, and let’s rise together — one bake at a time!
              <br /><br />
              <span className="font-semibold">Warm regards,<br />Meenu Dhiman</span>
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-yellow-50"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Vision & Mission</h2>
          <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">
            Empowering bakers through skill, creativity, and global excellence — one bake at a time.
          </p>

          {/* Vision */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-10 mb-14 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center justify-center gap-2">
              🌟 <span>Our Vision</span>
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
              To be a <span className="font-semibold">THSC-affiliated center of excellence</span> in baking education that empowers individuals — 
              especially women and youth — to build successful, creative, and sustainable careers in the global baking industry.
            </p>
          </div>

          {/* Mission Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {[
              {
                icon: "🍰",
                title: "Quality Baking Education",
                desc: "Provide world-class, THSC-recognized baking education that blends traditional art with modern techniques."
              },
              {
                icon: "💪",
                title: "Empowerment",
                desc: "Empower women and youth through professional skill training and entrepreneurship development."
              },
              {
                icon: "🎓",
                title: "Real-World Experience",
                desc: "Ensure every student gains industry-relevant knowledge and hands-on experience for real-world success."
              },
              {
                icon: "🌱",
                title: "Sustainability & Innovation",
                desc: "Promote creativity and sustainable baking practices that align with global standards."
              },
              {
                icon: "🌍",
                title: "Global Community",
                desc: "Build a network of certified baking professionals who represent India’s talent worldwide."
              },
              {
                icon: "🧁",
                title: "Creativity & Passion",
                desc: "Encourage students to express artistry and love for baking through every creation."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-shadow">
                <h4 className="text-xl font-semibold mb-2 text-gray-800 flex items-center gap-2">
                  <span>{item.icon}</span> {item.title}
                </h4>
                <p className="text-gray-700 text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
