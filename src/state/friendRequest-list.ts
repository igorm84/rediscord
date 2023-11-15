import { create } from "zustand";
import { User } from "../lib/entities/user";

type FriendRequestStore = {
  friendRequest: User[] | null;
  setFriendRequests: (friendRequest: User[]) => void;
};
export const useFriendRequestStore = create<FriendRequestStore>((set) => ({
  friendRequest: null,
  setFriendRequests: (friendRequest) => set({ friendRequest }),
}));
