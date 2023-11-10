import { create } from "zustand";

export type MessageTypeItem = "emoji" | "stickers" | "gif" | null;

type MessageTypeStore = {
  type: MessageTypeItem;
  setType: (newType: MessageTypeItem) => void;
};

export const useMessageType = create<MessageTypeStore>((set) => ({
  type: null,
  setType(newType) {
    set({ type: newType });
  },
}));
