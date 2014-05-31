// Really thin node/express server to serve up static resources

var express = require('express');
var port = process.env.PORT || 3000;
var app = express();


app.use(function(req, res, next) {
  if (!req.url.match(/\.js$|\.css$|\.svg$|\.png$|\.html$/)) {
    req.url = '/index.html';
  }

  next();
});
app.use(express.static(__dirname + '/dist'));

app.listen(port);