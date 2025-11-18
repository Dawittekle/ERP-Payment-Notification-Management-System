import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { reportSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const reasonParse = reportSchema.safeParse({
    reason: body.reason,
    chatContext: body.chatContext,
  });
  const reporterToken = typeof body.reporterToken === "string" ? body.reporterToken : null;
  const reportedHash = typeof body.reportedHash === "string" ? body.reportedHash : null;

  if (!reporterToken || !reportedHash) {
    return NextResponse.json({ error: "Missing reporter info" }, { status: 400 });
  }

  if (!reasonParse.success) {
    return NextResponse.json(
      { error: reasonParse.error.issues[0]?.message ?? "Invalid reason" },
      { status: 400 },
    );
  }

  const { data: reporter, error } = await supabaseAdmin
    .from("user_verifications")
    .select("email_hash")
    .eq("session_token", reporterToken)
    .maybeSingle();

  if (error || !reporter) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  const { error: insertError } = await supabaseAdmin.from("reports").insert({
    reporter_hash: reporter.email_hash,
    reported_hash: reportedHash,
    reason: reasonParse.data.reason,
    chat_context: reasonParse.data.chatContext ?? null,
  });

  if (insertError) {
    console.error("REPORT_ERROR", insertError);
    return NextResponse.json({ error: "Failed to submit report" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
