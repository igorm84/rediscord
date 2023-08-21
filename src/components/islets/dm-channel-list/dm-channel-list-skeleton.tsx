import AvatarSkeleton from "@/components/ui/avatar/avatar-skeleton";
import TextSkeleton from "@/components/ui/text/text-skeleton";
import clsx from "@/lib/clsx";
import { MOCK_CHANNELS } from "@/lib/utils/mock";
import React from "react";

export default function DMChannelListSkeleton() {
  return (
    <div className="animate-pulse pt-4">
      <div className="flex h-5 items-center justify-between pl-3 pr-2.5">
        <TextSkeleton fontSize="xs" place="midground" length={15} />
        <div className="h-4 w-4 rounded-md bg-gray-700/40 p-1"></div>
      </div>
      <div className="mt-1">
        {Array.from({ length: MOCK_CHANNELS }, (_, i) => i).map((i) => (
          <div
            key={i}
            className="my-1 flex w-full items-center gap-2 rounded-md bg-foreground px-2 py-2"
          >
            <AvatarSkeleton />
            <div className="flex h-8 flex-1 flex-col gap-1">
              <TextSkeleton
                fontSize="sm"
                place="midground"
                className={clsx(i % 2 ? "w-5/6" : "w-3/4")}
              />
              <TextSkeleton
                fontSize="xs"
                place="midground"
                className={clsx(i % 2 ? "w-3/4" : "w-2/3")}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
