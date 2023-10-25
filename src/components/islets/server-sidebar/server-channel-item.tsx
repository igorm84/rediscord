import { Channel, channelIcons } from "@/lib/entities/channel";

interface ChannelItemProps extends Channel {
  active: boolean;
  onClick: () => void;
}
export default function ChannelItem({
  type,
  title,
  active,
  onClick,
}: ChannelItemProps) {
  const Icon = channelIcons[type];
  return (
    <div
      className={`grid cursor-pointer grid-cols-[12px_1fr] gap-1 rounded-sm px-1 
      py-2 transition-all ${
        active ? "bg-zinc-700 text-white" : "hover:bg-zinc-700 hover:text-white"
      }`}
      onClick={onClick}
    >
      <Icon />
      <span>{title}</span>
    </div>
  );
}
