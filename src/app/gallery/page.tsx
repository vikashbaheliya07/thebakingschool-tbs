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
import { 
  loadGalleryImages, 
  saveGalleryImages, 
  fileToBase64, 
  validateImageFile,
  type GalleryImage 
} from "@/utils/galleryStorage"
import { studentGalleryImages } from "@/utils/galleryConfig"

// Example gallery data - mix of external URLs and local WebP images
const initialGalleryImages = studentGalleryImages

function GalleryPageContent() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(initialGalleryImages)
  const [isLoading, setIsLoading] = useState(true)

  // Load images from localStorage on component mount
  useEffect(() => {
    const storedImages = loadGalleryImages()
    if (storedImages.length > 0) {
      setGalleryImages(storedImages)
    } else {
      // If no stored images, save the initial images
      saveGalleryImages(initialGalleryImages)
    }
    setIsLoading(false)
  }, [])

  // Save images to localStorage whenever galleryImages changes
  useEffect(() => {
    if (!isLoading) {
      saveGalleryImages(galleryImages)
    }
  }, [galleryImages, isLoading])

  const handleImagesUploaded = async (uploadedImages: { title: string; category: string; file: File; description?: string }[]) => {
    try {
      // Convert uploaded images to gallery format with base64 storage
      const newGalleryImages: GalleryImage[] = []
      
      for (let i = 0; i < uploadedImages.length; i++) {
        const img = uploadedImages[i]
        
        // Validate the file
        const validation = validateImageFile(img.file)
        if (!validation.valid) {
          alert(`${img.title}: ${validation.error}`)
          continue
        }
        
        // Convert to base64 for storage
        const base64Image = await fileToBase64(img.file)
        
        const newImage: GalleryImage = {
          id: Math.max(...galleryImages.map(img => img.id), 0) + i + 1,
          title: img.title,
          category: img.category,
          image: base64Image, // Store as base64
          description: img.description || `Uploaded image: ${img.title}`,
          uploadDate: new Date().toLocaleDateString(),
          uploader: 'User',
          likes: 0,
          views: 0
        }
        
        newGalleryImages.push(newImage)
      }

      // Add new images to the gallery
      setGalleryImages(prev => [...newGalleryImages, ...prev])
      
      alert(`Successfully uploaded ${newGalleryImages.length} image(s) to the gallery!`)
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload images. Please try again.')
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>
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
            Each piece tells a story of passion, skill, and dedication.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-blue-50"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Authentication & Upload Controls */}
          <div className="flex flex-col items-center gap-4 mb-8">
            {/* Authentication Controls */}
            <div className="flex justify-center gap-3">
              <AuthLogin />
              <AuthenticatedOnly showFallback={false}>
                <RoleBasedDashboard />
              </AuthenticatedOnly>
            </div>
            
            {/* Upload Buttons - Admin Only */}
            <PermissionGuard permission={Permission.ADMIN_ACCESS} showFallback={false}>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <ImageUpload onImagesUploaded={handleImagesUploaded} />
                <AdminUpload 
                  images={galleryImages} 
                  onImagesUpdate={setGalleryImages} 
                />
              </div>
            </PermissionGuard>
          </div>
        
          {/* Loading State */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading gallery...</p>
            </div>
          ) : (
            <GalleryGrid images={initialGalleryImages} />
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