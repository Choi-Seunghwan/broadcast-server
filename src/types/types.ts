export interface Room {
  roomId: number;
  memberCount: number;
  title: string;
  creator: AccountInfo;
  creatorPeer;
  creatorSocketId;
}

export interface AccountInfo {
  accountId: number;
  nickname: string;
}
