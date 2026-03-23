import mongoose, { Schema, Document, Model } from "mongoose"

export interface ISuccessStory extends Document {
  name: string
  role: string
  location: string
  graduationYear: string
  image: string
  quote: string
  achievement: string
  course: string
  rating: number
  createdAt: Date
  updatedAt: Date
}

const successStorySchema = new Schema<ISuccessStory>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String, required: true },
    graduationYear: { type: String, required: true },
    image: { type: String, required: true },
    quote: { type: String, required: true },
    achievement: { type: String, required: true },
    course: { type: String, required: true },
    rating: { type: Number, default: 5 },
  },
  { timestamps: true }
)

const SuccessStory: Model<ISuccessStory> =
  mongoose.models.SuccessStory ||
  mongoose.model<ISuccessStory>("SuccessStory", successStorySchema)

export default SuccessStory
