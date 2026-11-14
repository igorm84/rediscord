import { create } from "zustand";
import { User } from "../lib/entities/user";
import {
  PREVIEW_CURRENT_USER,
  PREVIEW_FRIEND_REQUESTS,
} from "@/lib/utils/mock";
import { useFriendStore } from "./friend-list";
import { useCurrentUserStore } from "./user";

export type SendFriendRequestResult = { ok: boolean; message: string };

type FriendRequestStore = {
  friendRequest: User[];
  /** Usernames (lowercase) of outgoing requests sent from "Add Friend". */
  sentRequests: string[];
  acceptRequest: (id: string) => void;
  declineRequest: (id: string) => void;
  sendRequest: (username: string) => SendFriendRequestResult;
};

const sameUsername = (user: User, username: string) =>
  user.username?.toLowerCase() === username;

export const useFriendRequestStore = create<FriendRequestStore>((set, get) => ({
  friendRequest: PREVIEW_FRIEND_REQUESTS,
  sentRequests: [],
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
  sendRequest: (input) => {
    const username = input.trim().replace(/^@/, "").toLowerCase();
    if (!username) {
      return { ok: false, message: "Enter a username to send a request." };
    }
    const currentUser =
      useCurrentUserStore.getState().currentUser ?? PREVIEW_CURRENT_USER;
    if (sameUsername(currentUser, username)) {
      return {
        ok: false,
        message: "You can't send a friend request to yourself.",
      };
    }
    if (
      useFriendStore
        .getState()
        .friends.some((friend) => sameUsername(friend, username))
    ) {
      return { ok: false, message: "You're already friends with that user!" };
    }
    if (
      get().friendRequest.some((request) => sameUsername(request, username))
    ) {
      return {
        ok: false,
        message: "That user already sent you a request. Check the Pending tab.",
      };
    }
    if (get().sentRequests.includes(username)) {
      return {
        ok: false,
        message: `You already sent a friend request to ${username}.`,
      };
    }
    set(({ sentRequests }) => ({ sentRequests: [...sentRequests, username] }));
    return {
      ok: true,
      message: `Success! Your friend request to ${username} was sent.`,
    };
  },
}));
