import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import { connectToDatabase } from "@/lib/mongodb";
import Donation from "@/lib/donations/donation";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export async function POST(req: NextRequest) {
    await connectToDatabase();
    const { amount, name, email, type, purpose, phone, address } = await req.json();

    try {
        let order: any;

        if (type === "monthly") {
            // Create subscription plan
            const plan = await razorpay.plans.create({
                period: "monthly",
                interval: 1,
                item: { name: "Monthly Donation", amount: amount * 100, currency: "INR" },
            });

            order = await razorpay.subscriptions.create({
                plan_id: plan.id,
                customer_notify: 1,
                total_count: 12,
            });
        } else {
            // One-time donation
            order = await razorpay.orders.create({
                amount: amount * 100,
                currency: "INR",
                receipt: `donation_${Date.now()}`,
                payment_capture: true,
            });
        }

        // Save to DB
        await Donation.create({
            name,
            email,
            phone,
            address,
            amount,
            type,
            purpose,
            razorpay_order_id: order.id,
        });

        return NextResponse.json(order);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Order creation failed" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    await connectToDatabase();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
        .update(body.toString())
        .digest("hex");

    const status = expectedSignature === razorpay_signature ? "success" : "failed";

    await Donation.findOneAndUpdate(
        { razorpay_order_id },
        { razorpay_payment_id, razorpay_signature, status },
        { new: true }
    );

    if (status === "success") {
        return NextResponse.json({ success: true });
    } else {
        return NextResponse.json({ success: false, error: "Payment verification failed" }, { status: 400 });
    }
}
