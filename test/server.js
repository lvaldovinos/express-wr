'use strict';
var express = require('express'),
    http = require('http'),
    wr = require('./../'),
    app = express(),
    server;
    
//initiate wr
wr(app);

//success response    
app.get('/200', function(req, res) {
  app.wr({
    code : 200,
    data : 'example!'
  });
});
//error response
app.get('/400', function(req, res) {
  app.wr({
    code : 400,
    data : 'example!',
    message : 'Resource not found'
  });
});
//fail response
app.get('/500', function(req, res) {
  app.wr({
    code : 500,
    data : '',
    message : 'Error!'
  });
});

server = http.createServer(app);

server.listen(3003, function() {
  console.log('Server started on 3003');
});

module.exports = server;
  
