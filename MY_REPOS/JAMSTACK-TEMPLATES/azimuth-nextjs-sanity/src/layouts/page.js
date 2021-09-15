import React from "react";
import _ from "lodash";

import { Layout } from "../components";
import { markdownify } from "../utils";

export default class Page extends React.Component {
  render() {
    const page = _.get(this.props, "page");
    return (
      <Layout {...this.props}>
        <div className="outer">
          <div className="inner-medium">
            <article className="post post-full">
              <header className="post-header">
                <h1 className="post-title">{_.get(page, "title")}</h1>
              </header>
              {_.has(page, "image") && (
                <div className="post-thumbnail">
                  <img src={_.get(page, "image")} alt={_.get(page, "title")} />
                </div>
              )}
              {_.has(page, "subtitle") && (
                <div className="post-subtitle">{_.get(page, "subtitle")}</div>
              )}
              {_.has(page, "content") && (
                <div className="post-content">
                  {markdownify(_.get(page, "content"))}
                </div>
              )}
            </article>
          </div>
        </div>
      </Layout>
    );
  }
}
