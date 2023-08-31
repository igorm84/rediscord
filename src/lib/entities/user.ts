import { Database } from "../db/database.types";
import { Activity } from "./activity";

export enum UserStatuses {
  online = "online",
  idle = "idle",
  dnd = "dnd",
  offline = "offline",
  mobile = "mobile",
}
export interface VoiceStatus {
  mute?: boolean;
  deaf?: boolean;
  serverMuted?: boolean;
}

export type User = Omit<
  Database["public"]["Tables"]["profiles"]["Row"],
  "status"
> & {
  activities?: Activity[];
  status: UserStatuses;
};
