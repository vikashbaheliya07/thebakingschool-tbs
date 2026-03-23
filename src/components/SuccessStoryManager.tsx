"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Save, Image as ImageIcon, MapPin, Award } from "lucide-react"

export type SuccessStoryType = {
  _id: string
  name: string
  role: string
  location: string
  graduationYear: string
  image: string
  quote: string
  achievement: string
  course: string
  rating: number
}

interface SuccessStoryManagerProps {
  stories: SuccessStoryType[]
  onStoriesUpdate: (stories: SuccessStoryType[]) => void
}

export function SuccessStoryManager({ stories, onStoriesUpdate }: SuccessStoryManagerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [editingStory, setEditingStory] = useState<SuccessStoryType | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    location: "",
    graduationYear: "",
    image: "",
    quote: "",
    achievement: "",
    course: "",
    rating: 5,
  })

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      location: "",
      graduationYear: "",
      image: "",
      quote: "",
      achievement: "",
      course: "",
      rating: 5,
    })
    setImageFile(null)
  }

  const handleCreateStory = () => {
    setIsCreating(true)
    setEditingStory(null)
    resetForm()
    setIsOpen(true)
  }

  const handleEditStory = (story: SuccessStoryType) => {
    setIsCreating(false)
    setEditingStory(story)
    setFormData({
      name: story.name,
      role: story.role,
      location: story.location,
      graduationYear: story.graduationYear,
      image: story.image,
      quote: story.quote,
      achievement: story.achievement,
      course: story.course,
      rating: story.rating,
    })
    setImageFile(null)
    setIsOpen(true)
  }

  const handleDeleteStory = async (storyId?: string) => {
    if (!storyId) return
    if (confirm("Are you sure you want to delete this success story?")) {
      await fetch(`/api/success-stories/${storyId}`, { method: "DELETE" })
      const updated = stories.filter((s) => s._id !== storyId)
      onStoriesUpdate(updated)
    }
  }

  const handleSaveStory = async () => {
    if (!formData.name.trim() || !formData.role.trim() || !formData.quote.trim()) {
      alert("Please fill in all required fields (Name, Role, Quote)")
      return
    }

    setIsUploading(true)
    let uploadedImageUrl = formData.image

    // If an image file was selected, upload it to Cloudinary via /api/upload
    if (imageFile) {
      try {
        const uploadData = new FormData()
        uploadData.append("file", imageFile)
        
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        })
        const data = await uploadRes.json()
        
        if (data.success) {
          uploadedImageUrl = data.result.secure_url
        } else {
          alert("Image upload failed. Using existing image URL if present.")
        }
      } catch (error) {
        console.error("Upload Error:", error)
        alert("Image upload error. Using existing image URL if present.")
      }
    }
    
    // If we're creating and didn't provide any image, set a placeholder so it doesn't break
    if (!uploadedImageUrl) {
      uploadedImageUrl = "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=400&q=80"
    }

    const storyData = {
      ...formData,
      image: uploadedImageUrl,
    }

    let response
    if (isCreating) {
      response = await fetch("/api/success-stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(storyData),
      })
    } else if (editingStory?._id) {
      response = await fetch(`/api/success-stories/${editingStory._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(storyData),
      })
    }

    setIsUploading(false)

    if (response?.ok) {
      const updatedStories = await (await fetch("/api/success-stories", { cache: "no-store" })).json()
      onStoriesUpdate(updatedStories)
      setIsOpen(false)
      resetForm()
    } else {
      alert("Failed to save success story")
    }
  }

  return (
    <>
      <Button onClick={handleCreateStory} className="gradient-yellow-blue text-white gap-2">
        <Plus className="w-4 h-4" />
        Create Story
      </Button>

      {/* Create/Edit Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              {isCreating ? "Create New Success Story" : "Edit Success Story"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Sarah Johnson"
                />
              </div>
              <div>
                <Label htmlFor="role">Role *</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData((p) => ({ ...p, role: e.target.value }))}
                  placeholder="e.g. Bakery Owner"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData((p) => ({ ...p, location: e.target.value }))}
                  placeholder="e.g. New York, NY"
                />
              </div>
              <div>
                <Label htmlFor="graduationYear">Graduation Year *</Label>
                <Input
                  id="graduationYear"
                  value={formData.graduationYear}
                  onChange={(e) => setFormData((p) => ({ ...p, graduationYear: e.target.value }))}
                  placeholder="e.g. 2022"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="course">Course *</Label>
                <Input
                  id="course"
                  value={formData.course}
                  onChange={(e) => setFormData((p) => ({ ...p, course: e.target.value }))}
                  placeholder="e.g. Professional Baking Certificate"
                />
              </div>
              <div>
                <Label htmlFor="achievement">Achievement *</Label>
                <Input
                  id="achievement"
                  value={formData.achievement}
                  onChange={(e) => setFormData((p) => ({ ...p, achievement: e.target.value }))}
                  placeholder="e.g. Opened successful bakery"
                />
              </div>
            </div>

            <div>
              <Label>Profile Image *</Label>
              <div className="flex gap-4 items-start mt-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImageFile(e.target.files[0])
                    }
                  }}
                />
                <div className="text-sm text-gray-500 w-full flex items-center">
                  Or use existing URL
                </div>
              </div>
              {formData.image && !imageFile && (
                <div className="mt-2">
                  <span className="text-xs text-blue-500 truncate block">{formData.image}</span>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="quote">Quote *</Label>
              <Textarea
                id="quote"
                value={formData.quote}
                onChange={(e) => setFormData((p) => ({ ...p, quote: e.target.value }))}
                placeholder="Student quote..."
                className="h-20"
              />
            </div>
            
            <div>
              <Label htmlFor="rating">Rating (1-5)</Label>
              <Input
                id="rating"
                type="number"
                min={1}
                max={5}
                value={formData.rating}
                onChange={(e) => setFormData((p) => ({ ...p, rating: parseInt(e.target.value) || 5 }))}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isUploading}>
                Cancel
              </Button>
              <Button onClick={handleSaveStory} className="gradient-yellow-blue text-white" disabled={isUploading}>
                {isUploading ? "Uploading & Saving..." : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {isCreating ? "Create Story" : "Save Changes"}
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Manage stories Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Award className="w-4 h-4" />
            Manage Stories
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Success Stories Management</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stories.map((story) => (
              <Card key={story._id} className="relative">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold">{story.name}</span>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-8 h-8 p-0"
                        onClick={() => handleEditStory(story)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="w-8 h-8 p-0"
                        onClick={() => handleDeleteStory(story._id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-1">{story.role}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                    <MapPin className="w-3 h-3" /> {story.location}
                  </p>
                  <p className="text-xs italic text-gray-600 line-clamp-2">
                    "{story.quote}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {stories.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No success stories yet. Create your first one!
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
