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
  Plus,
  Edit,
  Trash2,
  Save,
  BookOpen,
  Calendar,
  User,
} from "lucide-react"

// ✅ unified type
export type BlogPost = {
  _id: string
  title: string
  excerpt: string
  content: string
  category: string
  image: string
  author: string
  date: string
  readTime: string
  featured: boolean
}

interface BlogManagerProps {
  posts: BlogPost[]
  onPostsUpdate: (posts: BlogPost[]) => void
}

const categories = [
  "Tips & Tricks",
  "Science",
  "Recipes",
  "Success Stories",
  "Techniques",
  "Health",
]

export function BlogManager({ posts, onPostsUpdate }: BlogManagerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    image: "",
    featured: false,
  })

  const handleCreatePost = () => {
    setIsCreating(true)
    setEditingPost(null)
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      category: "",
      image: "",
      featured: false,
    })
    setImageFile(null)
    setSaveError(null)
    setIsOpen(true)
  }

  const handleEditPost = (post: BlogPost) => {
    setIsCreating(false)
    setEditingPost(post)
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      image: post.image,
      featured: post.featured,
    })
    setImageFile(null)
    setSaveError(null)
    setIsOpen(true)
  }

  const handleDeletePost = async (postId?: string) => {
    if (!postId) return
    if (confirm("Are you sure you want to delete this blog post?")) {
      await fetch(`/api/blogs/${postId}`, { method: "DELETE" })
      const updated = posts.filter((p) => p._id !== postId)
      onPostsUpdate(updated)
    }
  }

  const handleSavePost = async () => {
    if (!formData.title.trim() || !formData.excerpt.trim() || !formData.category) {
      alert("Please fill in all required fields")
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
          alert(`Image upload failed: ${data.error || "Unknown error"}. Using existing image URL if present.`)
        }
      } catch (error) {
        console.error("Upload Error:", error)
        alert(`Image upload error: ${(error as Error).message}. Using existing image URL if present.`)
      }
    }

    const postData = {
      ...formData,
      date: new Date().toISOString().split("T")[0],
      readTime: `${Math.ceil(formData.content.length / 200)} min read`,
      image:
        uploadedImageUrl ||
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1000&q=80",
    }

    try {
      let response
      if (isCreating) {
        response = await fetch("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        })
      } else if (editingPost?._id) {
        response = await fetch(`/api/blogs/${editingPost._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        })
      }

      setIsUploading(false)

      if (response?.ok) {
        const updatedPosts = await (await fetch("/api/blogs", { cache: "no-store" })).json()
        onPostsUpdate(updatedPosts)
        setIsOpen(false)
        setFormData({
          title: "",
          excerpt: "",
          content: "",
          author: "",
          category: "",
          image: "",
          featured: false,
        })
        setImageFile(null)
      } else {
        const errorData = await response?.json().catch(() => ({}))
        const msg = errorData?.error || response?.statusText || "Server error"
        setSaveError(msg)
        alert(`Failed to save blog post: ${msg}`)
      }
    } catch (err) {
      setIsUploading(false)
      const msg = (err as Error).message
      setSaveError(msg)
      alert(`Network error saving blog post: ${msg}`)
    }
  }

  return (
    <>
      <Button onClick={handleCreatePost} className="gradient-yellow-blue text-white gap-2">
        <Plus className="w-4 h-4" />
        Create New Post
      </Button>

      {/* Create/Edit Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              {isCreating ? "Create New Blog Post" : "Edit Blog Post"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {saveError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                <strong>Error:</strong> {saveError}
              </div>
            )}
            {/* form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                  placeholder="Enter blog post title"
                />
              </div>
              <div>
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData((p) => ({ ...p, author: e.target.value }))}
                  placeholder="Author name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(v) => setFormData((p) => ({ ...p, category: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Image *</Label>
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
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt *</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData((p) => ({ ...p, excerpt: e.target.value }))}
                placeholder="Brief description..."
                className="h-20"
              />
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData((p) => ({ ...p, content: e.target.value }))}
                placeholder="Full blog post content..."
                className="h-40"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData((p) => ({ ...p, featured: e.target.checked }))}
              />
              <Label htmlFor="featured">Featured Post</Label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isUploading}>
                Cancel
              </Button>
              <Button onClick={handleSavePost} className="gradient-yellow-blue text-white" disabled={isUploading}>
                {isUploading ? "Uploading & Saving..." : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {isCreating ? "Create Post" : "Save Changes"}
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Manage Posts Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            <BookOpen className="w-4 h-4" />
            Manage Posts
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Blog Management</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Card key={post._id} className="relative">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge
                      variant={post.featured ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {post.featured ? "Featured" : post.category}
                    </Badge>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-8 h-8 p-0"
                        onClick={() => handleEditPost(post)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="w-8 h-8 p-0"
                        onClick={() => handleDeletePost(post._id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-sm line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                    <Calendar className="w-3 h-3 ml-2" />
                    <span>{post.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No blog posts yet. Create your first one!
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
