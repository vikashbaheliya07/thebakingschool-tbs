import { connectDB } from "@/lib/mongodb";
import Course from "@/models/course";
import { ICourse } from "@/models/course";

export async function POST(req: Request): Promise<Response> {
  try {
    await connectDB();
    const body: Partial<ICourse> = await req.json();

    console.log("Creating course with body:", JSON.stringify(body, null, 2));

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
      console.error("Missing required fields for course:", body);
      return Response.json({ error: "Missing required fields." }, { status: 400 });
    }

    const course = await Course.create(body);
    console.log("Course created successfully:", course._id);
    return Response.json(course, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating course:", error);
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
