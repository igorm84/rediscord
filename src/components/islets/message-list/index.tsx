import { Message } from "@/lib/entities/message";
import MessageItem from "../message-item";
import dayjs from "dayjs";
import DateBar from "./date-bar";

interface Props {
  messageList: Message[];
  greetingMessageElement?: React.ReactNode;
}
export default function MessageList({
  messageList,
  greetingMessageElement,
}: Props) {
  return (
    <div className="grid max-h-full grid-flow-row">
      {greetingMessageElement}
      {messageList.map((item, idx) => {
        const prev = dayjs(messageList[idx - 1]?.timestamp || 0);
        const curr = dayjs(item.timestamp);
        const diff = curr.day() - prev.day() + (curr.month() - prev.month());

        return (
          <div className="flex flex-col">
            {diff ? <DateBar date={curr.format("D MMMM, YYYY")} /> : null}
            <MessageItem key={item.id} {...item} />
          </div>
        );
      })}
    </div>
  );
}
