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
 * Authentication.
 */

var user = prompt('name');
db.auth({ name: user }, function (err) {
  if (err) throw err;

  /**
   * Message input.
   */

  var Input = require('./lib/input');

  var input = new Input();

  input.on('submit', function (msg) {
    var obj = {
      msg: msg,
      user: user
    };
    db.put('msg!' + Date.now(), obj, function (err) {
      if (err) throw err;
    });
  });

  ready(function () {
    document.body.appendChild(input.el);
  });
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
      new Date(Number(obj.key.split('!')[1])),
      obj.value.user,
      obj.value.msg
    ].join(' : ');
    list.appendChild(li);
  }));

ready(function () {
  document.body.appendChild(list);
});
