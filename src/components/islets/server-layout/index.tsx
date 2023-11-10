import { PropsWithChildren } from "react";
import ServerSidebar from "../server-sidebar";

export default function ServerLayout({ children }: PropsWithChildren) {
  return (
    <>
      <ServerSidebar />
      {children}
    </>
  );
}
