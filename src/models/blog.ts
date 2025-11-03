import mongoose, { Schema, Document, Model } from "mongoose"

export interface IBlog extends Document {
  title: string
  excerpt?: string
  content: string
  author: string
  category?: string
  image?: string
  featured?: boolean
  readTime?: string
  date?: string
  createdAt: Date
  updatedAt: Date
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    excerpt: { type: String },
    content: { type: String, required: true },
    author: { type: String, required: true, default: "Anonymous" },
    category: { type: String },
    image: { type: String },
    featured: { type: Boolean, default: false },
    readTime: { type: String },
    date: { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: true }
)

const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema)

export default Blog
