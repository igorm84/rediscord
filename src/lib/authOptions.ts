import type { AuthOptions, Session } from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prismaClient";
import { experimental_taintObjectReference } from "react";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        emailOrPhone: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials) {
          const isPhone = /^\d+$/.test(credentials.emailOrPhone);
          const account = await prisma.account.findUnique({
            where: isPhone
              ? {
                  phone: credentials.emailOrPhone,
                }
              : {
                  email: credentials.emailOrPhone,
                },
          });
          if (account) {
            const validPassword = bcrypt.compareSync(
              credentials.password,
              account.password,
            );
            if (validPassword) {
              try {
                const user = await prisma.user.findUnique({
                  where: {
                    accountId: account.id,
                  },
                });
                return user;
              } catch (error) {
                throw new Error("Invalid credentials");
              }
            }
            throw new Error(
              `Invalid ${isPhone ? "phone number" : "email"} or password`,
            );
          }
        }
        throw new Error("Invalid credentials");
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        token.user = {
          ...session.user,
        };
        return token;
      }
      if (user) {
        token.user = {
          ...user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user as Session["user"];
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
// experimental_taintObjectReference(
//   "Configuration cannot be passed to the client",
//   authOptions,
// );
export default authOptions;
