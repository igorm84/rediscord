"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Toaster from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export default function UserSettingsLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  return (
    <Dialog defaultOpen onOpenChange={(open) => !open && router.back()}>
      <Toaster />
      <DialogContent
        className="grid min-h-[460px] grid-cols-[minmax(0px_660px)] grid-rows-[100px_1fr]"
        forceMount
        showClose
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
