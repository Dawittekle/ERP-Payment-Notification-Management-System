import Link from "next/link";

const features = [
  {
    title: "University-only access",
    body: "Email OTP flow verifies that every user holds an active .edu or .ac address.",
  },
  {
    title: "Anonymous by default",
    body: "We only store hashed email identifiers needed for moderation. No chat logs, ever.",
  },
  {
    title: "Realtime video + text",
    body: "Peer-to-peer WebRTC streams with socket.io signaling keeps latency low.",
  },
];

const steps = [
  "Verify your campus email",
  "Join the matchmaking queue",
  "Use Next to skip / Report to flag",
];

export default function Home() {
  return (
    <main className="relative isolate min-h-screen px-4 py-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 text-slate-100">
        <section className="glass-surface px-8 py-10">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
            Campus Shuffle
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
            Anonymous 1-on-1 chats for verified university students.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Match with another student instantly, hop on video, keep things respectful.
            No accounts, no history, just a lightweight queue with privacy guardrails.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/verify"
              className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-300"
            >
              Verify your email
            </Link>
            <Link
              href="/chat"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/60"
            >
              Jump to chat
            </Link>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="glass-surface px-6 py-6">
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{feature.body}</p>
            </article>
          ))}
        </section>

        <section className="glass-surface px-6 py-6">
          <h2 className="text-xl font-semibold text-white">How it works</h2>
          <ol className="mt-4 grid gap-4 text-slate-300 sm:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step} className="rounded-2xl border border-white/10 px-4 py-5">
                <span className="text-sm uppercase tracking-widest text-cyan-200">
                  Step {index + 1}
                </span>
                <p className="mt-2 text-base text-white">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
