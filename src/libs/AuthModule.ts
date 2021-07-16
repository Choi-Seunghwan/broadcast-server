import { JWT_KEY } from '@/env';
import logger from '@/utils/logger';
const jwt = require('jsonwebtoken');

export class AuthModule {
  private options: Object;

  constructor() {
    logger.debug('@@', JWT_KEY);

    this.init();
  }

  init() {
    logger.debug('@@', JWT_KEY);
  }

  setOptions(options) {
    this.options = options;
  }

  async sign(payload, options, cb) {
    // const result = jwt.sign(payload, JWT_KEY, options);

    if (cb) cb();
    // return result;
  }

  async verify(token) {
    jwt.verify();
  }
}

export default new AuthModule();
