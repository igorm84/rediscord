import Avatar from "@/components/ui/avatar";
import Button from "@/components/ui/button/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Divider from "@/components/ui/divider";
import { ListItem } from "@/components/ui/list";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "@/lib/entities/user";
import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { BsFillCheckCircleFill, BsThreeDots } from "react-icons/bs";
import { HiSwitchVertical } from "react-icons/hi";

interface PopoverContentSubProps {
  setHoverPopover: (hover: boolean) => void;
  hoverPopover: boolean;
  currentUser: User;
}
function PopoverContentSub({
  setHoverPopover,
  hoverPopover,
  currentUser,
}: PopoverContentSubProps) {
  return (
    <div
      onMouseOver={() => {
        setHoverPopover(true);
      }}
      onMouseLeave={() => {
        setHoverPopover(false);
      }}
    >
      <Popover open={hoverPopover} onOpenChange={setHoverPopover}>
        <PopoverTrigger asChild>
          <ListItem className="mt-2 flex items-center  justify-between space-x-2 !rounded !py-1 text-gray-200 active:!bg-primary">
            <div className="flex items-center justify-center">
              <HiSwitchVertical />
              <p className="ml-2">Switch account </p>
            </div>
            <AiOutlineRight size="10" className="justify-self-end" />
          </ListItem>
        </PopoverTrigger>
        <PopoverContent
          side="right"
          className="!relative left-6 min-w-[160px] max-w-[240px] border-none bg-black !p-1.5  !text-sm"
          sideOffset={0}
        >
          <ListItem className="group items-center justify-between !rounded !py-1 leading-[16px] text-white hover:!bg-primary">
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
              className="text-primary group-hover:text-white"
            />
          </ListItem>
          <Divider className="my-2 h-[1px] w-full" />
          <Dialog>
            <DialogTrigger className="w-full">
              <ListItem className=" items-center justify-between  !rounded py-3 text-[12px] leading-[16px] text-white hover:!bg-primary">
                account management
              </ListItem>
            </DialogTrigger>
            <DialogContent className="!gap-1">
              <DialogHeader className="w-full text-xl font-bold sm:!text-center">
                Account management
              </DialogHeader>

              <DialogDescription>
                <p className="text-base text-gray-300">
                  Switch accounts, log in, log out, go all in.
                </p>
                <div className=" mt-4 flex items-center justify-between rounded bg-foreground py-2 pl-3 pr-2">
                  <div className="flex items-center">
                    <Avatar
                      size="md"
                      src={currentUser.avatar}
                      alt={currentUser.name}
                    />
                    <div className="ml-2 flex flex-col text-[14px] font-semibold">
                      <p>{currentUser.username}</p>
                      <p className=" text-green-500">Active account</p>
                    </div>
                  </div>
                  <Popover>
                    <PopoverTrigger>
                      <BsThreeDots className=" text-xl hover:text-gray-200" />
                    </PopoverTrigger>
                    <PopoverContent className="!w-24 border-none bg-background !p-1.5">
                      <ListItem className=" !rounded font-medium leading-[18px] text-red-500 hover:bg-red-500 hover:text-white">
                        Logout
                      </ListItem>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="w-full text-center">
                  <Button bg={false} className="mx-auto ">
                    Add Account
                  </Button>
                </div>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default PopoverContentSub;
