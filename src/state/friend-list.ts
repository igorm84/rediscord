import create from "zustand";
import { User } from "../lib/entities/user";

type FriendStore = {
  friends: User[];
  setFriends: (friends: User[]) => void;
};

export const useFriendStore = create<FriendStore>((set) => ({
  friends: [],
  setFriends: (friends) => set({ friends }),
}));
