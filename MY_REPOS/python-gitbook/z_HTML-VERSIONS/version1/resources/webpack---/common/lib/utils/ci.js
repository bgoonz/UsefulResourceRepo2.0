'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.formatVersion = exports.CSB_PKG_PROTOCOL = void 0;
exports.CSB_PKG_PROTOCOL = /https:\/\/pkg(-staging)?\.csb.dev/;
exports.formatVersion = (version) => {
  if (exports.CSB_PKG_PROTOCOL.test(version)) {
    const commitSha = version.match(/commit\/([\w\d]*)\//);
    if (commitSha && commitSha[1]) {
      return `csb:${commitSha[1]}`;
    }
  }
  return version;
};
