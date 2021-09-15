"use strict";

var React = require("react");

var B = require("react-bootstrap");
var RB = require("react-router-bootstrap");

var ReactIntl = require("react-intl");
var IntlMixin = ReactIntl.IntlMixin;
var FormattedMessage = ReactIntl.FormattedMessage;

var SessionActions = require("actions/session_actions");

var PersonAvatarImage = require("components/person_avatar").Image;

var intlData = {
  locales: ["en-US"],
  messages: {
    dashboard: "Dashboard",
    groups: "My groups",
    news: "Fast_news",
    inbox: "Inbox",
    open_courses: "Open_courses",
    network: "Network",
    uniworld: "Uniworld",
    profile: "Profile",
    settings: "Settings",
    logout: "Logout",
  },
};

var NavBar = React.createClass({
  displayName: "NavBar",
  mixins: [IntlMixin],

  render: function () {
    var user = this.props.user;

    var userAvatarImage = (
      <span
        style={{
          display: "inline-block",
          height: 0,
          lineHeight: 0,
          marginTop: "-10",
        }}
      >
        <PersonAvatarImage person={user} size={40} />
      </span>
    );

    return (
      <B.Navbar toggleNavKey={0}>
        <B.CollapsibleNav eventKey={0}>
          <B.Nav navbar>
            <RB.NavItemLink key={1} to="dashboard">
              <FormattedMessage message={this.getIntlMessage("dashboard")} />
            </RB.NavItemLink>
            <RB.NavItemLink key={3} to="groups">
              <FormattedMessage message={this.getIntlMessage("groups")} />
            </RB.NavItemLink>
            <RB.NavItemLink key={4} to="fast_news" disabled>
              <FormattedMessage message={this.getIntlMessage("news")} />
            </RB.NavItemLink>
            <RB.NavItemLink key={5} to="inbox">
              <FormattedMessage message={this.getIntlMessage("inbox")} />
            </RB.NavItemLink>
            <RB.NavItemLink key={6} to="open_courses" disabled>
              <FormattedMessage message={this.getIntlMessage("open_courses")} />
            </RB.NavItemLink>
            <RB.NavItemLink key={7} to="network" disabled>
              <FormattedMessage message={this.getIntlMessage("network")} />
            </RB.NavItemLink>
            <RB.NavItemLink key={8} to="uniworld" disabled>
              <FormattedMessage message={this.getIntlMessage("uniworld")} />
            </RB.NavItemLink>
          </B.Nav>
          <B.Nav navbar right>
            <B.DropdownButton eventKey={3} title={userAvatarImage}>
              <RB.MenuItemLink to="profile">
                <FormattedMessage message={this.getIntlMessage("profile")} />
              </RB.MenuItemLink>
              <RB.MenuItemLink to="settings" disabled>
                <FormattedMessage message={this.getIntlMessage("settings")} />
              </RB.MenuItemLink>
              <B.MenuItem divider />
              <B.MenuItem onSelect={SessionActions.logout}>
                <FormattedMessage message={this.getIntlMessage("logout")} />
              </B.MenuItem>
            </B.DropdownButton>

            <B.DropdownButton
              eventKey={3}
              noCaret
              title={
                <B.Glyphicon glyph="bell">
                  <B.Badge
                    style={{
                      background: "red",
                      position: "absolute",
                      marginTop: "-17px",
                      marginLeft: "-8px",
                      fontSize: "0.7em",
                    }}
                  >
                    15
                  </B.Badge>
                </B.Glyphicon>
              }
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(function (i) {
                return (
                  <RB.MenuItemLink disabled to="dashboard">
                    Notification {i}
                    <br />
                    <small>
                      <FormattedMessage message="Notification contents" />
                    </small>
                  </RB.MenuItemLink>
                );
              })}
              <B.MenuItem style={{ textAlign: "right" }}>
                <B.Glyphicon
                  glyph="option-horizontal"
                  style={{ margin: "15px 0" }}
                />
              </B.MenuItem>
            </B.DropdownButton>
          </B.Nav>
        </B.CollapsibleNav>
      </B.Navbar>
    );
  },
});

module.exports = React.createClass({
  render: function () {
    return <NavBar {...intlData} user={this.props.user} />;
  },
});
