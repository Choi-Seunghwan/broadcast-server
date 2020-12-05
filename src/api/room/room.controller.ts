const getRoomList = async (req, res) => {
  const roomList = {
    0: { id: 0, memberCount: 0, title: 'room0' },
    1: { id: 1, memberCount: 0, title: 'room1' },
    2: { id: 2, memberCount: 0, title: 'room2' },
    3: { id: 3, memberCount: 0, title: 'room3' },
    4: { id: 4, memberCount: 0, title: 'room4' },
    5: { id: 5, memberCount: 0, title: 'room5' },
    6: { id: 6, memberCount: 0, title: 'room6' },
  };

  return res.status(200).json({ roomList: roomList });
};

export default {
  getRoomList: getRoomList,
};
