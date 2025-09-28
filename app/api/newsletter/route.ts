import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email address is required" }, { status: 400 })
    }

    // Send confirmation email
    const emailResponse = await fetch(`${request.nextUrl.origin}/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "newsletter-subscription",
        data: { email },
      }),
    })

    if (!emailResponse.ok) {
      throw new Error("Failed to send confirmation email")
    }

    // In a real application, you would save the subscription to database
    console.log("[v0] Newsletter subscription:", { email })

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing! Check your email for confirmation.",
    })
  } catch (error) {
    console.error("[v0] Newsletter subscription error:", error)
    return NextResponse.json(
      {
        error: "Failed to subscribe. Please try again.",
      },
      { status: 500 },
    )
  }
}
