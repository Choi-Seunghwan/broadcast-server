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

  createTestDemoRoom() {
    //call AccountInfo, to Account service

    const demoRoom1Creator: AccountInfo = { accountId: -1, nickname: 'Creator1' };
    const demoRoom1: Room = {
      roomId: 0,
      memberCount: 1,
      title: 'Demo Room 1',
      creator: demoRoom1Creator,
      creatorPeer: undefined,
      creatorSocketId: undefined,
    };

    this.roomListMap.set(0, demoRoom1);
  }

  getRoomList() {
    return Object.fromEntries(this.roomListMap);
  }

  startLive(roomInfo) {
    console.log('live service startLive');
    this.createRoom(roomInfo);
  }

  createRoom(roomInfo) {
    /*
    need DB search query
    search last room id. create roomId 
    */
    const roomIdList = [...this.roomListMap.keys()].sort();
    const roomId = roomIdList[roomIdList.length - 1] + 1;
    const { title, creator, creatorPeer, creatorSocketId } = roomInfo;

    const room: Room = {
      roomId,
      memberCount: 0,
      title,
      creator,
      creatorPeer,
      creatorSocketId,
    };

    this.roomListMap.set(roomId, room);
  }
}

export default Live;
