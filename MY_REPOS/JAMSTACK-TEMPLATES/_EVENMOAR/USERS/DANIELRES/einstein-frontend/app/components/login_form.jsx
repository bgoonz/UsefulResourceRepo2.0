"use strict";

var React = require("react");
var B = require("react-bootstrap");

var SessionActions = require("actions/session_actions");

var LoginFormComponent = React.createClass({
  displayName: "LoginFormComponent",

  handleSubmit: function (e) {
    e.preventDefault();
    SessionActions.login(
      this.refs.username.getValue(),
      this.refs.password.getValue()
    );
  },

  render: function () {
    return (
      <form
        className="form-horizontal"
        onSubmit={this.handleSubmit}
        style={{ marginTop: 60 }}
      >
        <B.Input
          defaultValue="example@example.com"
          label="Email"
          labelClassName="col-xs-2 col-md-offset-2"
          ref="username"
          type="text"
          wrapperClassName="col-xs-4"
        />
        <B.Input
          defaultValue="password"
          label="Password"
          labelClassName="col-xs-2 col-md-offset-2"
          ref="password"
          type="password"
          wrapperClassName="col-xs-4"
        />
        <B.Input
          label=" "
          labelClassName="col-xs-2  col-md-offset-2"
          type="submit"
          wrapperClassName="col-xs-4"
        />
      </form>
    );
  },
});

module.exports = LoginFormComponent;
