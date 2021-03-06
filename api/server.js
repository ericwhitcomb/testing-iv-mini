const express = require('express');

const hobbits = require('../hobbits/hobbitsModel.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/hobbits', async (req, res) => {
  const rows = await hobbits.getAll();

  res.status(200).json(rows);
});

server.post('/hobbits', async (req, res) => {
  const hobbit = req.body;

  if (hobbit.name) {
    const ids = await hobbits.insert(hobbit);
    res.status(201).json(ids);
  } else {
    res.status(400).json({error: 'Missing name'});
  }
});

module.exports = server;
