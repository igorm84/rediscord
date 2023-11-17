"use client";

import VoiceStatusFooter from "@/components/islets/voice-status-footer";
import dynamic from "next/dynamic";
import ActiveNowPanelSkeleton from "../active-now-panel/active-now-panel-skeleton";
import NavBar from "@/components/layout/mobile/navbar";
import DMLayoutSidebar from "./dm-layout-sidebar";
import { useViewportType } from "@/state/viewport-type";
import { useSidebarStatus } from "@/state/sidebar-status";
import DMLayoutSidebarContent from "./dm-layout-sidebar-content";

const ActiveNowPanel = dynamic(() => import("../active-now-panel"), {
  ssr: false,
  loading: () => <ActiveNowPanelSkeleton />,
});

export default function DMLayout({ children }: React.PropsWithChildren) {
  const { status } = useSidebarStatus();
  const viewportType = useViewportType().type;

  return (
    <>
      <DMLayoutSidebar>
        <DMLayoutSidebarContent viewportType={viewportType}>
          {viewportType !== "mobile" && <VoiceStatusFooter />}
        </DMLayoutSidebarContent>
      </DMLayoutSidebar>
      <div className="grid min-h-screen xl:grid-cols-[1fr_350px]">
        {children}
        <div className="hidden max-w-[350px] flex-1 xl:flex ">
          <ActiveNowPanel />
        </div>
      </div>
      {viewportType === "mobile" && status === "open" && <NavBar />}
    </>
  );
}
