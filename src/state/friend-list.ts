import { create } from "zustand";
import { User } from "../lib/entities/user";
import { PREVIEW_FRIENDS } from "@/lib/utils/mock";

type FriendStore = {
  friends: User[];
  setFriends: (friends: User[]) => void;
  addFriend: (friend: User) => void;
  removeFriend: (id: string) => void;
};

export const useFriendStore = create<FriendStore>((set) => ({
  friends: PREVIEW_FRIENDS,
  setFriends: (friends) => set({ friends }),
  addFriend: (friend) =>
    set(({ friends }) => ({
      friends: friends.some(({ id }) => id === friend.id)
        ? friends
        : [...friends, friend],
    })),
  removeFriend: (id) =>
    set(({ friends }) => ({
      friends: friends.filter((friend) => friend.id !== id),
    })),
}));
