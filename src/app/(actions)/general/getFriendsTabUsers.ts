"use server";

import { FriendsTabEnum } from "@/components/islets/friend-list/friend-tabs";
import authOptions from "@/lib/authOptions";
import prisma from "@/lib/prismaClient";
import { getServerSession } from "next-auth";

export default async function getFriendsTabUsers({
  tab,
}: {
  tab: FriendsTabEnum;
}) {
  const session = await getServerSession(authOptions);
  switch (tab) {
    case FriendsTabEnum.Available:
      return (
        await prisma.user.findUnique({
          where: { id: session?.user?.id },
          select: {
            friends: true
          },
        })
      )?.friends;
    case FriendsTabEnum.Pending:
      return (
        await prisma.user.findUnique({
          where: {
            id: session?.user?.id,
          },
          select: {
            recivedFriendRequest: {
              select: {
                requester: true,
              },
            },
          },
        })
      )?.recivedFriendRequest.map((req) => req.requester);
    default:
      return [];
  }
}
