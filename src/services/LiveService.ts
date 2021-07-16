import { Room, Account, ServiceResultRes } from '@/utils/types';

export class LiveService {
  private roomListMap: Map<string, Room>;

  constructor() {
    this.init();
    this.createTestDemoRoom();
  }

  init() {
    this.roomListMap = new Map<string, Room>();
  }

  async getRoomList(): Promise<ServiceResultRes> {
    const res = new ServiceResultRes();
    const roomList = Object.fromEntries(this.roomListMap);

    res.makeSuccess({ result: roomList });
    return res;
  }

  createRoom(client, roomInfo) {
    const roomIdList = [...this.roomListMap.keys()].sort();
    const roomId = roomIdList[roomIdList.length - 1] + 1;
    const { title, type, localDescriptionOffer, creatorSocketId } = roomInfo;
    const { accountId } = client;

    const room: Room = {
      roomId,
      memberCount: 0,
      title,
      accountId,
      channelName: `liveRoom-${roomId}`,
      // creatorDescriptionOffer: localDescriptionOffer,
      // creatorSocketId,
    };

    this.roomListMap.set(roomId, room);
    return roomId;
  }

  startLive(roomInfo) {
    console.log('live service startLive');
  }

  joinRoom(client, roomId: string) {
    const res = new ServiceResultRes();
    const room: Room = this.roomListMap.get(roomId);

    if (!room) {
      res.makeError();
      return res;
    }

    const { channelName } = room;
    const { socket: clientSocket } = client;

    clientSocket.join(channelName);
    room.memberCount += 1;

    const result = { room };
    res.makeSuccess({ result });
    return res;
  }

  sendChatMessage(client, roomId: string, message): ServiceResultRes {
    const res = new ServiceResultRes();
    const room: Room = this.roomListMap.get(roomId);

    if (!room) {
      res.makeError();
      return res;
    }

    const { channelName } = room;
    const result = { channelName, chatMessage: message };

    res.makeSuccess({ result });
    return res;
  }

  createTestDemoRoom() {
    //call AccountInfo, to Account service

    for (let i = 0; i < 5; i++) {
      const demoRoom1: Room = {
        roomId: `${i}`,
        memberCount: 1,
        title: `Demo Room ${i}`,
        accountId: '-1',
        channelName: `liveRoom-${i}`,
        creatorDescriptionOffer: undefined,
        creatorSocketId: undefined,
      };

      this.roomListMap.set(`${i}`, demoRoom1);
    }
  }
}

export default new LiveService();
