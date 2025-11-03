import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/booking";

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();

    // Validate required fields
    const required = ["firstName", "lastName", "email", "phone", "course"];
    for (const field of required) {
      if (!data[field]) {
        return Response.json({ error: `${field} is required.` }, { status: 400 });
      }
    }

    const booking = await Booking.create(data);
    return Response.json({ message: "Booking submitted successfully!", booking }, { status: 201 });
  } catch (error) {
    console.error("❌ Booking creation failed:", error);
    const err = error as Error;
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const bookings = await Booking.find().sort({ createdAt: -1 });
    return Response.json(bookings, { status: 200 });
  } catch (error) {
    const err = error as Error;
    return Response.json({ error: err.message }, { status: 500 });
  }
}
