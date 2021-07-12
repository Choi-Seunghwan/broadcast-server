const bcrypt = require('bcrypt');

export class CryptoModule {
  private saltRound: number;

  constructor() {
    this.init();
  }

  init() {
    this.saltRound = 10;
  }

  async encryption(val) {
    const hash = await bcrypt.hash(val, this.saltRound);
    return hash;
  }

  async check(val, hash) {
    const result = await bcrypt.compare(val, hash);
    return result;
  }
}

export default new CryptoModule();
