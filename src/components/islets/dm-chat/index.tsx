import Avatar from "@/components/ui/avatar";
import { User } from "@/lib/entities/user";
import React from "react";

interface ChatDMProps {
  user: User | null;
  currentUser: User | null;
  messages: {
    id: number;
    userId: string | undefined;
    text: string;
    timestamp: string;
  }[];
}

export function ChatDM({ messages, user, currentUser }: ChatDMProps) {
  const chatContainerRef = React.useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [showDetailMessage, setShowDetailMessage] = React.useState<{
    [key: number]: boolean;
  }>({});

  return (
    <>
      {messages.map((message, index) => (
        <div
          ref={chatContainerRef}
          key={message.id}
          className={`  ${
            index === 0 ||
            messages[index]?.userId !== messages[index - 1]?.userId
              ? "my-4"
              : "my-0 h-fit"
          } relative flex items-start gap-2`}
        >
          <Avatar
            className={` ${
              index === 0 ||
              messages[index]?.userId !== messages[index - 1]?.userId
                ? "opacity-100"
                : "!h-0 opacity-0"
            } z-[1]`}
            size="sm"
            src={
              message?.userId === user?.id ? user?.avatar : currentUser?.avatar
            }
            alt="Avatar"
            status={user?.status}
          />
          {showDetailMessage[message.id] && (
            <div className="absolute top-1.5 z-0 text-xs text-gray-400">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "numeric",
                minute: "numeric",
              })}
            </div>
          )}
          <div className="flex w-full flex-col overflow-hidden">
            {(index === 0 ||
              messages[index]?.userId !== messages[index - 1]?.userId) && (
              <div className="flex items-center justify-start">
                <div className="text-sm font-semibold">
                  {message?.userId === user?.id
                    ? user?.name
                    : currentUser?.name}
                </div>
                <div className=" ml-2 text-xs text-gray-400">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            )}
            <div
              onMouseEnter={() => {
                setShowDetailMessage((prev) => ({
                  ...prev,
                  [message.id]: true,
                }));
              }}
              onMouseLeave={() => {
                setShowDetailMessage((prev) => ({
                  ...prev,
                  [message.id]: false,
                }));
              }}
              className="break-words pr-12"
            >
              {message.text}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
