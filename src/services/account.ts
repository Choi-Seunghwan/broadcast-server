import { AccountInfo, ServiceResultRes } from '@/utils/types';
import DbConnector from '@/libs/dbConnector';
import _get from 'lodash/get';

export class Account {
  constructor() {}

  async login({ username, password }): Promise<ServiceResultRes> {
    const res: ServiceResultRes = { errorCode: '', description: '', result: {} };
    const accountModel = DbConnector.getAccountModel();
    const account = await accountModel.findOne({ where: { username, password } });

    if (!account) {
      res.errorCode = 'LOGIN_FAIL';
      return res;
    }

    const nickname: string = _get(account, 'nickname', '');
    const accountInfo: AccountInfo = { username, nickname };

    res.result = { accountInfo };
    return res;
  }

  // createGuestAccountInfo() {
  //   const rand = Math.floor(Math.random() * 100);
  //   const guestAccountInfo: AccountInfo = { accountId: -1, nickname: `Guest${rand}` };
  //   return guestAccountInfo;
  // }
}

export default new Account();
