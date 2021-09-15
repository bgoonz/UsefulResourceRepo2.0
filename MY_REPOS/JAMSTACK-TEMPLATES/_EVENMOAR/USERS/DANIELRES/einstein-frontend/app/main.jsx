"use strict";

var React = require("react");

var B = require("react-bootstrap");

var Router = require("react-router"),
  RouteHandler = Router.RouteHandler,
  DefaultRoute = Router.DefaultRoute,
  Route = Router.Route;

var LoginForm = require("components/login_form");
var NavBar = require("components/nav_bar");
var Dashboard = require("components/dashboard");
var Placeholder = require("components/placeholder");
var Inbox = require("components/inbox");
var Groups = require("components/groups");
var Discussion = require("components/discussions/discussion");
var Person = require("components/person");
var UserProfile = require("components/user_profile");

var Reflux = require("reflux");
var SessionStore = require("stores/session_store");
var SessionActions = require("actions/session_actions");

var App = React.createClass({
  displayName: "App",

  mixins: [Reflux.connect(SessionStore, "user")],

  componentWillMount: function () {
    SessionActions.access();
  },

  render: function () {
    var user = this.state.user;
    return (
      <B.Grid>
        <B.Row>
          <B.Col>{user.logged ? <NavBar user={user} /> : ""}</B.Col>
        </B.Row>
        <B.Row>
          <B.Col>
            {user.logged ? <RouteHandler user={user} /> : <LoginForm />}
          </B.Col>
        </B.Row>
      </B.Grid>
    );
  },
});

var routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Dashboard} />
    <Route name="dashboard" handler={Dashboard} path="dashboard" />
    <Route name="inbox" handler={Inbox} path="inbox" />
    <Route name="groups" handler={Groups} path="groups">
      <Route name="group" handler={Groups.Group} path=":groupId">
        <Route
          name="discussion"
          handler={Discussion}
          path="discussions/:discussionId"
        />
      </Route>
    </Route>
    <Route name="fast_news" handler={Placeholder} path="fast_news" />
    <Route name="open_courses" handler={Placeholder} path="open_courses" />
    <Route name="network" handler={Placeholder} path="network" />
    <Route name="uniworld" handler={Placeholder} path="uniworld" />
    <Route name="profile" handler={UserProfile} path="profile" />
    <Route name="settings" handler={Placeholder} path="settings" />
    <Route name="logout" handler={Placeholder} path="logout" />
    <Route name="person" handler={Person} path="/people/:personId" />
  </Route>
);

module.exports = Router.run(routes, function (Handler) {
  React.render(<Handler />, document.body);
});
