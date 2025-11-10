import { connectDB } from "@/lib/mongodb"
import GalleryImage from "@/models/galleryImage"

// POST — Save new uploaded image metadata
export async function POST(req: Request) {
  try {
    await connectDB()
    const body = await req.json()

    if (!body.title || !body.category || !body.image) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newImage = await GalleryImage.create({
      ...body,
      uploadDate: new Date().toLocaleDateString(),
    })

    return Response.json(newImage, { status: 201 })
  } catch (error) {
    console.error("Gallery POST Error:", error)
    return Response.json({ error: "Failed to save image" }, { status: 500 })
  }
}

// GET — Fetch all images for gallery
export async function GET() {
  try {
    await connectDB()
    const images = await GalleryImage.find().sort({ createdAt: -1 })
    return Response.json(images, { status: 200 })
  } catch (error) {
    console.error("Gallery GET Error:", error)
    return Response.json({ error: "Failed to fetch gallery" }, { status: 500 })
  }
}
