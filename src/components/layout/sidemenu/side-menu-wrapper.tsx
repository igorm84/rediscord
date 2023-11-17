"use client";

import { clsx } from "@/lib/utils";
import { useSidebarStatus } from "@/state/sidebar-status";
import { useViewportType } from "@/state/viewport-type";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function SideMenuWrapper({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const isHide = useSidebarStatus().status === "closed";
  const { type: viewportType } = useViewportType();
  const pathname = usePathname();

  if (pathname.includes("/server") && viewportType === "mobile") {
    return null;
  }
  const isShowSideMenu = !isHide || viewportType !== "mobile";
  return (
    <AnimatePresence>
      {isShowSideMenu && (
        <motion.div
          animate={{
            translateX: 0,
          }}
          className={clsx(
            "hidden-scrollbar  fixed z-50 h-[calc(100vh-40px)] w-[70px] gap-3 overflow-y-auto pt-3 sm:h-screen",
            "bg-gradient-to-b from-semibackground to-background",
            className,
          )}
          exit={{ translateX: "-100vw" }}
          transition={{ ease: "easeInOut", duration: 0.4 }}
          data-testid="side-menu-wrapper"
        >
          <div className="pointer-events-none fixed bottom-0 z-10 h-32 w-[70px] bg-gradient-to-b from-transparent to-black/20"></div>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
