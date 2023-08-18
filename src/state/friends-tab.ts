import { create } from "zustand";

export type FriendsTabOption = "Available" | "All" | "Pending" | "Blocked";
interface FriendsTabState {
  currentTab: FriendsTabOption;
  setCurrentTab: (tab: FriendsTabOption) => void;
}

export const useFriendsTabStore = create<FriendsTabState>()((set) => ({
  currentTab: "Available",
  setCurrentTab: (tab) => set({ currentTab: tab }),
}));
