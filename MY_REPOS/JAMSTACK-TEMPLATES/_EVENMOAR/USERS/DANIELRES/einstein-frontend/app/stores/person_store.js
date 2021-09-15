"use strict";

var Reflux = require("reflux");
var PersonActions = require("actions/person_actions");

var ApiHelper = require("helpers/api_helper");

module.exports = Reflux.createStore({
  listenables: [PersonActions],

  getInitialState: function () {
    this.item = {};
    return this.item;
  },

  onLoad: function (personId) {
    ApiHelper.fetchPerson(personId, this);
  },
});
