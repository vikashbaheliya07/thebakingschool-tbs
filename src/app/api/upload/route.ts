import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// ✅ POST: Upload image to Cloudinary
export async function POST(req: Request) {
  try {
    // Configure Cloudinary at request time (not build time)
    const cloud_name = process.env.CLOUDINARY_CLOUD_NAME?.trim();
    const api_key = process.env.CLOUDINARY_API_KEY?.trim();
    const api_secret = process.env.CLOUDINARY_API_SECRET?.trim();

    if (!cloud_name || !api_key || !api_secret) {
      console.error("Cloudinary env vars missing:", { cloud_name: !!cloud_name, api_key: !!api_key, api_secret: !!api_secret });
      return NextResponse.json({ success: false, error: "Cloudinary configuration missing on server" }, { status: 500 });
    }

    cloudinary.config({
      cloud_name,
      api_key,
      api_secret,
    });

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    console.log("Uploading file to Cloudinary:", file.name, file.size, file.type);

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

    console.log("Cloudinary upload successful:", result.secure_url);
    return NextResponse.json({ success: true, result });
  } catch (error: unknown) {
    console.error("Cloudinary upload failed detail:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Upload failed" },
      { status: 500 }
    );
  }
}
