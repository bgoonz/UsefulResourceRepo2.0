'use strict';

var through = require('through2');
var app = require('./');

app.plugin('foo', foo);
app.plugin('bar', bar);
app.plugin('baz', baz);

// app.disable('plugin bar');

app.task('default', function () {
  app.src('test/fixtures/*.txt')
    .pipe(app.combine(['foo', 'bar', 'baz'], {}))
    .pipe(app.dest('test/actual'))
});

function foo(options) {
  return through.obj(function (file, enc, cb) {
    var str = file.contents.toString();
    file.contents = new Buffer(str + 'foo');
    this.push(file);
    return cb();
  })
}

function bar(options) {
  return through.obj(function (file, enc, cb) {
    var str = file.contents.toString();
    file.contents = new Buffer(str + 'bar');
    this.push(file);
    return cb();
  })
}

function baz(options) {
  return through.obj(function (file, enc, cb) {
    var str = file.contents.toString();
    file.contents = new Buffer(str + 'baz');
    this.push(file);
    return cb();
  })
}
