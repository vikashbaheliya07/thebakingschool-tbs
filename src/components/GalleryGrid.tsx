"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, ZoomIn } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

interface GalleryItem {
  id: number
  title: string
  category: string
  image: string
  description?: string
}

interface GalleryGridProps {
  images: GalleryItem[]
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(images.map(item => item.category)))]

  // Filter images based on selected category
  const filteredImages = selectedCategory === "All" 
    ? images 
    : images.filter(item => item.category === selectedCategory)

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? "gradient-yellow-blue text-white"
                : "bg-white/80 text-gray-700 hover:bg-white hover:text-gray-900"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredImages.map((item) => (
          <Dialog key={item.id}>
            <DialogTrigger asChild>
              <Card className="glass border-white/20 hover:scale-105 transition-all duration-300 overflow-hidden group cursor-pointer">
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={item.image} 
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    priority={item.id <= 6} // Load first 6 images with priority
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* Image Info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="inline-block px-2 py-1 rounded-full bg-yellow-400 text-gray-900 text-xs font-semibold mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                  </div>
                </div>
              </Card>
            </DialogTrigger>
            
            {/* Full Size Image Modal */}
            <DialogContent className="max-w-4xl w-full p-0 bg-black/95 border-none">
              <div className="relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={1200}
                  height={800}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="text-white">
                    <span className="inline-block px-3 py-1 rounded-full bg-yellow-400 text-gray-900 text-sm font-semibold mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    {item.description && (
                      <p className="text-white/90">{item.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {/* No Results */}
      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No images found in this category.</p>
        </div>
      )}
    </div>
  )
}