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
  username?: string | null;
  bio?: string;
  avatar?: string | null;
  status: UserStatuses;
  activity?: Activity | null;
  type?: "user" | "bot";
}
