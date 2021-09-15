"use strict";

var Reflux = require("reflux");

var DiscussionsActions = Reflux.createActions({
  fetch: { children: ["completed", "failed"] },
  create: { children: ["completed", "failed"] },
});

module.exports = DiscussionsActions;
