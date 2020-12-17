const liveHandler = (server, socket, splitedMethod, args) => {
  const liveService = server.connectLiveService();

  switch (splitedMethod[1]) {
    case 'startLive': {
      const roomInfo = args[0];
      const result = liveService.startLive(roomInfo);
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
