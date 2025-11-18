import { z } from "zod";

export const emailSchema = z
  .string({ required_error: "Email is required" })
  .trim()
  .email("Must be a valid email address")
  .refine((value) => /\.(edu|ac)(\.[a-z]{2})?$/.test(value.toLowerCase()), {
    message: "Only university domains (.edu / .ac) are allowed",
  });

export const otpSchema = z
  .string({ required_error: "OTP is required" })
  .regex(/^[0-9]{6}$/g, "OTP must be a 6 digit code");

export const reportSchema = z.object({
  reason: z
    .string({ required_error: "Reason is required" })
    .trim()
    .min(3, "Reason too short")
    .max(240, "Reason too long"),
  chatContext: z.string().trim().max(500).optional(),
});
