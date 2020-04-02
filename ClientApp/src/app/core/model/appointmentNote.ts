export interface ReferralNote {
  Id: number;
  ReferralId: number;
  Date: Date;
  Message: string;
  FollowUpAction: string;
  NoteByUserId: string;
}
