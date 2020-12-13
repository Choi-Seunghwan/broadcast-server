import { AccountInfo } from '@/types/types';

class Account {
  constructor() {}

  createGuestAccountInfo() {
    const rand = Math.floor(Math.random() * 100);
    const guestAccountInfo: AccountInfo = { accountId: -1, nickname: `Guest${rand}` };
    return guestAccountInfo;
  }
}

export default Account;
