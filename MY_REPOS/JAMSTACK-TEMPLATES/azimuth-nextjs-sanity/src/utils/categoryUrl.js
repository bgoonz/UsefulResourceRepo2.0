const _ = require("lodash");
const withPrefix = require("./withPrefix").default;

export default function categoryUrl(category) {
  const slug = _.trim(_.get(category, "slug"), "/");
  return withPrefix(`/blog/category/${slug}`);
}
