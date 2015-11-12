'use strict';
var express = require('express'),
  bodyParser = require('body-parser'),
  http = require('http'),
  wr = require('./../')(express),
  router = require('./router'),
  app = express(),
  server;

// body parser
app.use(bodyParser.json());

//success response    
app.get('/200', function(req, res) {
  express.wr(res, {
    code : 200,
    data : 'example!',
    message : ''
  });
});

app.use('/', router);

app.get('/string', function(req, res) {
  express.wr(res, 'sending a string!');
});

app.get('/number', function(req, res) {
  express.wr(res, 150.49);
});

app.get('/boolean', function(req, res) {
  express.wr(res, true);
});

app.get('/null', function(req, res) {
  express.wr(res, null);
});

app.get('/undefined', function(req, res) {
  express.wr(res, undefined);
});

app.get('/date', function(req, res) {
  express.wr(res, new Date());
});

app.get('/array', function(req, res) {
  express.wr(res, ['1',2,3]);
});

app.get('/empty', function(req, res) {
  express.wr(res);
});

app.get('/object', function(req, res) {
	express.wr(res, { userIds : [ 1, 2, 3, 4, 5]});
});

app.post('/custom', function(req, res) {
  var body = req.body;
  express.wr(res, {
    code: 200,
    data: {},
    message: ''
  }, body);
});

server = http.createServer(app);

server.listen(3003, function() {
  console.log('Server started on 3003');
});

module.exports = server;
  
