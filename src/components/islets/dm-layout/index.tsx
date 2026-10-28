import Sidebar from "@/components/layout/sidebar";
import FindChatButton from "@/components/islets/find-chat-button";

import Header from "@/components/layout/header";
import DMHeaderMenu from "@/components/islets/dm-header-menu";
import DMChannelList from "@/components/islets/dm-channel-list";
import VoiceStatusFooter from "@/components/islets/voice-status-footer";

export default function DMLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Sidebar className="bottom-70 flex flex-col">
        <Header verticalPadding="2" className="bg-midground">
          <FindChatButton />
        </Header>
        <div className="hover-scrollbar flex-1 overflow-y-auto py-2 pl-2 pr-0.5">
          <DMHeaderMenu />
          <DMChannelList />
        </div>
        <VoiceStatusFooter />
      </Sidebar>
      {children}
    </>
  );
}
