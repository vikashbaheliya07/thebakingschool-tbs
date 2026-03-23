import { connectDB } from "@/lib/mongodb";
import SuccessStory from "@/models/successStory";
import { ISuccessStory } from "@/models/successStory";

export async function POST(req: Request): Promise<Response> {
  try {
    await connectDB();
    const body: Partial<ISuccessStory> = await req.json();

    console.log("Creating success story with body:", JSON.stringify(body, null, 2));

    if (
      !body.name ||
      !body.role ||
      !body.location ||
      !body.graduationYear ||
      !body.image ||
      !body.quote ||
      !body.achievement ||
      !body.course
    ) {
      console.error("Missing required fields for success story:", body);
      return Response.json({ error: "Missing required fields." }, { status: 400 });
    }

    const story = await SuccessStory.create(body);
    console.log("Success story created successfully:", story._id);
    return Response.json(story, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating success story:", error);
    const err = error as Error;
    return Response.json({ error: err.message }, { status: 400 });
  }
}

export async function GET(): Promise<Response> {
  try {
    await connectDB();
    const stories = await SuccessStory.find().sort({ createdAt: -1 });
    return Response.json(stories, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching success stories:", error);
    const err = error as Error;
    return Response.json({ error: err.message }, { status: 500 });
  }
}
