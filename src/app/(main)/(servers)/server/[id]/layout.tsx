import ServerLayout from "@/components/islets/server-layout";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ServerLayout>
      {children}
    </ServerLayout>
  );
}
