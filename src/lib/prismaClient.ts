import { PrismaClient } from "@prisma/client";
// @ts-ignore its ok
const prisma: PrismaClient = globalThis.prisma || new PrismaClient();
// @ts-ignore its ok
if (process.env.NODE_ENV === "production") globalThis.prisma = prisma;

export default prisma;