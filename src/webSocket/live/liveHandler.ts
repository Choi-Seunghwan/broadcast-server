const liveHandler = (server, socket, splitedMethod, args) => {
  const liveService = server.connectLiveService();

  switch (splitedMethod[1]) {
    case 'startLive': {
      const result = liveService.startLive();
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
