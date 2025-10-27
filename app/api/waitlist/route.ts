import { NextResponse } from "next/server";
import { createClient, PostgrestError } from "@supabase/supabase-js";

// Supabase initialization
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
        return NextResponse.json({ error: "You're already on the waitlist!" }, { status: 409 });
      }
      throw insertError;
    }

    return NextResponse.json({ 
      success: true, 
      message: "Thanks! We'll notify you when we launch." 
    });

  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json({ 
      error: "Something went wrong. Please try again later." 
    }, { status: 500 });
  }
}