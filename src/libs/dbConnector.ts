import Logger from '@/utils/logger';
const Sequelize = require('sequelize');

class DbConnector {
  private sequelizeInstance;

  constructor() {
    this.init();
  }

  async init() {
    const connectionCheck = async () => {
      try {
        this.sequelizeInstance.authenticate();
      } catch (e) {
        Logger.debug('@@@ catch', e);
      }
    };

    if (process.env.NODE_ENV === 'local') {
      //
    }
    this.sequelizeInstance = new Sequelize('sqlite::memory:');
    connectionCheck();

    Logger.debug('@@ dbConnector init end');
  }

  sq() {
    return this.sequelizeInstance;
  }
}

export default DbConnector;
