import { NextResponse } from "next/server";
import { createClient, PostgrestError } from "@supabase/supabase-js";

// Supabase initialization
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Type definitions
interface FeedbackData {
  motivation?: string;
  frustration?: string;
  wish?: string;
  earlyAccess?: string;
  earlyAccessReason?: string;
  additionalThoughts?: string;
}

interface RequestBody {
  email: string;
  feedback?: FeedbackData;
}

export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();
    const { email, feedback } = body;

    // Validate email
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" }, 
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" }, 
        { status: 400 }
      );
    }

    // Check if this is a feedback-only submission
    if (feedback) {
      console.log("Feedback submission detected for:", email);
      
      // First, ensure email is in waitlist (upsert = insert if not exists, ignore if exists)
      const { error: waitlistError } = await supabase
        .from("waitlist")
        .upsert([{ email }], { 
          onConflict: 'email',
          ignoreDuplicates: true 
        });

      if (waitlistError && waitlistError.code !== "23505") {
        console.error("Waitlist upsert error:", waitlistError);
        // Continue anyway - feedback is more important
      } else {
        console.log("Email ensured in waitlist:", email);
      }
      
      // Store feedback
      const { error: feedbackError } = await supabase
        .from("feedback")
        .insert([{
          email,
          motivation: feedback.motivation || null,
          frustration: feedback.frustration || null,
          wish: feedback.wish || null,
          early_access: feedback.earlyAccess || null,
          early_access_reason: feedback.earlyAccessReason || null,
          additional_thoughts: feedback.additionalThoughts || null
        }]);

      if (feedbackError) {
        console.error("Feedback insert error:", feedbackError);
        // Don't fail - feedback is optional
        return NextResponse.json({ 
          success: true, 
          message: "Thanks for your feedback! 🎉" 
        });
      }

      console.log("Feedback stored successfully for:", email);
      return NextResponse.json({ 
        success: true, 
        message: "Thanks for your feedback! We've also added you to our waitlist 🚀" 
      });
    }

    // This is a waitlist-only submission (no feedback)
    console.log("Waitlist submission for:", email);
    
    // Insert into waitlist table
    const { data: waitlistData, error: insertError } = await supabase
      .from("waitlist")
      .insert([{ email }])
      .select()
      .single();

    if (insertError) {
      const supabaseError = insertError as PostgrestError;
      
      // Check for unique constraint violation (email already exists)
      if (supabaseError.code === "23505") {
        return NextResponse.json(
          { error: "You're already on the waitlist! 🎉" }, 
          { status: 409 }
        );
      }
      
      console.error("Waitlist insert error:", insertError);
      throw insertError;
    }

    return NextResponse.json({ 
      success: true, 
      message: "Thanks! We'll notify you when Fluxa launches 🚀" 
    });

  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json({ 
      error: "Something went wrong. Please try again later." 
    }, { status: 500 });
  }
}

// Optional: GET endpoint to check waitlist count (admin only)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const adminKey = searchParams.get('admin_key');

    // Simple admin authentication (replace with proper auth in production)
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { error: "Unauthorized" }, 
        { status: 401 }
      );
    }

    // Get waitlist count
    const { count: waitlistCount, error: waitlistError } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    // Get feedback count
    const { count: feedbackCount, error: feedbackError } = await supabase
      .from("feedback")
      .select("*", { count: "exact", head: true });

    if (waitlistError || feedbackError) {
      throw waitlistError || feedbackError;
    }

    return NextResponse.json({
      waitlist_count: waitlistCount || 0,
      feedback_count: feedbackCount || 0
    });

  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" }, 
      { status: 500 }
    );
  }
}