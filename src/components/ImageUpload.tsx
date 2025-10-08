"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Upload, X, Image as ImageIcon, Camera, Plus } from "lucide-react"
import Image from "next/image"

interface UploadedImage {
  file: File
  preview: string
  title: string
  category: string
  description: string
}

interface ImageUploadProps {
  onImagesUploaded: (images: UploadedImage[]) => void
}

const categories = [
  "Pastries",
  "Cakes", 
  "Breads",
  "Confections",
  "Cupcakes",
  "Pies",
  "Student Work",
  "Instructor Demos",
  "Behind the Scenes"
]

export function ImageUpload({ onImagesUploaded }: ImageUploadProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle file selection
  const handleFiles = useCallback((files: FileList) => {
    const validFiles = Array.from(files).filter(file => {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image file`)
        return false
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large. Maximum size is 5MB`)
        return false
      }
      
      return true
    })

    const newImages: UploadedImage[] = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      title: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
      category: "Student Work",
      description: ""
    }))

    setUploadedImages(prev => [...prev, ...newImages])
  }, [])

  // Handle drag and drop
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [handleFiles])

  // Handle file input change
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  // Update image details
  const updateImage = (index: number, field: keyof UploadedImage, value: string) => {
    setUploadedImages(prev => prev.map((img, i) => 
      i === index ? { ...img, [field]: value } : img
    ))
  }

  // Remove image
  const removeImage = (index: number) => {
    setUploadedImages(prev => {
      const newImages = prev.filter((_, i) => i !== index)
      // Clean up object URL
      URL.revokeObjectURL(prev[index].preview)
      return newImages
    })
  }

  // Handle upload submission
  const handleUpload = () => {
    if (uploadedImages.length === 0) {
      alert("Please select at least one image")
      return
    }

    // Validate all images have required fields
    const invalidImages = uploadedImages.filter(img => !img.title.trim() || !img.category)
    if (invalidImages.length > 0) {
      alert("Please fill in title and category for all images")
      return
    }

    onImagesUploaded(uploadedImages)
    
    // Clean up and reset
    uploadedImages.forEach(img => URL.revokeObjectURL(img.preview))
    setUploadedImages([])
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-yellow-blue text-white font-semibold px-6 py-3 rounded-full hover:scale-105 transition-transform duration-300">
          <Plus className="w-5 h-5 mr-2" />
          Upload Images
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Upload Gallery Images
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Area */}
          <Card className="border-2 border-dashed border-gray-300 hover:border-yellow-400 transition-colors">
            <CardContent className="p-8">
              <div
                className={`text-center space-y-4 ${
                  dragActive ? "bg-yellow-50 border-yellow-400" : ""
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="flex justify-center">
                  <div className="p-4 bg-yellow-100 rounded-full">
                    <Upload className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Drop images here or click to browse
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Supports: JPG, PNG, WebP • Max size: 5MB per image
                  </p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Choose Files
                </Button>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>
            </CardContent>
          </Card>

          {/* Uploaded Images Preview */}
          {uploadedImages.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Images to Upload ({uploadedImages.length})
              </h3>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {uploadedImages.map((image, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex gap-4">
                      {/* Image Preview */}
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={image.preview}
                          alt={image.title}
                          fill
                          className="object-cover rounded-lg"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full"
                          onClick={() => removeImage(index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>

                      {/* Image Details Form */}
                      <div className="flex-1 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor={`title-${index}`}>Title *</Label>
                            <Input
                              id={`title-${index}`}
                              value={image.title}
                              onChange={(e) => updateImage(index, 'title', e.target.value)}
                              placeholder="Enter image title"
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor={`category-${index}`}>Category *</Label>
                            <Select
                              value={image.category}
                              onValueChange={(value) => updateImage(index, 'category', value)}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor={`description-${index}`}>Description</Label>
                          <Textarea
                            id={`description-${index}`}
                            value={image.description}
                            onChange={(e) => updateImage(index, 'description', e.target.value)}
                            placeholder="Optional description..."
                            className="mt-1 h-20 resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Upload Button */}
          {uploadedImages.length > 0 && (
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => {
                  uploadedImages.forEach(img => URL.revokeObjectURL(img.preview))
                  setUploadedImages([])
                }}
              >
                Clear All
              </Button>
              <Button
                onClick={handleUpload}
                className="gradient-yellow-blue text-white px-6"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload {uploadedImages.length} Image{uploadedImages.length !== 1 ? 's' : ''}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}