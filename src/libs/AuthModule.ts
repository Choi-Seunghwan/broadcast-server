const jwt = require('jsonwebtoken');

export class AuthModule {
  private options: Object;

  setOptions(options) {
    this.options = options;
  }

  async sign(payload, secret, options, cb) {
    const result = jwt.sign(payload, secret, options);
    return result;
  }

  async verify(token) {
    jwt.verify();
  }
}

export default new AuthModule();
