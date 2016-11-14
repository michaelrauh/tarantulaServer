var request = require('supertest');
var app = require('../app');

describe('POST to /', function() {
  it ('responds with latitude and longitude to json', function (done){
    request(app)
    .post('/')
    .send({"picture":"\/9j\/4AAQSkZJRgABAQA", "latitude": 100.7, "longitude": 5.8})
    .expect(200)
    .expect({"latitude": 100.7, "longitude": 5.8}, done);
  });

  it ('returns a different location at different locations', function (done){
    request(app)
    .post('/')
    .send({"picture":"AAQSkZJRgABAQA", "latitude": 11, "longitude": 12.8})
    .expect(200)
    .expect({"latitude": 11, "longitude": 12.8}, done);
  });
});
