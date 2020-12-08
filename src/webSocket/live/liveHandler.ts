const liveHandler = (server, splitedMethod, params) => {
  console.log('method', splitedMethod);
  switch (splitedMethod[1]) {
    case 'startLive': {
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
