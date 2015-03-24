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
        should(err).not.be.ok;
        res.code.should.be.a.Number;
        res.code.should.be.exactly(200);
        res.data.should.be.a.String;
        res.data.should.not.be.empty;
        res.message.should.be.a.String;
        res.message.should.be.empty;
        res.status.should.be.exactly('success');
        done();
      });
  });
  it('should return an Error wrapped response', function(done) {
    request(server)
      .get('/400')
      .expect(400)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        should(err).not.be.ok;
        res.code.should.be.a.Number;
        res.code.should.be.exactly(400);
        res.data.should.be.a.String;
        res.data.should.not.be.empty;
        res.message.should.be.a.String;
        res.message.should.not.be.empty;
        res.status.should.be.exactly('error');
        done();
      });
  });
  it('should return a Fail wrapped response', function(done) {
    request(server)
      .get('/500')
      .expect(500)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        should(err).not.be.ok;
        res.code.should.be.a.Number;
        res.code.should.be.exactly(500);
        res.data.should.be.a.String;
        res.data.should.not.be.empty;
        res.message.should.be.a.String;
        res.message.should.not.be.empty;
        res.status.should.be.exactly('fail');
        done();
      });
  });
});