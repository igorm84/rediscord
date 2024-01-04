import { FriendsTabEnum } from "@/components/islets/friend-list/friend-tabs";
import { create } from "zustand";

interface FriendsTabState {
  currentTab: FriendsTabEnum;
  setCurrentTab: (tab: FriendsTabEnum) => void;
}

export const useFriendsTabStore = create<FriendsTabState>()((set) => ({
  currentTab: FriendsTabEnum.Available,
  setCurrentTab: (tab) => set({ currentTab: tab }),
}));
