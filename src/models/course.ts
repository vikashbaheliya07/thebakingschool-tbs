import mongoose, { Schema, Document, Model } from "mongoose"

export interface ICourse extends Document {
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
  createdAt: Date
  updatedAt: Date
}

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    students: { type: String, required: true },
    rating: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    level: { type: String, required: true },
    lessons: { type: Number, required: true },
    certificate: { type: Boolean, default: true },
  },
  { timestamps: true }
)

const Course: Model<ICourse> =
  mongoose.models.Course || mongoose.model<ICourse>("Course", courseSchema)

export default Course
