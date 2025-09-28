import { Schema, models, model } from "mongoose";

const adminSchema = new Schema(
    {
        role: String,
        secretKey: String,
    },
    { timestamps: true }
);

export const Admin = models.Admin || model("Admin", adminSchema);
