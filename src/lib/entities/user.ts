import { Activity } from "./activity";
import { Time } from "./time";

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
export interface CustomStatus {
  text: string;
  clearAfter: Time;
  /** Epoch milliseconds after which the status is cleared; null = never. */
  expiresAt: number | null;
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
  customStatus?: CustomStatus | null;
}
