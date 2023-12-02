import Sidebar from "@/components/layout/sidebar";
import { useSidebarStatus } from "@/state/sidebar-status";
import { useViewportType } from "@/state/viewport-type";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function DMLayoutSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status, setSidebarStatus } = useSidebarStatus();
  const isHide = status === "closed";
  const viewportType = useViewportType().type;

  useEffect(() => {
    if (viewportType === "mobile" && isHide) {
      setSidebarStatus("open");
    }
  }, [viewportType]);

  if (viewportType === "mobile" && !isHide) {
    document.body.style.overflow = "hidden";
  } else document.body.style.overflow = "auto";

  return (
    <Sidebar
      as={motion.div}
      animate={{
        width: viewportType === "mobile" && !isHide ? "100vw" : "240px",
        translateX: isHide && viewportType === "mobile" ? "-100vw" : "0vw",
      }}
      className="z-[50] flex h-[calc(100vh-40px)] flex-col px-2 pr-[80px] sm:min-h-screen sm:px-0"
      data-testid="dm-layout-sidebar"
      transition={{ ease: "easeInOut", duration: 0.4 }}
    >
      {children}
    </Sidebar>
  );
}
