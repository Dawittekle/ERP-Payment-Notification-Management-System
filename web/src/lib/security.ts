import crypto from "crypto";
import { serverEnv } from "@/lib/env.server";

export const hashString = (value: string) =>
  crypto.createHash("sha256").update(value).digest("hex");

export const secureHashWithSecret = (value: string) =>
  hashString(`${value}.${serverEnv.otpSecret}`);

export const hashOtp = (emailHash: string, otp: string) =>
  secureHashWithSecret(`${emailHash}:${otp}`);

export const secureCompare = (a?: string | null, b?: string | null) =>
  a && b ? crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b)) : false;

export const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();
