import { Room, AccountInfo, ErrorInfo } from '@/types/types';
import { ERROR_TYPE_DEFAULT } from '@/constant';

class Live {
  private roomListMap: Map<string, Room>;

  constructor() {
    this.init();
    this.createTestDemoRoom();
  }

  init() {
    this.roomListMap = new Map<string, Room>();
  }

  getRoomList() {
    return Object.fromEntries(this.roomListMap);
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
    const room: Room = this.roomListMap.get(roomId);
    const { channelName } = room;

    const { socket: clientSocket } = client;
    clientSocket.join(channelName);

    room.memberCount += 1;
    return room;
  }

  sendChatMessage(client, roomId: string, message) {
    const room: Room = this.roomListMap.get(roomId);
    if (!room) {
      const err: ErrorInfo = { type: ERROR_TYPE_DEFAULT, message: '' };
      return err;
    }

    const { channelName } = room;

    const { socket: clientSocket } = client;
    clientSocket.to(channelName).emit('chat/receiveChatMessage', message);
  }

  createTestDemoRoom() {
    //call AccountInfo, to Account service

    for (let i = 0; i < 12; i++) {
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

export default Live;
