import { server } from '@/main';
import { ServiceResultRes } from '@/utils/types';

const getRoomList = async (req, res) => {
  const liveService = server.connectLiveService();
  const serviceResult: ServiceResultRes = await liveService.getRoomList();

  return res.json(serviceResult);
};

export default {
  getRoomList: getRoomList,
};
