import { Component, ReactComponentElement } from "react";
import { AiFillSound } from "react-icons/ai";
import { BsHash } from "react-icons/bs";

// here keys represent the type of channel
export const channelIcons = {
  "text": BsHash,
  "voice": AiFillSound,
}
export interface Channel {
  id: string;
  title: string;
  slug: string;
  type: keyof typeof channelIcons;
}
export interface ChannelGroup {
  id: string;
  title: string;
  channels: Channel[];
}
