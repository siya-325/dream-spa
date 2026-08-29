import { NextResponse } from "next/server"

type ContactRequestBody = {
  name: string
  email: string
  phone: string
  service: string
  date?: string
  notes?: string
}

function validateEmail(email: string): boolean {
  const trimmed = email.trim()
  if (!trimmed || trimmed.length > 254 || trimmed.includes("..")) return false
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(trimmed)
}

function validatePhone(phone: string): boolean {
  let cleaned = phone.trim().replace(/[\s\-\(\)]/g, "")
  if (cleaned.startsWith("+91")) cleaned = cleaned.slice(3)
  else if (cleaned.startsWith("91") && cleaned.length === 12) cleaned = cleaned.slice(2)
  else if (cleaned.startsWith("0") && cleaned.length === 11) cleaned = cleaned.slice(1)
  
  if (!/^\d{10}$/.test(cleaned) || !/^[6-9]/.test(cleaned) || /^(\d)\1{9}$/.test(cleaned)) {
    return false
  }
  return true
}

export async function POST(req: Request) {
  try {
    const body: ContactRequestBody = await req.json()
    const { name, email, phone, service, date, notes } = body

    // Server-side validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid full name." },
        { status: 400 }
      )
    }

    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      )
    }

    if (!phone || !validatePhone(phone)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      )
    }

    if (!service) {
      return NextResponse.json(
        { success: false, error: "Please select a preferred service." },
        { status: 400 }
      )
    }

    const submissionTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    })

    const payload = {
      timestamp: submissionTime,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      service: service.trim(),
      date: date ? date.trim() : "Not specified",
      notes: notes ? notes.trim() : "None",
    }

    let sheetStatus = "skipped"
    let emailStatus = "skipped"
    const warnings: string[] = []

    // 1. Send data to Google Sheet Webhook URL
    const googleSheetUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.GOOGLE_SHEET_WEBHOOK_URL
    if (googleSheetUrl) {
      try {
        const sheetRes = await fetch(googleSheetUrl, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(payload),
          redirect: "follow",
        })

        if (sheetRes.ok) {
          sheetStatus = "success"
        } else {
          sheetStatus = "failed"
          console.error("Google Sheet webhook error status:", sheetRes.status)
          warnings.push("Could not write entry to Google Sheet.")
        }
      } catch (err) {
        sheetStatus = "failed"
        console.error("Error pushing to Google Sheet Webhook:", err)
        warnings.push("Failed to log entry to Google Sheet.")
      }
    } else {
      console.warn("GOOGLE_SHEETS_WEBHOOK_URL environment variable is not defined.")
    }

    // 2. Send Email via Brevo API
    const brevoApiKey = process.env.BREVO_API_KEY
    const recipientEmail = process.env.RECIPIENT_EMAIL || process.env.CONTACT_EMAIL_TO || "info@dreamspa.in"
    const senderEmail = process.env.SENDER_EMAIL || process.env.BREVO_SENDER_EMAIL || "no-reply@dreamspa.in"
    const senderName = process.env.BREVO_SENDER_NAME || "Dream Spa Gurukul"

    if (brevoApiKey) {
      try {
        // Admin notification email content
        const adminHtmlContent = `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #faf9f6; color: #1c1917; border-radius: 8px; border: 1px solid #e7e5e4;">
            <div style="border-bottom: 2px solid #b91c1c; padding-bottom: 12px; margin-bottom: 20px;">
              <h2 style="margin: 0; color: #78350f; font-size: 22px;">🌿 New Spa Session Inquiry</h2>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #78716c;">Received on ${payload.timestamp}</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
              <tr style="border-bottom: 1px solid #e7e5e4;">
                <td style="padding: 10px 0; font-weight: bold; width: 140px; color: #44403c;">Full Name:</td>
                <td style="padding: 10px 0; color: #1c1917;">${payload.name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e7e5e4;">
                <td style="padding: 10px 0; font-weight: bold; color: #44403c;">Phone:</td>
                <td style="padding: 10px 0; color: #1c1917;"><a href="tel:${payload.phone}" style="color: #b91c1c; text-decoration: none; font-weight: 600;">${payload.phone}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #e7e5e4;">
                <td style="padding: 10px 0; font-weight: bold; color: #44403c;">Email Address:</td>
                <td style="padding: 10px 0; color: #1c1917;"><a href="mailto:${payload.email}" style="color: #b91c1c; text-decoration: none;">${payload.email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #e7e5e4;">
                <td style="padding: 10px 0; font-weight: bold; color: #44403c;">Requested Treatment:</td>
                <td style="padding: 10px 0; color: #1c1917; font-weight: 600;">${payload.service}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e7e5e4;">
                <td style="padding: 10px 0; font-weight: bold; color: #44403c;">Preferred Date:</td>
                <td style="padding: 10px 0; color: #1c1917;">${payload.date}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #44403c; vertical-align: top;">Notes / Preferences:</td>
                <td style="padding: 10px 0; color: #1c1917; line-height: 1.5;">${payload.notes}</td>
              </tr>
            </table>

            <div style="background-color: #f5f5f4; padding: 12px 16px; border-radius: 6px; font-size: 12px; color: #57534e;">
              💡 <strong>Action required:</strong> Please call or message the client to confirm therapist availability and timing.
            </div>
          </div>
        `

        // Send email to Spa Admin
        const adminEmailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            accept: "application/json",
            "api-key": brevoApiKey,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            sender: { name: senderName, email: senderEmail },
            to: [{ email: recipientEmail, name: "Dream Spa Reception" }],
            replyTo: { email: payload.email, name: payload.name },
            subject: `[New Inquiry] ${payload.service} - ${payload.name}`,
            htmlContent: adminHtmlContent,
          }),
        })

        if (adminEmailRes.ok) {
          emailStatus = "success"
        } else {
          emailStatus = "failed"
          const errData = await adminEmailRes.json().catch(() => ({}))
          console.error("Brevo API error:", errData)
          warnings.push("Could not send admin email notification via Brevo.")
        }

        // Send Customer Acknowledgment Email
        const customerHtmlContent = `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #ffffff; color: #1c1917; border-radius: 8px; border: 1px solid #e7e5e4;">
            <div style="text-align: center; padding-bottom: 16px; border-bottom: 1px solid #e7e5e4;">
              <h2 style="margin: 0; color: #78350f; font-size: 24px; font-family: Georgia, serif;">Dream Spa Gurukul</h2>
              <p style="margin: 4px 0 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #a8a29e;">Wellness & Massage Therapy</p>
            </div>
            
            <p style="font-size: 15px; margin-top: 24px;">Dear <strong>${payload.name}</strong>,</p>
            <p style="font-size: 14px; line-height: 1.6; color: #44403c;">
              Thank you for reaching out to Dream Spa. We have received your request for <strong>${payload.service}</strong>${payload.date !== "Not specified" ? ` on <strong>${payload.date}</strong>` : ""}.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #44403c;">
              Our reception desk is reviewing room and therapist schedules and will call or message you back shortly at <strong>${payload.phone}</strong> to confirm your slot.
            </p>
            
            <div style="margin: 24px 0; padding: 16px; background-color: #faf9f6; border-left: 3px solid #78350f; border-radius: 4px;">
              <h4 style="margin: 0 0 8px 0; color: #78350f; font-size: 14px;">Location & Hours</h4>
              <p style="margin: 0; font-size: 13px; color: #57534e; line-height: 1.5;">
                📍 3rd Floor, Silicon Tower, Above Westside, Gurukul Road, Ahmedabad<br/>
                ⏰ Open Daily: 10:00 AM – 9:00 PM<br/>
                📞 Reception: +91 88666 65784
              </p>
            </div>

            <p style="font-size: 13px; color: #78716c; margin-top: 24px;">Warm regards,<br/><strong>Dream Spa Team</strong></p>
          </div>
        `

        // Fire & forget customer confirmation
        fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            accept: "application/json",
            "api-key": brevoApiKey,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            sender: { name: senderName, email: senderEmail },
            to: [{ email: payload.email, name: payload.name }],
            subject: `Inquiry Received: ${payload.service} - Dream Spa`,
            htmlContent: customerHtmlContent,
          }),
        }).catch((err) => console.error("Error sending customer confirmation email:", err))

      } catch (err) {
        emailStatus = "failed"
        console.error("Error sending email with Brevo API:", err)
        warnings.push("Failed to trigger email notification.")
      }
    } else {
      console.warn("BREVO_API_KEY environment variable is not defined.")
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry received successfully.",
      details: {
        sheetStatus,
        emailStatus,
        warnings,
      },
    })
  } catch (error) {
    console.error("Unhandled error in contact API route:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error. Please try again later." },
      { status: 500 }
    )
  }
}
