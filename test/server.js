'use strict';
var express = require('express'),
    http = require('http'),
    wr = require('./../')(express),
    router = require('./router'),
    app = express(),
    server;

//success response    
app.get('/200', function(req, res) {
  express.wr(res, {
    code : 200,
    data : 'example!',
    message : ''
  });
});

app.use('/', router);

server = http.createServer(app);

server.listen(3003, function() {
  console.log('Server started on 3003');
});

module.exports = server;
  
