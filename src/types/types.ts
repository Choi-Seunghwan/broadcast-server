export interface Room {
  roomId: string;
  memberCount: number;
  title: string;
  accountId: string;
  channelName: string;
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
