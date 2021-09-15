import React from "react";
import _ from "lodash";
import { graphql } from "gatsby";

import { Layout } from "../components/index";
import { htmlToReact } from "../utils";

// this minimal GraphQL query ensures that when 'gatsby develop' is running,
// any changes to content files are reflected in browser
export const query = graphql`
  query ($url: String) {
    sitePage(path: { eq: $url }) {
      id
    }
  }
`;

export default class Page extends React.Component {
  render() {
    return (
      <Layout {...this.props}>
        <article className="page">
          <div className="container container--md">
            <header className="page__header">
              <h1 className="page__title">
                {_.get(this.props, "pageContext.frontmatter.title", null)}
              </h1>
            </header>
            <div className="page__copy">
              {htmlToReact(_.get(this.props, "pageContext.html", null))}
            </div>
          </div>
        </article>
      </Layout>
    );
  }
}
