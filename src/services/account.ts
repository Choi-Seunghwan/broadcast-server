import { AccountInfo, ServiceResultRes } from '@/utils/types';
import DbConnector from '@/libs/DbConnector';
import CryptoModule from '@/libs/CryptoModule';
import _get from 'lodash/get';

export class Account {
  constructor() {}

  async login({ username, password }): Promise<ServiceResultRes> {
    const res: ServiceResultRes = { errorCode: '', description: '', result: {} };
    const pwHash = await CryptoModule.encryption(password);

    const accountModel = DbConnector.getAccountModel();
    const account = await accountModel.findOne({ where: { username } });
    const { password: accountPwHash } = account;

    const isMatched = await CryptoModule.check(password, accountPwHash);

    if (!isMatched) {
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
