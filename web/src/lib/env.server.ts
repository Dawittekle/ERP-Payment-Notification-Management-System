const required = [
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
];

required.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`[env] Missing required server env: ${key}`);
  }
});

const parseDomains = (raw?: string) => {
  if (!raw) return [] as string[];
  return raw
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
};

export const serverEnv = {
  supabaseUrl: process.env.SUPABASE_URL ?? "",
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  otpSecret: process.env.OTP_SECRET ?? "campus-shuffle",
  allowedEmailDomains: parseDomains(process.env.ALLOWED_EMAIL_DOMAINS),
  otpTtlMinutes: Number(process.env.OTP_TTL_MINUTES ?? 10),
  sessionTtlHours: Number(process.env.SESSION_TTL_HOURS ?? 12),
};
