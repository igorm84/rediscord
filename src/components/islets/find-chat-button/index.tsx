"use client";

import { sendSearchModalEvent } from "@/lib/events/searchModalEvent";

export const FindChatButtonSkeleton = () => {
  return (
    <button className="flex w-full animate-pulse justify-between rounded-sm bg-foreground p-1.5 text-left text-xs text-gray-400">
      &nbsp;
    </button>
  );
};

export default function FindChatButton() {
  const handleClick = () => {
    sendSearchModalEvent("open");
  };
  return (
    <button
      onClick={handleClick}
      className="flex w-full justify-between rounded-sm bg-background p-1.5 text-left text-xs text-gray-400 hover:bg-background/70"
    >
      Find your friends & chats
      <div className="rounded-sm bg-gray-800/50 px-1 text-[11px]">Ctrl K</div>
    </button>
  );
}
