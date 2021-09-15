'use strict';

var Answer = require('..');
var answer = new Answer('project-name', {
  dest: 'examples/answsers'
});
answer.set('foo');

console.log(answer);
