"use strict";

var _express = _interopRequireDefault(require("express"));

var _pg = _interopRequireDefault(require("pg"));

var _http = _interopRequireDefault(require("http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// server.js
// Imports
// ============================================================================
// Constants
// ============================================================================
var PORT = process.env.PORT || 8080;
var DB_PORT = process.env.DB_PORT || 5432;
var HOST = '0.0.0.0'; // Setup
// ============================================================================

var app = (0, _express.default)();
app.use(_express.default.json());

var server = _http.default.createServer(app); // Database Config
// ============================================================================


var config = {
  user: 'postgres',
  database: 'bolt-network-node_postgres',
  password: process.env.POSTGRES_PASSWORD,
  port: DB_PORT // Database Init
  // ============================================================================
  // pg.connect('postgres://postgres:password@localhost:5432/practice-docker');

};
var pool = new _pg.default.Pool(config); // const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';
// const client = new pg.Client(connectionString);
// client.connect();
// const query = client.query(
//   'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
// query.on('end', () => { client.end(); });
// App Routes
// ============================================================================

app.get('/', function (req, res) {
  res.status(200).send('Hello World\n');
});
app.get('/doodle', function (req, res) {
  res.status(200).send('Doodlemeister!');
});
app.get('/movies', function (req, res) {
  var movies = [{
    title: 'Foo',
    rating: 'PG'
  }, {
    title: 'Bar',
    rating: 'R'
  }];
  res.status(200).send(movies);
});
app.get('/genres', function (req, res) {
  var genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Sci-Fi'];
  res.status(200).send(genres);
}); // Example database connected route
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
console.log("Running on http://".concat(HOST, ":").concat(PORT)); // Socket IO
// ============================================================================
// Now for the socket.io stuff - NOTE THIS IS A RESTFUL HTTP SERVER
// We are only using socket.io here to respond to the npmStop signal
// To support IPC (Inter Process Communication) AKA RPC (Remote P.C.)

var io = require('socket.io')(server);

io.on('connection', function (socketServer) {
  socketServer.on('npmStop', function () {
    process.exit(0);
  });
});