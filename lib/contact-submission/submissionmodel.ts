import mongoose, { Schema, models, model } from "mongoose";

const ContactSubmissionSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        subject: String,
        message: String,
    },
    { timestamps: true }
);

export const ContactSubmission =
    models.ContactSubmission || model("ContactSubmission", ContactSubmissionSchema);
