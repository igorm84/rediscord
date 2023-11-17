import TextSkeleton from "@/components/ui/text/text-skeleton";
import { MOCK_CHATS } from "@/lib/utils/mock";
import React from "react";
import DMChatListItemSkeleton from "./dm-chat-list-item-skeleton";

export default function DMChatListSkeleton() {
  return (
    <div className="animate-pulse pt-4">
      <div className="flex h-5 items-center justify-between pl-3 pr-2.5">
        <TextSkeleton fontSize="xs" place="midground" length={15} />
        <div className="h-4 w-4 rounded-md bg-gray-700/40 p-1"></div>
      </div>
      <div className="mt-1">
        {Array.from({ length: MOCK_CHATS }, (_, i) => i).map((i) => (
          <DMChatListItemSkeleton key={i} even={i % 2 === 0} />
        ))}
      </div>
    </div>
  );
}
