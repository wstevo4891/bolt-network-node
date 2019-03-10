// server.stop.js

'use strict';

const io = require('socket.io-client');
const socketClient = io.connect('http://localhost');

socketClient.on('connect', () => {
  socketClient.emit('npmStop');

  setTimeout(() => {
    process.exit(0);
  }, 1000);
});
