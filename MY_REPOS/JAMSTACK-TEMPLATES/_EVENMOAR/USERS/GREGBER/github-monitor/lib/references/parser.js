var isArray = require('lodash').isArray;

exports.parse = parse;

function parse(str) {
  if (! isArray(str)) return parseOne(str);
  return str.map(parseOne);
}

function parseOne(str) {
  var parts = str.match(/(.*)#(.*)/);
  return {
    repo: ! parts ? str : parts[1],
    hash: ! parts ? 'master' : parts[2]
  };
}