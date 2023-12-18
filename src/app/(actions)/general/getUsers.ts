"use server";

import prisma from "@/lib/prismaClient";
import { Prisma } from "@prisma/client";

export default async function getUsersGeneral<
  T extends Prisma.UserFindManyArgs,
>(filterOptions: T) {
  try {
    const users = await prisma.user.findMany({ ...filterOptions });
    return users;
  } catch (error) {
    throw new Error(error as string);
  }
}
