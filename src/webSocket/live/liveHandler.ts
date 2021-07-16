import { Account, SocketReplyMessage, ServiceResultRes } from '@/utils/types';

const liveHandler = async (client, server, socket, method, args) => {
  const liveService = server.connectLiveService();
  const splitedMethod = method.split('/');

  switch (splitedMethod[1]) {
    case 'createRoom': {
      const roomInfo = args;
      const serviceResult: ServiceResultRes = await liveService.createRoom(client, args);
      const { result, errorCode } = serviceResult;
      const replyMessage: SocketReplyMessage = { method, result, errorCode };

      server.replyMessage(socket, replyMessage);
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
      const serviceResult: ServiceResultRes = await liveService.joinRoom(client, roomId);
      const { result, errorCode } = serviceResult;
      const replyMessage: SocketReplyMessage = { method, result, errorCode };

      server.replyMessage(socket, replyMessage);
      break;
    }
    case 'sendChatMessage': {
      const { roomId, message } = args;
      const serviceResult: ServiceResultRes = await liveService.sendChatMessage(client, roomId, message);
      const { result, errorCode } = serviceResult;
      const replyMessage: SocketReplyMessage = { method, result, errorCode };

      server.replyMessage(socket, replyMessage);

      if (errorCode) return;

      const { channelName } = serviceResult.result;
      const { socket: clientSocket } = client;
      const chatReceiveMethod = 'chat/receiveChatMessage';
      const channelSocketReplyMessage: SocketReplyMessage = { method: chatReceiveMethod, errorCode, result };

      clientSocket.to(channelName).emit('replyMessage', channelSocketReplyMessage);
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
