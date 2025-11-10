import mongoose, { Schema, Document, models } from "mongoose"

export interface IGalleryImage extends Document {
  title: string
  category: string
  image: string
  description?: string
  uploader: string
  uploadDate: string
  likes: number
  views: number
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true }, // Cloudinary URL
    description: String,
    uploader: { type: String, default: "Admin" },
    uploadDate: String,
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default models.GalleryImage ||
  mongoose.model<IGalleryImage>("GalleryImage", GalleryImageSchema)
