"use strict";

var Reflux = require("reflux");

var GroupsActions = Reflux.createActions({
  fetch: { children: ["completed", "failed"] },
  create: { children: ["completed", "failed"] },
});

module.exports = GroupsActions;
