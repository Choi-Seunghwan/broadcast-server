export default (server, socket) => {


  switch(socket){ // check message name and split
    case
      break
     ... // room , account.. 
  }


  const existingSocket = server.activeSockets.find((existingSocket) => existingSocket === socket.id);

  if (!existingSocket) {
    server.activeSockets.push(socket.id);

    socket.emit('update-user-list', {
      users: server.activeSockets.filter((existingSocket) => existingSocket !== socket.id),
    });

    socket.broadcast.emit('update-user-list', {
      users: [socket.id],
    });
  }

  socket.on('call-user', (data: any) => {
    socket.to(data.to).emit('call-made', {
      offer: data.offer,
      socket: socket.id,
    });
  });

  socket.on('make-answer', (data) => {
    socket.to(data.to).emit('answer-made', {
      socket: socket.id,
      answer: data.answer,
    });
  });

  socket.on('reject-call', (data) => {
    socket.to(data.from).emit('call-rejected', {
      socket: socket.id,
    });
  });

  socket.on('disconnect', () => {
    server.activeSockets = server.activeSockets.filter((existingSocket) => existingSocket !== socket.id);
    socket.broadcast.emit('remove-user', {
      socketId: socket.id,
    });
  });
};
