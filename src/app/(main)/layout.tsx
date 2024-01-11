import { FriendsTabEnum } from "@/components/islets/friend-list/friend-tabs";
import CommonLayout from "@/components/layout/common-layout";
import Notifications from "@/components/providers/Notifications";
import authOptions from "@/lib/authOptions";
import prisma from "@/lib/prismaClient";
import {
  HydrationBoundary,
  dehydrate,
  type QueryClient,
} from "@tanstack/react-query";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PropsWithChildren, ReactNode } from "react";
import getQueryClient from "../getQueryClient";

const setNotificationState = async (client: QueryClient, userId: string) => {
  const friendInvites = await prisma.request.findMany({
    where: {
      addresseeId: userId,
    },
  });
  client.setQueryData(["friends-list", FriendsTabEnum.Pending], friendInvites);
};

export default async function Layout({
  children,
  userSettings,
}: PropsWithChildren<{ userSettings: ReactNode }>) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/signIn");
  }
  const queryClient = getQueryClient();
  await setNotificationState(queryClient, session.user.id);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CommonLayout />
      <Notifications />
      {children}
      {userSettings}
    </HydrationBoundary>
  );
}
