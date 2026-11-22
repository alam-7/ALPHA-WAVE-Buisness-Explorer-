import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const requestedNext = searchParams.get("next");

  // Only allow safe internal redirect paths.
  const next =
    requestedNext?.startsWith("/") &&
    !requestedNext.startsWith("//")
      ? requestedNext
      : "/workspace";

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=verification_failed", origin)
    );
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Authentication callback failed:", error.message);

    return NextResponse.redirect(
      new URL("/login?error=verification_failed", origin)
    );
  }

  return NextResponse.redirect(new URL(next, origin));
}