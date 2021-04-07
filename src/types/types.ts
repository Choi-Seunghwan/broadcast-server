export interface Room {
  roomId: number;
  memberCount: number;
  title: string;
  creator: AccountInfo;
  creatorDescriptionOffer?;
  creatorSocketId?;
}

export interface AccountInfo {
  accountId: number;
  nickname: string;
  connectionInfo?: ConnectionInfo;
}

export interface ConnectionInfo {
  socket: any;
  socketId: string;
}
