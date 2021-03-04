require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();
require('./db');

app.use(cors());
app.use(express.json());
app.use('/', routes);

module.exports = app;
