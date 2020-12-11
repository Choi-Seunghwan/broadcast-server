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

  createRoom() {
    // peer description;
  }

  startLive() {
    console.log('live service startLive');
  }
}

export default Live;
