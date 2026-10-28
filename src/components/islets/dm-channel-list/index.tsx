"use client";
import { List } from "@/components/ui/list";
import DMChannelListHeader from "./dm-channel-list-header";
import DMChannelListItem from "./dm-channel-list-item";
import { useParams } from "next/navigation";
import { useChannelStore } from "@/state/channel-list";

export default function DMChannelList() {
  const { channels, setChannels } = useChannelStore();

  const handleChannelDelete = (channelId: string) => {
    if (channels !== null) {
      setChannels(channels.filter((channel) => channel.id !== channelId));
    }
  };
  const params = useParams();

  return (
    <div className="pt-4">
      <DMChannelListHeader />
      <List className="mt-1">
        {channels?.map((channel) => (
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
