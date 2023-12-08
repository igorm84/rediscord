import { z } from "zod";

export const password = z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must not exceed 20 characters" })
    .refine((v) => /[A-Z]/.test(v), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((v) => /[a-z]/.test(v), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((v) => /[0-9]/.test(v), {
      message: "Password must contain at least one number",
    })
    .refine((v) => /[^a-zA-Z0-9]/.test(v), {
      message: "Password must contain at least one special character",
    })
    .describe("Enter a password")