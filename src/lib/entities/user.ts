import { Activity } from "./activity";

export enum UserStatuses {
  Online = "online",
  Idle = "idle",
  DND = "dnd",
  Offline = "offline",
  Mobile = "mobile",
}
export interface VoiceStatus {
  mute?: boolean;
  deaf?: boolean;
  serverMuted?: boolean;
}
export interface User {
  id: string;
  name: string;
  username: string;
  bio?: string;
  avatar?: string;
  status: UserStatuses;
  activity?: Activity;
  type: "user" | "bot";
}
