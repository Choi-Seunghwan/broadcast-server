import express from 'express';

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 3002;

let count = 0;

app.get('/', function (req, res) {
  res.send('<h1>Hello socket</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat', (msg) => {
    console.log('message: ' + msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  setInterval(() => {
    count++;
    socket.emit('test', count);
    console.log('test, ', count);
  }, 1000);
});

http.listen(port, function () {
  console.log(`listen : ${port}`);
});


module.exports = {app}