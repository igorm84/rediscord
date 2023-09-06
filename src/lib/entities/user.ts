import { Activity } from "./activity";

export enum StaticUserStatuses {
  Online = "online",
  Idle = "idle",
  DND = "dnd",
  Offline = "offline",
  Mobile = "mobile",
}
export type UserStatuses = StaticUserStatuses | string;
export interface VoiceStatus {
  mute?: boolean;
  deaf?: boolean;
  serverMuted?: boolean;
}
export interface User {
  id: string;
  name: string;
  username?: string | null;
  bio?: string;
  avatar?: string | null;
  status: StaticUserStatuses;
  activity?: Activity | null;
  type?: "user" | "bot";
}
