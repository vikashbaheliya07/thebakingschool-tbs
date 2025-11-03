import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/contact";
import { IContact } from "@/models/contact";

export async function POST(req: Request): Promise<Response> {
  try {
    await connectDB();
    const { email, mobile }: Partial<IContact> = await req.json();

    // Require at least one
    if (!email && !mobile) {
      return Response.json(
        { error: "Please provide at least an email or mobile number." },
        { status: 400 }
      );
    }

    const contact = await Contact.create({ email, mobile });
    return Response.json(contact, { status: 201 });
  } catch (error) {
    const err = error as Error;
    return Response.json({ error: err.message }, { status: 400 });
  }
}

export async function GET(): Promise<Response> {
  try {
    await connectDB();
    const contacts: IContact[] = await Contact.find().sort({ createdAt: -1 });
    return Response.json(contacts, { status: 200 });
  } catch (error) {
    const err = error as Error;
    return Response.json({ error: err.message }, { status: 500 });
  }
}
