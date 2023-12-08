import Sidebar from "@/components/layout/sidebar";
import { useSidebarStatus } from "@/state/sidebar-status";
import { useViewportType } from "@/state/viewport-type";
import { motion } from "framer-motion";

export default function DMLayoutSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status} = useSidebarStatus();
  const isHide = status === "closed";
  const viewportType = useViewportType().type;

  if (viewportType === "mobile" && !isHide) {
    document.body.style.overflow = "hidden";
  } else document.body.style.overflow = "auto";

  return (
    <Sidebar
      as={motion.div}
      animate={{
        width:
          viewportType === "mobile" ? (!isHide ? "100vw" : "240px") : "240px",
        translateX:
          viewportType === "mobile" ? (!isHide ? "0vw" : "-100vw") : "0vw"
      }}
      className="z-[50] flex h-[calc(100vh-40px)] flex-col px-2 pr-[80px] sm:min-h-screen sm:px-0"
      data-testid="dm-layout-sidebar"
      transition={{ ease: "easeInOut", duration: 0.4 }}
    >
      {children}
    </Sidebar>
  );
}
