const express = require('express');
const cors = require('cors');

const appRouter = require('./routes/appRouter');

const server = express();

server.use(cors());
server.use(express.json());

server.use('/api/v1', appRouter);

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Pengin API' });
});

module.exports = server;
