import { NextResponse } from "next/server";
import {SupabaseClient, createClient, PostgrestError } from "@supabase/supabase-js";
import { Resend } from "resend";

// Supabase & Resend initialization here...
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { email } = await req.json() as { email: string };

    // Validate email
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }



    // Insert into Supabase
    const { error: insertError } = await supabase
      .from("waitlist")
      .insert([{ email }]);

    if (insertError) {
      const supabaseError = insertError as PostgrestError;
      // Check for unique constraint
      if (supabaseError.code === "23505") {
        return NextResponse.json({ error: "Email already registered!" }, { status: 409 });
      }

      throw insertError;
    }

    // Send confirmation emails (same as your current code)...
    await resend.emails.send({
      from: "SocialChain <onboarding@resend.dev>",
      to: email,
      subject: "🎉 Welcome to SocialChain Waitlist!",
      html: `<p>Welcome email content here...</p>`,
    });

    return NextResponse.json({ success: true, message: "Successfully joined the waitlist!" });
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 });
  }
}
