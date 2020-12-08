// import { server } from '@/main.ts';

const getRoomList = async (req, res) => {
  const roomList = [
    { id: 0, memberCount: 0, title: 'room0' },
    { id: 1, memberCount: 0, title: 'room1' },
    { id: 2, memberCount: 0, title: 'room2' },
    { id: 3, memberCount: 0, title: 'room3' },
    { id: 4, memberCount: 0, title: 'room4' },
    { id: 5, memberCount: 0, title: 'room5' },
    { id: 6, memberCount: 0, title: 'room6' },
  ];
  return res.json({ roomList: roomList });
};

export default {
  getRoomList: getRoomList,
};
