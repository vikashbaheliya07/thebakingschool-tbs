"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "What are the prerequisites for joining baking courses?",
    answer: "No prior experience is required for our beginner courses. We welcome students of all skill levels, from complete beginners to those looking to refine their techniques. Our instructors will guide you through every step of the learning process."
  },
  {
    question: "Do you provide all the ingredients and equipment?",
    answer: "Yes, all ingredients, tools, and equipment are provided during classes. You don't need to bring anything except your enthusiasm to learn! We use professional-grade equipment to ensure you get hands-on experience with industry-standard tools."
  },
  {
    question: "Are the courses suitable for people with dietary restrictions?",
    answer: "Absolutely! We offer specialized courses for gluten-free and vegan baking. Additionally, our instructors can provide guidance on adapting recipes for various dietary needs including sugar-free, dairy-free, and other dietary restrictions."
  },
  {
    question: "What kind of certification do you provide?",
    answer: "We award each student a Nationally Recognized Skill Certificate in Baking, certified by THSC–NCVET under the Skill India Mission, along with ISO 9001:2015 quality standards."
  },
  {
    question: "Can I take courses if I want to start a baking business?",
    answer: "Yes! Many of our students have successfully started their own bakeries and home-based businesses. Our courses cover not just baking techniques but also business aspects like costing, packaging, and food safety regulations to help you succeed as an entrepreneur."
  },
  {
    question: "What is your class size and student-to-instructor ratio?",
    answer: "We maintain small class sizes with a maximum of 6-12 students per class, depending on the course. This ensures personalized attention and hands-on guidance from our expert instructors. You'll get plenty of individual feedback and support."
  },
  {
    question: "Do you offer online or only in-person classes?",
    answer: "Make sure that we don’t provide online classes or any type of informative content online yet. But we’ll be doing this very soon. "
  },
  {
    question: "What happens if I miss a class?",
    answer: "We understand that life happens! If you miss a class, we offer make-up sessions or you can join the same class in the next batch. We also provide detailed recipe cards and notes so you can practice at home and stay caught up with the curriculum."
  },
  {
    question: "Are there any age restrictions for the courses?",
    answer: "Our regular courses are designed for adults (18+). However, we do offer special weekend workshops for teenagers (14-17) with parental consent. We also have family baking sessions where parents and children can learn together."
  },
  {
    question: "What payment options do you accept?",
    answer: "We accept various payment methods including cash, credit/debit cards, UPI, net banking, and EMI options for higher-value courses. We also offer early bird discounts and flexible payment plans to make our courses accessible to everyone."
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-blue-50"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-100 to-blue-100 mb-6">
            <HelpCircle className="w-8 h-8 text-gray-700" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Frequently Asked
            <span className="dancing-script text-gradient text-4xl sm:text-5xl lg:text-6xl block">
              Questions
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Got questions? We have got answers! Here are the most common questions 
            about our baking courses and programs.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="glass border-white/20 overflow-hidden">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-4 sm:p-6 hover:bg-white/50 transition-colors duration-200 focus:outline-none focus:bg-white/50"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {openIndex === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </button>
                
                {openIndex === index && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our friendly team is here to help you find the perfect course for your baking journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-blue-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300"
              >
                Contact Us
              </a>
              <a 
                href="tel:+919876543210" 
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-colors duration-300"
                onClick={() => {
                  // Track call action for analytics
                  console.log('Call Now button clicked')
                  // On mobile devices, this will automatically open the phone dialer
                  // On desktop, it may open the default calling app or show a dialog
                }}
              >
                📞 Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}