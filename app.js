var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
module.exports = app
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

app.post('/', jsonParser, function (req, res) {
  var resp = req.body
  delete resp.picture
  res.json(resp);
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
