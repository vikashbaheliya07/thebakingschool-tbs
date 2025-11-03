"use client"

import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa"

export default function FloatingSocials() {
  return (
    <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 flex flex-col gap-2 sm:gap-3 z-50">
      {/* WhatsApp */}
      <a
        href="https://wa.me/9876320800" // 🔹 Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-2 sm:p-2.5 md:p-3 rounded-full shadow-md 
                   hover:scale-110 transition-transform duration-200"
      >
        <FaWhatsapp className="text-[14px] sm:text-[16px] md:text-[18px]" />
      </a>

      {/* Facebook */}
      <a
        href="https://facebook.com/The-Baking-school-100093333789801" // 🔹 Replace with your Facebook link
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white p-2 sm:p-2.5 md:p-3 rounded-full shadow-md 
                   hover:scale-110 transition-transform duration-200"
      >
        <FaFacebookF className="text-[14px] sm:text-[16px] md:text-[18px]" />
      </a>

      {/* Instagram */}
      <a
        href="https://instagram.com/thebakingschoolbti" // 🔹 Replace with your Instagram handle
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white 
                   p-2 sm:p-2.5 md:p-3 rounded-full shadow-md hover:scale-110 
                   transition-transform duration-200"
      >
        <FaInstagram className="text-[14px] sm:text-[16px] md:text-[18px]" />
      </a>
    </div>
  )
}
