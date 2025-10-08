"use client"

import { useState, useEffect } from "react"
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
import { Calendar, Clock, User, ArrowRight, BookOpen, Plus, Edit, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
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
  },
  {
    id: 2,
    title: "The Science Behind Perfect Sourdough Starter",
    excerpt: "Discover the fascinating microbiology that makes sourdough possible and learn how to maintain a healthy, active starter.",
    content: `Sourdough baking has experienced a renaissance in recent years, and for good reason. The complex flavors and textures achieved through natural fermentation create breads that are not only delicious but also more digestible and nutritious than their commercial counterparts.

**Understanding the Microbiology**

A sourdough starter is essentially a stable culture of wild yeast and lactic acid bacteria living in harmony. The wild yeast (primarily Saccharomyces cerevisiae and Candida milleri) provides the leavening power, while the bacteria (mainly Lactobacillus species) create the characteristic tangy flavor through lactic and acetic acid production.

**Creating Your Starter**

To create a sourdough starter from scratch, you'll need just flour and water. The process typically takes 5-7 days:

**Day 1-2:** Mix equal parts flour and water. Wild yeast and bacteria naturally present in the flour and environment begin to colonize the mixture.

**Day 3-4:** You'll notice bubbling and a slightly sour smell as fermentation begins. The mixture may smell unpleasant - this is normal as different microorganisms compete for dominance.

**Day 5-7:** The starter should double in size within 4-8 hours of feeding and have a pleasant, tangy aroma. This indicates a stable culture has been established.

**Maintaining Your Starter**

A healthy starter requires regular feeding with fresh flour and water. The ratio depends on your baking schedule:

- **Daily baking:** Keep at room temperature, feed daily
- **Weekly baking:** Refrigerate, feed weekly
- **Occasional baking:** Refrigerate, feed monthly or freeze for long-term storage

**Signs of a Healthy Starter**

- Doubles in size within 4-8 hours of feeding
- Pleasant, yeasty, slightly tangy aroma
- Passes the float test (a spoonful floats in water)
- Consistent rise and fall pattern

**Troubleshooting Common Issues**

**Liquid on top (hooch):** This is alcohol produced by the yeast. Simply stir it in or pour it off before feeding.

**Mold:** Fuzzy growth in colors other than white indicates contamination. Discard and start over.

**No activity:** Try switching flour types, adjusting hydration, or moving to a warmer location.

**The Chemistry of Flavor Development**

The unique flavor of sourdough comes from the complex interplay of acids produced during fermentation. Lactic acid provides a mild, yogurt-like tang, while acetic acid contributes a sharper, vinegar-like note. The ratio of these acids depends on hydration levels, temperature, and feeding schedule.

**Temperature Effects**

- **Warm conditions (80-85°F):** Favor lactic acid production, creating milder flavors
- **Cool conditions (65-70°F):** Favor acetic acid production, creating sharper, more complex flavors

Understanding these principles allows you to manipulate your starter's flavor profile to match your preferences and create consistently excellent sourdough bread.`,
    author: "Dr. James Baker",
    date: "Jan 12, 2024",
    readTime: "8 min read",
    category: "Science",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    featured: false
  },
  {
    id: 3,
    title: "Seasonal Baking: Winter Comfort Desserts",
    excerpt: "Warm up your kitchen and your heart with these cozy winter dessert recipes that celebrate the season's best flavors.",
    content: `Winter is the perfect time to fill your home with the warm aromas of cinnamon, nutmeg, and vanilla. These seasonal desserts not only taste incredible but also bring comfort and joy during the colder months.

**Spiced Apple Crumble Bars**

These bars combine the classic flavors of apple pie with the convenience of a handheld treat.

*Ingredients:*
- 2 cups rolled oats
- 1½ cups all-purpose flour
- 1 cup brown sugar
- ½ cup butter, melted
- 4 large apples, peeled and diced
- 1 tsp cinnamon
- ½ tsp nutmeg
- ¼ tsp cloves

*Instructions:*
1. Preheat oven to 350°F. Line a 9x13 pan with parchment paper.
2. Mix oats, flour, and ¾ cup brown sugar. Add melted butter and mix until crumbly.
3. Press half the mixture into the prepared pan.
4. Toss apples with remaining brown sugar and spices. Spread over crust.
5. Top with remaining crumb mixture and bake for 35-40 minutes.

**Classic Gingerbread Cookies**

Nothing says winter like the warm spices of gingerbread. These cookies are perfect for decorating and gifting.

*Ingredients:*
- 3 cups all-purpose flour
- 2 tsp ground ginger
- 1 tsp cinnamon
- ½ tsp nutmeg
- ½ tsp cloves
- 1 tsp baking soda
- ½ cup butter, softened
- ½ cup brown sugar
- ½ cup molasses
- 1 large egg

*Instructions:*
1. Whisk together flour, spices, and baking soda.
2. Cream butter and brown sugar. Beat in molasses and egg.
3. Gradually add dry ingredients until dough forms.
4. Wrap and chill for at least 2 hours.
5. Roll out and cut into shapes. Bake at 350°F for 8-10 minutes.

**Warm Chocolate Lava Cakes**

Individual chocolate cakes with molten centers - the ultimate winter indulgence.

*Ingredients:*
- 4 oz dark chocolate, chopped
- 4 tbsp butter
- 2 large eggs
- 2 tbsp granulated sugar
- 2 tbsp all-purpose flour
- Pinch of salt
- Butter and cocoa powder for ramekins

*Instructions:*
1. Preheat oven to 425°F. Butter four 6-oz ramekins and dust with cocoa.
2. Melt chocolate and butter in double boiler.
3. Whisk eggs and sugar until thick. Fold in chocolate mixture, flour, and salt.
4. Divide among ramekins and bake for 12-14 minutes.
5. Let stand 1 minute, then invert onto plates. Serve immediately.

**Tips for Winter Baking Success**

**Ingredient Temperature:** Cold weather affects ingredient temperatures. Bring eggs and dairy to room temperature before baking for best results.

**Humidity Considerations:** Winter air is often drier, which can affect flour measurements. Add liquid gradually if dough seems too dry.

**Storage:** Winter desserts often keep longer due to lower humidity. Store in airtight containers to maintain freshness.

**Flavor Enhancements:** Don't be afraid to boost spice levels in winter - the cold weather makes us crave more intense flavors.

These recipes will fill your home with warmth and create lasting memories with family and friends throughout the winter season.`,
    author: "Chef Sarah Thompson",
    date: "Jan 10, 2024",
    readTime: "6 min read",
    category: "Recipes",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    featured: false
  },
  {
    id: 4,
    title: "From Student to Professional: Success Stories",
    excerpt: "Meet our graduates who have turned their passion for baking into thriving careers and successful businesses.",
    content: "Every great baker starts somewhere. Today, we're sharing inspiring stories from our graduates who have transformed their lives...",
    author: "Admin Team",
    date: "Jan 8, 2024",
    readTime: "7 min read",
    category: "Success Stories",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    featured: false
  },
  {
    id: 5,
    title: "Mastering French Pastry Techniques",
    excerpt: "Dive deep into the elegant world of French patisserie with step-by-step guides to classic techniques and recipes.",
    content: `French pastry is renowned worldwide for its precision, elegance, and incredible flavors. In this comprehensive guide, we'll explore the fundamental techniques that form the backbone of French patisserie.

**The Foundation: Pâte Brisée (Short Pastry)**

This versatile pastry forms the base for tarts and quiches. The key is keeping ingredients cold and working quickly.

*Technique:*
1. Cut cold butter into flour until mixture resembles coarse breadcrumbs
2. Add ice water gradually until dough just comes together
3. Form into a disc, wrap, and chill for at least 30 minutes
4. Roll between parchment paper for even thickness

**Pâte Choux: The Magic of Steam**

This unique pastry relies on steam for leavening, creating hollow shells perfect for éclairs and profiteroles.

*The Science:*
- High water content creates steam
- Steam expands, creating hollow interior
- Eggs provide structure and richness

*Critical Steps:*
1. Bring water and butter to a rolling boil
2. Add flour all at once, stirring vigorously
3. Cook until mixture pulls away from pan sides
4. Cool slightly before adding eggs one at a time
5. Pipe immediately and bake without opening oven door

**Crème Pâtissière: The Perfect Pastry Cream**

This silky custard is the heart of many French desserts.

*Ingredients:*
- 500ml whole milk
- 6 egg yolks
- 100g sugar
- 50g cornstarch
- 50g butter
- 1 vanilla bean

*Method:*
1. Heat milk with vanilla bean
2. Whisk yolks with sugar until pale
3. Add cornstarch and whisk until smooth
4. Temper hot milk into yolk mixture
5. Return to heat, whisking constantly until thick
6. Strain and whisk in butter

**Laminated Dough: Creating Layers**

The technique behind croissants and puff pastry involves creating hundreds of butter layers.

*The Process:*
1. **Détrempe:** Create basic dough with flour, water, salt, and small amount of butter
2. **Beurrage:** Prepare butter block at same consistency as dough
3. **Encasing:** Wrap butter in dough completely
4. **Folding:** Roll out and fold in thirds (letter fold)
5. **Resting:** Chill between folds to prevent butter from melting
6. **Repeat:** Typically 3-4 folds for croissants, 6 for puff pastry

**Temperature Control: The Key to Success**

French pastry is all about temperature management:

- **Butter:** Should be pliable but not soft (65-68°F for lamination)
- **Dough:** Keep cool to prevent gluten development
- **Environment:** Work in cool kitchen when possible
- **Oven:** Proper preheating ensures good rise and color

**Classic French Macarons**

These delicate sandwich cookies require precision and patience.

*Macaronage Technique:*
1. Sift almond flour and powdered sugar together
2. Whip egg whites to soft peaks, gradually add granulated sugar
3. Fold dry ingredients into meringue using macaronage motion
4. Pipe onto silicone mats and rest until skin forms
5. Bake at low temperature with steam vent

**Professional Tips**

**Mise en Place:** Prepare all ingredients and equipment before starting. French pastry doesn't wait.

**Precision:** Use a scale for all measurements. Volume measurements are too imprecise for pastry work.

**Practice:** These techniques require muscle memory. Start with simple recipes and build complexity.

**Patience:** Don't rush cooling and resting times. They're crucial for proper texture and flavor development.

**Quality Ingredients:** Use European-style butter (higher fat content) and real vanilla for authentic flavors.

Mastering these fundamental techniques opens the door to countless French pastry creations. Remember, even professional pastry chefs continue learning and refining these skills throughout their careers.`,
    author: "Chef Pierre Dubois",
    date: "Jan 5, 2024",
    readTime: "10 min read",
    category: "Techniques",
    image: "https://images.unsplash.com/photo-1555507036-ab794f4ade2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    featured: false
  },
  {
    id: 6,
    title: "Healthy Baking: Substitutions That Actually Work",
    excerpt: "Learn how to make your favorite baked goods healthier without sacrificing taste or texture with these proven substitutions.",
    content: "Healthy baking doesn't have to mean compromising on flavor. With the right knowledge and techniques, you can create...",
    author: "Nutritionist Lisa Chen",
    date: "Jan 3, 2024",
    readTime: "6 min read",
    category: "Health",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    featured: false
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

  const handleCreatePost = () => {
    // In a real app, this would open a create modal or navigate to create page
    alert("Create new post - This would open a create form in a real application")
  }

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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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