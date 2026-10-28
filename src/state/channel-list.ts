import { create } from "zustand";
import { PREVIEW_CHANNELS } from "@/lib/utils/mock";
import { ListedDMChannel } from "@/lib/entities/channel";

type Channelstore = {
  channels: ListedDMChannel[];
  setChannels: (channels: ListedDMChannel[]) => void;
};

export const useChannelStore = create<Channelstore>((set) => ({
  channels: PREVIEW_CHANNELS,
  setChannels: (channels) => set({ channels }),
}));
