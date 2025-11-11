import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-12 sm:pt-24 sm:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        <div className="relative z-10 max-w-7xl mx-auto py-20 px-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6">
            Privacy{" "}
            <span className="dancing-script text-yellow-300 text-5xl sm:text-6xl md:text-8xl block">
              Policy
            </span>
          </h1>
          <p className="text-base sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Your privacy is important to us. Learn how we handle, protect, and use your information.
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-blue-50"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="glass border-white/20 shadow-xl rounded-2xl">
            <CardContent className="p-6 sm:p-10 space-y-10 text-gray-700 leading-relaxed text-base sm:text-lg">

              <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  The Baking School Bathinda
                </h2>
                <p className="text-gray-600 mt-1">
                  Affiliation: <strong>THSC – Skill India</strong>
                </p>
              </div>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">1. Purpose</h2>
                <p>
                  The Baking School Bathinda values the privacy of every student, visitor, and partner.
                  This Privacy Policy explains how we collect, use, protect, and share your personal information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  2. Information We Collect
                </h2>
                <p>We may collect the following types of information:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Personal details: Name, address, phone number, email ID, date of birth, etc.</li>
                  <li>Educational details: Academic records, qualifications, and enrollment data.</li>
                  <li>Payment information: Course fees, invoices, and payment confirmation.</li>
                  <li>Digital data: Information shared through our website, forms, WhatsApp, or social media channels.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  3. How We Use Your Information
                </h2>
                <p>Your information is used to:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Process admissions, certifications, and payments.</li>
                  <li>Register students for THSC–Skill India certification and government records.</li>
                  <li>Communicate about courses, events, offers, or updates.</li>
                  <li>Improve training programs and student experience.</li>
                  <li>Maintain safety, compliance, and record-keeping as per government guidelines.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  4. Information Protection
                </h2>
                <p>
                  We maintain strong administrative, technical, and digital safeguards to protect your
                  data against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  5. Sharing of Information
                </h2>
                <p>
                  We do not sell or trade your personal information. Information may be shared only with:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>
                    THSC–Skill India or related government bodies for certification or reporting purposes.
                  </li>
                  <li>
                    Authorized service providers (e.g., payment gateways or software tools) strictly for
                    operational purposes.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">6. Your Consent</h2>
                <p>
                  By enrolling or interacting with The Baking School Bathinda, you consent to the
                  collection and use of your information as described in this policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">7. Your Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Access and review your personal data.</li>
                  <li>Request corrections or deletion (as per legal limits).</li>
                  <li>Withdraw consent for communication or marketing messages.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  8. Updates to This Policy
                </h2>
                <p>
                  We may revise this Privacy Policy from time to time. Any updates will be posted on our
                  official website or shared via email/notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">9. Contact Us</h2>
                <p>For any queries or concerns about your personal information or this policy, please contact:</p>
                <p className="mt-2 text-gray-800">
                  📧 <strong>thebakingschoolbti@gmail.com</strong> <br />
                  📍 The Baking School Bathinda, Punjab, India <br />
                  📞 +91 98763-20800
                </p>
              </section>

              <p className="text-sm text-gray-500 pt-6 border-t">
                Last updated on <strong>November 11, 2025</strong>.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
