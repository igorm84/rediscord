import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import VoiceStatusFooter from "@/components/islets/voice-status-footer";
import dynamic from "next/dynamic";
import ActiveNowPanelSkeleton from "../active-now-panel/active-now-panel-skeleton";
import { Suspense } from "react";
import DMChatListSkeleton from "../dm-chat-list/dm-chat-list-skeleton";
import DMChatList from "../dm-chat-list";
import DMHeaderMenu from "../dm-header-menu";
import FindSomethingButton from "@/components/islets/find-chat-button";

const ActiveNowPanel = dynamic(() => import("../active-now-panel"), {
  ssr: false,
  loading: () => <ActiveNowPanelSkeleton />,
});

export default function DMLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Sidebar className="bottom-70 flex flex-col">
        <Header verticalPadding="2" className="bg-midground">
          <FindSomethingButton text="Find chats" />
        </Header>
        <div className="hover-scrollbar flex-1 overflow-y-auto py-2 pl-2 pr-0.5">
          <DMHeaderMenu />
          <Suspense fallback={<DMChatListSkeleton />}>
            <DMChatList />
          </Suspense>
        </div>
        <VoiceStatusFooter />
      </Sidebar>
      <div className="grid min-h-screen xl:grid-cols-[1fr_350px]">
        {children}
        <div className="hidden max-w-[350px] flex-1 xl:flex ">
          <ActiveNowPanel />
        </div>
      </div>
    </>
  );
}
