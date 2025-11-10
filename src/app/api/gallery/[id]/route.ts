import { connectDB } from "@/lib/mongodb"
import GalleryImage from "@/models/galleryImage"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

/**
 * 🟡 UPDATE image metadata (title, description)
 * PUT /api/gallery/:id
 * body: { title?: string, description?: string }
 */
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const body = await req.json()
    const { id } = params

    const updated = await GalleryImage.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    )

    if (!updated) {
      return Response.json({ error: "Image not found" }, { status: 404 })
    }

    return Response.json(updated, { status: 200 })
  } catch (error) {
    console.error("Gallery PUT Error:", error)
    return Response.json({ error: "Failed to update image" }, { status: 500 })
  }
}

/**
 * 🔴 DELETE image from MongoDB and Cloudinary
 * DELETE /api/gallery/:id
 */
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const { id } = params

    const image = await GalleryImage.findById(id)
    if (!image) {
      return Response.json({ error: "Image not found" }, { status: 404 })
    }

    // Extract Cloudinary public_id from the image URL
    const url = image.image
    const publicIdMatch = url.match(/upload\/(?:v\d+\/)?([^/.]+)/)
    const publicId = publicIdMatch ? publicIdMatch[1] : null

    if (publicId) {
      try {
        await cloudinary.uploader.destroy(`gallery_uploads/${publicId}`)
      } catch (cloudErr) {
        console.error("Cloudinary delete error:", cloudErr)
      }
    }

    await GalleryImage.findByIdAndDelete(id)

    return Response.json({ success: true, message: "Image deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Gallery DELETE Error:", error)
    return Response.json({ error: "Failed to delete image" }, { status: 500 })
  }
}
