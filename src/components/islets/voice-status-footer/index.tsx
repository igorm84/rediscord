/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Avatar from "@/components/ui/avatar";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { TooltipProvider } from "@/components/ui/tooltip";
import { VoiceStatus } from "@/lib/entities/user";
import { t } from "@/lib/i18n";
import { generateFakeCurrentUser } from "@/lib/utils/mock";
import { useCurrentUserStore } from "@/state/user";
import { useState, useEffect } from "react";
import VoiceControls from "./voice-status-controls";
import PopoverContentMain from "./voice-status-popover-content-main";

export default function VoiceStatusFooter() {
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus>({ mute: true });
  const currentUserData = generateFakeCurrentUser();
  const { currentUser, setCurrentUser } = useCurrentUserStore();

  useEffect(() => {
    if (currentUserData !== null) {
      setCurrentUser(currentUserData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {currentUser ? (
        <TooltipProvider>
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
              <VoiceControls
                voiceStatus={voiceStatus}
                setVoiceStatus={setVoiceStatus}
              />
            </div>
            <PopoverContentMain
              setCurrentUser={setCurrentUser}
              currentUser={currentUser}
            />
          </Popover>
        </TooltipProvider>
      ) : null}
    </>
  );
}
