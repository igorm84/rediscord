import dayjs from "dayjs";
import Avatar from "@/components/ui/avatar";
import { Message } from "@/lib/entities/message";

interface Props extends Message { }
export default function MessageItem({
  authorAvatar,
  authorNickname,
  message,
  timestamp,
}: Props) {
  const parsedTimestamp = dayjs(timestamp);

  const hDiff = dayjs(Date.now()).diff(timestamp) / 1000 / 60 / 60;
  return (
    <div
    role="message-item"
      className="grid min-h-[35px] cursor-pointer grid-cols-[35px_1fr] 
    items-start gap-2 bg-transparent px-4 py-3 hover:bg-midground"
    >
      <Avatar size="md" src={authorAvatar} alt="avatar" />
      <div className="grid grid-rows-[13px_1fr] gap-[5px]">
        <div className="flex gap-[6px]">
          <span className="grow-0 text-xs font-semibold text-white">
            {authorNickname}
          </span>
          <span className="grow-0 text-xs font-medium text-zinc-500">
            {hDiff >= 23
              ? parsedTimestamp.format("MMMM D, YYYY h:mm A")
              : parsedTimestamp.format("HH:mm A")}
          </span>
        </div>
        <p className="text-xs font-medium text-zinc-300">{message}</p>
      </div>
    </div>
  );
}
