"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UserSettings() {
  const router = useRouter();
  return (
    <Dialog defaultOpen onOpenChange={(open) => !open && router.back()}>
      <DialogContent
        className="grid grid-cols-[minmax(0px_660px)]"
        forceMount
        showClose
      >
        <div className="absolute left-0 top-0 h-10 w-full bg-foreground"></div>
        <div className="relative flex py-4 pl-[90px] pr-4">
          <div className="absolute left-0 top-[-10px]  h-20 w-20 rounded-full border-[8px] border-midground p-2">
            <Image
              src="https://avatars.githubusercontent.com/u/16727448?v=4"
              className="rounded-full"
              fill
              alt="avatar"
            />
          </div>
          <p className="fonts-semibold text-xl">@nickname</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
