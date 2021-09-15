"use strict";

var Reflux = require("reflux");

var GroupActions = Reflux.createActions({
  fetch: { children: ["completed", "failed"] },
});

module.exports = GroupActions;
