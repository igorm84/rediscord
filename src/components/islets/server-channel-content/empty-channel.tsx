import { channelIcons } from "@/lib/entities/channel";

interface EmptyChannelProps {
  icon: keyof typeof channelIcons;
  channelTitle: string;
}
export default function EmptyChannel({
  icon,
  channelTitle,
}: EmptyChannelProps) {
  const Icon = channelIcons[icon];
  return (
    <div className="flex flex-col gap-2 pl-4">
      <div className="h-[68px] w-[68px] rounded-full bg-gray-bright p-3 text-[44px]">
        <Icon />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold text-gray-aqua-haze">
          Welcome to channel: #{channelTitle}
        </h3>
        <span className="text-[17px] text-gray-400">
          This is the start of the #{channelTitle} channel. Discord uses "roles"
          to enable different channels and add profile tags. These are
          completely optional.
        </span>
      </div>
    </div>
  );
}
