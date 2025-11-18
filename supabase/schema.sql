create extension if not exists "pgcrypto";

create table if not exists public.user_verifications (
  id uuid primary key default gen_random_uuid(),
  email_hash text unique not null,
  otp_hash text,
  otp_expires_at timestamptz,
  verified boolean not null default false,
  session_token text,
  session_token_expires_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists user_verifications_session_idx on public.user_verifications (session_token);
create index if not exists user_verifications_email_idx on public.user_verifications (email_hash);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_hash text not null,
  reported_hash text not null,
  reason text not null,
  chat_context text,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists reports_reporter_idx on public.reports (reporter_hash);
create index if not exists reports_reported_idx on public.reports (reported_hash);
