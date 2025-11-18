import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Campus Shuffle | Anonymous Uni Chat",
  description:
    "Anonymous 1-on-1 video and text chat built exclusively for university students.",
  metadataBase: new URL("https://aau-omegle.vercel.app"),
  openGraph: {
    title: "Campus Shuffle",
    description:
      "Privacy-first random chat for verified university students with video + text.",
    url: "https://aau-omegle.vercel.app",
    siteName: "Campus Shuffle",
    images: [
      {
        url: "https://aau-omegle.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "Campus Shuffle preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Campus Shuffle",
    description:
      "Anonymous random matching built for .edu email addresses only.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-slate-950">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-slate-100`}
      >
        <div className="noise-bg" aria-hidden />
        {children}
      </body>
    </html>
  );
}
