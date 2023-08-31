"use client";
import Avatar from "@/components/ui/avatar";
import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Database } from "@/lib/db/database.types";
import { UserStatuses, VoiceStatus } from "@/lib/entities/user";
import { t } from "@/lib/i18n";
import { clsx } from "@/lib/utils";
import { useCurrentUserStore } from "@/state/user";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";
import { BsGearFill, BsHeadphones, BsMicFill } from "react-icons/bs";
import ProfileRequiredDialog from "./profile-required-dialog";

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
  const { currentUser, setCurrentUser, logout } = useCurrentUserStore();
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    if (supabase) {
      const fetchCurrentUser = async () => {
        try {
          const user = await supabase.auth.getUser();

          if (user?.data?.user?.id) {
            const { data, error } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", user?.data?.user?.id)
              .single();
            if (error) {
              throw error;
            } else {
              setCurrentUser({
                ...data,
                status: data.status
                  ? UserStatuses[data.status]
                  : UserStatuses.offline,
              });
            }
          } else {
            logout();
          }
        } catch (error) {
          console.log("Couldn't load the user", error);
        }
      };
      fetchCurrentUser();
    }
  }, [logout, setCurrentUser, supabase]);

  return (
    <>
      {currentUser && <ProfileRequiredDialog />}
      <TooltipProvider>
        <div
          className="flex gap-1 bg-semibackground px-2 py-1.5"
          style={{
            minHeight: 52,
          }}
        >
          {currentUser ? (
            <>
              <button className="flex gap-2 overflow-x-hidden rounded-md py-1 pl-0.5 text-left leading-tight hover:bg-white/20">
                <Avatar
                  status={currentUser.status}
                  alt={currentUser.display_name || "avatar"}
                  src={currentUser.avatar}
                  className="flex-none"
                />
                <div className="flex-1 truncate">
                  <div className="max-w truncate text-xs font-semibold">
                    {currentUser.display_name}
                  </div>
                  <div className="truncate text-[11px] text-gray-300">
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
            </>
          ) : null}
        </div>
      </TooltipProvider>
    </>
  );
}
