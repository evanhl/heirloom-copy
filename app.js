// Really thin node/express server to serve up static resources

var newrelic = require('newrelic');
var express = require('express');
var compress = require('compression')();
var prerender = require('prerender-node').set('prerenderToken', process.env.PRERENDER_TOKEN);
var port = process.env.PORT || 3000;
var app = express();

app.use(function(req, res, next) {
  if (prerender.shouldShowPrerenderedPage(req)) {
    // This tells New Relic that this is a prerender transaction and should be categorized accordingly
    newrelic.setTransactionName('Prerender');
  }
  next();
});
app.use(prerender);
app.use(compress);
app.use(function(req, res, next) {
  if (req.url.match(/\/terms$/)) {
    req.url = '/terms.html';
  } else if (req.url.match(/\/privacy$/)) {
    req.url = '/privacy.html';
  } else if (req.url.match(/\/press$/)) {
    req.url = '/press.html';
  } else if (req.url.match(/\/faq$/)) {
    req.url = '/faq.html';
  } else if (!req.url.match(/\.js$|\.css$|\.gif$|\.svg$|\.png$|\.jpg$|\.md$|\.html$|\.ico$|\.woff$/)) {
    req.url = '/index.html';
  }

  if (!req.url.match(/\.html$/)) {
    res.set({
      'Cache-Control': 'public, max-age=315360000' // 10 years
    });
  }

  res.set({
    'Access-Control-Allow-Origin': '*'
  });

  next();
});
app.use(express.static(__dirname + '/dist'));

app.listen(port);