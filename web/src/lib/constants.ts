export const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:4000";

export const DEFAULT_ICE_SERVERS: RTCIceServer[] = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
];

export const OTP_EXPIRY_MINUTES = Number(
  process.env.NEXT_PUBLIC_OTP_TTL_MINUTES ?? 10,
);
