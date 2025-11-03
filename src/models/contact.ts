import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
  email: string;
  mobile: string;
}

const contactSchema = new Schema<IContact>({
  email: { type: String,  unique: true, sparse: true },
  mobile: { type: String },
});

const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", contactSchema);

export default Contact;
