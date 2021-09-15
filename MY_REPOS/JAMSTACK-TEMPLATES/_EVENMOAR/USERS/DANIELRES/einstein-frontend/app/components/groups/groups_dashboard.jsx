"use strict";

var React = require("react");
var B = require("react-bootstrap");

var GroupsActions = require("actions/groups_actions");

var Container = React.createClass({
  displayName: "GroupsDashboard Container",

  componentDidMount: function () {
    GroupsActions.fetch();
  },

  render: function () {
    return <GroupsDashboard />;
  },
});

var GroupsDashboard = React.createClass({
  displayName: "GroupsDashboard",

  render: function () {
    return (
      <div>
        <B.PageHeader>My groups</B.PageHeader>
        <h3>Latest activity</h3>
        <B.ListGroup>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(function (i) {
            return (
              <B.ListGroupItem header={"Lorem Ipsum " + i} href="#">
                In group {i}
              </B.ListGroupItem>
            );
          })}
        </B.ListGroup>
        <B.Button>See all...</B.Button>
      </div>
    );
  },
});

module.exports = Container;
