import React from "react";
import _ from "lodash";
import moment from "moment-strftime";

import { Link, categoryUrl } from "../utils";

export default class PostFooter extends React.Component {
  renderCategoryLinks(post) {
    const categories = _.get(post, "categories");
    if (_.isEmpty(categories)) {
      return null;
    }
    return (
      <div>
        Categories:
        {_.map(categories, (category, index) => {
          return (
            <span key={index}>
              {index > 0 ? ", " : " "}
              <Link href={categoryUrl(category)}>{category.title}</Link>
            </span>
          );
        })}
      </div>
    );
  }

  render() {
    const post = this.props.post;
    const dateFormat = _.get(this.props, "dateFormat", "%B %d, %Y");
    return (
      <footer className="post-meta">
        <time
          className="published"
          dateTime={moment(_.get(post, "date")).strftime("%Y-%m-%d %H:%M")}
        >
          {moment(_.get(post, "date")).strftime(dateFormat)}
        </time>
        {_.has(post, "author") &&
          ", By " +
            _.get(post, "author.first_name") +
            " " +
            _.get(post, "author.last_name", "")}
        {this.renderCategoryLinks(post)}
      </footer>
    );
  }
}
