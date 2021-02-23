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
    const { title, creator, localDescriptionOffer, creatorSocketId } = roomInfo;

    const room: Room = {
      roomId,
      memberCount: 0,
      title,
      creator,
      creatorDescriptionOffer: localDescriptionOffer,
      creatorSocketId,
    };

    this.roomListMap.set(roomId, room);
  }

  enterRoom(roomId) {
    // check guest or creator. return flag

    const room: Room = this.roomListMap.get(roomId);

    // add user, db
    console.log(roomId, Number(roomId));
    console.log(this.roomListMap.get(1), room);
    return room;
  }

  // temp
  createTestDemoRoom() {
    //call AccountInfo, to Account service

    const demoRoom1Creator: AccountInfo = { accountId: -1, nickname: 'Creator1' };
    const demoRoom1: Room = {
      roomId: 0,
      memberCount: 1,
      title: 'Demo Room 1',
      creator: demoRoom1Creator,
      creatorDescriptionOffer: undefined,
      creatorSocketId: undefined,
    };

    this.roomListMap.set(0, demoRoom1);
  }
}

export default Live;
