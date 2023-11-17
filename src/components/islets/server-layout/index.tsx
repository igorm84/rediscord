import { PropsWithChildren } from "react";
import ServerSidebar from "../server-sidebar";
import ServerSidebarWrapper from "../server-sidebar/server-sidebar-wrapper";

export default function ServerLayout({ children }: PropsWithChildren) {
  return (
    <>
      <ServerSidebarWrapper>
        <ServerSidebar />
      </ServerSidebarWrapper>
      {children}
    </>
  );
}
