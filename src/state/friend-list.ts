import { User } from "@prisma/client";
import { create } from "zustand";

type FriendStore = {
  friends: User[] | null;
  setFriends: (friends: User[]) => void;
};

export const useFriendStore = create<FriendStore>((set) => ({
  friends: null,
  setFriends: (friends) => set({ friends }),
}));
