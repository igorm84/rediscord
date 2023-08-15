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
