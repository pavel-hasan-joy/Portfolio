import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().max(0, "Bot detected"), // Must be empty
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const { name, email, message, honeypot } = result.data;

    if (honeypot) {
      // Quietly drop spam
      return NextResponse.json({ success: true, message: "Message dispatched" });
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      // If RESEND_API_KEY is not configured, inform the client to trigger mailto fallback gracefully
      return NextResponse.json({
        success: true,
        fallbackMailto: true,
        mailToUrl: `mailto:pavel.hasan.cse@ulab.edu.bd?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(
          name
        )}&body=${encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`)}`,
        note: "RESEND_API_KEY not configured. Falling back to direct email client.",
      });
    }

    // If Resend API key is present, send email via Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: "pavel.hasan.cse@ulab.edu.bd",
        reply_to: email,
        subject: `New Portfolio Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { error: "Failed to dispatch email via Resend", details: errText },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, message: "Message delivered successfully!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
