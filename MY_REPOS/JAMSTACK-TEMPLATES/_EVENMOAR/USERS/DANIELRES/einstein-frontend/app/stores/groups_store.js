"use strict";

var Reflux = require("reflux");
var GroupsActions = require("actions/groups_actions");

var ApiHelper = require("helpers/api_helper");

module.exports = Reflux.createStore({
  listenables: [GroupsActions],

  getInitialState: function () {
    return [];
  },

  onFetch: function () {
    ApiHelper.fetchGroups();
  },

  onFetchCompleted: function (result) {
    this.trigger(result.reverse());
  },

  onCreate: function (params) {
    ApiHelper.createGroup(params);
  },

  onCreateCompleted: function () {
    this.onFetch();
  },
});
