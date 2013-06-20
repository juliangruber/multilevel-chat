/**
 * WebServer.
 */

var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
  if (req.url == '/') {
    fs.createReadStream(__dirname + '/index.html').pipe(res);
  } else {
    res.end('oops');
  }
});

server.listen(7000);
