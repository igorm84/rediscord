"use client";
import { BsChatRightFill, BsGithub, BsInboxFill } from "react-icons/bs";
import { BiSolidPhoneCall } from "react-icons/bi";
import Header from "../header";
import Divider from "@/components/ui/divider";
import React from "react";
import clsx from "@/lib/clsx";
import HybridButton, {
  HybridButtonProps,
  HybridButtonRef,
} from "@/components/ui/hybrid/hybrid-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFriendStore } from "@/state/friend-list";
import { ListItem } from "@/components/ui/list";
import Avatar from "@/components/ui/avatar";
import { useAddChannel } from "@/customHooks/useAddChannel";
import { User } from "@/lib/entities/user";

type PageHeaderButtonProps = HybridButtonProps;

const PageHeaderButton = React.forwardRef(
  (
    { children, className, ...props }: PageHeaderButtonProps,
    ref: React.Ref<HybridButtonRef>,
  ) => (
    <HybridButton
      ref={ref}
      className={clsx("text-gray-300 hover:text-gray-200", className)}
      {...props}
    >
      {children}
    </HybridButton>
  ),
);
PageHeaderButton.displayName = "PageHeadeButton";

const headerIcons = [
  {
    icon: <BiSolidPhoneCall size={20} />,
    tooltip: "Start a voice call",
    href: "",
  },
  {
    icon: <BsChatRightFill size={18} />,
    tooltip: "Create  private Message",
    href: "",
  },
  { icon: <BsInboxFill size={20} />, tooltip: "Inbox", href: "" },
  {
    icon: <BsGithub size={20} />,
    href: "https://github.com/igorm84/rediscord",
    tooltip: "Author github",
  },
];

interface PageHeaderProps {
  children: React.ReactNode;
  user?: User;
  handleAudioVideoCall?: () => void;
  showAudioVideoCall?: boolean;
}
export default function PageHeader({
  children,
  user,
  handleAudioVideoCall,
  showAudioVideoCall,
}: PageHeaderProps) {
  const { handleAddChannel, setSelectedFriend, selectedFriend } =
    useAddChannel();

  const { friends } = useFriendStore();
  const partFriends = friends?.slice(0, 6);

  return (
    <Header
      className={`flex-none justify-between ${
        showAudioVideoCall ? "bg-[#000000]" : ""
      } transition-colors duration-200 ease-in-out `}
    >
      {children}

      <div className="flex items-center gap-6">
        <TooltipProvider>
          <Popover>
            {headerIcons.map((icon, index) => {
              if (index === 0 && !user) {
                return null;
              }
              const messageIconIndex = index === 1;
              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <PopoverTrigger asChild={messageIconIndex}>
                      <PageHeaderButton
                        onClick={index === 0 ? handleAudioVideoCall : undefined}
                        className={`${
                          messageIconIndex ? "hidden md:block" : null
                        }`}
                        href={icon.href}
                        key={index}
                      >
                        {icon.icon}
                      </PageHeaderButton>
                    </PopoverTrigger>
                  </TooltipTrigger>
                  {messageIconIndex && (
                    <Divider
                      className={`${
                        messageIconIndex ? "hidden md:block" : null
                      }`}
                      vertical
                    />
                  )}
                  <TooltipContent
                    side="bottom"
                    className="z-[51] !text-sm"
                    sideOffset={0}
                  >
                    {icon.tooltip}
                  </TooltipContent>
                </Tooltip>
              );
            })}
            <PopoverContent className="relative right-20 !w-full border-[1px] border-[#242628] bg-[#313338] !px-0 md:min-w-[400px]">
              <>
                <div className="flex flex-col px-4">
                  <h2 className="font-bold">Choose friends</h2>
                  <p className="text-[12px] text-gray-300">
                    you can add more {partFriends?.length}
                  </p>
                </div>
                <Divider className="mt-4 h-[1px] w-full bg-[#242628]" />
                <div className="h-[200px] overflow-y-auto px-2">
                  {partFriends?.map((friend, index) => (
                    <ListItem
                      className={`${
                        selectedFriend?.id === friend.id ? "bg-gray-800/50" : ""
                      }`}
                      onClick={() => setSelectedFriend(friend)}
                      key={index}
                    >
                      <Avatar
                        alt={friend.name}
                        src={friend.avatar}
                        status={friend.status}
                      />
                      <p className=" ml-2 mr-1 whitespace-nowrap text-white">
                        {friend.name}
                      </p>
                      <p className="text-gray-500">{friend.username}</p>
                    </ListItem>
                  ))}
                </div>
                <div className="px-4">
                  <Divider className="mb-4 h-[1px]" />
                  <button
                    onClick={() => {
                      handleAddChannel();
                    }}
                    className="w-full rounded bg-[#5865f2] p-2 text-sm font-semibold transition-colors duration-300 ease-in-out hover:bg-[#4750b8]"
                  >
                    Create private messsage
                  </button>
                </div>
              </>
            </PopoverContent>
          </Popover>
        </TooltipProvider>
      </div>
    </Header>
  );
}
