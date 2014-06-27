// app.js

// $ curl --user jmf:1234 http://<ip>:8080/api/v1/abc/123 -i -b cookies.txt -c cookies.txt -X GET
// $ curl --user jmf:1234 http://<ip>:8080/api/v1/abc/123 -i -b cookies.txt -c cookies.txt -X PUT
// $ curl --user jmf:1234 http://<ip>:8080/api/v1/abc/123 -i -b cookies.txt -c cookies.txt -X POST
// $ curl --user jmf:1234 http://<ip>:8080/api/v1/abc/123 -i -b cookies.txt -c cookies.txt -X DELETE

var express = require('express');

var port = process.env.HTTP_PORT || 8080;

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

function processRequest(req, res) {
  console.log(Date(), req.method, req.url);
  var lastAccess = req.session.lastAccess;
  req.session.lastAccess = new Date();
  console.log(Date(), 'prior request was at:', lastAccess);
  res.cookie('domain', 'info', { expires: new Date(Date.now() + 3600000) });
}

var app = express();

app.configure('development', function() {
  console.log(Date(), 'configure: development');
});

app.configure('production', function() {
  console.log(Date(), 'configure: production');
});

var MemStore = express.session.MemoryStore;

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded());
app.use(express.json());
app.use(express.basicAuth(function(user, password) {
  console.log(Date(), 'authenticate', user, password);
  return user == 'jmf' && password == '1234';
}));
app.use(express.cookieParser());
app.use(express.session({ secret: "999", cookie: { maxAge: 3600000 }, store: new MemStore() }));

var apiVersion = 'v1';

var apiUrl = '/api/' + apiVersion;

app.put(apiUrl + '/:domain/:user', function(req, res) {
  processRequest(req, res);
  res.send(req.method + ' domain: ' + req.params.domain + ' user: ' + req.params.user + '\n');
});

app.get(apiUrl + '/:domain/:user', function(req, res) {
  processRequest(req, res);
  res.send(req.method + ' domain: ' + req.params.domain + ' user: ' + req.params.user + '\n');
});

app.post(apiUrl + '/:domain/:user', function(req, res) {
  processRequest(req, res);
  res.send(req.method + ' domain: ' + req.params.domain + ' user: ' + req.params.user + '\n');
});

app.delete(apiUrl + '/:domain/:user', function(req, res) {
  processRequest(req, res);
  res.send(req.method + ' domain: ' + req.params.domain + ' user: ' + req.params.user + '\n');
});

app.get(apiUrl + '*', function(req, res) {
  processRequest(req, res);
  res.writeHead(404, { "Content-Type" : "application/json" });
  res.end(JSON.stringify({"error":"invalid_resource"}) + "\n");
});

app.listen(port, function() {
  console.log(Date(), 'server started port:', port);
});

