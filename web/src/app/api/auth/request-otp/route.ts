import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { emailSchema } from "@/lib/validators";
import { generateOtp, hashOtp, hashString } from "@/lib/security";
import { serverEnv } from "@/lib/env.server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const parseResult = emailSchema.safeParse(body.email);

  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.issues[0]?.message ?? "Invalid email" },
      { status: 400 },
    );
  }

  const email = parseResult.data.toLowerCase();

  if (
    serverEnv.allowedEmailDomains.length > 0 &&
    !serverEnv.allowedEmailDomains.some((domain) => email.endsWith(domain))
  ) {
    return NextResponse.json(
      {
        error: `Only ${serverEnv.allowedEmailDomains.join(", ")} email domains are allowed`,
      },
      { status: 400 },
    );
  }

  const emailHash = hashString(email);
  const otp = generateOtp();
  const hashedOtp = hashOtp(emailHash, otp);
  const expiresAt = new Date(Date.now() + serverEnv.otpTtlMinutes * 60 * 1000).toISOString();

  const { error } = await supabaseAdmin.from("user_verifications").upsert(
    {
      email_hash: emailHash,
      otp_hash: hashedOtp,
      otp_expires_at: expiresAt,
      verified: false,
      session_token: null,
      session_token_expires_at: null,
    },
    { onConflict: "email_hash" },
  );

  if (error) {
    console.error("OTP UPSERT ERROR", error);
    return NextResponse.json({ error: "Failed to store OTP" }, { status: 500 });
  }

  // TODO: integrate with Postmark / Resend to email the OTP. For now we expose it in dev only.
  if (process.env.NODE_ENV !== "production") {
    console.info(`📧 OTP for ${email}: ${otp}`);
  }

  return NextResponse.json({
    success: true,
    expiresAt,
    previewCode: process.env.NODE_ENV !== "production" ? otp : undefined,
  });
}
