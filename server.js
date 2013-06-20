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

/**
 * Database.
 */

var level = require('level');
var db = level(__dirname + '/db');

/**
 * Multilevel.
 */

var multilevel = require('multilevel');
var Engine = require('engine.io-stream');

var engine = Engine(function (con) {
  con.pipe(multilevel.server(db)).pipe(con);
});

engine.attach(server, '/engine');
