"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        {/* ===== Local Background Image (Adjusted Position) ===== */}
        <div
          className="absolute inset-0 bg-[url('/Hero1.webp')] bg-cover bg-no-repeat transition-all duration-700"
          style={{
            backgroundPosition: "center 40%", // 👈 Pushes the image down slightly
          }}
        ></div>

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
      <section className="pt-28 pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-pink-50 to-white"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-3xl p-10 md:p-14 text-center border border-gray-100">
            <h2 className="text-3xl font-semibold mb-2 text-gray-800">Our Story</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-auto mb-6"></div>
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
            <h3 className="text-2xl font-bold mb-2 text-gray-800">Mrs. Meenu Dhiman</h3>
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
              <span className="font-semibold">Warm regards,<br />Mrs. Meenu Dhiman</span>
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
              Affiliated with the <span className="font-semibold">Tourism and Hospitality Skill Council (THSC)</span>, under the regulatory framework of the <span className="font-semibold">National Council for Vocational Education and Training (NCVET)</span>, aligned with the <span className="font-semibold">Ministry of Skill Development and Entrepreneurship, Government of India</span>.
            </p>
          </div>

          {/* Mission Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {[
              { icon: "🍰", title: "90% Practical Training", desc: "Master baking skills with intensive hands-on experience in a fully equipped commercial kitchen.", accent: "from-yellow-400 to-amber-500" },
              { icon: "🎓", title: "Skill India & THSC Affiliated", desc: "Receive nationally certified credentials under government-approved frameworks (NCVET Compliant – Globally Recognized), recognized both in India and internationally, ensuring your skills and certification are globally accepted for career and entrepreneurial opportunities.", accent: "from-blue-400 to-blue-600" },
              { icon: "📋", title: "Industry-Integrated Curriculum", desc: "Learn commercial production, quality control, costing, and professional kitchen discipline aligned with industry standards.", accent: "from-yellow-400 to-amber-500" },
              { icon: "⭐", title: "5-Star Hotel Internship & Placement", desc: "Gain real-world exposure and career opportunities in premium hotels, resorts, and hospitality brands.", accent: "from-blue-400 to-blue-600" },
              { icon: "✅", title: "Competency-Based Certification", desc: "Training aligned with NCVET and national standards, ensuring students are job-ready for Indian and international hospitality sectors.", accent: "from-yellow-400 to-amber-500" },
              { icon: "💼", title: "Entrepreneurship & Business Guidance", desc: "Acquire skills in costing, pricing, branding, marketing, and profit planning to launch your own bakery.", accent: "from-blue-400 to-blue-600" },
              { icon: "💪", title: "Women & Youth Empowerment", desc: "We empower women, homemakers, and youth to acquire professional baking skills, ensuring self-reliance and financial independence. Training aligns with high-demand sectors such as hotels, cafés, cruise lines, bakeries, event management, airlines, and railway pantries, preparing students for guaranteed career opportunities.", accent: "from-yellow-400 to-amber-500" },
              { icon: "🌍", title: "Global Career Opportunities", desc: "Open doors to hotels, cafés, cruise lines, airlines, railway pantries, and international hospitality markets, backed by globally recognized certification.", accent: "from-blue-400 to-blue-600" },
              { icon: "🧑‍🍳", title: "Personalized Mentorship & Professional Development", desc: "With a 15:2 student-chef ratio and 600 hours of intensive training, students gain individual guidance, develop leadership, teamwork, and industry-ready confidence.", accent: "from-yellow-400 to-amber-500" },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
                {/* Top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.accent}`}></div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{item.icon}</span>
                </div>

                {/* Title */}
                <h4 className="text-lg font-bold mb-3 text-gray-800 leading-snug">
                  {item.title}
                </h4>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-pink-50"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Meet Our Team</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">
            The passionate professionals behind The Baking School who inspire and guide our students every day.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Mr. Gaurav Bansal",
                role: "Founder & Director",
                desc: "With years of experience in the baking industry, Gaurav brings vision, innovation, and a passion for empowering aspiring bakers.",
                initials: "GB",
                gradient: "from-yellow-400 to-amber-500",
              },
              {
                name: "Ms. Meenu Dhiman",
                role: "Founder & CEO",
                desc: "Meenu leads with a mission to empower women and youth through professional baking education and skill development.",
                initials: "MD",
                gradient: "from-blue-400 to-blue-600",
              },
              {
                name: "Chef Instructor",
                role: "Head Chef & Lead Trainer",
                desc: "Our expert chef instructor brings extensive 5-star hotel experience, guiding students with hands-on mentorship and industry best practices.",
                initials: "CI",
                gradient: "from-yellow-400 to-amber-500",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <span className="text-2xl font-bold text-white">{member.initials}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-sm font-medium text-yellow-600 mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
