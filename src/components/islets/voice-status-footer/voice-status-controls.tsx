import React from "react";
import VoiceStatusButton from "./voice-status-button";
import { BsGearFill, BsHeadphones, BsMicFill } from "react-icons/bs";

interface VoiceControlsProps {
  voiceStatus: {
    mute?: boolean;
    deaf?: boolean;
  };
  setVoiceStatus: (
    statusUpdater: (prev: { mute?: boolean; deaf?: boolean }) => {
      mute?: boolean;
      deaf?: boolean;
    },
  ) => void;
}
function VoiceControls({ voiceStatus, setVoiceStatus }: VoiceControlsProps) {
  return (
    <div className="flex items-center">
      <VoiceStatusButton
        muted={voiceStatus.mute || voiceStatus.deaf}
        tooltipText={voiceStatus.mute || voiceStatus.deaf ? "Unmute" : "Mute"}
        onClick={() =>
          setVoiceStatus((prev) => ({
            ...prev,
            deaf: false,
            mute: !prev?.mute,
          }))
        }
        icon={<BsMicFill fontSize={18} />}
      />
      <VoiceStatusButton
        muted={voiceStatus.deaf}
        tooltipText={voiceStatus.deaf ? "Undeaf" : "Deaf"}
        onClick={() =>
          setVoiceStatus((prev: { mute?: boolean; deaf?: boolean }) => ({
            ...prev,
            deaf: !prev.deaf,
          }))
        }
        icon={<BsHeadphones fontSize={20} />}
      />
      <VoiceStatusButton
        tooltipText="Settings"
        icon={<BsGearFill fontSize={18} />}
      />
    </div>
  );
}

export default VoiceControls;
