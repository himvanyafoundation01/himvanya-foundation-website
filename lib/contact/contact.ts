import mongoose, { Schema, Document } from "mongoose";

export interface IContactPage extends Document {
  heroSection: {
    heading: string;
    description: string;
  };
  contactInfo: {
    address: string[];
    phones: string[];
    emails: string[];
    officeHours: string[];
    note: string;
  };
}

const ContactPageSchema: Schema = new Schema({
  heroSection: {
    heading: { type: String, required: true },
    description: { type: String, required: true },
  },
  contactInfo: {
    address: [{ type: String }],
    phones: [{ type: String }],
    emails: [{ type: String }],
    officeHours: [{ type: String }],
    note: { type: String },
  },
});

// export default mongoose.models.ContactPage ||
//   mongoose.model<IContactPage>("ContactPage", ContactPageSchema);


export const ContactPageModel = mongoose.models.ContactPage ||
  mongoose.model<IContactPage>("ContactPage", ContactPageSchema);