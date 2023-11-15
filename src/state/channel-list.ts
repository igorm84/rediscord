import { create } from "zustand";
import { ListedDMChannel } from "@/lib/entities/channel";

type Channelstore = {
  channels: ListedDMChannel[] | null;
  setChannels: (channels: ListedDMChannel[]) => void;
};

export const useChannelStore = create<Channelstore>((set) => ({
  channels: null,
  setChannels: (channels) => set({ channels }),
}));
