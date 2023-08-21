import { create } from "zustand";
import { User } from "../lib/entities/user";

type FriendStore = {
  friends: User[] | null;
  setFriends: (friends: User[]) => void;
};

export const useFriendStore = create<FriendStore>((set) => ({
  friends: null,
  setFriends: (friends) => set({ friends }),
}));
