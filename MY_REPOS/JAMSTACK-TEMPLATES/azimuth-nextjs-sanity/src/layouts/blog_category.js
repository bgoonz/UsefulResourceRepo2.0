import React from "react";
import _ from "lodash";

import BlogLayout from "./blog";

export default class Blog extends React.Component {
  render() {
    const category = _.get(this.props, "page.slug");
    let posts = _.get(this.props, "posts", []);
    posts = _.filter(posts, (post) => {
      const postCategories = _.map(
        _.get(post, "categories", []),
        (category) => category.slug
      );
      return _.includes(postCategories, category);
    });
    posts = _.orderBy(posts, ["date"], ["desc"]);
    const props = _.assign({}, this.props, { posts: posts });
    return <BlogLayout {...props} />;
  }
}
