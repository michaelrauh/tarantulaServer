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
  fs.mkdirpSync('tmp/pictures');
  fs.writeFile("tmp/pictures/" + resp.latitude + ";" + resp.longitude, pic, function(err){
    if (err) return console.log(err)
  });
  res.sendStatus(200)
});

app.get('/', function(req, res) {
  var files = fs.walkSync('tmp/')
  var result = [];
  files.forEach(function(filename) {
    var latlong = filename.split('/')[2].split(';')
    var lat = parseFloat(latlong[0])
    var long = parseFloat(latlong[1])

    result.push({
        "latitude":  lat,
        "longitude":  long
      });
});
  res.send(result)
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
