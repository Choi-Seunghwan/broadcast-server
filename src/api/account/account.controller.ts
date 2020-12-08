// import { server } from '@/main.ts';

const login = async (req, res) => {
  return res.json({ nickname: 'nickname', result: true });
};

export default {
  login: login,
};
