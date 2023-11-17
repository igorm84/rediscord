"use client";
import { AiOutlineArrowDown } from "react-icons/ai";
import ChannelItem from "./server-channel-item";
import { Channel } from "@/lib/entities/channel";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useSidebarStatus } from "@/state/sidebar-status";

interface ServerGroupProps {
  groupTitle: string;
  channelList: Channel[];
}

export default function ServerGroup({
  groupTitle,
  channelList,
}: ServerGroupProps) {
  const pathSegments = usePathname().split("/") || [];
  const router = useRouter();
  const { setSidebarStatus, status } = useSidebarStatus();
  const isActiveGroup = useMemo(
    () => channelList.find((v) => v.slug == pathSegments.at(-1)),
    [],
  );
  const changeChannel = (slug: string) => {
    pathSegments.length = 4; // cut rest non-needed segments
    pathSegments[3] = slug;
    status === "open" && setSidebarStatus("closed");
    router.push(pathSegments.join("/"));
  };
  const [isChannelVisible, setChannelVisibility] = useState(!!isActiveGroup);
  return (
    <div className="flex w-full flex-col justify-between text-xs font-semibold leading-none text-zinc-400">
      <div
        onClick={() => setChannelVisibility((v) => !v)}
        className="grid flex-1 cursor-pointer grid-cols-[12px_1fr] gap-1 rounded-sm px-1 
      py-2 transition-all hover:text-white"
        data-testid="channel-group"
      >
        <AiOutlineArrowDown
          className={`${isChannelVisible ? "rotate-180" : ""} transition-all`}
          width="12px"
          height="12px"
          data-testid="channel-group-icon"
        />
        <span className="uppercase">{groupTitle}</span>
      </div>
      <motion.div
        animate={{ height: isChannelVisible ? "100%" : "0px" }}
        className="grid grid-flow-row overflow-hidden"
        data-testid="channel-list"
      >
        {channelList.map((channel) => (
          <ChannelItem
            key={channel.id}
            active={pathSegments.at(-1) == channel.slug}
            onClick={() => changeChannel(channel.slug)}
            {...channel}
          />
        ))}
      </motion.div>
    </div>
  );
}
