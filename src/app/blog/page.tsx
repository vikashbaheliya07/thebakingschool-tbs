"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  BookOpen,
  Edit,
  Trash2,
} from "lucide-react"
import Image from "next/image"
import { AuthProvider } from "@/contexts/AuthContext"
import {
  PermissionGuard,
  AuthenticatedOnly,
} from "@/components/RoleBasedAccess"
import { AuthLogin } from "@/components/AuthLogin"
import { RoleBasedDashboard } from "@/components/RoleBasedDashboard"
import { BlogManager, BlogPost } from "@/components/BlogManager"
import { Permission } from "@/types/auth"

const categories = [
  "All",
  "Tips & Tricks",
  "Science",
  "Recipes",
  "Success Stories",
  "Techniques",
  "Health",
]

function BlogPageContent() {
const [posts, setPosts] = useState<BlogPost[]>([])
const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [showFullArticle, setShowFullArticle] = useState(false)

  // 🧠 Fetch blogs from MongoDB
  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to load blogs", err))
  }, [])

  const featuredPost = posts.find((post) => post.featured)
  const regularPosts = posts.filter((post) => !post.featured)

  const handleDeletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return
    try {
      await fetch("/api/blogs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: postId }),
      })
      const res = await fetch("/api/blogs")
      const updated = await res.json()
      setPosts(updated)
    } catch (err) {
      console.error(err)
      alert("Failed to delete post")
    }
  }

  const handleEditPost = (postId: string) => {
    alert(`Edit post ${postId} — in production, this would open an edit form.`)
  }

  const handleReadFullArticle = (post: BlogPost ) => {
    setSelectedPost(post)
    setShowFullArticle(true)
  }

  const handleCloseFullArticle = () => {
    setShowFullArticle(false)
    setSelectedPost(null)
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* 🧁 Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        <div className="relative z-10 max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-100 to-blue-100 mb-6">
            <BookOpen className="w-8 h-8 text-gray-700" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Baking
            <span className="dancing-script text-yellow-300 text-6xl md:text-8xl block">
              Blog
            </span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Discover expert tips, techniques, and inspiration from our
            professional bakers. Your journey to baking mastery starts here.
          </p>
        </div>
      </section>

      {/* 🍰 Blog Content */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-blue-50"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Admin Controls */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="flex justify-center gap-3">
              <AuthLogin />
              <AuthenticatedOnly showFallback={false}>
                <RoleBasedDashboard />
              </AuthenticatedOnly>
            </div>

            {/* Admin Blog Manager */}
            <PermissionGuard
              permission={Permission.ADMIN_ACCESS}
              showFallback={false}
            >
              <div className="flex justify-center gap-4">
                <BlogManager posts={posts} onPostsUpdate={setPosts} />
              </div>
            </PermissionGuard>
          </div>

          {/* 🏆 Featured Post */}
          {featuredPost && (
            <div className="mb-16">
              <div className="text-center mb-8">
                <Badge className="bg-yellow-100 text-yellow-800 mb-4">
                  Featured Post
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Editor&apos;s Pick
                </h2>
              </div>

              <Card className="glass border-white/20 overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-auto">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-blue-100 text-blue-800">
                        {featuredPost.category}
                      </Badge>
                    </div>
                  </div>
                     

                  <div className="p-6 lg:p-8 flex flex-col justify-center">
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>

                    <Button
                      className="gradient-yellow-blue text-white w-fit group"
                      onClick={() => handleReadFullArticle(featuredPost)}
                    >
                      Read Full Article
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* 📚 Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className="bg-white/80 text-gray-700 hover:bg-white hover:text-gray-900 rounded-full px-4 py-2 text-sm"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* 📰 Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card
                key={post._id}
                className="glass border-white/20 overflow-hidden hover:scale-105 transition-transform duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-gray-800">
                      {post.category}
                    </Badge>
                  </div>

                </div>

                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full group"
                    onClick={() => handleReadFullArticle(post)}
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="glass text-gray-800 border-gray-300 hover:bg-white/50 px-8 py-4 rounded-full"
            >
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* 📖 Full Article Dialog */}
      <Dialog open={showFullArticle} onOpenChange={handleCloseFullArticle}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedPost && (
            <>
              <DialogHeader>
                <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-gray-800">
                      {selectedPost.category}
                    </Badge>
                  </div>
                </div>
                <DialogTitle className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {selectedPost.title}
                </DialogTitle>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {selectedPost.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {selectedPost.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedPost.readTime}
                  </div>
                </div>
              </DialogHeader>
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedPost.content}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}

export default function BlogPage() {
  return (
    <AuthProvider>
      <BlogPageContent />
    </AuthProvider>
  )
}
