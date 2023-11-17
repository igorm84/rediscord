import { Message } from "@/lib/entities/message";
import MessageItem from "../message-item";
import dayjs from "dayjs";
import DateBar from "./date-bar";
import clsx from "@/lib/clsx";

interface Props {
  messageList: Message[];
  greetingMessageElement?: React.ReactNode;
  className?: string;
}
export default function MessageList({
  messageList,
  greetingMessageElement,
  className,
}: Props) {
  return (
    <div className={clsx("grid max-h-full grid-flow-row", className)}>
      {greetingMessageElement}
      {messageList.map((item, idx) => {
        const prev = dayjs(messageList[idx - 1]?.timestamp || 0);
        const curr = dayjs(item.timestamp);
        const diff = curr.day() - prev.day() + (curr.month() - prev.month());

        return (
          <div key={item.id} className="flex flex-col">
            {diff ? <DateBar date={curr.format("D MMMM, YYYY")} /> : null}
            <MessageItem {...item} />
          </div>
        );
      })}
    </div>
  );
}
