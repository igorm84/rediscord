import Avatar from "@/components/ui/avatar";
import StatusBadge from "@/components/ui/badge/status-badge";
import Divider from "@/components/ui/divider";
import { ListItem } from "@/components/ui/list";
import { PopoverContent } from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { HiSwitchVertical } from "react-icons/hi";
import { User, StaticUserStatuses, UserStatuses } from "@/lib/entities/user";
import UserStatus from "./UserStatus";

import DialogContentMain from "./DialogContentMain";
interface PopoverContentMainProps {
  currentUser: User;
  setCurrentUser: (user: User | null) => void;
}

function PopoverContentMain({
  currentUser,
  setCurrentUser,
}: PopoverContentMainProps) {
  const [open, setOpen] = React.useState(false);
  const statuses = Object.values(StaticUserStatuses)
    .slice(0, 4)
    .map((status) => ({
      value: status,
    }));

  const handleSubmit = (status: UserStatuses) => {
    const updatedUser = { ...currentUser, status: status };
    setCurrentUser(updatedUser);
  };
  return (
    <PopoverContent
      side="top"
      className="relative left-20 !w-full border-none bg-midground !p-0 md:min-w-[360px]"
    >
      <div className=" h-[60px] w-full rounded-t-md bg-gray-300"></div>
      <Avatar
        className="relative -top-4 left-8 scale-[2] ring-[3px] ring-midground"
        src={currentUser.avatar}
        status={currentUser.status as StaticUserStatuses}
        alt={currentUser.name}
      />
      <div className="relative mx-2 my-6 rounded-lg bg-black px-4 py-2">
        <Image
          src="/hashtag.png"
          height={28}
          width={28}
          alt="hashtag image"
          className="absolute -top-12 right-0 h-6 w-6  rounded bg-black  object-cover p-0.5"
        />
        <p className="text-lg font-semibold">{currentUser.name}</p>
        <p className="text-xs">{currentUser.username}</p>
        <Divider className="mt-2 h-[1px]" />
        <p className="py-2 text-xs font-semibold">DISCORD MEMBER SINCE</p>
        <Divider className="h-[1px]" />
        <Tooltip open={open} onOpenChange={setOpen}>
          <TooltipTrigger asChild>
            <ListItem className="mt-2 flex items-center justify-between space-x-2 !rounded !py-1 text-gray-200">
              <div className=" flex items-center justify-center">
                <StatusBadge className="relative" status={currentUser.status} />
                <p className="ml-2">{currentUser.status}</p>
              </div>
              <AiOutlineRight size="10" className="justify-self-end" />
            </ListItem>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="!relative left-6 !text-sm"
            sideOffset={0}
          >
            <UserStatus setOpen={setOpen} handleSubmit={handleSubmit} statuses={statuses} />
          </TooltipContent>
        </Tooltip>
        <DialogContentMain
          currentUser={currentUser}
          handleSubmit={handleSubmit}
          statuses={statuses}
        />
        <Divider className="h-[1px] w-full" />
        <Tooltip>
          <TooltipTrigger asChild>
            <ListItem className="mt-2 flex items-center  justify-between space-x-2 !rounded !py-1 text-gray-200">
              <div className="flex items-center justify-center">
                <HiSwitchVertical />
                <p className="ml-2">Switch account </p>
              </div>
              <AiOutlineRight size="10" className="justify-self-end" />
            </ListItem>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="!relative left-6 min-w-[160px] max-w-[240px] !text-sm "
            sideOffset={0}
          >
            <ListItem className="group items-center justify-between !rounded !py-1 leading-[16px] text-white hover:!bg-[#5865f2]">
              <div className="flex items-center">
                <Avatar
                  size="sm"
                  src={currentUser.avatar}
                  alt={currentUser.name}
                />
                <p className="ml-2 text-sm font-thin">{currentUser.username}</p>
              </div>
              <BsFillCheckCircleFill
                size="16"
                className="text-[#5865f2] group-hover:text-white"
              />
            </ListItem>
            <Divider className="my-2 h-[1px] w-full" />
            <ListItem className="items-center justify-between  !rounded py-3 text-[12px] leading-[16px] text-white hover:!bg-[#5865f2]">
              account management
            </ListItem>
          </TooltipContent>
        </Tooltip>
      </div>
    </PopoverContent>
  );
}

export default PopoverContentMain;
