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
});