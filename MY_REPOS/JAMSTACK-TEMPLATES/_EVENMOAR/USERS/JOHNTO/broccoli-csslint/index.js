'use strict';

var csslint = require('csslint').CSSLint;
var Filter = require('broccoli-persistent-filter');
var chalk = require('chalk');
var fs = require('fs');
var findup = require('findup-sync');
var isPresent = require('is-present');

CSSLinter.prototype = Object.create(Filter.prototype);
CSSLinter.prototype.constructor = CSSLinter;

function CSSLinter(inputNode, options) {
  if (!(this instanceof CSSLinter)) {
    return new CSSLinter(inputNode, options);
  }

  options = options || {};
  if (!options.hasOwnProperty('persist')) {
    options.persist = true;
  }

  Filter.call(this, inputNode, {
    annotation: options.annotation,
    persist: options.persist
  });

  this.log = true;

  for (var key in options) {
    if (options.hasOwnProperty(key)) {
      this[key] = options[key]
    }
  }
};

CSSLinter.prototype.baseDir = function() {
  return __dirname;
};

CSSLinter.prototype.extensions = ['css'];

CSSLinter.prototype.build = function () {
  var self = this;
  self._errors = [];

  var csslintrcPath = this.csslintrcRoot || process.cwd();
  this.csslintrc = this.getConfig(csslintrcPath);

  return Filter.prototype.build.apply(this, arguments)
    .finally(function() {
      if (self._errors.length > 0) {
        var label = ' Files with CSSLint Errors';
        console.log('\n' + self._errors.join('\n'));
        console.log(chalk.yellow('===== ' + self._errors.length + label + '\n'));
      }
    });
};

CSSLinter.prototype.processString = function (content, relativePath) {
  var filesToExclude =  this.csslintrc['exclude-list'];

  if(filesToExclude && filesToExclude.indexOf(relativePath) !== -1) {
    return content;
  }

  var report = csslint.verify(content, this.csslintrc);
  var errors = this.processMessages(relativePath, report.messages);

  report.messages = report.messages.filter(function(message) {
    return isPresent(message.line) && isPresent(message.col);
  });

  if (report.messages.length > 0) {
    this.logError(errors);
  }

  return content;
};

CSSLinter.prototype.processMessages = function (file, messages) {
  var len = messages.length;

  if (len == 0) {
    return '';
  }

  var messageStr = messages.map(function(message, i) {
    return file + ': line ' + message.line + ', col ' + message.col + ', ' + message.message;
  }).join('\n');

  return messageStr + '\n' + len + ' error' + ((len === 1) ? '' : 's');
};

CSSLinter.prototype.logError = function(message, color) {
  color = color || 'red';
  this._errors.push(chalk[color](message) + "\n");
};

CSSLinter.prototype.getConfig = function(rootPath) {
  if (!rootPath) { rootPath = process.cwd(); }

  var ruleset = {};
  var lintOptions = {};

  var csslintrc = findup('.csslintrc', { cwd: rootPath, nocase: true });

  if (csslintrc) {
    var config = fs.readFileSync(csslintrc, { encoding: 'utf8' });

    try {
      lintOptions = JSON.parse(this.stripComments(config));
    } catch (e) {
      console.error(chalk.red('Error occured parsing .csslintrc.'));
      console.error(e.stack);

      return null;
    }
  }

  csslint.getRules().forEach(function(rule) {
    ruleset[rule.id] = 1;
  });

  for (var rule in lintOptions) {
    if (lintOptions.hasOwnProperty(rule)) {
      if (!lintOptions[rule]) {
        delete ruleset[rule];
      }
      else {
        ruleset[rule] = lintOptions[rule];
      }
    }
  }

  return ruleset;
};

CSSLinter.prototype.stripComments = function(string) {
  string = string || '';

  string = string.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\//g, '');
  string = string.replace(/\/\/[^\n\r]*/g, ''); // Everything after '//'

  return string;
};

module.exports = CSSLinter;
