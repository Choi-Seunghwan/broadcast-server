import Logger from '@/utils/logger';

const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const dbConfig = require('@/db/dbConfig.json');

const SEQ_MODEL_ACCOUNT = 'account';

class DbConnector {
  private sequelizeInstance;
  private accountModel;

  constructor() {
    this.init();
  }

  async init() {
    const connectionCheck = async () => {
      try {
        this.sequelizeInstance.authenticate();

        this.initModel();
      } catch (e) {
        Logger.debug('dbConnector init error catch', e);
      }
    };
    // if (process.env.NODE_ENV === 'local') {
    //   //
    // }
    this.sequelizeInstance = new Sequelize(dbConfig[process.env.NODE_ENV]);
    connectionCheck();

    Logger.debug('dbConnector init end');
  }

  async initModel() {
    const initAccountModel = async () => {
      this.accountModel = sq.define(SEQ_MODEL_ACCOUNT, {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        nickname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createDateTime: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        updateDateTime: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      });

      const adminUser = await this.accountModel.create({ id: 0, nickname: 'admin', password: '1234' });
    };

    const sq = this.sq();
    initAccountModel();
  }

  sq() {
    return this.sequelizeInstance;
  }
}

export default DbConnector;
