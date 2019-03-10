// server.js

'use strict';

// Constants
// ============================================================================
const PORT = process.env.PORT || 8080;
const DB_PORT = process.env.DB_PORT || 5432;
const HOST = '0.0.0.0';

// Setup
// ============================================================================
const pg = require('pg');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

// Database Config
// ============================================================================
const config = {
  user: 'postgres',
  database: 'bolt-network-node_postgres',
  password: process.env.POSTGRES_PASSWORD,
  port: DB_PORT
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

app.get('/doodle', (req, res) => {
  res.status(200).send('Doodlemeister!');
});

app.get('/movies', (req, res) => {
  const movies = [{ title: 'Foo', rating: 'PG' }, { title: 'Bar', rating: 'R' }];

  res.status(200).send(movies);
})

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
server.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

// Socket IO
// ============================================================================
// Now for the socket.io stuff - NOTE THIS IS A RESTFUL HTTP SERVER
// We are only using socket.io here to respond to the npmStop signal
// To support IPC (Inter Process Communication) AKA RPC (Remote P.C.)

const io = require('socket.io')(server);
io.on('connection', (socketServer) => {
  socketServer.on('npmStop', () => {
    process.exit(0);
  });
});
