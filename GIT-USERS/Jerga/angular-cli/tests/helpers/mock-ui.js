"use strict";

var UI = require("angular-cli/ember-cli/lib/ui");
var through = require("through");
var Promise = require("angular-cli/ember-cli/lib/ext/promise");

module.exports = MockUI;
function MockUI() {
  this.output = "";

  UI.call(this, {
    inputStream: through(),
    outputStream: through(
      function (data) {
        this.output += data;
      }.bind(this)
    ),
    errorStream: through(
      function (data) {
        this.errors += data;
      }.bind(this)
    ),
  });
}

MockUI.prototype = Object.create(UI.prototype);
MockUI.prototype.constructor = MockUI;
MockUI.prototype.clear = function () {
  this.output = "";
};

MockUI.prototype.waitForPrompt = function () {
  if (!this._waitingForPrompt) {
    var promise, resolver;
    promise = new Promise(function (resolve) {
      resolver = resolve;
    });
    this._waitingForPrompt = promise;
    this._promptResolver = resolver;
  }
  return this._waitingForPrompt;
};

MockUI.prototype.prompt = function (opts, cb) {
  if (this._waitingForPrompt) {
    this._waitingForPrompt = null;
    this._promptResolver();
  }
  return UI.prototype.prompt.call(this, opts, cb);
};
