"use strict";

var React = require("react");
var Person = require("components/person");

var UserProfile = React.createClass({
  displayName: "UserProfile",

  render: function () {
    return <Person id={this.props.user.id} is_current_user={true} />;
  },
});

module.exports = UserProfile;
