import accountHandler from './account/accountHandler';
import liveHandler from './live/liveHandler';

const messageHandler = (server, socket, method, args) => {
  const splitedMethod = method.split('/');

  switch (splitedMethod[0]) {
    case 'live': {
      liveHandler(server, socket, splitedMethod, args);
      break;
    }
    case 'account': {
      accountHandler(server, socket, splitedMethod, args);
      break;
    }
    default: {
    }
  }
};

export default messageHandler;
