"use client";
import React from "react";
import { List } from "@/components/ui/list";
import { useParams } from "next/navigation";
import DMChatListHeader from "./dm-chat-list-header";
import DMChatListItem from "./dm-chat-list-item";
import { Chat } from "@/lib/entities/chat";
import { motion } from "framer-motion";
import clsx from "@/lib/clsx";

interface ActiveListItemTabProps {
  offsetY: number;
  hide?: boolean;
  className?: string;
}

export function ActiveListItemTab({
  className,
  offsetY,
  hide,
}: ActiveListItemTabProps) {
  return (
    <motion.div
      animate={{
        display: hide ? "none" : "block",
        translateY: offsetY,
      }}
      transition={{ ease: "easeInOut", duration: 0.35 }}
      className={clsx(
        "absolute left-0 top-0 z-[-1] h-[44px] w-full rounded-md bg-gray-700/60 pl-3 pr-2",
        className,
      )}
    ></motion.div>
  );
}

interface DMChatListContentProps {
  channels: Chat[];
}
export default function DMChatListContent({
  channels,
}: DMChatListContentProps) {
  const [currentChannels, setCurrentChannels] =
    React.useState<Chat[]>(channels);

  const handleChannelDelete = (channelId: string) => {
    setCurrentChannels((prev) =>
      prev.filter((channel) => channel.id !== channelId),
    );
  };
  const params = useParams();
  const activeIdx = currentChannels.findIndex((v) => v.id == params.id);
  
  return (
    <div className="pt-4">
      <DMChatListHeader />
      <List className="relative mt-1">
        <ActiveListItemTab
          offsetY={Math.max(activeIdx * 44, 0)}
          hide={ activeIdx == -1}
        />
        {currentChannels.map((channel) => (
          <DMChatListItem
            active={params.id === channel.id}
            key={channel.id}
            channel={channel}
            onDelete={() => {
              handleChannelDelete(channel.id);
            }}
          />
        ))}
      </List>
    </div>
  );
}
