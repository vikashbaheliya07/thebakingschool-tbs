import { connectDB } from "@/lib/mongodb";
import SuccessStory from "@/models/successStory";
import { ISuccessStory } from "@/models/successStory";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const { id } = await params;
    await connectDB();
    const story = await SuccessStory.findById(id);

    if (!story) {
      return Response.json({ error: "Success Story not found" }, { status: 404 });
    }

    return Response.json(story, { status: 200 });
  } catch (error) {
    const err = error as Error;
    return Response.json({ error: err.message }, { status: 400 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const { id } = await params;
    await connectDB();
    const body: Partial<ISuccessStory> = await req.json();

    const story = await SuccessStory.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!story) {
      return Response.json({ error: "Success Story not found" }, { status: 404 });
    }

    return Response.json(story, { status: 200 });
  } catch (error) {
    const err = error as Error;
    return Response.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const { id } = await params;
    await connectDB();
    const story = await SuccessStory.findByIdAndDelete(id);

    if (!story) {
      return Response.json({ error: "Success Story not found" }, { status: 404 });
    }

    return Response.json({ message: "Success Story deleted successfully" }, { status: 200 });
  } catch (error) {
    const err = error as Error;
    return Response.json({ error: err.message }, { status: 400 });
  }
}
