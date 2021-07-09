(function() {
var exports = {};
exports.id = 157;
exports.ids = [157];
exports.modules = {

/***/ 9815:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ preview; }
/* harmony export */ });
/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6046);

async function preview(req, res) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== process.env.SANITY_PREVIEW_SECRET || !req.query.slug) {
    return res.status(401).json({
      message: "Invalid token"
    });
  } // Fetch the headless CMS to check if the provided `slug` exists


  const post = await (0,_lib_api__WEBPACK_IMPORTED_MODULE_0__/* .getPreviewPostBySlug */ .iy)(req.query.slug); // If the slug doesn't exist prevent preview mode from being enabled

  if (!post) {
    return res.status(401).json({
      message: "Invalid slug"
    });
  } // Enable Preview Mode by setting the cookies


  res.setPreviewData({}); // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities

  res.writeHead(307, {
    Location: `/posts/${post.slug}`
  });
  res.end();
}

/***/ }),

/***/ 7585:
/***/ (function(module) {

"use strict";
module.exports = require("next-sanity");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = __webpack_require__.X(0, [46], function() { return __webpack_exec__(9815); });
module.exports = __webpack_exports__;

})();