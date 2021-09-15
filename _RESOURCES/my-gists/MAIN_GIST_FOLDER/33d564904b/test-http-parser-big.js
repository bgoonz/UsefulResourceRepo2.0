var assert = require('assert');
var HTTPParser = process.binding('http_parser').HTTPParser;
var CRLF = "\r\n";

var headersComplete = 0;
var messagesComplete = 0;

function newParser(type) {
  var parser = new HTTPParser(type);

  parser.headers = [];
  parser.url = '';

  parser.onHeaders = function(headers, url) {
    //parser.headers = parser.headers.concat(headers);
    //parser.url += url;
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

  return parser;
}

function doGC() {
  for (var i = 0; i < 100; i++) {
    gc();
  }
}

function start() {
  var p = newParser('REQUEST');

  var b1 = Buffer('POST /1');

  console.log("parse the first part of the message");
  p.execute(b1, 0, b1.length);

  var b2 = Buffer(10 * 1024 * 1024);  
  var b3 = Buffer('/22/333/4444/55555');
  p.execute(b3, 0, b3.length);

  delete b1;
  delete b2;
  delete b3;

  return p;
}

function end(p) {
  var b = Buffer('/666666/7777777/88888888/ HTTP/1.1' + CRLF +
    'Content-Type: text/plain' + CRLF +
    'Content-Length: 4' + CRLF +
    'A: asdfasdfadfasdfasdfasdfasdf' + CRLF +
    'b: asdfasdfadfasdfasdfasdfasdf' + CRLF +
    'h0: a' + CRLF +
    'y0: asdfasdfadfasdfasdfasdfasdf' + CRLF +
    'z0: asdfasdfadfasdfasdfasdfasdf' + CRLF +
    CRLF +
    'pong');

  console.log("parse the second part of the message");
  p.execute(b, 0, b.length);
  p.finish();
}


var count = 0;
var P = start();
var interval = setInterval(function() {
  if (++count == 100) {
    end(P);
    clearInterval(interval);
  } else {
    Buffer(10 * 1024 * 1024);  
    doGC();
  }
}, 1);


process.on('exit', function() {
  assert.equal(1, headersComplete);
  assert.equal(1, messagesComplete);
  console.log("done!");
});
