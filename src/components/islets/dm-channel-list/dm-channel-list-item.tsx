import Avatar from "@/components/ui/avatar";
import { ListItem } from "@/components/ui/list";
import clsx from "@/lib/clsx";
import { ListedDMChannel } from "@/lib/entities/channel";
import { BsFillChatLeftTextFill, BsX } from "react-icons/bs";

type DMChannelListItemProps = {
  active?: boolean;
  channel: ListedDMChannel;
  onDelete: () => void;
};

export default function DMChannelListItem({
  active,
  channel,
  onDelete,
}: DMChannelListItemProps) {
  return (
    <ListItem
      noVerticalPadding
      active={active}
      href={`/channels/${channel.id}`}
      className="gap-3 py-1.5 group-focus-within/list-item:pr-9 group-hover/list-item:pr-9"
      trailing={
        <button
          type="button"
          onClick={onDelete}
          aria-label={`Close conversation with ${channel.name}`}
          className={clsx(
            "absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white",
            "opacity-0 focus-visible:opacity-100 group-hover/list-item:opacity-100",
          )}
        >
          <BsX fontSize={24} />
        </button>
      }
    >
      <Avatar
        src={channel.avatar}
        alt={channel.name}
        status={channel.status}
        className="w-8 flex-none"
      />
      <div className="flex-1 truncate text-sm">
        {channel.name}
        {channel.activity && (
          <div className="h-4 truncate text-xs leading-3">
            <span className="capitalize">{channel.activity?.type}</span>{" "}
            {channel.activity?.name}{" "}
            <BsFillChatLeftTextFill
              fontSize={10}
              className="ml-0.5 inline-block"
            />
          </div>
        )}
      </div>
    </ListItem>
  );
}
