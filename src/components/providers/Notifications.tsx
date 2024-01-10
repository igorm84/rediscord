"use client";

import useFriendInviteSocket from "@/lib/hooks/sockets/useFriendsInviteSocket";

export default function Notifications() {
  useFriendInviteSocket();
  return null;
}
