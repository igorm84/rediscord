import prisma from "@/lib/prismaClient";
import NextAuth from "next-auth";
import type { AuthOptions, Session } from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { revalidatePath } from "next/cache";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        emailOrPhone: {},
        password: {},
      },
      async authorize(credentials, req,) {
        if (credentials) {
          const isPhone = /^\d+$/.test(credentials.emailOrPhone);
          const user = await prisma.account.findUnique({
            where: isPhone
              ? {
                  phone: credentials.emailOrPhone,
                }
              : {
                  email: credentials.emailOrPhone,
                },
          });
          if (user) {
            const validPassword = bcrypt.compareSync(
              credentials.password,
              user.password,
            );
            if (validPassword) {
              return user;
            }
            throw new Error(
              `Invalid ${isPhone ? "phone number" : "email"} or password`,
            );
          }
        } 
        throw new Error("Invalid credentials")
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({session, token}) {
      if (token && session.user) {
        session.user = token.user as Session["user"];
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
