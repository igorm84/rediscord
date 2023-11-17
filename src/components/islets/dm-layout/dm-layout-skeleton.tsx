import { FindChatButtonSkeleton } from "@/components/islets/find-chat-button";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import DMHeaderMenuSkeleton from "../dm-header-menu/dm-header-menu-skeleton";
import VoiceStatusFooterSkeleton from "../voice-status-footer/voice-status-footer-skeleton";
import DMChatListSkeleton from "../dm-chat-list/dm-chat-list-skeleton";

export default function DMLayoutSkeleton({
  children,
}: React.PropsWithChildren) {
  
  return (
    <>
      <Sidebar className="bottom-70 flex flex-col">
        <Header verticalPadding="2" className="bg-midground">
          <FindChatButtonSkeleton />
        </Header>
        <div className="hover-scrollbar flex-1 overflow-y-auto py-2 pl-2 pr-0.5">
          <DMHeaderMenuSkeleton />
          <DMChatListSkeleton />
        </div>
        <VoiceStatusFooterSkeleton />
      </Sidebar>
      {children}
    </>
  );
}
