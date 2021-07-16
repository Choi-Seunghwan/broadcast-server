import _get from 'lodash/get';
import { AccountInfo, ServiceResultRes } from '@/utils/types';
import { SIGNIN_SUCCESS, SIGNIN_FAIL, LOGIN_SUCCESS, LOGIN_FAIL } from '@/utils/constatns';
import DbConnector from '@/libs/DbConnector';
import CryptoModule from '@/libs/CryptoModule';
import AuthModule from '@/libs/AuthModule';

export class Account {
  constructor() {
    AuthModule.init();
  }

  async signIn({ username, nickname, password }) {
    const res = new ServiceResultRes();
    const accountModel = DbConnector.getAccountModel();
    const pwHash = await CryptoModule.encryption(password);
    const account = accountModel.create({ username, nickname, password: pwHash });

    if (!account) {
      const statusCode = SIGNIN_FAIL;
      res.makeError({ statusCode });

      return res;
    }

    res.makeSuccess({ result: account, statusCode: SIGNIN_SUCCESS });
    return res;
  }

  async login({ username, password }): Promise<ServiceResultRes> {
    const res = new ServiceResultRes();
    const accountModel = DbConnector.getAccountModel();
    const account = await accountModel.findOne({ where: { username } });
    const { password: accountPwHash } = account;

    const isMatched = await CryptoModule.check(password, accountPwHash);

    if (!isMatched) {
      res.makeError({ statusCode: LOGIN_FAIL });
      return res;
    }

    const nickname: string = _get(account, 'nickname', '');
    const accountInfo: AccountInfo = { username, nickname };

    res.makeSuccess({ result: accountInfo, statusCode: LOGIN_SUCCESS });
    return res;
  }

  // createGuestAccountInfo() {
  //   const rand = Math.floor(Math.random() * 100);
  //   const guestAccountInfo: AccountInfo = { accountId: -1, nickname: `Guest${rand}` };
  //   return guestAccountInfo;
  // }
}

export default new Account();
