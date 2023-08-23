"use client";
import { Page, PageContent, PageHeader } from "@/components/layout/page";
import Avatar from "@/components/ui/avatar";
import Divider from "@/components/ui/divider";
import { Input } from "@/components/ui/input";
import {
  AiFillGift,
  AiFillPlusCircle,
  AiOutlineFileText,
  AiOutlineGif,
} from "react-icons/ai";
import { CgSmileMouthOpen } from "react-icons/cg";
import { useChannelStore } from "@/state/channel-list";
import React from "react";
import InputField from "@/components/ui/input/input-field";
import { useCurrentUserStore } from "@/state/user";

export default function ChannelPage({ params }: { params: { id: string } }) {
  const { channels } = useChannelStore();
  const { currentUser } = useCurrentUserStore();
  const user = channels?.find((channel) => channel.id === params.id);

  const [newMessage, setNewMessageText] = React.useState("");

  const [messages, setMessages] = React.useState([
    {
      id: 1,
      userId: user?.id,
      text: "Hello! How are you?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [showDetailMessage, setShowDetailMessage] = React.useState<{
    [key: number]: boolean;
  }>({});

  const handleSubmit = () => {
    const newMessageObj = {
      id: messages.length + 1,
      userId: currentUser?.id,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessageObj]);
    setNewMessageText("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessageText(e.target.value);
  };
  return (
    <Page>
      {!user?.id ? (
        <div className="p-4 text-base text-gray-400">
          Ups probably we cannot find your conversation please back to main page
        </div>
      ) : (
        <>
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
          <PageContent className="h-full w-full flex-col pl-6 pr-1 ">
            <div className="max-h-[86vh] !overflow-y-auto ">
              {messages.map((message, index) => (
                <div
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
                      message?.userId === user?.id
                        ? user?.avatar
                        : currentUser?.avatar
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
                      messages[index]?.userId !==
                        messages[index - 1]?.userId) && (
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
            </div>
            <InputField
              startIcon={
                <AiFillPlusCircle
                  className="cursor-pointer hover:text-gray-200"
                  size={22}
                />
              }
              endIcon={
                <div className="absolute right-4 top-0 flex h-full cursor-pointer items-center space-x-2.5 text-gray-400 ">
                  <AiFillGift className="hover:text-gray-300" size={22} />
                  <AiOutlineGif className="hover:text-gray-300" size={22} />
                  <AiOutlineFileText
                    className="hover:text-gray-300"
                    size={22}
                  />
                  <CgSmileMouthOpen className="hover:text-gray-300" size={22} />
                </div>
              }
              className="!absolute bottom-0 left-0 right-0 mx-6 mb-4 w-auto"
            >
              <Input
                className=" py-2 pl-12 pr-36 !placeholder-gray-600"
                type="text"
                placeholder={`write something to @${user.name}`}
                value={newMessage}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSubmit();
                  }
                }}
                onChange={handleInputChange}
              />
            </InputField>
          </PageContent>
        </>
      )}
    </Page>
  );
}
