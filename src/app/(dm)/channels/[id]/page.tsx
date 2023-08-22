"use client";
import { Page, PageContent, PageHeader } from "@/components/layout/page";
import Avatar from "@/components/ui/avatar";
import Divider from "@/components/ui/divider";
import { Input } from "@/components/ui/input";
import { generateFakeCurrentUser } from "@/lib/utils/mock";
import { useChannelStore } from "@/state/channel-list";
import React from "react";

export default function ChannelPage({ params }: { params: { id: string } }) {
  const { channels } = useChannelStore();
  const currentUser = generateFakeCurrentUser();
  const user = channels?.find((channel) => channel.id === params.id);

  const [newMessage, setNewMessageText] = React.useState("");
  const [messages, setMessages] = React.useState([
    {
      id: 1,
      userId: user?.id,
      text: "Hello!",
      timestamp: new Date().toISOString(),
    },
  ]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit(e);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleInputChange = (e) => {
    setNewMessageText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessageObj = {
      id: messages.length + 1,
      userId: currentUser?.id,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessageObj]);
    setNewMessageText("");
  };

  return (
    <Page>
      <PageHeader>
        <div className="flex items-center gap-4">
          <div className="flex flex-none items-center gap-3 text-sm font-semibold">
            <Avatar
              size="sm"
              src={user?.avatar}
              alt="ewqwqe"
              status={user?.status}
            />
            {user?.name}
          </div>
          <Divider vertical />
          <div className="text-xs text-gray-400">{user?.username}</div>
        </div>
      </PageHeader>
      <PageContent className="flex-col">
        {messages.map((message) => (
          <div key={message.id} className="my-4 flex items-start gap-2">
            <Avatar
              size="sm"
              src={
                message?.userId === currentUser.id
                  ? currentUser.avatar
                  : user?.avatar
              }
              alt="Avatar"
              status={user?.status}
            />
            <div className="flex flex-col">
              <div className="flex items-center justify-start">
                <div className="text-sm font-semibold">
                  {message?.userId === currentUser?.id
                    ? currentUser.name
                    : user?.name}
                </div>
                <div className=" ml-2 text-xs text-gray-400">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
              <div>{message.text}</div>
            </div>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <Input type="text" value={newMessage} onChange={handleInputChange} />
          <button type="button" onClick={handleSubmit}>
            Send
          </button>
        </div>
      </PageContent>
    </Page>
  );
}
