"use strict";

const express = require('express'),
      app     = express(),
      _server = require('http').Server(app),
      port    = process.env.PORT || 8080,
      apiRouter = require('./router').api;

// settings
app.set('view engine', 'jade');

// routes       
app.use(express.static('public'));

// application entry point which serves the javascript
// client-app.
app.get('/', function(req, res) {
  res.render('index');
});

app.use('/api/places', apiRouter.places);
// TODO: User registration (maybe not necessary)
//app.use('/api/users', apiRouter.users);

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

