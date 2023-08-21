"use client";
import React from "react";
import { ListedDMChannel } from "@/lib/entities/channel";
import { List } from "@/components/ui/list";
import DMChannelListHeader from "./dm-channel-list-header";
import DMChannelListItem from "./dm-channel-list-item";
import { useParams } from "next/navigation";

interface DMChannelListrops {
  channels: ListedDMChannel[];
}
export default function DMChannelList({ channels }: DMChannelListrops) {
  const [currentChannels, setCurrentChannels] =
    React.useState<ListedDMChannel[]>(channels);

  const handleChannelDelete = (channelId: string) => {
    setCurrentChannels((prev) =>
      prev.filter((channel) => channel.id !== channelId),
    );
  };
  const params = useParams();

  return (
    <div className="pt-4">
      <DMChannelListHeader />
      <List className="mt-1">
        {currentChannels.map((channel) => (
          <DMChannelListItem
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
