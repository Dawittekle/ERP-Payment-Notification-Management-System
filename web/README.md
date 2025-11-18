# Web (Next.js) – Campus Shuffle

This package contains the Next.js 14 application that powers the landing, verification, and chat experience.

## Available scripts

```bash
npm run dev     # start Next.js locally
npm run build   # production build
npm run start   # serve built app
npm run lint    # lint
```

## Environment

Create `web/.env.local` with the variables documented in the repo root `.env.example`:

```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
OTP_SECRET=
ALLOWED_EMAIL_DOMAINS=.edu,.ac.uk
OTP_TTL_MINUTES=10
SESSION_TTL_HOURS=12
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
NEXT_PUBLIC_OTP_TTL_MINUTES=10
```

## Key routes & components

- `src/app/page.tsx` – marketing landing page
- `src/app/verify/page.tsx` – OTP email verification
- `src/app/chat/page.tsx` – WebRTC video + text chat UI
- `src/app/api/auth/*` – OTP + session routes backed by Supabase
- `src/app/api/report/route.ts` – moderation reports
- `src/lib/*` – Supabase admin client, validation helpers, session storage

## WebRTC & signaling

The chat page expects the standalone Socket.IO server (`../server`) to be running. Configure `NEXT_PUBLIC_SOCKET_URL` to whichever host you deploy that server to.
