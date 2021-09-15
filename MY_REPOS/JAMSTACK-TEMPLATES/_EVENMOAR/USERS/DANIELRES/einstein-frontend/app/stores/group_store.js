"use strict";

var Reflux = require("reflux");
var GroupActions = require("actions/group_actions");

var ApiHelper = require("helpers/api_helper");

module.exports = Reflux.createStore({
  listenables: [GroupActions],

  getInitialState: function () {
    return {};
  },

  onFetch: function (groupId) {
    ApiHelper.fetchGroup(groupId);
  },

  onFetchCompleted: function (result) {
    this.trigger(result);
  },
});
