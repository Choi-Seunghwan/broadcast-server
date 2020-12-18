export interface Room {
  roomId: number;
  memberCount: number;
  title: string;
  creator: AccountInfo;
  localDescriptionOffer;
  creatorSocketId;
}

export interface AccountInfo {
  accountId: number;
  nickname: string;
}
