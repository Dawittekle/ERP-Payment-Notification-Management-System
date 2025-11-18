import crypto from "crypto";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { emailSchema, otpSchema } from "@/lib/validators";
import { hashOtp, hashString, secureCompare } from "@/lib/security";
import { serverEnv } from "@/lib/env.server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const emailResult = emailSchema.safeParse(body.email);
  const otpResult = otpSchema.safeParse(body.otp);

  if (!emailResult.success || !otpResult.success) {
    return NextResponse.json(
      { error: emailResult.error?.issues[0]?.message ?? otpResult.error?.issues[0]?.message },
      { status: 400 },
    );
  }

  const email = emailResult.data.toLowerCase();
  const otp = otpResult.data;
  const emailHash = hashString(email);

  const { data, error } = await supabaseAdmin
    .from("user_verifications")
    .select("otp_hash, otp_expires_at, verified")
    .eq("email_hash", emailHash)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ error: "OTP not found" }, { status: 400 });
  }

  if (!data.otp_hash || !data.otp_expires_at) {
    return NextResponse.json({ error: "Request a new OTP" }, { status: 400 });
  }

  if (new Date(data.otp_expires_at).getTime() < Date.now()) {
    return NextResponse.json({ error: "OTP expired" }, { status: 400 });
  }

  const hashedAttempt = hashOtp(emailHash, otp);
  if (!secureCompare(data.otp_hash, hashedAttempt)) {
    return NextResponse.json({ error: "Incorrect code" }, { status: 400 });
  }

  const sessionToken = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + serverEnv.sessionTtlHours * 3600 * 1000).toISOString();

  const { error: updateError } = await supabaseAdmin
    .from("user_verifications")
    .update({
      otp_hash: null,
      otp_expires_at: null,
      verified: true,
      session_token: sessionToken,
      session_token_expires_at: expiresAt,
    })
    .eq("email_hash", emailHash);

  if (updateError) {
    console.error("SESSION_UPDATE_ERROR", updateError);
    return NextResponse.json({ error: "Failed to verify" }, { status: 500 });
  }

  return NextResponse.json({
    token: sessionToken,
    emailHash,
    expiresAt,
  });
}
