"use client";
import { clsx } from "@/lib/utils";
import { BsPlus } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function DMChatListHeader() {
  return (
    <TooltipProvider>
      <div
        className={clsx(
          "flex cursor-default items-center justify-between pl-3 pr-2.5 text-xs font-semibold",
          "align-middle text-gray-400 hover:text-gray-200",
        )}
      >
        DIRECT MESSAGES
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="text-gray-300">
              <BsPlus fontSize={22} />
            </button>
          </TooltipTrigger>
          <TooltipContent className="font-normal text-gray-200">
            Create DM
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
