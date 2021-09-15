// simple log function
function myLog() {
  var args = Array.prototype.slice.call(arguments);
  args.unshift('[Debug myLog:]');

  console.log.apply(this, args);
}
myLog('message 1', 'message 2');


// high order wrapper (easy solution)
var logWrapperEasy = function(prefix) {
  return function () {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(prefix);

    console.log.apply(this, args);
  }
}

var logEasy = logWrapperEasy('[Debug logWrapper Easy:]');
logEasy('message 1', 'message 2')


// high order wrapper (hard solution)
var logWrapperHard = function(prefix) {
  return console.log.bind(null, prefix)
}

var logHard = logWrapperHard('[DebuglogWrapper Hard:]');
logHard('message 1', 'message 2')
