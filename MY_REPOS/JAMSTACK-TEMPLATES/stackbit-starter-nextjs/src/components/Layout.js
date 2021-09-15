import React from "react";
import Head from "next/head";
import _ from "lodash";

import Header from "./Header";
import Footer from "./Footer";

export default class Body extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>
            {_.get(this.props, "page.frontmatter.title", null) &&
              _.get(this.props, "page.frontmatter.title", null) + " | "}
            {_.get(this.props, "data.config.title", null)}
          </title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initialScale=1.0"
          />
          <meta
            name="description"
            content={
              _.get(this.props, "page.frontmatter.excerpt", null) ||
              _.get(this.props, "data.config.description", null)
            }
          />
        </Head>
        <div id="site-wrap" className="site">
          <Header {...this.props} />
          <main id="content" className="site-content">
            {this.props.children}
          </main>
          <Footer {...this.props} />
        </div>
      </React.Fragment>
    );
  }
}
