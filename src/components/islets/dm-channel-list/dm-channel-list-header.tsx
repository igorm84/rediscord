"use client";
import { clsx } from "@/lib/utils";
import { BsPlus } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import DMChannelPopover from "./dm-channel-popover";
import { useState } from "react";

export default function DMChannelListHeader() {
  const [open, setOpen] = useState(false);
  return (
    <TooltipProvider>
      <Popover open={open} onOpenChange={setOpen}>
        <div
          className={clsx(
            "flex cursor-default items-center justify-between pl-3 pr-2.5 text-xs font-semibold",
            "align-middle text-gray-400 hover:text-gray-200",
          )}
        >
          DIRECT MESSAGES
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <button className="text-gray-300">
                  <BsPlus fontSize={22} />
                </button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent className="font-normal text-gray-200">
              Create DM
            </TooltipContent>
          </Tooltip>
        </div>
        <DMChannelPopover setOpen={setOpen} position="left-20" />
      </Popover>
    </TooltipProvider>
  );
}
