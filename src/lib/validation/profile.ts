import { z } from "zod";

export const MIN_NAME_LENGTH = 4;
export const MIN_USERNAME_LENGTH = 4;

export const profileSchema = z.object({
  display_name: z
    .string()
    .min(MIN_NAME_LENGTH, { message: "Name is too short" }),
  username: z
    .string()
    .min(MIN_USERNAME_LENGTH, { message: "Username is too short" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can contains only alphanumeric and _",
    }),
  bio: z.string().max(160, { message: "Bio is too long" }),
});
