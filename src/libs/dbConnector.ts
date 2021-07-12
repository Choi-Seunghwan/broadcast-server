import Logger from '@/utils/logger';
import CryptoModule from '@/libs/CryptoModule';

const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const dbConfig = require('@/db/dbConfig.json');

const SEQ_MODEL_ACCOUNT = 'account';

export class DbConnector {
  private sequelizeInstance;
  private accountModel;

  constructor() {
    this.init();
  }

  async init() {
    const connectionCheck = async () => {
      try {
        await this.sequelizeInstance.authenticate();
        await this.initModel();
      } catch (e) {
        Logger.debug('dbConnector init error catch', e);
      }
    };
    // if (process.env.NODE_ENV === 'local') {
    //   //
    // }
    this.sequelizeInstance = new Sequelize(dbConfig[process.env.NODE_ENV]);
    await connectionCheck();

    Logger.debug('dbConnector init end');
  }

  async initModel() {
    const sq = this.sq();

    if (!sq) return;
    this.accountModel = await sq.define(
      SEQ_MODEL_ACCOUNT,
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING,
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
      },
      {
        freezeTableName: true,
        timestamps: true,
      }
    );
    await sq.sync({ force: true });

    const pwHash = await CryptoModule.encryption('1234');
    const adminUser = await this.accountModel.create({ username: 'admin', nickname: 'testAdmin', password: pwHash });
  }

  sq() {
    if (this.sequelizeInstance) return this.sequelizeInstance;
  }

  getAccountModel() {
    if (this.accountModel) return this.accountModel;
  }
}

export default new DbConnector();
