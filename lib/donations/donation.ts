import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    amount: Number,
    type: { type: String, enum: ["one-time", "monthly"], default: "one-time" },
    purpose: { type: String, enum: ["general", "education", "healthcare", "community"], default: "general" },
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
    status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Donation || mongoose.model("Donation", DonationSchema);
