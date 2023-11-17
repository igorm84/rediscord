import Header from "@/components/layout/header";
import FindSomethingButton from "../find-chat-button";
import DMHeaderMenu from "../dm-header-menu";
import { Suspense } from "react";
import DMChatListSkeleton from "../dm-chat-list/dm-chat-list-skeleton";
import DMChatList from "../dm-chat-list";
import { ViewportType } from "@/state/viewport-type";

export default function DMLayoutSidebarContent({
  viewportType,
  children,
}: {
  children: React.ReactNode;
  viewportType?: ViewportType;
}) {
  return (
    <>
      <Header verticalPadding="2" className="bg-midground">
        <FindSomethingButton text="Find chats" />
      </Header>
      <div className="hover-scrollbar flex-1 overflow-y-auto py-2 pl-2 pr-0.5">
        {viewportType !== "mobile" && <DMHeaderMenu />}
        <Suspense fallback={<DMChatListSkeleton />}>
          <DMChatList />
        </Suspense>
      </div>
      {children}
    </>
  );
}
