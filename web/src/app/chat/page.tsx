"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { DEFAULT_ICE_SERVERS, SOCKET_URL } from "@/lib/constants";
import { clearSession, loadSession, SessionPayload } from "@/lib/session";
import { postJSON } from "@/lib/api";
import type { MatchPayload, SignalPayload, TextMessage } from "@/types/chat";

const initialStatus = "Tap match to start";

const buildMessageId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export default function ChatPage() {
  const router = useRouter();
  const [session, setSession] = useState<SessionPayload | null>(null);
  const [status, setStatus] = useState(initialStatus);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<TextMessage[]>([]);
  const [reportReason, setReportReason] = useState("");
  const [reporting, setReporting] = useState(false);
  const [searching, setSearching] = useState(false);
  const [remoteHash, setRemoteHash] = useState<string | null>(null);

  const socketRef = useRef<Socket | null>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const partnerRef = useRef<string | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  // hydrate session
  useEffect(() => {
    const stored = loadSession();
    if (!stored) {
      router.replace("/verify");
      return;
    }
    setSession(stored);
  }, [router]);

  // validate session server-side once
  useEffect(() => {
    if (!session) return;
    (async () => {
      try {
        await postJSON("/api/auth/session", { token: session.token });
      } catch (err) {
        console.error(err);
        clearSession();
        router.replace("/verify");
      }
    })();
  }, [session, router]);

  // prepare media
  useEffect(() => {
    const setupMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
          audio: true,
        });
        localStreamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("media permission error", error);
        setError("Camera & microphone access are required");
      }
    };
    setupMedia();

    return () => {
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
      remoteStreamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  // setup socket connection
  useEffect(() => {
    if (!session) return;
    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
    });
    socketRef.current = socket;

    const joinQueue = () => {
      if (!session) return;
      setSearching(true);
      setStatus("Searching for another student…");
      socket.emit("join_queue", { token: session.token });
    };

    const leaveQueue = () => {
      socket.emit("leave_queue");
      setSearching(false);
    };

    socket.on("connect", () => {
      console.info("socket connected");
    });

    socket.on("match_found", async (payload: MatchPayload) => {
      setStatus("Connected to a student");
      setSearching(false);
      setRemoteHash(payload.partnerHash);
      partnerRef.current = payload.partnerId;
      await createPeerConnection(payload.initiator);
      if (payload.initiator) {
        await createOffer();
      }
    });

    socket.on("signal", async (payload: SignalPayload) => {
      if (!peerRef.current) return;
      if (payload.description) {
        await peerRef.current.setRemoteDescription(payload.description);
        if (payload.description.type === "offer") {
          await peerRef.current.setLocalDescription(await peerRef.current.createAnswer());
          socket.emit("signal", {
            to: payload.from,
            description: peerRef.current.localDescription,
          });
        }
      } else if (payload.candidate) {
        try {
          await peerRef.current.addIceCandidate(payload.candidate);
        } catch (candidateError) {
          console.error(candidateError);
        }
      }
    });

    socket.on("partner_left", () => {
      setStatus("Partner disconnected. Tap match to find another.");
      resetConnection();
    });

    socket.on("partner_skipped", () => {
      setStatus("Partner skipped. Searching again…");
      resetConnection(false);
      joinQueue();
    });

    socket.on("connect_error", (err) => {
      setError(err.message);
    });

    socket.on("queue_error", (message: string) => {
      setError(message);
      setSearching(false);
      setStatus(initialStatus);
    });

    const handleVisibility = () => {
      if (document.hidden) {
        leaveQueue();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      leaveQueue();
      socket.disconnect();
      resetConnection();
    };
  }, [session, createPeerConnection, createOffer]);

  const appendMessage = useCallback(
    (message: Omit<TextMessage, "id" | "timestamp">) => {
      setMessages((prev) => [
        ...prev,
        {
          id: buildMessageId(),
          timestamp: Date.now(),
          ...message,
        },
      ]);
    },
    [],
  );

  const resetConnection = (clearQueue = true) => {
    partnerRef.current = null;
    setRemoteHash(null);
    dataChannelRef.current?.close();
    dataChannelRef.current = null;
    peerRef.current?.close();
    peerRef.current = null;
    if (clearQueue) {
      setSearching(false);
      setStatus(initialStatus);
    }
    remoteStreamRef.current = null;
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
    setMessages([]);
  };

  const createPeerConnection = useCallback(
    async (isInitiator: boolean) => {
      const pc = new RTCPeerConnection({ iceServers: DEFAULT_ICE_SERVERS });
      peerRef.current = pc;

      localStreamRef.current?.getTracks().forEach((track) => {
        const stream = localStreamRef.current;
        if (!stream) return;
        pc.addTrack(track, stream);
      });

      pc.onicecandidate = (event) => {
        if (!event.candidate || !socketRef.current || !partnerRef.current) return;
        socketRef.current.emit("signal", {
          to: partnerRef.current,
          candidate: event.candidate,
        });
      };

      pc.ontrack = (event) => {
        if (!remoteVideoRef.current) return;
        const [stream] = event.streams;
        remoteStreamRef.current = stream;
        remoteVideoRef.current.srcObject = stream;
      };

      if (isInitiator) {
        dataChannelRef.current = pc.createDataChannel("chat");
        wireDataChannel(dataChannelRef.current);
      } else {
        pc.ondatachannel = (event) => {
          dataChannelRef.current = event.channel;
          wireDataChannel(event.channel);
        };
      }
    },
    [wireDataChannel],
  );

  const createOffer = useCallback(async () => {
    if (!peerRef.current || !socketRef.current || !partnerRef.current) return;
    const offer = await peerRef.current.createOffer();
    await peerRef.current.setLocalDescription(offer);
    socketRef.current.emit("signal", {
      to: partnerRef.current,
      description: offer,
    });
  }, []);

  const wireDataChannel = useCallback(
    (channel: RTCDataChannel) => {
      channel.onmessage = (event) => {
        appendMessage({ author: "stranger", body: event.data });
      };
      channel.onopen = () => {
        setStatus("Connected");
      };
      channel.onclose = () => {
        console.info("data channel closed");
      };
    },
    [appendMessage],
  );

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const body = String(formData.get("message") ?? "").trim();
    if (!body) return;
    if (dataChannelRef.current?.readyState === "open") {
      dataChannelRef.current.send(body);
      appendMessage({ author: "you", body });
    }
    form.reset();
  };

  const handleMatchClick = () => {
    if (!session || !socketRef.current) return;
    setMessages([]);
    setError(null);
    setSearching(true);
    setStatus("Searching for another student…");
    socketRef.current.emit("join_queue", { token: session.token });
  };

  const handleSkip = () => {
    if (!socketRef.current || !session) return;
    socketRef.current.emit("skip_partner");
    resetConnection(false);
    setStatus("Skipping… requeueing");
    socketRef.current.emit("join_queue", { token: session.token });
  };

  const handleReport = async () => {
    if (!session || !remoteHash) return;
    setReporting(true);
    try {
      await postJSON("/api/report", {
        reporterToken: session.token,
        reportedHash: remoteHash,
        reason: reportReason.trim(),
      });
      setReportReason("");
      setStatus("Report submitted. Searching again…");
      handleSkip();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to report");
    } finally {
      setReporting(false);
    }
  };

  const partnerState = useMemo(() => {
    if (searching) return "Searching…";
    if (remoteHash) return "Connected";
    return "Idle";
  }, [searching, remoteHash]);

  return (
    <main className="min-h-screen px-4 py-6">
      <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-[2fr,1fr]">
        <section className="glass-surface px-4 py-4 sm:px-8 sm:py-6">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-cyan-200">
                Status
              </p>
              <p className="text-lg font-medium text-white">{status}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleMatchClick}
                className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-900"
              >
                {searching ? "Searching…" : "Match"}
              </button>
              <button
                onClick={handleSkip}
                className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white"
              >
                Next
              </button>
            </div>
          </header>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="h-64 w-full rounded-2xl border border-white/10 bg-slate-900/40 object-cover video-mirror"
            />
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="h-64 w-full rounded-2xl border border-white/10 bg-slate-900/40 object-cover"
            />
          </div>

          <form className="mt-6 flex gap-3" onSubmit={handleSendMessage}>
            <input
              name="message"
              placeholder="Send a message"
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-200"
            />
            <button
              type="submit"
              className="rounded-xl bg-white px-4 py-3 text-slate-900 font-semibold"
            >
              Send
            </button>
          </form>

          <div className="mt-4 h-48 overflow-y-auto rounded-xl border border-white/5 bg-slate-900/30 p-4 text-sm">
            {messages.length === 0 && (
              <p className="text-slate-500">Say hi to break the ice.</p>
            )}
            {messages.map((message) => (
              <p key={message.id} className="mb-2">
                <span className="font-semibold text-cyan-200">{message.author === "you" ? "You" : "Stranger"}:</span>
                <span className="ml-2 text-slate-100">{message.body}</span>
              </p>
            ))}
          </div>
        </section>

        <aside className="glass-surface px-6 py-6">
          <h2 className="text-lg font-semibold text-white">Session</h2>
          <p className="text-sm text-slate-400">{partnerState}</p>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-xs text-slate-300">
            <p>Your email hash</p>
            <p className="font-mono text-cyan-200 break-all">{session?.emailHash}</p>
          </div>
          <div className="mt-4">
            <label className="text-sm font-semibold text-white">Report</label>
            <textarea
              rows={4}
              value={reportReason}
              onChange={(event) => setReportReason(event.target.value)}
              placeholder="Describe what happened"
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none focus:border-red-300"
            />
            <button
              onClick={handleReport}
              disabled={!remoteHash || reportReason.trim().length < 5 || reporting}
              className="mt-3 w-full rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              {reporting ? "Sending…" : "Report peer"}
            </button>
          </div>
          <button
            onClick={() => {
              clearSession();
              router.replace("/verify");
            }}
            className="mt-6 w-full text-left text-xs text-slate-400 underline"
          >
            Not you? Reset verification
          </button>
          {error && <p className="mt-4 text-xs text-red-400">{error}</p>}
        </aside>
      </div>
    </main>
  );
}
