import accountHandler from './account/accountHandler';
import liveHandler from './live/liveHandler';

const messageHandler = (server, method, params) => {
  const splitedMethod = method.split('/');

  switch (splitedMethod[0]) {
    case 'live': {
      liveHandler(server, splitedMethod, params);
      break;
    }
    case 'account': {
      accountHandler(server, splitedMethod, params);
      break;
    }
    default: {
    }
  }
};

export default messageHandler;
