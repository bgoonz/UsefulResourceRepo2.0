var expect = require('chai').use(require('sinon-chai')).expect;
var sinon = require('sinon');
var EventEmitter = require('events').EventEmitter;
var pipeEvent = require('./');

describe('pipeEvent', function () {
  var source, target;

  beforeEach(function () {
    source = new EventEmitter();
    target = new EventEmitter();
  });

  it('should pipe event from an emitter to another', function () {
    var spy = sinon.spy();
    target.on('test', spy);
    pipeEvent('test', source, target);
    source.emit('test', 'hello');
    expect(spy).to.be.calledWith('hello');
  });

  it('should pipe several events', function () {
    var spy1 = sinon.spy();
    var spy2 = sinon.spy();
    target.on('test1', spy1);
    target.on('test2', spy2);
    pipeEvent(['test1', 'test2'], source, target);
    source.emit('test1', 'a');
    source.emit('test2', 'b');
    expect(spy1).to.be.calledWith('a');
    expect(spy2).to.be.calledWith('b');
  });
});