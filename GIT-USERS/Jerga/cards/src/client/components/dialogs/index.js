import _ from "lodash";

const context = require.context("./", false, /\.js$/);

const components = context
  .keys()
  .filter((name) => name.indexOf("index") == -1)
  .map((name) => context(name).default);

export default _.zipObject(
  components.map((c) => c.id),
  components.map((c) => c.component)
);
