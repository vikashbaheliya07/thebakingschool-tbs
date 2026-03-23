import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// ✅ POST: Upload image to Cloudinary
export async function POST(req: Request) {
  try {
    // Configure Cloudinary at request time (not build time)
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim() || "",
      api_key: process.env.CLOUDINARY_API_KEY?.trim() || "",
      api_secret: process.env.CLOUDINARY_API_SECRET?.trim() || "",
    });

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    // Convert file → base64 for Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "baking-school-gallery",
      resource_type: "image",
    });

    return NextResponse.json({ success: true, result });
  } catch (error: unknown) {
    console.error("Cloudinary upload failed:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Upload failed" },
      { status: 500 }
    );
  }
}
