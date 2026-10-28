import { create } from "zustand";
import { User } from "../lib/entities/user";
import { PREVIEW_FRIEND_REQUESTS } from "@/lib/utils/mock";
import { useFriendStore } from "./friend-list";

type FriendRequestStore = {
  friendRequest: User[];
  acceptRequest: (id: string) => void;
  declineRequest: (id: string) => void;
};

export const useFriendRequestStore = create<FriendRequestStore>((set, get) => ({
  friendRequest: PREVIEW_FRIEND_REQUESTS,
  acceptRequest: (id) => {
    const friend = get().friendRequest.find((request) => request.id === id);
    if (!friend) return;
    useFriendStore.getState().addFriend(friend);
    set(({ friendRequest }) => ({
      friendRequest: friendRequest.filter((request) => request.id !== id),
    }));
  },
  declineRequest: (id) =>
    set(({ friendRequest }) => ({
      friendRequest: friendRequest.filter((request) => request.id !== id),
    })),
}));
