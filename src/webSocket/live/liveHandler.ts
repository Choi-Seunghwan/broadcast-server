const liveHandler = (server, socket, splitedMethod, args) => {
  const liveService = server.connectLiveService();

  switch (splitedMethod[1]) {
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
