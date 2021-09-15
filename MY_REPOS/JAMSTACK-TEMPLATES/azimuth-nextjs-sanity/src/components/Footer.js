import React from "react";
import _ from "lodash";

import { Link, safePrefix, htmlToReact } from "../utils";
import Social from "./Social";
import SubscribeForm from "./SubscribeForm";
import Action from "./Action";

export default class Footer extends React.Component {
  render() {
    const config = _.get(this.props, "config");
    return (
      <footer id="colophon" className="site-footer">
        <div className="footer-top outer">
          <div className="inner">
            <div className="footer-widgets">
              <div className="widget footer-branding">
                {_.get(config, "footer.logo_img") ? (
                  <p className="site-logo">
                    <Link href={safePrefix("/")}>
                      <img src={_.get(config, "footer.logo_img")} alt="Logo" />
                    </Link>
                  </p>
                ) : (
                  <p className="site-title">
                    <Link href={safePrefix("/")}>
                      {_.get(config, "header.title")}
                    </Link>
                  </p>
                )}
                {_.get(config, "footer.tagline") && (
                  <p className="site-description">
                    {_.get(config, "footer.tagline")}
                  </p>
                )}
              </div>
              {((_.get(config, "footer.nav_links") &&
                _.get(config, "footer.has_nav")) ||
                _.get(config, "footer.has_social")) && (
                <nav className="widget footer-navigation">
                  <div className="footer-nav-inside">
                    {_.get(config, "footer.nav_links") &&
                      _.get(config, "footer.has_nav") && (
                        <div className="secondary-nav">
                          <h2 className="widget-title">
                            {_.get(config, "footer.nav_title")}
                          </h2>
                          <ul className="secondary-menu">
                            {_.map(
                              _.get(config, "footer.nav_links"),
                              (action, actionIdx) => (
                                <li key={actionIdx}>
                                  <Action action={action} />
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    {_.get(config, "footer.has_social") && (
                      <div className="social-nav">
                        <h2 className="widget-title">
                          {_.get(config, "footer.social_title")}
                        </h2>
                        <Social
                          socialLinks={_.get(config, "footer.social_links")}
                        />
                      </div>
                    )}
                  </div>
                </nav>
              )}
              {_.get(config, "footer.has_subscribe") && (
                <div className="widget footer-subscribe">
                  <h2 className="widget-title">
                    {_.get(config, "footer.subscribe_title")}
                  </h2>
                  {_.get(config, "footer.subscribe_content") && (
                    <p>
                      {htmlToReact(_.get(config, "footer.subscribe_content"))}
                    </p>
                  )}
                  <SubscribeForm {...this.props} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="site-info outer">
          <div className="inner">
            {htmlToReact(_.get(config, "footer.content"))}
            &nbsp;
            {_.map(_.get(config, "footer.links"), (link, linkIdx) => (
              <React.Fragment key={linkIdx}>
                <Action key={linkIdx} action={link} />.
              </React.Fragment>
            ))}
          </div>
        </div>
      </footer>
    );
  }
}
