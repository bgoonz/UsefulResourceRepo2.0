const _ = require("lodash");

export default function withPrefix(url) {
  const basePath = "";
  return basePath + "/" + _.trimStart(url, "/");
}
