'use strict';

var should = require('should'),
    request = require('supertest'),
    server = require('./server');
    
describe('Express Wrapped Response test case', function() {
  it('should return a Success wrapped response', function(done) {
    request(server)
      .get('/200')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        var body = res.body;
        should(err).not.be.ok;
        body.code.should.be.a.Number;
        body.code.should.be.exactly(200);
        body.data.should.be.a.String;
        body.data.should.not.be.empty;
        body.message.should.be.a.String;
        body.message.should.be.empty;
        body.status.should.be.exactly('success');
        done();
      });
  });
  it('should return an Error wrapped response', function(done) {
    request(server)
      .get('/400')
      .expect(400)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        var body = res.body;
        should(err).not.be.ok;
        body.code.should.be.a.Number;
        body.code.should.be.exactly(400);
        body.data.should.be.a.String;
        body.data.should.not.be.empty;
        body.message.should.be.a.String;
        body.message.should.not.be.empty;
        body.status.should.be.exactly('error');
        done();
      });
  });
  it('should return a Fail wrapped response', function(done) {
    request(server)
      .get('/500')
      .expect(500)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        var body = res.body;
        should(err).not.be.ok;
        body.code.should.be.a.Number;
        body.code.should.be.exactly(500);
        body.data.should.be.a.String;
        body.data.should.be.empty;
        body.message.should.be.a.String;
        body.message.should.not.be.empty;
        body.status.should.be.exactly('fail');
        done();
      });
  });
  it('should return a Success wrapped response in spite of user only sent a STRING as body', function(done) {
    request(server)
      .get('/string')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        var body = res.body;
        body.code.should.be.exactly(200);
        body.status.should.be.exactly('success');
        body.message.should.be.a.String;
        body.message.should.be.empty;
        body.data.should.be.a.String;
        body.data.should.not.be.empty;
        done();
      });
  });
  it('should return a Success wrapped response in spite of user only sent a NUMBER as body', function(done) {
    request(server)
      .get('/number')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        var body = res.body;
        body.code.should.be.exactly(200);
        body.status.should.be.exactly('success');
        body.message.should.be.a.String;
        body.message.should.be.empty;
        body.data.should.be.a.Number;
        body.data.should.be.ok;
        done();
      });
  });
  it('should return a Success wrapped response in spite of user only sent a BOOLEAN as body', function(done) {
    request(server)
      .get('/boolean')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        var body = res.body;
        body.code.should.be.exactly(200);
        body.status.should.be.exactly('success');
        body.message.should.be.a.String;
        body.message.should.be.empty;
        body.data.should.be.a.Boolean;
        done();
      });
  });
  it('should return a Success wrapped response in spite of user only sent a NULL as body', function(done) {
    request(server)
      .get('/null')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        var body = res.body;
        body.code.should.be.exactly(200);
        body.status.should.be.exactly('success');
        body.message.should.be.a.String;
        body.message.should.be.empty;
        body.data.should.be.a.String;
        body.data.should.be.empty;
        done();
      });
  });
  it('should return a Success wrapped response in spite of user only sent a UNDEFINED as body', function(done) {
    request(server)
      .get('/undefined')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        var body = res.body;
        body.code.should.be.exactly(200);
        body.status.should.be.exactly('success');
        body.message.should.be.a.String;
        body.message.should.be.empty;
        body.data.should.be.a.String;
        body.data.should.be.empty;
        done();
      });
  });
  it('should return a Success wrapped response in spite of user only sent a DATE as body', function(done) {
    request(server)
      .get('/date')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        var body = res.body;
        body.code.should.be.exactly(200);
        body.status.should.be.exactly('success');
        body.message.should.be.a.String;
        body.message.should.be.empty;
        Date.parse(body.data).should.be.a.Date;
        done();
      });
  });
  it('should return a Success wrapped response in spite of user only sent a ARRAY as body', function(done) {
    request(server)
      .get('/array')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        var body = res.body;
        body.code.should.be.exactly(200);
        body.status.should.be.exactly('success');
        body.message.should.be.a.String;
        body.message.should.be.empty;
        body.data.should.be.an.Array;
        body.data.should.be.ok;
        done();
      });
  });
  it('should return a Success wrapped response in spite of user does not specify a spec object', function(done) {
    request(server)
      .get('/empty')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        var body = res.body;
        body.code.should.be.exactly(200);
        body.status.should.be.exactly('success');
        body.message.should.be.a.String;
        body.message.should.be.empty;
        body.data.should.be.a.String;
        body.data.should.be.empty;
        done();
      });
  });
});