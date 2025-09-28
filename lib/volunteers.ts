import mongoose, { Schema, models, model } from "mongoose";

const VolunteerSchema = new Schema(
  {
    id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    age: Number,
    occupation: String,
    address: String,
    areasOfInterest: [String],
    availability: String,
    timeCommitment: String,
    skills: String,
    experience: String,
    motivation: String,
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String,
    },
    termsAccepted: Boolean,
    backgroundCheckConsent: Boolean,
    updatesSubscribed: Boolean,
    status: { type: String, enum: ["Pending", "Active", "Rejected"], default: "Pending" },
  },
  { timestamps: true }
);

export const Volunteer = models.Volunteer || model("Volunteer", VolunteerSchema);
