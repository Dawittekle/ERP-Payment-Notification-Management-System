"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { OTP_EXPIRY_MINUTES } from "@/lib/constants";
import { postJSON } from "@/lib/api";
import { saveSession } from "@/lib/session";

export default function VerifyPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [stage, setStage] = useState<"email" | "otp" | "success">("email");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewCode, setPreviewCode] = useState<string | undefined>();

  const handleEmailSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const response = await postJSON<{
        expiresAt: string;
        previewCode?: string;
      }>("/api/auth/request-otp", { email });
      setStage("otp");
      setMsg(
        `We sent a code to ${email}. It expires in ${OTP_EXPIRY_MINUTES} minutes.`,
      );
      setPreviewCode(response.previewCode);
    } catch (error) {
      setMsg(error instanceof Error ? error.message : "Failed to request code");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const response = await postJSON<{ token: string; emailHash: string; expiresAt: string }>(
        "/api/auth/verify-otp",
        { email, otp },
      );
      saveSession(response);
      setStage("success");
      setMsg("Email verified. Redirecting you to chat…");
      setTimeout(() => router.push("/chat"), 800);
    } catch (error) {
      setMsg(error instanceof Error ? error.message : "Failed to verify code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="glass-surface w-full max-w-lg px-8 py-10">
        <h1 className="text-3xl font-semibold text-white">Verify your campus email</h1>
        <p className="mt-2 text-sm text-slate-300">
          We never store your email, only a hash so that you can be matched anonymously.
        </p>

        {msg && (
          <p className="mt-4 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-cyan-100">
            {msg}
          </p>
        )}

        {stage === "email" && (
          <form className="mt-6 space-y-4" onSubmit={handleEmailSubmit}>
            <label className="block text-sm font-semibold text-slate-200">
              University email
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-lg border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none focus:border-cyan-300"
                placeholder="you@campus.edu"
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-cyan-400 px-4 py-3 text-slate-900 font-semibold transition hover:bg-cyan-300 disabled:opacity-70"
            >
              {loading ? "Sending…" : "Send code"}
            </button>
          </form>
        )}

        {stage === "otp" && (
          <form className="mt-6 space-y-4" onSubmit={handleOtpSubmit}>
            <label className="block text-sm font-semibold text-slate-200">
              6-digit code
              <input
                type="text"
                pattern="[0-9]{6}"
                maxLength={6}
                inputMode="numeric"
                required
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
                className="mt-2 w-full rounded-lg border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none focus:border-cyan-300 tracking-[0.5em] text-center"
                placeholder="000000"
              />
            </label>
            {previewCode && (
              <p className="text-xs text-slate-400">
                Dev preview code: <span className="font-mono text-cyan-200">{previewCode}</span>
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-white px-4 py-3 text-slate-900 font-semibold transition hover:bg-slate-200 disabled:opacity-70"
            >
              {loading ? "Verifying…" : "Verify and continue"}
            </button>
            <button
              type="button"
              onClick={() => {
                setStage("email");
                setOtp("");
              }}
              className="w-full text-center text-sm text-slate-400 underline"
            >
              Use a different email
            </button>
          </form>
        )}

        {stage === "success" && (
          <div className="mt-8 text-center text-base text-cyan-100">
            Verified! Sending you to the next available student…
          </div>
        )}
      </div>
    </main>
  );
}
