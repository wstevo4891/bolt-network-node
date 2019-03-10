// server.js

'use strict';

// Constants
// ============================================================================
const PORT = process.env.PORT;
const HOST = '0.0.0.0';

// Setup
// ============================================================================
const pg = require('pg');
const express = require('express');
const app = express();

// Database Config
// ============================================================================
const config = {
  user: 'postgres',
  database: 'bolt-network-node_postgres',
  password: process.env.POSTGRES_PASSWORD,
  port: PORT
};

// Database Init
// ============================================================================
// pg.connect('postgres://postgres:password@localhost:5432/practice-docker');
const pool = new pg.Pool(config);

// App Routes
// ============================================================================
app.get('/', (req, res) => {
  res.status(200).send('Hello World\n');
});

// Example database connected route
// ============================================================================
// app.get('/', (req, res, next) => {
//   pool.connect(function (err, client, done) {
//     if (err) {
//       console.log("Can not connect to the DB" + err);
//     }
//     client.query('SELECT * FROM GetAllStudent()', function (err, result) {
//       done();
//       if (err) {
//           console.log(err);
//           res.status(400).send(err);
//       }
//       res.status(200).send(result.rows);
//     })
//   })
// });

// App Listen
// ============================================================================
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

// Socket IO
// ============================================================================
// Now for the socket.io stuff - NOTE THIS IS A RESTFUL HTTP SERVER
// We are only using socket.io here to respond to the npmStop signal
// To support IPC (Inter Process Communication) AKA RPC (Remote P.C.)

const io = require('socket.io')(app);
io.on('connection', (socketServer) => {
  socketServer.on('npmStop', () => {
    process.exit(0);
  });
});
