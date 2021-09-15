var Chain = function () {
  this.stack = [];
};

Chain.prototype.add = function (fn, async) {
  this.stack.push([fn, async]);
  return this;
};

Chain.prototype.loop = function () {
  if (! this.stack.length) return ;

  var obj = this.stack.shift(),
    fn = obj[0],
    async = obj[1];

  if (! async) return fn(this.loop.bind(this));

  fn();
  this.loop();
};

Chain.prototype.run = function () {
  this.loop();
  return this;
};

exports.Chain = Chain;