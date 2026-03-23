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
import { Plus, Edit, Trash2, Save, BookOpen } from "lucide-react"

export type CourseType = {
  _id: string
  title: string
  description: string
  duration: string
  students: string
  rating: string
  price: string
  image: string
  level: string
  lessons: number
  certificate: boolean
}

interface CourseManagerProps {
  courses: CourseType[]
  onCoursesUpdate: (courses: CourseType[]) => void
}

export function CourseManager({ courses, onCoursesUpdate }: CourseManagerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<CourseType | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    students: "",
    rating: "5.0",
    price: "",
    image: "",
    level: "",
    lessons: 0,
    certificate: true,
  })

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      duration: "",
      students: "",
      rating: "5.0",
      price: "",
      image: "",
      level: "",
      lessons: 0,
      certificate: true,
    })
    setImageFile(null)
  }

  const handleCreateCourse = () => {
    setIsCreating(true)
    setEditingCourse(null)
    resetForm()
    setIsOpen(true)
  }

  const handleEditCourse = (course: CourseType) => {
    setIsCreating(false)
    setEditingCourse(course)
    setFormData({
      title: course.title,
      description: course.description,
      duration: course.duration,
      students: course.students,
      rating: course.rating,
      price: course.price,
      image: course.image,
      level: course.level,
      lessons: course.lessons,
      certificate: course.certificate,
    })
    setImageFile(null)
    setIsOpen(true)
  }

  const handleDeleteCourse = async (courseId?: string) => {
    if (!courseId) return
    if (confirm("Are you sure you want to delete this course?")) {
      await fetch(`/api/courses/${courseId}`, { method: "DELETE" })
      const updated = courses.filter((c) => c._id !== courseId)
      onCoursesUpdate(updated)
    }
  }

  const handleSaveCourse = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Please fill in all required fields (Title, Description, etc.)")
      return
    }

    setIsUploading(true)
    let uploadedImageUrl = formData.image

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
          alert(`Image upload failed: ${data.error || "Unknown error"}. Using existing image URL if present.`)
        }
      } catch (error) {
        console.error("Upload Error:", error)
        alert(`Image upload error: ${(error as Error).message}. Using existing image URL if present.`)
      }
    }
    
    if (!uploadedImageUrl) {
      uploadedImageUrl = "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80"
    }

    const courseData = {
      ...formData,
      image: uploadedImageUrl,
    }

    let response
    if (isCreating) {
      response = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData),
      })
    } else if (editingCourse?._id) {
      response = await fetch(`/api/courses/${editingCourse._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData),
      })
    }

    setIsUploading(false)

    if (response?.ok) {
      const updatedCourses = await (await fetch("/api/courses", { cache: "no-store" })).json()
      onCoursesUpdate(updatedCourses)
      setIsOpen(false)
      resetForm()
    } else {
      alert("Failed to save course")
    }
  }

  return (
    <>
      <Button onClick={handleCreateCourse} className="gradient-yellow-blue text-white gap-2">
        <Plus className="w-4 h-4" />
        Create Course <span className="opacity-10 text-[8px]">v2</span>
      </Button>

      {/* Create/Edit Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              {isCreating ? "Create New Course" : "Edit Course"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Fundamental Baker Course"
                />
              </div>
              <div>
                <Label htmlFor="level">Level *</Label>
                <Input
                  id="level"
                  value={formData.level}
                  onChange={(e) => setFormData((p) => ({ ...p, level: e.target.value }))}
                  placeholder="e.g. Beginner"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="duration">Duration *</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData((p) => ({ ...p, duration: e.target.value }))}
                  placeholder="e.g. 1 month"
                />
              </div>
              <div>
                <Label htmlFor="students">Max Students *</Label>
                <Input
                  id="students"
                  value={formData.students}
                  onChange={(e) => setFormData((p) => ({ ...p, students: e.target.value }))}
                  placeholder="e.g. 12"
                />
              </div>
              <div>
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData((p) => ({ ...p, price: e.target.value }))}
                  placeholder="e.g. ₹24,999"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lessons">Total Lessons</Label>
                <Input
                  id="lessons"
                  type="number"
                  value={formData.lessons}
                  onChange={(e) => setFormData((p) => ({ ...p, lessons: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  value={formData.rating}
                  onChange={(e) => setFormData((p) => ({ ...p, rating: e.target.value }))}
                  placeholder="e.g. 4.9"
                />
              </div>
            </div>

            <div>
              <Label>Course Image *</Label>
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
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                placeholder="Course details..."
                className="h-24"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="certificate"
                checked={formData.certificate}
                onChange={(e) => setFormData((p) => ({ ...p, certificate: e.target.checked }))}
              />
              <Label htmlFor="certificate">Includes Certificate</Label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isUploading}>
                Cancel
              </Button>
              <Button onClick={handleSaveCourse} className="gradient-yellow-blue text-white" disabled={isUploading}>
                {isUploading ? "Uploading & Saving..." : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {isCreating ? "Create Course" : "Save Changes"}
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Manage courses Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            <BookOpen className="w-4 h-4" />
            Manage Courses
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Course Management</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <Card key={course._id} className="relative">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-sm">{course.title}</span>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-8 h-8 p-0"
                        onClick={() => handleEditCourse(course)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="w-8 h-8 p-0"
                        onClick={() => handleDeleteCourse(course._id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-gray-500 mb-1">Price: {course.price} | Level: {course.level}</p>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {course.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {courses.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No courses yet. Create your first one!
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
