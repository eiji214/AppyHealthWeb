export interface ChatMessage {
  Id: number;
  Date: Date;
  Message: string;
  // FromUser: string;
  FromUserName: string;
  FromUserId: number;
  ToUserId: number;
}
