"use client";

import Sidebar from "@/components/layout/sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import clsx from "@/lib/clsx";
import { useSidebarStatus } from "@/state/sidebar-status";
import { useViewportType } from "@/state/viewport-type";
import {  Fragment } from "react";

function SheetContainer({
  children,
  open,
  setOpen,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: (v: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="border-none px-0 py-0" side="left" data-testid="sheet-container">
        {children}
      </SheetContent>
    </Sheet>
  );
}

export default function ServerSidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status, setSidebarStatus } = useSidebarStatus();
  const { type: viewportType } = useViewportType();
  const Container = viewportType !== "mobile" ? Fragment : SheetContainer;
  const open = status === "open" && viewportType === "mobile";
  const containerProps =
    viewportType !== "mobile" ? {} : { open, setOpen: setSidebarStatus };
  return (
    <Container {...(containerProps as { children: React.ReactNode })}>
      <Sidebar
        className={clsx(
          "grid grid-rows-[minmax(44px,max-content)_1fr_52px] static w-full sm:fixed sm:w-[240px]",
        )}
      >
        {children}
      </Sidebar>
    </Container>
  );
}
