var ready = require('domready');

/**
 * Multilevel.
 */

var engine = require('engine.io-stream');
var multilevel = require('multilevel');
var manifest = require('./manifest.json');

var db = multilevel.client(manifest);
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
  });
});

ready(function () {
  document.body.appendChild(input.el);
});

/**
 * Message list.
 */

var through = require('through');
var list = document.createElement('ul');

db.createLiveStream()
  .pipe(through(function (obj) {
    var li = document.createElement('li');
    li.innerText = [
      new Date(Number(obj.key.split('!')[1])), obj.value
    ].join(' : ');
    list.appendChild(li);
  }));

ready(function () {
  document.body.appendChild(list);
});
