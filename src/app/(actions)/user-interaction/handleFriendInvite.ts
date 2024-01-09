"use server";

import authOptions from "@/lib/authOptions";
import prisma from "@/lib/prismaClient";
import { getServerSession } from "next-auth";

type FriendInviteState = {
  status: "success" | "error";
  message: string;
};

export default async function handleFriendInvite({
  userId,
  accept,
}: {
  userId: string;
  accept: boolean;
}): Promise<FriendInviteState> {
  const session = await getServerSession(authOptions);
  // Check is it a valid invite
  const invite = await prisma.request.findFirst({
    where: {
      requesterId: userId,
      addresseeId: session?.user?.id,
    },
  });
  if (invite && accept) {
    // Make connection between two users
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        friends: {
          connect: [{ id: session?.user?.id }],
        },
      },
    });
    await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        friends: {
          connect: [{ id: userId }],
        },
      },
    });
    await prisma.request.delete({ where: { id: invite.id } });
    return { status: "success", message: "Invite has accepted!" };
  } else if (invite) {
    await prisma.request.delete({ where: { id: invite.id } });
    return { status: "success", message: "Invite has declined!" };
  }

  return { status: "error", message: "Something went wrong..." };
}
