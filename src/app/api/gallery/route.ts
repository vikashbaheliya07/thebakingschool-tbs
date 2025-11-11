import { connectDB } from "@/lib/mongodb";
import GalleryImage from "@/models/galleryImage";
import { IGalleryImage } from "@/models/galleryImage"; // if you have an interface for typing
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  try {
    await connectDB();
    const { title, category, image }: Partial<IGalleryImage> = await req.json();

    if (!title || !category || !image) {
      return NextResponse.json(
        { error: "Missing required fields (title, category, image)." },
        { status: 400 }
      );
    }

    const newImage = await GalleryImage.create({
      title,
      category,
      image,
      uploadDate: new Date().toLocaleDateString(),
    });

    return NextResponse.json(newImage, { status: 201 });
  } catch (error) {
    const err = error as Error;
    console.error("Gallery POST Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(): Promise<Response> {
  try {
    await connectDB();
    const images: IGalleryImage[] = await GalleryImage.find().sort({ createdAt: -1 });
    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    const err = error as Error;
    console.error("Gallery GET Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
