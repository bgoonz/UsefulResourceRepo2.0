/**
 * Pipe an event from an event emitter to another.
 *
 * @param {string|string[]} events Events to pipe
 * @param {EventEmitter} source Source event emitter
 * @param {EventEmitter} target Target event emitter
 */

module.exports = function (events, source, target) {
  if (! Array.isArray(events)) events = [events];

  events.forEach(function (event) {
    source.on(event, function () {
      target.emit.apply(target, [event].concat(Array.prototype.slice.call(arguments, 0)));
    });
  });
};