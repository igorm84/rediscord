import { Prisma } from "@prisma/client"
import NextAuth from "next-auth"

declare module "next-auth" {

  interface Session {
    user: Prisma.UserGetPayload<Prisma.User> | null
  }
}