const _ = require("lodash");
const withPrefix = require("./withPrefix").default;

export default function safePrefix(url) {
  if (_.startsWith(url, "#") || _.startsWith(url, "http")) {
    return url;
  }
  return withPrefix(url);
}
