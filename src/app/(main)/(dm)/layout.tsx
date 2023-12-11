import getQueryClient from "@/app/getQueryClient";
import DMLayout from "@/components/islets/dm-layout";
import authOptions from "@/lib/authOptions";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getServerSession } from "next-auth/next";

export default async function SuspendedDMLayout({
  children,
}: React.PropsWithChildren) {
  const queryClient = getQueryClient();
  const session = await getServerSession(authOptions);
  queryClient.setQueryData(["user-from-server"], session?.user);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DMLayout>{children}</DMLayout>
    </HydrationBoundary>
  );
}
