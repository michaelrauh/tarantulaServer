var express = require('express');
var fs = require('fs-extra');
var app = express();
var port = process.env.PORT || 8080;
module.exports = app
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

app.post('/', jsonParser, function (req, res) {
  var resp = req.body
  var pic = resp.picture
  delete resp.picture
  fs.mkdirpSync('pictures');
  fs.writeFile("pictures/" + resp.longitude + ";" + resp.latitude, pic, function(err){
    if (err) return console.log(err)
  });
  res.sendStatus(200)
});

app.get('/', function(req, res) {
  var files = fs.walkSync('pictures')
  res.send(files)
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
