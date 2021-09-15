'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');
const compile = require('./es6-engine');
const readfile = util.promisify(fs.readFile);
const { prompt } = require('enquirer');

let partials = {};
let helpers = {
  read(name) {
    return readfile(path.resolve(process.cwd(), name), 'utf8');
  },
  log(...args) {
    console.log(...args);
    return '';
  },
  prompt(question) {
    return prompt(question).then(answers => {
      this[question.name] = answers[question.name];
      return '';
    });
  },
  async partial(name, locals) {
    return this.render(await partials[name], locals);
  },
  include(name, locals) {
    return this.render(helpers.read(name), locals);
  }
};

let registerPartial = (name, str) => {
  partials[name] = compile(str, helpers);
};

registerPartial('fixture3', helpers.read('fixture3.txt'));

// "compile()" takes a string, or a promise that returns a string
let value = helpers.read('fixture1.txt');
let render = compile(value, helpers);

render({ name: 'Brian' })
  .then(console.log)
  .catch(console.log);
