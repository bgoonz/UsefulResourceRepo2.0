import React from "react";
import Router from "next/router";
import _ from "lodash";

import { Link, safePrefix } from "../utils";
import Action from "./Action";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.handleRouteChange = this.handleRouteChange.bind(this);
    this.menuOpenRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowResize, true);
    Router.events.on("routeChangeStart", this.handleRouteChange);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize, true);
    Router.events.off("routeChangeStart", this.handleRouteChange);
  }

  handleWindowResize() {
    if (_.get(this.menuOpenRef, "current.offsetParent") === null) {
      document.body.classList.remove("menu--opened");
    }
  }

  handleRouteChange() {
    document.body.classList.remove("menu--opened");
  }

  handleMenuOpen(event) {
    event.preventDefault();
    document.body.classList.add("menu--opened");
  }

  handleMenuClose(event) {
    event.preventDefault();
    document.body.classList.remove("menu--opened");
  }

  render() {
    const config = _.get(this.props, "config");
    const page = _.get(this.props, "page");
    return (
      <header id="masthead" className="site-header outer">
        <div className="inner">
          <div className="site-header-inside">
            <div className="site-branding">
              {_.get(config, "header.logo_img") && (
                <p className="site-logo">
                  <Link href={safePrefix("/")}>
                    <img src={_.get(config, "header.logo_img")} alt="Logo" />
                  </Link>
                </p>
              )}
              {_.get(page, "_type") === "landing" ||
              _.get(page, "_type") === "blog" ? (
                <h1 className="site-title">
                  <Link href={safePrefix("/")}>
                    {_.get(config, "header.title")}
                  </Link>
                </h1>
              ) : (
                <p className="site-title">
                  <Link href={safePrefix("/")}>
                    {_.get(config, "header.title")}
                  </Link>
                </p>
              )}
            </div>
            {_.get(config, "header.nav_links") &&
              _.get(config, "header.has_nav") && (
                <React.Fragment>
                  <nav
                    id="main-navigation"
                    className="site-navigation"
                    aria-label="Main Navigation"
                  >
                    <div className="site-nav-inside">
                      <button
                        id="menu-close"
                        className="menu-toggle"
                        onClick={this.handleMenuClose.bind(this)}
                      >
                        <span className="screen-reader-text">Open Menu</span>
                        <span className="icon-close" aria-hidden="true" />
                      </button>
                      <ul className="menu">
                        {_.map(
                          _.get(config, "header.nav_links"),
                          (action, actionIdx) => (
                            <li
                              key={actionIdx}
                              className={
                                "menu-item" +
                                (_.trim(_.get(this.props, "path"), "/") ===
                                _.trim(_.get(action, "url"), "/")
                                  ? " current-menu-item"
                                  : "") +
                                (_.get(action, "primary") ? " menu-button" : "")
                              }
                            >
                              <Action
                                action={action}
                                className={
                                  _.get(action, "primary") ? "button" : ""
                                }
                              />
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </nav>
                  <button
                    id="menu-open"
                    className="menu-toggle"
                    ref={this.menuOpenRef}
                    onClick={this.handleMenuOpen.bind(this)}
                  >
                    <span className="screen-reader-text">Close Menu</span>
                    <span className="icon-menu" aria-hidden="true" />
                  </button>
                </React.Fragment>
              )}
          </div>
        </div>
      </header>
    );
  }
}
