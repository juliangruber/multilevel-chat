/**
 * WebServer.
 */

var http = require('http');
var fs = require('fs');
var browserify = require('browserify');

var server = http.createServer(function (req, res) {
  if (req.url == '/') {

    fs.createReadStream(__dirname + '/index.html').pipe(res);

  } else if (req.url == '/bundle.js') {

    res.writeHead(200, { 'Content-Type': 'application/javascript' });
    browserify('./client.js').bundle({ debug: true }).pipe(res);

  } else {

    res.end('oops');

  }
});

server.listen(7000);
