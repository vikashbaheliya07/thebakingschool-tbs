import mongoose, { Schema, Document, models } from "mongoose";

export interface IBooking extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  course: string;
  experience?: string;
  startDate?: string;
  message?: string;
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    course: { type: String, required: true },
    experience: { type: String },
    startDate: { type: String },
    message: { type: String },
  },
  { timestamps: true }
);

const Booking = models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
export default Booking;
