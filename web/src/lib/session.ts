export type SessionPayload = {
  token: string;
  emailHash: string;
  expiresAt: string;
};

const STORAGE_KEY = "campus-shuffle-session";

export const saveSession = (payload: SessionPayload) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
};

export const loadSession = (): SessionPayload | null => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as SessionPayload;
    if (new Date(parsed.expiresAt).getTime() < Date.now()) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch (error) {
    console.error("session parse error", error);
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export const clearSession = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
};
