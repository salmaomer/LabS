
const express = require('express');

const routeer = express.Router();

routeer.get('/home', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

module.exports = routeer;