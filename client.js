var ready = require('domready');

/**
 * Multilevel.
 */

var engine = require('engine.io-stream');
var multilevel = require('multilevel');

var db = multilevel.client();
db.pipe(engine('/engine')).pipe(db);

window.db = db;

/**
 * Message input.
 */

var Input = require('./lib/input');

var input = new Input();

input.on('submit', function (msg) {
  db.put('msg!' + Date.now(), msg, function (err) {
    if (err) throw err;
    console.log('wrote %s', msg);
  });
});

ready(function () {
  document.body.appendChild(input.el);
});
