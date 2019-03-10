// server.js

'use strict';

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// Packages
const express = require('express');
const pg = require('pg');

// Database
// pg.connect('postgres://postgres:password@localhost:5432/practice-docker');

// App
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello World\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
