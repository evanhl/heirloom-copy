// Really thin node/express server to serve up static resources

var newrelic = require('newrelic');
var express = require('express');
var compress = require('compression')();
var port = process.env.PORT || 3000;
var app = express();
var indexFile = (process.env.WEB_ENV === "prelaunch") ? '/preLaunch.html' : '/index.html';

app.use(compress);
app.use(function(req, res, next) {
  console.log(req.url);

  if (req.url.match(/\/terms$/)) {
    req.url = '/terms.html';
  } else if (req.url.match(/\/privacy$/)) {
    req.url = '/privacy.html';
  } else if (!req.url.match(/\.js$|\.css$|\.svg$|\.png$|\.jpg$|\.html$|\.ico$|\.woff$/)) {
    req.url = indexFile;
  }

  res.set({
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'public, max-age=315360000' // 10 years
  });

  next();
});
app.use(express.static(__dirname + '/dist'));

app.listen(port);