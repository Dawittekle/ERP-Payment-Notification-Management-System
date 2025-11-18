# Campus Shuffle (AAU Omegle clone)

Privacy-first Omegle-style MVP where only verified university students (.edu / .ac domains) can join an anonymous 1:1 text + video chat.

## Stack

- **Frontend** – Next.js 14 (App Router), TailwindCSS, WebRTC, Socket.IO client
- **Backend APIs** – Next.js Route Handlers for OTP auth + reporting
- **Realtime Signaling** – Dedicated Node/Express + Socket.IO server (`server/`)
- **Database** – Supabase (PostgreSQL) with two tables: `user_verifications`, `reports`
- **Hosting Targets** – Vercel (web), Railway/Render (signaling), Supabase (DB)

## Project layout

```
AAU-Omegle/
├─ web/            # Next.js application
├─ server/         # Socket.IO signaling service
├─ supabase/       # SQL schema for Supabase
├─ .env.example    # Shared env vars
└─ README.md
```

## Getting started locally

1. **Install dependencies**
   ```bash
   cd web && npm install
   cd ../server && npm install
   ```
2. **Create Supabase project**
   - Run `supabase/schema.sql` inside the SQL editor (or `psql`).
   - Copy `SUPABASE_URL` and `SERVICE_ROLE_KEY`.
3. **Configure environment**
   ```bash
   cp .env.example .env.local         # for Next.js
   cp .env.example server/.env        # for signaling server
   ```
   Update the copies with Supabase keys and optional domain allow-list.
4. **Run everything**
   ```bash
   # terminal 1
   cd server && npm run dev

   # terminal 2
   cd web && npm run dev
   ```
   Visit http://localhost:3000.

## Feature highlights

- OTP email verification restricted to university domains
- Anonymous queue with `Match`, `Next`, and moderation report flow
- WebRTC text (data channel) + video chat, no recordings or storage
- Supabase stores only hashed identifiers and moderation events
- Deployment-ready configs for Vercel + Railway/Render + Supabase

## Deployment pointers

- Deploy `web/` to **Vercel** (set env vars in dashboard)
- Deploy `server/` to **Railway** or **Render**; expose `PORT` and point `NEXT_PUBLIC_SOCKET_URL`
- Provision Supabase and apply `supabase/schema.sql`
- Set `CLIENT_ORIGIN` on the server to your Vercel domain and update `NEXT_PUBLIC_SOCKET_URL` accordingly

See the repo root `.env.example` for every variable you need in each environment.
