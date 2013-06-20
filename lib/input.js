var Emitter = require('events').EventEmitter;
var inherits = require('util').inherits;

module.exports = Input;

function Input () {
  Emitter.call(this);
  this.el = document.createElement('form');

  var input = document.createElement('input');
  this.el.appendChild(input);

  var self = this;
  this.el.addEventListener('submit', function (ev) {
    ev.preventDefault();
    self.emit('submit', input.value);
    input.value = '';
  });
}

inherits(Input, Emitter);
