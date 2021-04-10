import { AccountInfo } from '@/types/types';

const liveHandler = (client, server, socket, splitedMethod, args) => {
  const liveService = server.connectLiveService();

  switch (splitedMethod[1]) {
    case 'createRoom': {
      const roomInfo = args;
      const result = liveService.createRoom(client, args);
      break;
    }

    case 'startLive': {
      const roomInfo = args[0];
      const creatorSocketId = socket.id;
      const result = liveService.startLive({ ...roomInfo, creatorSocketId });
      server.replyMessage(socket, [splitedMethod, result]);
      break;
    }
    case 'enterRoom': {
      const { roomId } = args[0];
      const result = liveService.enterRoom(roomId);
      console.log(result);
      server.replyMessage(socket, [splitedMethod, result]);
      break;
    }
    case 'live': {
      break;
    }
    default: {
    }
  }
};

export default liveHandler;
