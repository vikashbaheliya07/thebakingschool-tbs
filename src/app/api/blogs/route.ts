import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/blog";
import { IBlog } from "@/models/blog";

export async function POST(req: Request): Promise<Response> {
  try {
    await connectDB();
    const body: Partial<IBlog> = await req.json();

    // Validate required fields
    if (
      !body.title ||
      !body.excerpt ||
      !body.content ||
      !body.author ||
      !body.category
    ) {
      return Response.json({ error: "Missing required fields." }, { status: 400 });
    }

    const blog = await Blog.create(body);
    return Response.json(blog, { status: 201 });
  } catch (error) {
    const err = error as Error;
    return Response.json({ error: err.message }, { status: 400 });
  }
}

export async function GET(): Promise<Response> {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return Response.json(blogs, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching blogs:", error);
    const err = error as Error;
    return Response.json({ error: err.message }, { status: 500 });
  }
}