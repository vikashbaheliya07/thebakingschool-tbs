"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { GalleryGrid } from "@/components/GalleryGrid"
import { ImageUpload } from "@/components/ImageUpload"
import { AdminUpload } from "@/components/AdminUpload"
import { AuthProvider } from "@/contexts/AuthContext"
import { PermissionGuard, AuthenticatedOnly } from "@/components/RoleBasedAccess"
import { AuthLogin } from "@/components/AuthLogin"
import { RoleBasedDashboard } from "@/components/RoleBasedDashboard"
import { Permission } from "@/types/auth"
import { validateImageFile, type GalleryImage } from "@/utils/galleryStorage"

function GalleryPageContent() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // ✅ Fetch images from MongoDB
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/gallery")
        const data = await res.json()
        if (res.ok && Array.isArray(data)) {
          setGalleryImages(data)
        } else {
          console.warn("Failed to load gallery:", data?.error || data)
          setGalleryImages([])
        }
      } catch (err) {
        console.warn("Error fetching gallery:", err)
        setGalleryImages([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [])

  // ✅ Upload images: Cloudinary → MongoDB
  const handleImagesUploaded = async (
    uploadedImages: { title: string; category: string; file: File; description?: string }[]
  ) => {
    try {
      const newGalleryImages: GalleryImage[] = []

      for (const img of uploadedImages) {
        const validation = validateImageFile(img.file)
        if (!validation.valid) {
          alert(`${img.title}: ${validation.error}`)
          continue
        }

        // Upload to Cloudinary
        const formData = new FormData()
        formData.append("file", img.file)
        const res = await fetch("/api/upload", { method: "POST", body: formData })
        const data = await res.json()
        if (!data.success) {
          alert(`Upload failed for ${img.title}`)
          continue
        }

        const uploadedUrl = data.result.secure_url

        // Save metadata in MongoDB
        const saveRes = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: img.title,
            category: img.category,
            image: uploadedUrl,
            description: img.description || `Uploaded image: ${img.title}`,
            uploader: "Admin",
          }),
        })

        const savedImage = await saveRes.json()
        if (!saveRes.ok) {
          console.error("Mongo save failed:", savedImage.error)
          continue
        }

        newGalleryImages.push(savedImage)
      }

      setGalleryImages((prev) => [...newGalleryImages, ...prev])
      alert(`Uploaded & saved ${newGalleryImages.length} image(s)!`)
    } catch (error) {
      console.error("Upload error:", error)
      alert("Failed to upload images. Please try again.")
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/Hero3.webp')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        <div className="relative z-10 max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Our
            <span className="dancing-script text-yellow-300 text-6xl md:text-8xl block">
              Gallery
            </span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Discover the beautiful creations from our talented students and expert instructors.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-blue-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="flex justify-center gap-3">
              <AuthLogin />
              <AuthenticatedOnly showFallback={false}>
                <RoleBasedDashboard />
              </AuthenticatedOnly>
            </div>

            <PermissionGuard permission={Permission.ADMIN_ACCESS} showFallback={false}>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <ImageUpload onImagesUploaded={handleImagesUploaded} />
                <AdminUpload images={galleryImages} onImagesUpdate={setGalleryImages} />
              </div>
            </PermissionGuard>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading gallery...</p>
            </div>
          ) : (
<GalleryGrid
  images={galleryImages.map((img, index) => ({
    ...img,
    id: img.id ?? index + 1, // 👈 fallback ID
  }))}
/>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function GalleryPage() {
  return (
    <AuthProvider>
      <GalleryPageContent />
    </AuthProvider>
  )
}
