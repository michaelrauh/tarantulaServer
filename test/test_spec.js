var request = require('supertest');
var app = require('../app');

describe('POST to /', function() {
  it ('responds with 200 to post containing JSON', function (done){
    request(app)
    .post('/')
    .send({"picture":"\/9j\/4AAQSkZJRgABAQA"})
    .expect(200, done);
  });
});
