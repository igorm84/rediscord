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
import { StaticUserStatuses, User, UserStatuses } from "@/lib/entities/user";
import UserStatus from "./voice-status-user-status";
import DialogContentMain from "./voice-status-dialog-content-main";
import PopoverContentSub from "./voice-status-popover-content-sub";
interface PopoverContentMainProps {
  currentUser: User;
  setCurrentUser: (user: User | null) => void;
}

function PopoverContentMain({
  currentUser,
  setCurrentUser,
}: PopoverContentMainProps) {
  const [hoverPopover, setHoverPopover] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const statuses = Object.values(StaticUserStatuses)
    .slice(0, 4)
    .map((status) => ({
      value: status,
    }));

  const handleSubmit = (status: UserStatuses) => {
    const updatedUser = { ...currentUser, status: status };
    setCurrentUser(updatedUser as User);
  };
  return (
    <PopoverContent
      side="top"
      className="relative left-20 !w-full border-none bg-gradient-to-b from-semibackground to-background md:min-w-[360px]"
    >
      <div className=" h-[60px] w-full rounded-t-md bg-gray-300"></div>
      <Avatar
        className="relative -top-4 left-8 scale-[2]  ring-[3px] ring-[#1e1f22]"
        src={currentUser.avatar}
        status={currentUser.status}
        alt={currentUser.name}
      />
      <div className="relative mt-6 rounded-lg bg-black p-2">
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
        <p className="mt-2 text-xs font-semibold">DISCORD MEMBER SINCE</p>
        <p className=" py-2 text-xs">3 dec 2019</p>
        <Divider className="h-[1px]" />
        <Tooltip open={open} onOpenChange={setOpen}>
          <TooltipTrigger asChild>
            <ListItem className="group mt-2 flex items-center justify-between space-x-2 !rounded !py-1 text-gray-200 active:!bg-primary">
              <div className=" flex items-center justify-center">
                <StatusBadge
                  className="relative !border-black group-hover:!border-foreground group-active:!border-primary"
                  customBackgroundColor="!bg-black group-hover:!bg-foreground group-active:!bg-primary"
                  status={currentUser.status}
                />
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
            <UserStatus
              setOpen={setOpen}
              handleSubmit={handleSubmit}
              statuses={statuses}
            />
          </TooltipContent>
        </Tooltip>
        <DialogContentMain
          currentUser={currentUser}
          handleSubmit={handleSubmit}
          statuses={statuses}
        />
        <Divider className="h-[1px] w-full" />
        <PopoverContentSub
          hoverPopover={hoverPopover}
          setHoverPopover={setHoverPopover}
          currentUser={currentUser}
        />
      </div>
    </PopoverContent>
  );
}

export default PopoverContentMain;
