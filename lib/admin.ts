import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
    {
        role: { type: String, required: true },
        secretKey: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

export const User = models.User || model("User", UserSchema);
