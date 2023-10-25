export interface Message {
  id: string;
  replyMessageId?: string;
  authorNickname: string;
  authorAvatar: string;
  message: string;
  timestamp: number;
}
