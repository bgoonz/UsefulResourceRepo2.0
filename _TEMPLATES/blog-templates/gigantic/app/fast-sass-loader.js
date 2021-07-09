// We use this to compile the .scss files instead of the typical
// SASS loader to speed up rebuilds. Note that this means all `@import`
// statements are resolved by the SASS compiler and not Webpack, so
// no additional processing is possible.

const glob = require("glob");
const path = require("path");
const sass = require("node-sass");
const { promisify } = require("util");

module.exports = async function () {
  const callback = this.async();

  try {
    const result = await promisify(sass.render)({
      file: this.resourcePath,
      ...this.query,
    });
    result.stats.includedFiles.forEach((file) =>
      this.addDependency(path.resolve(file))
    );
    callback(null, result.css, result.map);
  } catch (err) {
    this.cacheable(false);
    const potentiallyIncludedFiles = await promisify(glob)("**/*.scss");
    potentiallyIncludedFiles.forEach((file) =>
      this.addDependency(path.resolve(file))
    );
    callback(err.formatted ? new Error(err.formatted) : err);
  }
};
