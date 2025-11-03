import { connectDB } from "@/lib/mongodb";
import { Types } from "mongoose";
import Blog, { IBlog } from "@/models/blog";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await context.params;
    await connectDB();

    if (!Types.ObjectId.isValid(id)) {
      return Response.json({ error: "Invalid ID format." }, { status: 400 });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return Response.json({ error: "Blog not found." }, { status: 404 });
    }

    return Response.json(blog, { status: 200 });
  } catch (error) {
    const err = error as Error;
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await context.params;
    await connectDB();

    const body: Partial<IBlog> = await req.json();
    if (!Types.ObjectId.isValid(id)) {
      return Response.json({ error: "Invalid ID format." }, { status: 400 });
    }

    const updated = await Blog.findByIdAndUpdate(id, body, { new: true });
    if (!updated) {
      return Response.json({ error: "Blog not found." }, { status: 404 });
    }

    return Response.json(updated, { status: 200 });
  } catch (error) {
    const err = error as Error;
    return Response.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await context.params;
    await connectDB();

    if (!Types.ObjectId.isValid(id)) {
      return Response.json({ error: "Invalid ID format." }, { status: 400 });
    }

    const deleted = await Blog.findByIdAndDelete(id);
    if (!deleted) {
      return Response.json({ error: "Blog not found." }, { status: 404 });
    }

    return Response.json({ message: "Blog deleted successfully." }, { status: 200 });
  } catch (error) {
    const err = error as Error;
    return Response.json({ error: err.message }, { status: 500 });
  }
}
