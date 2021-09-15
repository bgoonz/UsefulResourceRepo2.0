"use strict";

var Reflux = require("reflux");

var SessionActions = Reflux.createActions({
  login: { children: ["completed", "failed"] },
  logout: {},
  access: { children: ["completed", "failed"] },
});

module.exports = SessionActions;
