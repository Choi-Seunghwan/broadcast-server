import { Room, AccountInfo } from '@/types/types';
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
    const { channelName } = room;

    const { socket: clientSocket } = client;
    clientSocket.to(channelName).emit('chat/receiveChatMessage', message);
  }

  createTestDemoRoom() {
    //call AccountInfo, to Account service
    const demoRoom1: Room = {
      roomId: '0',
      memberCount: 1,
      title: 'Demo Room 1',
      accountId: '-1',
      channelName: 'liveRoom-0',
      creatorDescriptionOffer: undefined,
      creatorSocketId: undefined,
    };

    this.roomListMap.set('0', demoRoom1);
  }
}

export default Live;
