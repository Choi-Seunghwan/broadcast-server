import { server } from '@/main.ts';

const login = async (req, res) => {
  const accountService = server.connectAccountService();
  return res.json(accountService.createGuestAccountInfo());
};

export default {
  login: login,
};
