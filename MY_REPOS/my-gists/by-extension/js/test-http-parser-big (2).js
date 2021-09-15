// node --expose_gc test-http-parser-big.js
// Run this program with valgrind or efence to expose a problem.

var assert = require('assert');
var HTTPParser = process.binding('http_parser').HTTPParser;
var CRLF = "\r\n";

var headersComplete = 0;
var messagesComplete = 0;

var parser = new HTTPParser('REQUEST');

parser.headers = [];
parser.url = '';

parser.onHeaders = function(headers, url) {
  parser.headers = parser.headers.concat(headers);
  parser.url += url;
};

parser.onHeadersComplete = function(info) {
  headersComplete++;
  console.log("url", info.url);
};

parser.onBody = function(b, start, len) {
};

parser.onMessageComplete = function() {
  messagesComplete++;
};


function flushPool() {
  new Buffer(Buffer.poolSize - 1);
  gc();
}


// We use a function to eliminate references to the Buffer b
// We want b to be GCed. The parser will hold a bad reference to it.
function start() {
  var b = Buffer('POST /1');
  flushPool();

  console.log("parse the first part of the message");
  parser.execute(b, 0, b.length);
}

function end() {
  var b = Buffer('/22 HTTP/1.1' + CRLF +
    'Content-Type: text/plain' + CRLF +
    'Content-Length: 4' + CRLF +
    CRLF +
    'pong');

  console.log("parse the second part of the message");
  parser.execute(b, 0, b.length);
  parser.finish();
}


var count = 0;
var P = start();
flushPool();
end(P);


process.on('exit', function() {
  assert.equal(1, headersComplete);
  assert.equal(1, messagesComplete);
  console.log("done!");
});
