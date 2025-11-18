import "dotenv/config";
import cors from "cors";
import express, { Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import { createClient } from "@supabase/supabase-js";

const PORT = Number(process.env.PORT ?? 4000);
const CLIENT_ORIGINS = (process.env.CLIENT_ORIGIN ?? "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim());

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing Supabase credentials for signaling server");
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } },
);

const app = express();
app.use(cors({ origin: CLIENT_ORIGINS }));
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => res.json({ ok: true }));

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_ORIGINS,
    methods: ["GET", "POST"],
  },
});

type SocketContext = {
  emailHash: string;
  sessionToken: string;
};

const waitingQueue: Array<{ socketId: string } & SocketContext> = [];
const activePairs = new Map<string, string>();
const users = new Map<string, SocketContext>();

const removeFromQueue = (socketId: string) => {
  const index = waitingQueue.findIndex((entry) => entry.socketId === socketId);
  if (index >= 0) {
    waitingQueue.splice(index, 1);
  }
};

const validateSession = async (token: string) => {
  const { data, error } = await supabase
    .from("user_verifications")
    .select("email_hash, session_token_expires_at")
    .eq("session_token", token)
    .eq("verified", true)
    .maybeSingle();

  if (error || !data) return null;
  if (!data.session_token_expires_at) return null;
  if (new Date(data.session_token_expires_at).getTime() < Date.now()) return null;
  return data.email_hash as string;
};

const pairUsers = () => {
  while (waitingQueue.length >= 2) {
    const first = waitingQueue.shift();
    const second = waitingQueue.shift();
    if (!first || !second) return;

    activePairs.set(first.socketId, second.socketId);
    activePairs.set(second.socketId, first.socketId);

    io.to(first.socketId).emit("match_found", {
      partnerId: second.socketId,
      partnerHash: second.emailHash,
      initiator: true,
    });

    io.to(second.socketId).emit("match_found", {
      partnerId: first.socketId,
      partnerHash: first.emailHash,
      initiator: false,
    });
  }
};

const requeueUser = (socketId: string) => {
  const context = users.get(socketId);
  if (!context) return;
  removeFromQueue(socketId);
  waitingQueue.push({ socketId, ...context });
  pairUsers();
};

io.on("connection", (socket) => {
  console.log(`socket connected: ${socket.id}`);

  socket.on("join_queue", async ({ token }) => {
    if (!token || typeof token !== "string") {
      socket.emit("queue_error", "Missing token");
      return;
    }

    const emailHash = await validateSession(token);
    if (!emailHash) {
      socket.emit("queue_error", "Session invalid");
      return;
    }

    users.set(socket.id, { emailHash, sessionToken: token });
    removeFromQueue(socket.id);

    if (activePairs.has(socket.id)) {
      return; // already paired
    }

    waitingQueue.push({ socketId: socket.id, emailHash, sessionToken: token });
    pairUsers();
  });

  socket.on("leave_queue", () => {
    removeFromQueue(socket.id);
  });

  socket.on("skip_partner", () => {
    const partnerId = activePairs.get(socket.id);
    if (partnerId) {
      activePairs.delete(socket.id);
      activePairs.delete(partnerId);
      io.to(partnerId).emit("partner_skipped");
      requeueUser(partnerId);
    }
    requeueUser(socket.id);
  });

  socket.on("signal", (payload) => {
    if (!payload?.to) return;
    io.to(payload.to).emit("signal", {
      from: socket.id,
      description: payload.description,
      candidate: payload.candidate,
    });
  });

  socket.on("disconnect", () => {
    console.log(`socket disconnected: ${socket.id}`);
    removeFromQueue(socket.id);
    const partnerId = activePairs.get(socket.id);
    if (partnerId) {
      activePairs.delete(socket.id);
      activePairs.delete(partnerId);
      io.to(partnerId).emit("partner_left");
      requeueUser(partnerId);
    }
    users.delete(socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`signaling server ready on :${PORT}`);
});
