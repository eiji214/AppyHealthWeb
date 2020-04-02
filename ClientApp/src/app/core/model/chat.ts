export interface Chat {
  ToUserId: number;
  ToUser: string;
  FromUser: string;
  FromUserId: number;
  LastMessageDate: Date;
  MessageRead: Boolean;
}
