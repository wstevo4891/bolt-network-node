// server.js

'use strict';

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// Packages
const express = require('express');
const pg = require('pg');

// Database
pg.connect('postgres://postgres:password@localhost:5432/practice-docker');

// App
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello World\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

// Now for the socket.io stuff - NOTE THIS IS A RESTFUL HTTP SERVER
// We are only using socket.io here to respond to the npmStop signal
// To support IPC (Inter Process Communication) AKA RPC (Remote P.C.)

const io = require('socket.io')(app);
io.on('connection', (socketServer) => {
  socketServer.on('npmStop', () => {
    process.exit(0);
  });
});
