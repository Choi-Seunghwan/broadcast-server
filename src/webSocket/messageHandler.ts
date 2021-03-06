import accountHandler from './account/accountHandler';
import liveHandler from './live/liveHandler';

const messageHandler = (client, server, socket, method, args) => {
  const splitedMethod = method.split('/');

  switch (splitedMethod[0]) {
    case 'live': {
      liveHandler(client, server, socket, method, args);
      break;
    }
    case 'account': {
      accountHandler(client, server, socket, method, args);
      break;
    }
    default: {
    }
  }
};

export default messageHandler;
