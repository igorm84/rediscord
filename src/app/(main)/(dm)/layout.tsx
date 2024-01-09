import getQueryClient from "@/app/getQueryClient";
import DMLayout from "@/components/islets/dm-layout";
import { FriendsTabEnum } from "@/components/islets/friend-list/friend-tabs";
import authOptions from "@/lib/authOptions";
import prisma from "@/lib/prismaClient";
import { delay } from "@/lib/utils";
import { MOCK_DELAY } from "@/lib/utils/mock";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getServerSession } from "next-auth/next";

const getFriends = async () => {
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    select: {
      friends: true,
    },
  });

  await delay(MOCK_DELAY);
  return { friends: user?.friends || [] };
};

export default async function SuspendedDMLayout({
  children,
}: React.PropsWithChildren) {
  const queryClient = getQueryClient();
  const session = await getServerSession(authOptions);
  const { friends } = await getFriends();

  queryClient.setQueryData(["user-from-server"], session?.user);
  queryClient.setQueryData(["friends-list", FriendsTabEnum.Available], friends);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DMLayout>{children}</DMLayout>
    </HydrationBoundary>
  );
}
