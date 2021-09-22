'use strict';

var Answer = require('..');
var answer = new Answer('first-name', {locale: 'en'});

answer.setDefault('Jon');
answer.delDefault('es');

answer.set('Jon');
answer.set('Jean', 'fr');
answer.set('Hugo', 'es');

console.log(answer);
