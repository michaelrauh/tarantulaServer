var request = require('supertest');
var app = require('../app');

describe('POST to /', function() {
  it('responds with 200', function(done) {
    request(app)
      .post('/')
      .expect(200, done);
  });
});
