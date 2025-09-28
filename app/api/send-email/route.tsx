import { type NextRequest, NextResponse } from "next/server"

// Email service configuration - in production, use environment variables
const EMAIL_CONFIG = {
  from: "noreply@vanyafoundation.org",
  adminEmail: "admin@vanyafoundation.org",
  // In real implementation, you would use services like Resend, SendGrid, etc.
}

// Mock email sending function - replace with actual email service
async function sendEmail(to: string, subject: string, html: string, text?: string) {
  // This would be replaced with actual email service implementation
  console.log("[v0] Email would be sent:", { to, subject, html: html.substring(0, 100) + "..." })

  // Simulate email sending delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return { success: true, messageId: `mock-${Date.now()}` }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data } = body

    let emailResult

    switch (type) {
      case "donation-receipt":
        emailResult = await sendDonationReceipt(data)
        break
      case "contact-form":
        emailResult = await sendContactFormEmail(data)
        break
      case "volunteer-application":
        emailResult = await sendVolunteerConfirmation(data)
        break
      case "newsletter-subscription":
        emailResult = await sendNewsletterConfirmation(data)
        break
      default:
        return NextResponse.json({ error: "Invalid email type" }, { status: 400 })
    }

    return NextResponse.json({ success: true, ...emailResult })
  } catch (error) {
    console.error("[v0] Email sending error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}

async function sendDonationReceipt(data: any) {
  const { donorName, donorEmail, amount, donationId, purpose, date } = data

  const subject = `Thank you for your donation - Receipt #${donationId}`
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Donation Receipt</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #22c55e; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .receipt-details { background: white; padding: 15px; margin: 20px 0; border-radius: 5px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        .amount { font-size: 24px; font-weight: bold; color: #22c55e; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Vanya Foundation</h1>
          <p>Thank you for your generous donation!</p>
        </div>
        <div class="content">
          <h2>Dear ${donorName},</h2>
          <p>We are deeply grateful for your generous donation to Vanya Foundation. Your contribution will make a real difference in the lives of those we serve.</p>
          
          <div class="receipt-details">
            <h3>Donation Receipt</h3>
            <p><strong>Receipt Number:</strong> ${donationId}</p>
            <p><strong>Donor Name:</strong> ${donorName}</p>
            <p><strong>Donation Amount:</strong> <span class="amount">₹${amount.toLocaleString()}</span></p>
            <p><strong>Purpose:</strong> ${purpose}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Tax Deduction:</strong> This donation is eligible for tax deduction under Section 80G</p>
          </div>
          
          <p>Your support enables us to continue our mission of empowering communities through education, healthcare, and development programs. We will keep you updated on how your contribution is making an impact.</p>
          
          <p>If you have any questions about your donation, please don't hesitate to contact us at info@vanyafoundation.org or +91 98765 43210.</p>
          
          <p>With heartfelt gratitude,<br>The Vanya Foundation Team</p>
        </div>
        <div class="footer">
          <p>Vanya Foundation | 123 Foundation Street, New Delhi - 110001 | Reg. No: 12345678</p>
          <p>This is an automated email. Please do not reply to this message.</p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `Thank you for your donation of ₹${amount.toLocaleString()} to Vanya Foundation. Receipt #${donationId}. Your contribution will make a real difference.`

  // Send to donor
  await sendEmail(donorEmail, subject, html, text)

  // Send notification to admin
  const adminSubject = `New Donation Received - ₹${amount.toLocaleString()}`
  const adminHtml = `
    <h2>New Donation Notification</h2>
    <p><strong>Donor:</strong> ${donorName} (${donorEmail})</p>
    <p><strong>Amount:</strong> ₹${amount.toLocaleString()}</p>
    <p><strong>Purpose:</strong> ${purpose}</p>
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Receipt ID:</strong> ${donationId}</p>
  `
  await sendEmail(EMAIL_CONFIG.adminEmail, adminSubject, adminHtml)

  return { message: "Donation receipt sent successfully" }
}

async function sendContactFormEmail(data: any) {
  const { firstName, lastName, email, phone, subject, message } = data

  const adminSubject = `New Contact Form Submission: ${subject}`
  const adminHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Contact Form Submission</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #22c55e; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .details { background: white; padding: 15px; margin: 20px 0; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Contact Form Submission</h1>
        </div>
        <div class="content">
          <div class="details">
            <h3>Contact Details</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div class="details">
            <h3>Message</h3>
            <p>${message}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  await sendEmail(EMAIL_CONFIG.adminEmail, adminSubject, adminHtml)

  // Send confirmation to user
  const userSubject = "Thank you for contacting Vanya Foundation"
  const userHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Contact Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #22c55e; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Vanya Foundation</h1>
          <p>Thank you for reaching out!</p>
        </div>
        <div class="content">
          <h2>Dear ${firstName},</h2>
          <p>Thank you for contacting Vanya Foundation. We have received your message and will respond within 24-48 hours during business days.</p>
          <p>For urgent matters, please call our helpline at +91 98765 43210.</p>
          <p>Best regards,<br>The Vanya Foundation Team</p>
        </div>
      </div>
    </body>
    </html>
  `

  await sendEmail(email, userSubject, userHtml)

  return { message: "Contact form emails sent successfully" }
}

async function sendVolunteerConfirmation(data: any) {
  const { firstName, lastName, email, areas, availability } = data

  const subject = "Thank you for your volunteer application - Vanya Foundation"
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Volunteer Application Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #22c55e; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .next-steps { background: white; padding: 15px; margin: 20px 0; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Vanya Foundation</h1>
          <p>Welcome to our volunteer community!</p>
        </div>
        <div class="content">
          <h2>Dear ${firstName},</h2>
          <p>Thank you for your interest in volunteering with Vanya Foundation. We are excited about your willingness to contribute to our mission of empowering communities.</p>
          
          <div class="next-steps">
            <h3>What happens next?</h3>
            <ul>
              <li>Our volunteer coordinator will review your application within 3-5 business days</li>
              <li>We will contact you to discuss suitable volunteer opportunities based on your interests and availability</li>
              <li>You may be invited for a brief orientation session</li>
              <li>We will provide you with all necessary training and resources</li>
            </ul>
          </div>
          
          <p>Your areas of interest: ${Array.isArray(areas) ? areas.join(", ") : areas}</p>
          <p>Your availability: ${availability}</p>
          
          <p>If you have any questions in the meantime, please feel free to contact us at volunteer@vanyafoundation.org or +91 98765 43210.</p>
          
          <p>Thank you for choosing to make a difference with us!</p>
          
          <p>Warm regards,<br>The Vanya Foundation Volunteer Team</p>
        </div>
      </div>
    </body>
    </html>
  `

  await sendEmail(email, subject, html)

  // Send notification to admin
  const adminSubject = `New Volunteer Application: ${firstName} ${lastName}`
  const adminHtml = `
    <h2>New Volunteer Application</h2>
    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Areas of Interest:</strong> ${Array.isArray(areas) ? areas.join(", ") : areas}</p>
    <p><strong>Availability:</strong> ${availability}</p>
    <p>Please review the full application in the admin dashboard.</p>
  `
  await sendEmail(EMAIL_CONFIG.adminEmail, adminSubject, adminHtml)

  return { message: "Volunteer confirmation sent successfully" }
}

async function sendNewsletterConfirmation(data: any) {
  const { email } = data

  const subject = "Welcome to Vanya Foundation Newsletter"
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Newsletter Subscription</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #22c55e; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Vanya Foundation</h1>
          <p>Welcome to our newsletter!</p>
        </div>
        <div class="content">
          <h2>Thank you for subscribing!</h2>
          <p>You have successfully subscribed to the Vanya Foundation newsletter. You will now receive:</p>
          <ul>
            <li>Monthly updates on our programs and impact</li>
            <li>Stories from the communities we serve</li>
            <li>Volunteer opportunities and events</li>
            <li>Ways to get involved and make a difference</li>
          </ul>
          <p>We respect your privacy and will never share your email address with third parties.</p>
          <p>If you wish to unsubscribe at any time, simply click the unsubscribe link in any of our emails.</p>
          <p>Thank you for joining our community!</p>
          <p>Best regards,<br>The Vanya Foundation Team</p>
        </div>
      </div>
    </body>
    </html>
  `

  await sendEmail(email, subject, html)

  return { message: "Newsletter confirmation sent successfully" }
}
