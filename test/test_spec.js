var request = require('supertest');
var app = require('../app');
var fs = require('fs-extra');
var assert = require('assert');

afterEach(function(done){
  fs.removeSync('tmp');
  done();
});

describe('POST to /', function() {

  it ('Responds with 200 when posting picture and writes photo to file at location', function (done){
    request(app)
    .post('/')
    .send({"picture":"\/9j\/4AAQSkZJRgABAQA", "latitude": 100.7, "longitude": 5.8})
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      var files = fs.walkSync('tmp/pictures')
      assert.equal(files, 'tmp/pictures/100.7;5.8')
      done();
    });
  });
});

describe('GET to /', function() {
  it('returns a list of all files in the pictures directory', function (done){
    fs.outputFileSync('tmp/pictures/657.0001;678.002', "bar");
    fs.outputFileSync('tmp/pictures/601.8701;999.9001', "baz");
    request(app)
    .get('/')
    .expect([{"latitude": 601.8701, "longitude": 999.9001}, {"latitude": 657.0001, "longitude": 678.002}], done)
  });
});
