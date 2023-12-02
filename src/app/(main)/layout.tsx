import CommonLayout from "@/components/layout/common-layout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PropsWithChildren, ReactNode } from "react";

export default async function Layout({
  children,
  userSettings,
}: PropsWithChildren<{ userSettings: ReactNode }>) {
  const session = await getServerSession();
  if (!session?.user) {
    redirect("/signIn");
  }

  return (
    <>
      <CommonLayout />
      {children}
      {userSettings}
    </>
  );
}
