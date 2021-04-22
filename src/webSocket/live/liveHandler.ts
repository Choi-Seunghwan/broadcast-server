import { AccountInfo } from '@/types/types';

const liveHandler = (client, server, socket, splitedMethod, args) => {
  const liveService = server.connectLiveService();
  let result;
  switch (splitedMethod[1]) {
    case 'createRoom': {
      const roomInfo = args;
      const result = liveService.createRoom(client, args);
      server.replyMessage(socket, { message: splitedMethod, result });
      break;
    }

    // case 'startLive': {
    //   const roomInfo = args[0];
    //   const creatorSocketId = socket.id;
    //   const result = liveService.startLive({ ...roomInfo, creatorSocketId });
    //   server.replyMessage(socket, [splitedMethod, result]);
    //   break;
    // }
    case 'joinRoom': {
      const { roomId } = args;
      result = liveService.joinRoom(client, roomId);
      server.replyMessage(socket, { message: splitedMethod, result });
      break;
    }
    case 'sendChatMessage': {
      const { roomId, message } = args;
      result = liveService.sendChatMessage(client, roomId, message);
      server.replyMessage(socket, { message: splitedMethod, result });
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
