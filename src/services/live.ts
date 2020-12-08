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
}

export default Live;
