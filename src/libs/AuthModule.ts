import { JWT } from '@/env';
import logger from '@/utils/logger';
const jwt = require('jsonwebtoken');

export class AuthModule {
  private options: Object;

  constructor() {
    this.init();
  }

  init() {
    const { options } = JWT;
    this.setOptions(options);
  }

  setOptions(options) {
    this.options = options;
  }

  async sign(payload = {}, options = null, cb = null) {
    const { key: secrectKey } = JWT;
    const result = jwt.sign(payload, secrectKey, options || this.options);

    if (cb) cb();
    return result;
  }

  async verify(token) {
    const isVerified = jwt.verify(token);
    return isVerified;
  }
}

export default new AuthModule();
