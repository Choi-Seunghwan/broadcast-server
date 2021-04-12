import { Room, AccountInfo } from '@/types/types';
class Live {
  private roomListMap: Map<number, Room>;

  constructor() {
    this.init();
    this.createTestDemoRoom();
  }

  init() {
    this.roomListMap = new Map<number, Room>();
  }

  getRoomList() {
    return Object.fromEntries(this.roomListMap);
  }

  /**
   * @param roomInfo - {title, type, }
   */
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
      // creatorDescriptionOffer: localDescriptionOffer,
      // creatorSocketId,
    };

    this.roomListMap.set(roomId, room);
    return roomId;
  }

  startLive(roomInfo) {
    console.log('live service startLive');
  }

  joinRoom(roomId) {
    const room: Room = this.roomListMap.get(roomId);

    return room;
  }

  leaveRoom(client, roomId) {}

  createTestDemoRoom() {
    //call AccountInfo, to Account service
    const demoRoom1: Room = {
      roomId: 0,
      memberCount: 1,
      title: 'Demo Room 1',
      accountId: '-1',
      creatorDescriptionOffer: undefined,
      creatorSocketId: undefined,
    };

    this.roomListMap.set(0, demoRoom1);
  }
}

export default Live;
