import React from "react";
import Head from "next/head";
import Router from "next/router";
// import ScriptTag from 'react-script-tag';
import _ from "lodash";

import Header from "./Header";
import Footer from "./Footer";

export default class Body extends React.Component {
  constructor(props) {
    super(props);
    this.handleRouteChange = this.handleRouteChange.bind(this);
  }

  componentDidMount() {
    // Sticky header
    let offsetY = 0;
    let ticking = false;

    window.addEventListener("scroll", function (e) {
      offsetY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(function () {
          handleHeader(offsetY);
          ticking = false;
        });
        ticking = true;
      }
    });

    function handleHeader(scrollPos) {
      if (scrollPos > 0) {
        document.body.classList.add("has--scrolled");
      } else {
        document.body.classList.remove("has--scrolled");
      }
    }

    Router.events.on("routeChangeStart", this.handleRouteChange);
  }

  componentWillUnmount() {
    Router.events.off("routeChangeStart", this.handleRouteChange);
  }

  handleRouteChange() {
    // Responsive video embeds
    const videoEmbeds = [
      'iframe[src*="youtube.com"]',
      'iframe[src*="vimeo.com"]',
    ];
    reframe(videoEmbeds.join(","));
  }

  render() {
    const page = _.get(this.props, "page");
    const title =
      (_.has(page, "title") ? _.get(page, "title") + " - " : "") +
      _.get(this.props, "config.title");
    return (
      <React.Fragment>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initialScale=1.0"
          />
          <meta name="google" content="notranslate" />
          <link
            href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,700i"
            rel="stylesheet"
          />
        </Head>
        <div
          id="page"
          className={"site palette-" + _.get(this.props, "config.palette")}
        >
          <Header {...this.props} />
          <main id="content" className="site-content">
            {this.props.children}
          </main>
          <Footer {...this.props} />
          <script src="/js/plugins.js" />
        </div>
      </React.Fragment>
    );
  }
}
