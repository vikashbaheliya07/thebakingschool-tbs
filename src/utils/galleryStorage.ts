// Gallery storage utilities for demo purposes
// In a real application, you would use a proper backend/database

export interface GalleryImage {
  id: number
  title: string
  category: string
  image: string
  description?: string
  uploadDate?: string
  uploader?: string
  tags?: string[]
  likes?: number
  views?: number
}

// Local storage key
const GALLERY_STORAGE_KEY = 'baking-school-gallery'

// Save gallery images to localStorage
export function saveGalleryImages(images: GalleryImage[]): void {
  try {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(images))
  } catch (error) {
    console.error('Failed to save gallery images:', error)
  }
}

// Load gallery images from localStorage
export function loadGalleryImages(): GalleryImage[] {
  try {
    const stored = localStorage.getItem(GALLERY_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Failed to load gallery images:', error)
    return []
  }
}

// Add a new image to the gallery
export function addGalleryImage(image: Omit<GalleryImage, 'id'>): GalleryImage {
  const existingImages = loadGalleryImages()
  const newId = Math.max(...existingImages.map(img => img.id), 0) + 1
  
  const newImage: GalleryImage = {
    ...image,
    id: newId,
    uploadDate: image.uploadDate || new Date().toLocaleDateString(),
    likes: 0,
    views: 0
  }
  
  const updatedImages = [newImage, ...existingImages]
  saveGalleryImages(updatedImages)
  
  return newImage
}

// Update an existing image
export function updateGalleryImage(id: number, updates: Partial<GalleryImage>): boolean {
  const images = loadGalleryImages()
  const imageIndex = images.findIndex(img => img.id === id)
  
  if (imageIndex === -1) return false
  
  images[imageIndex] = { ...images[imageIndex], ...updates }
  saveGalleryImages(images)
  
  return true
}

// Delete an image
export function deleteGalleryImage(id: number): boolean {
  const images = loadGalleryImages()
  const filteredImages = images.filter(img => img.id !== id)
  
  if (filteredImages.length === images.length) return false
  
  saveGalleryImages(filteredImages)
  return true
}

// Get images by category
export function getImagesByCategory(category: string): GalleryImage[] {
  const images = loadGalleryImages()
  return category === 'All' ? images : images.filter(img => img.category === category)
}

// Search images
export function searchImages(query: string): GalleryImage[] {
  const images = loadGalleryImages()
  const lowercaseQuery = query.toLowerCase()
  
  return images.filter(img => 
    img.title.toLowerCase().includes(lowercaseQuery) ||
    img.description?.toLowerCase().includes(lowercaseQuery) ||
    img.category.toLowerCase().includes(lowercaseQuery) ||
    img.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

// Increment view count
export function incrementViews(id: number): void {
  const images = loadGalleryImages()
  const imageIndex = images.findIndex(img => img.id === id)
  
  if (imageIndex !== -1) {
    images[imageIndex].views = (images[imageIndex].views || 0) + 1
    saveGalleryImages(images)
  }
}

// Toggle like
export function toggleLike(id: number): number {
  const images = loadGalleryImages()
  const imageIndex = images.findIndex(img => img.id === id)
  
  if (imageIndex !== -1) {
    const currentLikes = images[imageIndex].likes || 0
    images[imageIndex].likes = currentLikes + 1
    saveGalleryImages(images)
    return images[imageIndex].likes!
  }
  
  return 0
}

// Convert File to base64 for storage
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}

// Validate image file
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'File must be an image' }
  }
  
  // Check file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    return { valid: false, error: 'File size must be less than 5MB' }
  }
  
  // Check file extension
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
  const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))
  
  if (!allowedExtensions.includes(fileExtension)) {
    return { valid: false, error: 'File type not supported' }
  }
  
  return { valid: true }
}

// Get gallery statistics
export function getGalleryStats() {
  const images = loadGalleryImages()
  const categories = [...new Set(images.map(img => img.category))]
  
  return {
    totalImages: images.length,
    totalCategories: categories.length,
    totalViews: images.reduce((sum, img) => sum + (img.views || 0), 0),
    totalLikes: images.reduce((sum, img) => sum + (img.likes || 0), 0),
    categoryCounts: categories.map(category => ({
      category,
      count: images.filter(img => img.category === category).length
    }))
  }
}