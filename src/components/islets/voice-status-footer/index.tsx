"use client";
import Avatar from "@/components/ui/avatar";
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
import { useState } from "react";
import { BsGearFill, BsHeadphones, BsMicFill } from "react-icons/bs";

type VoiceStatusButton = {
  icon: React.ReactNode;
  muted?: boolean;
  tooltipText: string;
  onClick?: () => void;
  dataTestid?: string;
};
const VoiceStatusButton = ({
  icon,
  muted,
  tooltipText,
  onClick,
  dataTestid
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
          data-testid={dataTestid}
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
  const currentUser = generateFakeCurrentUser();
  return (
    <TooltipProvider>
      <div className="flex justify-between gap-1 bg-semibackground px-2 py-1.5">
        <button className="flex gap-2 rounded-md py-1 pl-0.5 pr-2 text-left leading-tight hover:bg-white/20">
          <Avatar
            src={currentUser.avatar}
            status={currentUser.status}
            alt={currentUser.name}
          />
          <div>
            <div className="text-xs font-semibold">{currentUser.name}</div>
            <div className="text-[11px] text-gray-300">
              {t(`user.status.${currentUser.status}`)}
            </div>
          </div>
        </button>
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
            dataTestid="mute-button"
            icon={<BsMicFill fontSize={18} />}
          />
          <VoiceStatusButton
            muted={voiceStatus.deaf}
            tooltipText={voiceStatus.deaf ? "Undeaf" : "Deaf"}
            onClick={() =>
              setVoiceStatus((prev) => ({ ...prev, deaf: !prev.deaf }))
            }
            dataTestid="deaf-button"
            icon={<BsHeadphones fontSize={20} />}
          />
          <VoiceStatusButton
            tooltipText="Settings"
            dataTestid="settings-button"
            icon={<BsGearFill fontSize={18} />}
          />
        </div>
      </div>
    </TooltipProvider>
  );
}
