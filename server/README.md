# Socket.IO signaling server

Realtime matchmaking + WebRTC signaling for Campus Shuffle.

## Scripts

```bash
npm run dev    # tsx watch mode
npm run build  # tsc compile to dist/
npm run start  # run compiled server
```

## Env vars

```
PORT=4000
CLIENT_ORIGIN=http://localhost:3000
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

`CLIENT_ORIGIN` can be a comma-separated list of allowed frontends.

## Endpoints & events

- `GET /health` – basic probe
- Socket events:
  - `join_queue` `{ token }` – enqueue a verified student
  - `match_found` – sent to both peers with `{ partnerId, partnerHash, initiator }`
  - `signal` – offer/answer/ICE payload relay
  - `skip_partner` / `partner_skipped`
  - `partner_left` – remote disconnected

Supabase is only used server-side to verify session tokens; no personal data leaves hashed identifiers.
