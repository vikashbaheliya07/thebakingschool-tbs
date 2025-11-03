import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
  email: string;
  mobile: string;
}

const contactSchema = new Schema<IContact>({
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
});

const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", contactSchema);

export default Contact;
