import { server } from '@/main';
import { ServiceResultRes } from '@/utils/types';

const login = async (req, res) => {
  const accountService = server.connectAccountService();
  const { username, password } = req.body;

  if (!username || !password) res.json(false);

  const result: ServiceResultRes = await accountService.login({ username, password });
  return res.json(result);
};

export default {
  login: login,
};
