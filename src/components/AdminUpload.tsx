"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  X,
  Image as ImageIcon,
  Camera,
  Plus,
  Settings,
  Trash2,
  Edit,
  Save,
  Eye
} from "lucide-react"
import Image from "next/image"

interface GalleryImage {
  id: number
  title: string
  category: string
  image: string
  description?: string
  uploadDate?: string
  uploader?: string
}

interface AdminUploadProps {
  images: GalleryImage[]
  onImagesUpdate: (images: GalleryImage[]) => void
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

export function AdminUpload({ images, onImagesUpdate }: AdminUploadProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'upload' | 'manage'>('upload')
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)

  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    title: '',
    category: '',
    description: '',
    uploader: 'Admin'
  })

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(file => {
        if (!file.type.startsWith('image/')) {
          alert(`${file.name} is not an image file`)
          return false
        }
        if (file.size > 5 * 1024 * 1024) {
          alert(`${file.name} is too large. Maximum size is 5MB`)
          return false
        }
        return true
      })
      setUploadedFiles(files)
    }
  }

  // Submit upload
  const handleUploadSubmit = () => {
    if (uploadedFiles.length === 0) {
      alert("Please select at least one image")
      return
    }

    if (!uploadForm.title.trim() || !uploadForm.category) {
      alert("Please fill in title and category")
      return
    }

    const newImages: GalleryImage[] = uploadedFiles.map((file, index) => ({
      id: Math.max(...images.map(img => img.id), 0) + index + 1,
      title: uploadedFiles.length === 1 ? uploadForm.title : `${uploadForm.title} ${index + 1}`,
      category: uploadForm.category,
      image: URL.createObjectURL(file), // In real app, this would be uploaded to server
      description: uploadForm.description,
      uploadDate: new Date().toLocaleDateString(),
      uploader: uploadForm.uploader
    }))

    onImagesUpdate([...newImages, ...images])

    // Reset form
    setUploadedFiles([])
    setUploadForm({
      title: '',
      category: '',
      description: '',
      uploader: 'Admin'
    })

    alert(`Successfully uploaded ${newImages.length} image(s)!`)
  }

  // Delete image
  const handleDeleteImage = (id: number) => {
    if (confirm("Are you sure you want to delete this image?")) {
      onImagesUpdate(images.filter(img => img.id !== id))
    }
  }

  // Edit image
  const handleEditImage = (image: GalleryImage) => {
    setEditingImage({ ...image })
  }

  // Save edited image
  const handleSaveEdit = () => {
    if (!editingImage) return

    onImagesUpdate(images.map(img =>
      img.id === editingImage.id ? editingImage : img
    ))
    setEditingImage(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Settings className="w-4 h-4" />
          Manage Gallery
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Gallery Management
          </DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === 'upload' ? 'default' : 'outline'}
            onClick={() => setActiveTab('upload')}
            className="gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload Images
          </Button>
          <Button
            variant={activeTab === 'manage' ? 'default' : 'outline'}
            onClick={() => setActiveTab('manage')}
            className="gap-2"
          >
            <Eye className="w-4 h-4" />
            Manage Images ({images.length})
          </Button>
        </div>

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Upload New Images
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* File Input */}
                <div>
                  <Label htmlFor="file-upload">Select Images</Label>
                  <Input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Supports: JPG, PNG, WebP • Max size: 5MB per image
                  </p>
                </div>

                {/* Preview uploaded files */}
                {uploadedFiles.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          width={150}
                          height={150}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Badge className="absolute top-2 left-2 text-xs">
                          {file.name.split('.').pop()?.toUpperCase()}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={uploadForm.title}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter image title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={uploadForm.category}
                      onValueChange={(value) => setUploadForm(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
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
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Optional description..."
                    className="h-20"
                  />
                </div>

                <div>
                  <Label htmlFor="uploader">Uploader</Label>
                  <Input
                    id="uploader"
                    value={uploadForm.uploader}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, uploader: e.target.value }))}
                    placeholder="Who uploaded this?"
                  />
                </div>

                <Button
                  onClick={handleUploadSubmit}
                  className="w-full gradient-yellow-blue text-white"
                  disabled={uploadedFiles.length === 0}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload {uploadedFiles.length} Image{uploadedFiles.length !== 1 ? 's' : ''}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Manage Tab */}
        {activeTab === 'manage' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {images.map((image) => (
                <Card key={image.id} className="relative">
                  <div className="relative h-32">
                    <Image
                      src={image.image}
                      alt={image.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-8 h-8 p-0"
                        onClick={() => handleEditImage(image)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="w-8 h-8 p-0"
                        onClick={() => handleDeleteImage(image.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h4 className="font-semibold text-sm truncate">{image.title}</h4>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {image.category}
                    </Badge>
                    {image.uploadDate && (
                      <p className="text-xs text-gray-500 mt-1">
                        {image.uploadDate} • {image.uploader}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {images.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No images in gallery. Upload some images to get started!
              </div>
            )}
          </div>
        )}

        {/* Edit Modal */}
        {editingImage && (
          <Dialog open={!!editingImage} onOpenChange={() => setEditingImage(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Image</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={editingImage.title}
                    onChange={(e) => setEditingImage(prev => prev ? { ...prev, title: e.target.value } : null)}
                  />
                </div>

                <div>
                  <Label htmlFor="edit-category">Category</Label>
                  <Select
                    value={editingImage.category}
                    onValueChange={(value) => setEditingImage(prev => prev ? { ...prev, category: value } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
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

                <div>
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editingImage.description || ''}
                    onChange={(e) => setEditingImage(prev => prev ? { ...prev, description: e.target.value } : null)}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setEditingImage(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveEdit} className="gradient-yellow-blue text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  )
}