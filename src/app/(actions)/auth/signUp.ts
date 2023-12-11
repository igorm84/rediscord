"use server";
import schema from "@/components/islets/auth/new-account-form-schema";
import prisma from "@/lib/prismaClient";
import { randomUUID } from "crypto";
import { type z } from "zod";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { User } from "@prisma/client";

type FormState = z.infer<typeof schema>;
type ResultWithError = {
  ok: false;
  error: unknown;
};
type ResultWithUser = {
  ok: true;
  user: User;
};
type SignUpResult = ResultWithError | ResultWithUser;

export default async function signUp(
  formState: FormState,
): Promise<SignUpResult> {
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
      return { ok: false, error: "User already exists"};
    }
    const account = await prisma.account.create({
      data: {
        userId: randomUUID(),
        password: bcrypt.hashSync(password.trim(), 10),
        email,
      },
    });
    const user = await prisma.user.create({
      data: {
        username: login,
        accountId: account.id,
      },
    });
    revalidatePath("/signUp");
    return { ok: true, user };
  } catch (error) {
    throw { ok: false, error };
  }
}