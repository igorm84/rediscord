import UserSettingsModalContent from "./user-settings-modal-content";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prismaClient";
import authOptions from "@/lib/authOptions";
import getQueryClient from "@/app/getQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

const getUserData = async (accountId: string) => {
  try {
    const account = await prisma.account.findUnique({
      where: {
        id: accountId,
      },
      include: {
        user: true,
      },
    });
    return account;
  } catch (error) {
    throw new Error(error as string);
  }
};

export default async function UserSettings() {
  const queryClient = getQueryClient();
  const session = await getServerSession(authOptions);
  const userData = await getUserData(session?.user?.accountId!);
  queryClient.setQueryData(["user-info", session?.user?.id], userData);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserSettingsModalContent />
    </HydrationBoundary>
  );
}
