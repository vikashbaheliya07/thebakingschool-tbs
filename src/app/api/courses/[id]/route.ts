import { connectDB } from "@/lib/mongodb";
import Course from "@/models/course";
import { ICourse } from "@/models/course";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  try {
    const { id } = await params;
    await connectDB();
    const course = await Course.findById(id);

    if (!course) {
      return Response.json({ error: "Course not found" }, { status: 404 });
    }

    return Response.json(course, { status: 200 });
  } catch (error) {
    const err = error as Error;
    return Response.json({ error: err.message }, { status: 400 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  try {
    const { id } = await params;
    await connectDB();
    const body: Partial<ICourse> = await req.json();

    const course = await Course.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return Response.json({ error: "Course not found" }, { status: 404 });
    }

    return Response.json(course, { status: 200 });
  } catch (error) {
    const err = error as Error;
    return Response.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  try {
    const { id } = await params;
    await connectDB();
    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return Response.json({ error: "Course not found" }, { status: 404 });
    }

    return Response.json({ message: "Course deleted successfully" }, { status: 200 });
  } catch (error) {
    const err = error as Error;
    return Response.json({ error: err.message }, { status: 400 });
  }
}
