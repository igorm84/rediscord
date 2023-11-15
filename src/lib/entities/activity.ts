export enum ActivityTypes {
  Playing = "playing",
  Streaming = "streaming",
  Listening = "listening",
  Watching = "watching",
}
export type Activity = {
  type: ActivityTypes;
  name: string;
  since: Date;
};
