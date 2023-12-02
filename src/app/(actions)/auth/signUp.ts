"use server";
import schema from "@/components/islets/auth/new-account-form-schema";
import prisma from "@/lib/prismaClient";
import { randomUUID } from "crypto";
import { type z } from "zod";
import bcrypt from "bcrypt";

type FormState = z.infer<typeof schema>;
export default async function signUp(formState: FormState) {
  try {
    const { email, login, password } = formState;
    const isUserWithCurrentEmail = await prisma.account.findUnique({
      where: {
        email,
      },
    });
    const isUserWithCurrentLogin = await prisma.user.findUnique({
      where: {
        username: login,
      },
    });
    if (isUserWithCurrentEmail || isUserWithCurrentLogin) {
      return { ok: false, error: "User already exists", user: null };
    }
    const account = await prisma.account.create({
      data: {
        userId: randomUUID(),
        password: bcrypt.hashSync(password, 10),
        email,
      },
    });
    const user = await prisma.user.create({
      data: {
        username: login,
        accountId: account.id,
      },
    });

    return { ok: true, user, error: false };
  } catch (error) {
    throw { ok: false, error, user: null };
  }
}
