"use strict";

var React = require("react");

var B = require("react-bootstrap");

var GroupsDashboard = require("components/groups/groups_dashboard");
var GroupsList = require("components/groups/groups_list");
var GroupsMenu = require("components/groups/groups_menu");
var Group = require("components/groups/group");

var Groups = React.createClass({
  displayName: "Groups",
  contextTypes: { router: React.PropTypes.func },

  render: function () {
    var groupId = this.context.router.getCurrentParams().groupId;

    return (
      <B.Row>
        <B.Col md={10}>
          {(groupId && <Group groupId={groupId} />) || <GroupsDashboard />}
        </B.Col>
        <B.Col md={2}>
          <GroupsMenu />
          <GroupsList />
        </B.Col>
      </B.Row>
    );
  },
});

module.exports = Groups;
