// implement your API here
const express = require('express');

const db = require('./data/seeds/db.js');

const server = express();

server.use(express.json());