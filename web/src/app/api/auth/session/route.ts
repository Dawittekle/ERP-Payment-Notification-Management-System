import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const token = typeof body.token === "string" ? body.token : null;

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("user_verifications")
    .select("email_hash, session_token_expires_at, verified")
    .eq("session_token", token)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ error: "Session not found" }, { status: 401 });
  }

  if (!data.verified) {
    return NextResponse.json({ error: "Email not verified" }, { status: 401 });
  }

  if (
    !data.session_token_expires_at ||
    new Date(data.session_token_expires_at).getTime() < Date.now()
  ) {
    return NextResponse.json({ error: "Session expired" }, { status: 401 });
  }

  return NextResponse.json({
    emailHash: data.email_hash,
    expiresAt: data.session_token_expires_at,
  });
}
