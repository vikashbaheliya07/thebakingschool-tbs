"use client"

import { useState } from "react"
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
import { Calendar, Clock, User, ArrowRight, BookOpen, Edit, Trash2 } from "lucide-react"
import Image from "next/image"
import { AuthProvider } from "@/contexts/AuthContext"
import { PermissionGuard, AuthenticatedOnly } from "@/components/RoleBasedAccess"
import { AuthLogin } from "@/components/AuthLogin"
import { RoleBasedDashboard } from "@/components/RoleBasedDashboard"
import { BlogManager } from "@/components/BlogManager"
import { Permission } from "@/types/auth"

const blogPosts = [
  {
    id: 1,
    title: "10 Essential Baking Tips Every Beginner Should Know",
    excerpt: "Starting your baking journey? These fundamental tips will help you avoid common mistakes and create delicious treats from day one.",
    content: `Baking is both an art and a science. Whether you're just starting out or looking to improve your skills, these essential tips will set you on the path to baking success.

**1. Measure Ingredients Accurately**
Baking is all about precision. Unlike cooking, where you can adjust seasonings to taste, baking requires exact measurements. Invest in a kitchen scale and measure ingredients by weight rather than volume for the most consistent results.

**2. Room Temperature Ingredients**
Many recipes call for room temperature ingredients, especially eggs, butter, and dairy. This ensures proper mixing and creates the right texture in your final product. Take ingredients out 1-2 hours before baking.

**3. Preheat Your Oven**
Always preheat your oven for at least 15-20 minutes before baking. An oven thermometer can help ensure your oven is at the correct temperature, as many ovens run hot or cold.

**4. Don't Overmix**
Overmixing can lead to tough, dense baked goods. Mix just until ingredients are combined, especially when working with muffins, quick breads, and cakes.

**5. Use Fresh Ingredients**
Check expiration dates on baking powder, baking soda, and spices. These ingredients lose potency over time and can affect the rise and flavor of your baked goods.

**6. Understand Your Oven**
Every oven is different. Get to know your oven's hot spots and quirks. Rotate pans halfway through baking for even browning.

**7. Don't Open the Oven Door Too Early**
Resist the urge to peek! Opening the oven door can cause temperature fluctuations that lead to sunken cakes or uneven baking.

**8. Cool Properly**
Follow cooling instructions carefully. Some items need to cool in the pan, while others should be removed immediately to prevent overcooking.

**9. Read the Recipe Completely**
Before you start, read through the entire recipe to understand the process and timing. This prevents surprises and ensures you have all necessary ingredients and equipment.

**10. Practice Makes Perfect**
Don't be discouraged by failures. Every baker has made mistakes. Learn from them and keep practicing. Each attempt teaches you something new about the craft.

Remember, baking is a journey of continuous learning. Start with simple recipes and gradually work your way up to more complex creations. With these fundamental tips and plenty of practice, you'll be creating delicious baked goods in no time!`,
    author: "Chef Maria Rodriguez",
    date: "Jan 15, 2024",
    readTime: "5 min read",
    category: "Tips & Tricks",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    featured: true
  }
]

const categories = ["All", "Tips & Tricks", "Science", "Recipes", "Success Stories", "Techniques", "Health"]

function BlogPageContent() {
  const [posts, setPosts] = useState(blogPosts)
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null)
  const [showFullArticle, setShowFullArticle] = useState(false)
  const featuredPost = posts.find(post => post.featured)
  const regularPosts = posts.filter(post => !post.featured)

  const handleDeletePost = (postId: number) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      setPosts(posts.filter(post => post.id !== postId))
    }
  }

  const handleEditPost = (postId: number) => {
    // In a real app, this would open an edit modal or navigate to edit page
    alert(`Edit post ${postId} - This would open an edit form in a real application`)
  }

 // const handleCreatePost = () => {
  // In a real app, this would open a create modal or navigate to create page
  //  alert("Create new post - This would open a create form in a real application")
  // }

  const handleReadFullArticle = (post: typeof blogPosts[0]) => {
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
      
      {/* Hero Section */}
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
            Discover expert tips, techniques, and inspiration from our professional bakers. 
            Your journey to baking mastery starts here.
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-blue-50"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Admin Controls */}
          <div className="flex flex-col items-center gap-4 mb-8">
            {/* Authentication Controls */}
            <div className="flex justify-center gap-3">
              <AuthLogin />
              <AuthenticatedOnly showFallback={false}>
                <RoleBasedDashboard />
              </AuthenticatedOnly>
            </div>
            
            {/* Admin Blog Controls */}
            <PermissionGuard permission={Permission.ADMIN_ACCESS} showFallback={false}>
              <div className="flex justify-center gap-4">
                <BlogManager posts={posts} onPostsUpdate={setPosts} />
              </div>
            </PermissionGuard>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16">
              <div className="text-center mb-8">
                <Badge className="bg-yellow-100 text-yellow-800 mb-4">Featured Post</Badge>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Editor&apos;s Pick</h2>
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
                    
                    {/* Admin Controls for Featured Post */}
                    <PermissionGuard permission={Permission.ADMIN_ACCESS} showFallback={false}>
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-8 h-8 p-0"
                          onClick={() => handleEditPost(featuredPost.id)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="w-8 h-8 p-0"
                          onClick={() => handleDeletePost(featuredPost.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </PermissionGuard>
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

          {/* Category Filter */}
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

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post.id} className="glass border-white/20 overflow-hidden hover:scale-105 transition-transform duration-300 group">
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
                  
                  {/* Admin Controls for Regular Posts */}
                  <PermissionGuard permission={Permission.ADMIN_ACCESS} showFallback={false}>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-8 h-8 p-0"
                        onClick={() => handleEditPost(post.id)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="w-8 h-8 p-0"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </PermissionGuard>
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
                      {post.author.split(' ')[0]}
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

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="glass text-gray-800 border-gray-300 hover:bg-white/50 px-8 py-4 rounded-full">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Full Article Dialog */}
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