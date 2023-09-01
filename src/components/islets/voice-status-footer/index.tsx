"use client";
import Avatar from "@/components/ui/avatar";
import StatusBadge from "@/components/ui/badge/status-badge";
import Divider from "@/components/ui/divider";
import { ListItem } from "@/components/ui/list";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from "@/components/ui/tooltip";
import { VoiceStatus } from "@/lib/entities/user";
import { t } from "@/lib/i18n";
import { clsx } from "@/lib/utils";
import { generateFakeCurrentUser } from "@/lib/utils/mock";
import { useCurrentUserStore } from "@/state/user";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { BsGearFill, BsHeadphones, BsMicFill } from "react-icons/bs";
import { FaRegSmileBeam } from "react-icons/fa";

type VoiceStatusButton = {
  icon: React.ReactNode;
  muted?: boolean;
  tooltipText: string;
  onClick?: () => void;
};
const VoiceStatusButton = ({
  icon,
  muted,
  tooltipText,
  onClick,
}: VoiceStatusButton) => {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip open={open}>
      <TooltipTrigger
        asChild
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button
          onClick={onClick}
          className={clsx(
            "group relative flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-700",
            "text-gray-300 hover:text-gray-200",
          )}
        >
          {icon}
          {muted && (
            <div className="absolute h-3/4 w-[5px] rotate-45 rounded-sm border-[2px] border-semibackground bg-red-500 group-hover:border-gray-700"></div>
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent className="text-xs font-normal text-gray-200">
        {tooltipText}
      </TooltipContent>
    </Tooltip>
  );
};

export default function VoiceStatusFooter() {
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus>({ mute: true });
  const currentUserData = generateFakeCurrentUser();
  const { currentUser, setCurrentUser } = useCurrentUserStore();

  useEffect(() => {
    if (currentUserData !== null) {
      setCurrentUser(currentUserData);
    }
  }, []);

  return (
    <>
      {currentUser ? (
        <TooltipProvider>
          <Tooltip>
            <Popover>
              <div className="flex justify-between gap-1 bg-semibackground px-2 py-1.5">
                <PopoverTrigger asChild>
                  <button className="flex gap-2 rounded-md py-1 pl-0.5 pr-2 text-left leading-tight hover:bg-white/20">
                    <Avatar
                      src={currentUser.avatar}
                      status={currentUser.status}
                      alt={currentUser.name}
                    />
                    <div>
                      <div className="text-xs font-semibold">
                        {currentUser.name}
                      </div>
                      <div className="text-[11px] text-gray-300">
                        {t(`user.status.${currentUser.status}`)}
                      </div>
                    </div>
                  </button>
                </PopoverTrigger>
                <div className="flex items-center">
                  <VoiceStatusButton
                    muted={voiceStatus.mute || voiceStatus.deaf}
                    tooltipText={
                      voiceStatus.mute || voiceStatus.deaf ? "Unmute" : "Mute"
                    }
                    onClick={() =>
                      setVoiceStatus((prev) => ({
                        ...prev,
                        deaf: false,
                        mute: !prev.mute,
                      }))
                    }
                    icon={<BsMicFill fontSize={18} />}
                  />
                  <VoiceStatusButton
                    muted={voiceStatus.deaf}
                    tooltipText={voiceStatus.deaf ? "Undeaf" : "Deaf"}
                    onClick={() =>
                      setVoiceStatus((prev) => ({ ...prev, deaf: !prev.deaf }))
                    }
                    icon={<BsHeadphones fontSize={20} />}
                  />
                  <VoiceStatusButton
                    tooltipText="Settings"
                    icon={<BsGearFill fontSize={18} />}
                  />
                </div>
              </div>
              <PopoverContent
                side="top"
                className="relative left-20 !w-full border-none bg-midground !p-0 md:min-w-[300px]"
              >
                <>
                  <div className=" h-[60px] w-full rounded-t-md bg-gray-300"></div>
                  <Avatar
                    className="relative -top-4 left-8 scale-[2] ring-[3px] ring-midground"
                    src={currentUser.avatar}
                    status={currentUser.status}
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
                    <Divider className="h-[1px]" />
                    <p className="py-2 text-xs font-semibold">
                      DISCORD MEMBER SINCE
                    </p>
                    <Divider className="h-[1px]" />
                    <TooltipTrigger asChild>
                      <ListItem className="mt-2 flex items-center justify-between space-x-2 !py-1 text-gray-200">
                        <div className="flex items-center justify-center">
                          <StatusBadge status={currentUser.status} />
                          <p className="ml-2">{currentUser.status}</p>
                        </div>
                        <AiOutlineRight
                          size="10"
                          className="justify-self-end"
                        />
                      </ListItem>
                    </TooltipTrigger>
                    <ListItem className="mb-2 flex  items-center !py-1">
                      <FaRegSmileBeam />
                      <p className="ml-2">set your own status</p>
                    </ListItem>

                    <Divider className="h-[1px]" />
                  </div>
                </>
              </PopoverContent>
              <TooltipContent
                side="right"
                className="!relative left-6 !text-sm"
                sideOffset={0}
              >
                ssss
              </TooltipContent>
            </Popover>
          </Tooltip>
        </TooltipProvider>
      ) : null}
    </>
  );
}
