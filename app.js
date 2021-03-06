// app.js

// $ curl --user jmf:1234 http://<ip>:<port>/api/v1/abc/123 -i -X GET
// $ curl --user jmf:1234 http://<ip>:<port>/api/v1/abc/123 -i -X PUT
// $ curl --user jmf:1234 http://<ip>:<port>/api/v1/abc/123 -i -X POST
// $ curl --user jmf:1234 http://<ip>:<port>/api/v1/abc/123 -i -X DELETE

'use strict';

var express      = require('express');
var basicAuth    = require('basic-auth');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');

var port = process.env.HTTP_PORT || 8080;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(function(req, res, next) {
  console.log(Date(), req.method, req.url);
  var user = basicAuth(req);
  if (typeof user === 'undefined' || typeof user.name === 'undefined' || typeof user.pass === 'undefined') {
    console.log(Date(), 'auth rejected:', 'missing credentials');
    res.statusCode = 401;
    res.end('Unauthorized');
  } else if (user.name !== 'jmf' || user.pass !== '1234') {
    console.log(Date(), 'auth rejected:', user.name, user.pass);
    res.statusCode = 401;
    res.end('Unauthorized');
  } else {
    console.log(Date(), 'auth accepted:', user.name, user.pass);
    next();
  }
});

var apiVersion = 'v1';

var apiUrl = '/api/' + apiVersion;

// routes

app.get(apiUrl + '/:domain/:user', function(req, res) {
  res.send(req.method + ' domain: ' + req.params.domain + ' user: ' + req.params.user + '\n');
});

app.put(apiUrl + '/:domain/:user', function(req, res) {
  res.send(req.method + ' domain: ' + req.params.domain + ' user: ' + req.params.user + '\n');
});

app.post(apiUrl + '/:domain/:user', function(req, res) {
  res.send(req.method + ' domain: ' + req.params.domain + ' user: ' + req.params.user + '\n');
});

app.delete(apiUrl + '/:domain/:user', function(req, res) {
  res.send(req.method + ' domain: ' + req.params.domain + ' user: ' + req.params.user + '\n');
});

// start server

app.listen(port, function() {
  console.log(Date(), 'server started port:', port);
});

['SIGHUP',  'SIGINT',  'SIGQUIT', 'SIGTRAP',
 'SIGABRT', 'SIGBUS',  'SIGFPE',  'SIGUSR1',
 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
].forEach(function(signal) {
  process.on(signal, function() {
    console.log();
    console.log(Date(), 'server received signal', signal);
    process.exit(1);
  });
});

process.on('exit', function() {
  console.log(Date(), 'server stopped');
});
