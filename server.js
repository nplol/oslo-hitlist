"use strict";

const express = require('express'),
      app     = express(),
      _server = require('http').Server(app),
      port    = process.env.PORT || 8080;

// settings
app.set('view engine', 'jade');

// routes       
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index');
});

let server = {
  listen (customPort) {
    let listen = typeof(customPort) === 'undefined' ? port : customPort;
    _server.listen(listen);
  },

  close () {
    _server.close(); 
  }
};

module.exports = server;

