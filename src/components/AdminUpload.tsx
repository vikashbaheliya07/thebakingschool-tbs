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
  Camera,
  Plus,
  Settings,
  Trash2,
  Edit,
  Save,
  Eye,
} from "lucide-react"
import Image from "next/image"
import { validateImageFile } from "@/utils/galleryStorage"

interface GalleryImage {
  _id?: string
  id?: number
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
  "Behind the Scenes",
]

export function AdminUpload({ images, onImagesUpdate }: AdminUploadProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"upload" | "manage">("upload")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [uploadForm, setUploadForm] = useState({
    title: "",
    category: "",
    description: "",
    uploader: "Admin",
  })
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [loading, setLoading] = useState(false)

  // =====================
  // ✅ Upload New Images
  // =====================
  const handleUploadSubmit = async () => {
    if (uploadedFiles.length === 0) return alert("Please select at least one image")
    if (!uploadForm.title.trim() || !uploadForm.category)
      return alert("Please fill in title and category")

    setLoading(true)

    try {
      const newImages: GalleryImage[] = []

      for (const file of uploadedFiles) {
        const validation = validateImageFile(file)
        if (!validation.valid) {
          alert(`${file.name}: ${validation.error}`)
          continue
        }

        // Upload to Cloudinary
        const formData = new FormData()
        formData.append("file", file)
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })
        const uploadData = await uploadRes.json()
        if (!uploadData.success) {
          alert(`Upload failed for ${file.name}`)
          continue
        }

        const uploadedUrl = uploadData.result.secure_url

        // Save metadata in MongoDB
        const saveRes = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: uploadForm.title,
            category: uploadForm.category,
            image: uploadedUrl,
            description: uploadForm.description,
            uploader: uploadForm.uploader,
          }),
        })

        const savedData = await saveRes.json()
        if (!saveRes.ok) {
          console.error("MongoDB save failed:", savedData.error)
          continue
        }

        newImages.push(savedData)
      }

      onImagesUpdate([...newImages, ...images])
      alert(`Uploaded ${newImages.length} image(s)!`)
      setUploadedFiles([])
      setUploadForm({ title: "", category: "", description: "", uploader: "Admin" })
    } catch (err) {
      console.error("Upload Error:", err)
      alert("Upload failed.")
    } finally {
      setLoading(false)
    }
  }

  // =====================
  // 🔁 Update Image
  // =====================
  const handleSaveEdit = async () => {
    if (!editingImage || !editingImage._id) return
    setLoading(true)
    try {
      const res = await fetch(`/api/gallery/${editingImage._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editingImage.title,
          description: editingImage.description,
          category: editingImage.category,
        }),
      })

      const updated = await res.json()
      if (res.ok) {
        onImagesUpdate(images.map((img) => (img._id === updated._id ? updated : img)))
        setEditingImage(null)
        alert("Image updated successfully!")
      } else {
        alert("Update failed: " + updated.error)
      }
    } catch (err) {
      console.error("Update Error:", err)
      alert("Failed to update image.")
    } finally {
      setLoading(false)
    }
  }

  // =====================
  // 🗑 Delete Image
  // =====================
  const handleDeleteImage = async (id?: string) => {
    if (!id) return
    if (!confirm("Are you sure you want to delete this image?")) return

    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" })
      const data = await res.json()
      if (res.ok) {
        onImagesUpdate(images.filter((img) => img._id !== id))
        alert("Image deleted successfully!")
      } else {
        alert("Failed to delete: " + data.error)
      }
    } catch (err) {
      console.error("Delete Error:", err)
      alert("Failed to delete image.")
    }
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
          <DialogTitle className="text-2xl font-bold">Gallery Management</DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === "upload" ? "default" : "outline"}
            onClick={() => setActiveTab("upload")}
            className="gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload Images
          </Button>
          <Button
            variant={activeTab === "manage" ? "default" : "outline"}
            onClick={() => setActiveTab("manage")}
            className="gap-2"
          >
            <Eye className="w-4 h-4" />
            Manage Images ({images.length})
          </Button>
        </div>

        {/* UPLOAD TAB */}
        {activeTab === "upload" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" /> Upload New Images
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="file-upload">Select Images</Label>
                  <Input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setUploadedFiles(Array.from(e.target.files || []))}
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Supports: JPG, PNG, WebP • Max size: 5MB per image
                  </p>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {uploadedFiles.map((file, i) => (
                      <Image
                        key={i}
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        width={150}
                        height={150}
                        className="rounded-lg object-cover h-32 w-full"
                      />
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Title *</Label>
                    <Input
                      value={uploadForm.title}
                      onChange={(e) => setUploadForm((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Category *</Label>
                    <Select
                      value={uploadForm.category}
                      onValueChange={(val) => setUploadForm((p) => ({ ...p, category: val }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm((p) => ({ ...p, description: e.target.value }))}
                    className="h-20"
                  />
                </div>

                <Button
                  onClick={handleUploadSubmit}
                  className="w-full gradient-yellow-blue text-white"
                  disabled={loading}
                >
                  {loading ? "Uploading..." : "Upload Images"}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* MANAGE TAB */}
        {activeTab === "manage" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {images.map((img) => (
              <Card key={img._id || img.id} className="relative">
                <div className="relative h-32">
                  <Image
                    src={img.image}
                    alt={img.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-8 h-8 p-0"
                      onClick={() => setEditingImage(img)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="w-8 h-8 p-0"
                      onClick={() => handleDeleteImage(img._id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h4 className="font-semibold text-sm truncate">{img.title}</h4>
                  <Badge variant="secondary" className="text-xs mt-1">
                    {img.category}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">
                    {img.uploadDate} • {img.uploader}
                  </p>
                </CardContent>
              </Card>
            ))}
            {images.length === 0 && (
              <div className="text-center text-gray-500 py-10">No images yet.</div>
            )}
          </div>
        )}

        {/* EDIT MODAL */}
        {editingImage && (
          <Dialog open={!!editingImage} onOpenChange={() => setEditingImage(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Image</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Label>Title</Label>
                <Input
                  value={editingImage.title}
                  onChange={(e) =>
                    setEditingImage((p) => (p ? { ...p, title: e.target.value } : null))
                  }
                />
                <Label>Description</Label>
                <Textarea
                  value={editingImage.description || ""}
                  onChange={(e) =>
                    setEditingImage((p) => (p ? { ...p, description: e.target.value } : null))
                  }
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setEditingImage(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveEdit} disabled={loading}>
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
