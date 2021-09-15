/**
 * No tests yet. just a placeholder.
 */

var file = require('fs-utils');
var anchors = require('../');


// Test setup
var fixtures = 'test/fixtures/html/about.html';
var files = file.expand(fixtures, {filter: 'isFile'});


var a = files.map(function(filepath) {
  var content = file.readFileSync(filepath);
  return anchors(content);
});

console.log(JSON.stringify(a, null, 2));


