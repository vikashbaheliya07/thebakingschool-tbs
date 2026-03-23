import { connectDB } from "@/lib/mongodb";
import Course from "@/models/course";
import { ICourse } from "@/models/course";

export async function POST(req: Request): Promise<Response> {
  try {
    await connectDB();
    const body: Partial<ICourse> = await req.json();

    if (
      !body.title ||
      !body.description ||
      !body.duration ||
      !body.students ||
      !body.rating ||
      !body.price ||
      !body.image ||
      !body.level ||
      body.lessons === undefined
    ) {
      return Response.json({ error: "Missing required fields." }, { status: 400 });
    }

    const course = await Course.create(body);
    return Response.json(course, { status: 201 });
  } catch (error) {
    const err = error as Error;
    return Response.json({ error: err.message }, { status: 400 });
  }
}

export async function GET(): Promise<Response> {
  try {
    await connectDB();
    const courses = await Course.find().sort({ createdAt: 1 }); // Sorted historically ascending or logic choice
    return Response.json(courses, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching courses:", error);
    const err = error as Error;
    return Response.json({ error: err.message }, { status: 500 });
  }
}
