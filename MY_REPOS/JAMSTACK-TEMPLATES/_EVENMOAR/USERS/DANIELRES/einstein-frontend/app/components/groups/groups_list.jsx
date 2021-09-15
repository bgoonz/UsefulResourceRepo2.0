"use strict";

var React = require("react");
var RB = require("react-router-bootstrap");

var Reflux = require("reflux");
var GroupsStore = require("stores/groups_store");
var GroupsActions = require("actions/groups_actions");

var Container = React.createClass({
  displayName: "GroupsList Container",

  contextTypes: { router: React.PropTypes.func },
  mixins: [Reflux.connect(GroupsStore, "list")],

  componentDidMount: function () {
    GroupsActions.fetch();
  },

  render: function () {
    var groups = this.state.list;
    return <GroupsList groups={groups} />;
  },
});

var GroupsList = React.createClass({
  displayName: "GroupsList",

  render: function () {
    return (
      <div data-ref="groups-list">
        {this.props.groups.map(function (group, i) {
          var headerText = group.name;
          return (
            <RB.ListGroupItemLink
              header={headerText}
              key={i}
              params={{ groupId: group.id }}
              to="group"
            >
              {group.description}
            </RB.ListGroupItemLink>
          );
        })}
      </div>
    );
  },
});

module.exports = Container;
