var request = require('supertest');
var app = require('../app');
var fs = require('fs-extra');
var assert = require('assert');

afterEach(function(done){
  fs.removeSync('pictures');
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
      var files = fs.walkSync('pictures')
      assert.equal(files, 'pictures/5.8100.7')
      done();
    });
  });
});

describe('GET to /', function() {
  it('returns a list of all files in the pictures directory', function (done){
    fs.outputFileSync('pictures/foo.txt', "bar");
    request(app)
    .get('/')
    .expect('["pictures/foo.txt"]', done)
  });
});
