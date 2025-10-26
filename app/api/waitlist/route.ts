// File: app/api/waitlist/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// ✅ Initialize Supabase client using environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ✅ Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY!);

// ✅ Handle POST requests
export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // 🔍 Validate email
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // 💾 Insert into Supabase
    const { error: insertError } = await supabase
      .from("waitlist")
      .insert([{ email }]);

    if (insertError) {
      // Handle unique constraint violation (email already exists)
      if ((insertError as any).code === "23505") {
        return NextResponse.json(
          { error: "Email already registered!" },
          { status: 409 }
        );
      }

      throw insertError;
    }

    // 📧 Send confirmation email to the user
    await resend.emails.send({
      from: "SocialChain <onboarding@resend.dev>",
      to: email,
      subject: "🎉 Welcome to SocialChain Waitlist!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #a855f7;">Welcome to SocialChain! 🚀</h1>
          <p>Thank you for joining our waitlist!</p>
          <p>You're now on the list for early access when we launch. We'll notify you as soon as we're ready.</p>
          <p>As an early adopter, you'll receive:</p>
          <ul>
            <li>🎁 Exclusive NFTs</li>
            <li>⚡ Early access to the platform</li>
            <li>🌟 Founder benefits</li>
          </ul>
          <p style="margin-top: 30px;">Stay tuned!</p>
          <p style="color: #a855f7;"><strong>The SocialChain Team</strong></p>
        </div>
      `,
    });

    // 📩 Optional: Notify yourself of a new signup
    await resend.emails.send({
      from: "SocialChain <onboarding@resend.dev>",
      to: "your-email@example.com", // ← replace with your real address
      subject: "🎯 New Waitlist Signup",
      html: `<p>New signup: <strong>${email}</strong></p>`,
    });

    return NextResponse.json({
      success: true,
      message: "Successfully joined the waitlist!",
    });
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
