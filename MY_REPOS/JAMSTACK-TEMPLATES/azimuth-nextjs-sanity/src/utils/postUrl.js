const _ = require("lodash");
const withPrefix = require("./withPrefix").default;

export default function postUrl(post) {
  const slug = _.trim(_.get(post, "slug"), "/");
  return withPrefix(`/blog/${slug}`);
}
