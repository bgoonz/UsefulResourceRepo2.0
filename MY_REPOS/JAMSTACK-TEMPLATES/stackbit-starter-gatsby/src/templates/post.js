import React from "react";
import _ from "lodash";
import moment from "moment-strftime";
import { graphql } from "gatsby";

import { Layout } from "../components/index";
import { withPrefix, getData, Link, htmlToReact } from "../utils";
import BlogPostCategories from "../components/BlogPostCategories";
import BlogPostTags from "../components/BlogPostTags";

// this minimal GraphQL query ensures that when 'gatsby develop' is running,
// any changes to content files are reflected in browser
export const query = graphql`
  query ($url: String) {
    sitePage(path: { eq: $url }) {
      id
    }
  }
`;

export default class Post extends React.Component {
  render() {
    return (
      <Layout {...this.props}>
        <article className="post">
          <div className="container container--md">
            {_.get(this.props, "pageContext.frontmatter.image", null) && (
              <div className="post__image">
                <img
                  src={withPrefix(
                    _.get(this.props, "pageContext.frontmatter.image", null)
                  )}
                  alt={_.get(this.props, "pageContext.frontmatter.title", null)}
                />
              </div>
            )}
            <header className="post__header">
              {_.get(
                this.props,
                "pageContext.frontmatter.categories",
                null
              ) && (
                <BlogPostCategories
                  {...this.props}
                  categories={_.get(
                    this.props,
                    "pageContext.frontmatter.categories",
                    null
                  )}
                  container_class={"post__meta"}
                />
              )}
              <h1 className="post__title">
                {_.get(this.props, "pageContext.frontmatter.title", null)}
              </h1>
              <div className="post__meta">
                <span>
                  On{" "}
                  <time
                    dateTime={moment(
                      _.get(this.props, "pageContext.frontmatter.date", null)
                    ).strftime("%Y-%m-%d %H:%M")}
                  >
                    {moment(
                      _.get(this.props, "pageContext.frontmatter.date", null)
                    ).strftime("%B %d, %Y")}
                  </time>
                </span>
                {_.get(this.props, "pageContext.frontmatter.author", null) &&
                  (() => {
                    let author = getData(
                      this.props.pageContext.site.data,
                      _.get(this.props, "pageContext.frontmatter.author", null)
                    );
                    return author.link ? (
                      <span>
                        {" "}
                        by{" "}
                        <Link to={withPrefix(author.link)}>
                          {author.first_name} {author.last_name}
                        </Link>
                      </span>
                    ) : (
                      <span>
                        {" "}
                        by {author.first_name} {author.last_name}
                      </span>
                    );
                  })()}
              </div>
            </header>
            <div className="post__copy">
              {htmlToReact(_.get(this.props, "pageContext.html", null))}
            </div>
            {_.get(this.props, "pageContext.frontmatter.tags", null) && (
              <footer className="post__footer">
                <BlogPostTags
                  {...this.props}
                  tags={_.get(this.props, "pageContext.frontmatter.tags", null)}
                />
              </footer>
            )}
          </div>
        </article>
      </Layout>
    );
  }
}
