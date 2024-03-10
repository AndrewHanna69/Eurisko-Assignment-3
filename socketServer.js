const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer();

const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('statusChange', (data) => {
    io.to(data.userId).emit('statusChanged', data.status);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

module.exports = server;