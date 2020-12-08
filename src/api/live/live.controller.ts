import { server } from '@/main.ts';

const getRoomList = async (req, res) => {
  const liveService = server.connectLiveService();
  const roomList = liveService.getRoomList();

  return res.json({ roomList: roomList });
};

export default {
  getRoomList: getRoomList,
};
